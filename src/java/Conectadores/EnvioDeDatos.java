
package Conectadores;

import domain.Camion;
import domain.Camion.Canal;
import java.sql.*;
import java.sql.Statement;
import javax.swing.JOptionPane;

public class EnvioDeDatos extends Conexion {
    public void recibirDatos(Camion camion,String cv,String user) {
        try {
            System.out.println("[ENTRO EN BASE DE DATOS]: ENTRO RECIEN, CAMION: " +camion + " CV: " + cv );
            System.out.println("[ENTRO EN BASE DE DATOS]: FECHA: " + camion.getFecha());
            String sql = "INSERT INTO ingresos_centros_verdes(fecha,id_cv,peso_total,carga_sastifactoria,esingreso,comentarios) VALUES('"+
                    new Timestamp(camion.getFecha().getTime())+"',"+cv+","+camion.getPesoTotal()+
                    ","+false+","+camion.esIngreso+",'"+camion.comentarios+"');";
            System.out.println("SQL [RECIBIRDATOS]: " + sql);
            ps = conectador.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.executeUpdate();
            resultado = this.ps.getGeneratedKeys();
            while(resultado.next()){
                if(subirComunes(resultado.getInt(1),camion,user)
                && subirCanal(resultado.getInt(1),camion))
                finalizar(resultado.getInt(1));
            }
        } catch (Exception e) {
            this.elOk = false;
            System.out.println("[RECIBIRDATOS]: Ha ocurrido un error " + e);
            
        }
        finally{
           cerrarConexion();
        }
    }
    
    private boolean subirComunes(int id, Camion camion,String user){
        System.out.println("[ENVIARDATOS]: -- Comienza carga de datos comunes --");
        try {
            
            //Escritura en ingreso de camiones.
            System.out.println("[SUBIRCOMUN]: -- ingreso_camiones" );
            ps = conectador.prepareStatement("INSERT INTO ingreso_camiones "+
                "VALUES("+id+",'"+camion.getPatente()+"'); ");
            ps.executeUpdate();
                
            //Escritura en el historico de los ingreso de cada usuario.
            System.out.println("[SUBIRCOMUN]: -- historico_ingresos_usuario" );
            ps = conectador.prepareStatement("INSERT INTO historico_ingresos_usuario "+
                "VALUES("+id+",'"+user+"'); ");
            ps.executeUpdate();
            
            return true;
            
        } catch (Exception e) {
            
            System.out.println("[SUBIRCOMUNES]: -- Error ocurrido: " + e);
            //Verificador de carga, para enviar mensaje al front
            return false;
            
        }
    }
    
    private boolean subirCanal(int id, Camion camion){
        try {
            
            //La letra i es la variable de ubicación de canales
            for(int i = 0; i < camion.getCanales().size(); i++){
                //Escribe en base de datos los canales de recolección.
                System.out.println("[SUBIRCANALES]: -- Canales_asociados");
                Canal ca = camion.getCanales().get(i);
                ps = conectador.prepareStatement("INSERT INTO canales_asociados"
                        + " VALUES("+id+","+ca.getNombreCanal()+","
                        +ca.getPesoTotal()+"); ");
                ps.executeUpdate();
                
                //Consulta si tiene elementos cargados, para asi saber si carga materiales.
                //consultar si tiene elementos dentro...
                if(ca.elementosCargados.size() > 0){
                    if(!ca.elementosCargados.get(0).esBolsonVacio){
                            //Escribe en base de datos bolsones vacios la cantidad de la misma.
                            System.out.println("[SUBIRCANALES]: -- bolsonesVacios[Modo normal]: ");
                            ps = conectador.prepareStatement("INSERT INTO bolsonesvacios "+
                            "(id_ingreso, bolsones, esingreso) VALUES("+
                            id+","+camion.bolsonesVacios+","+camion.esIngreso+");");
                            ps.executeUpdate();
                            //Realiza la consulta si son bolsones, y así los sube.
                            if(ca.getBolsones().get(0).esBolson){
                                //la letra j es la variable de ubicación de los bolsones.
                                for(int j = 0; j < ca.getBolsones().size();j++){
                                    System.out.println("[SUBIRCANALES]: --bolsones "+
                                    (j+1) + "/" + ca.getBolsones().size());
                                    Camion.Canal.InnerElementosCargados bo = ca.getBolsones().get(j);
                                    ps = conectador.prepareStatement("INSERT INTO bolsones (id_ingreso,"
                                            + "id_bolson,peso,etapa,id_canal,id_asociado,otra) VALUES("+
                                        id+",'"+bo.idBolson+"',"+bo.getPesoTotal()+",'"+bo.etapa+
                                        "','"+ca.nombreCanal+"','"+bo.idRecuperador+"',"+bo.otra+"); ");
                                    ps.executeUpdate();
                                }
                            }
                             //Se realiza la subida de los detalles por materiales subidos.
                            //la letra d es la variable de ubicación de las cargas.
                            for(int d = 0; d < ca.getElementosPorMaterial().size(); d++){
                                System.out.println("[SUBIRCANALES]: -- material_ingreso");
                                Camion.Canal.InnerElementosPorMaterial el = ca.getElementosPorMaterial().get(d);
                                ps = conectador.prepareStatement("INSERT INTO material_ingreso "
                                        + "(material,formato,peso_total,id_ingreso) "
                                        + "VALUES ('"+el.material+"','"+el.caracteristica+"',"
                                        + el.pesoTotal+","+id+");");
                                ps.executeUpdate();
                            }
                    }else if(ca.elementosCargados.get(0).esBolsonVacio){
                        //la letra j es la variable de ubicación de los elementos cargados.
                        for(int j = 0; j < ca.elementosCargados.size(); j++){
                            //Escribe los bolsones vacios de cada una de las etapas que se llevaron.
                            System.out.println("[SUBIRCANALES]: -- bolsonesVacios[Modo Mixto] " + (j+1) + "/" + ca.elementosCargados.size());
                            ps = conectador.prepareStatement("INSERT INTO bolsonesvacios "+
                            "(id_ingreso, bolsones, esingreso, etapa) VALUES("+
                            id+","+ca.elementosCargados.get(j).cantidad+","+
                            camion.esIngreso+",'"+ca.elementosCargados.get(j).etapa+"');");
                            ps.executeUpdate();
                        }
                    }
            }
                
            }
            return true;
        }catch (Exception e) {
            
            System.out.println("[SUBIRCANALES]: -- Error ocurrido: " + e);
            //Verificador de carga, para enviar mensaje al front
            return false;
        
        }
    }
    
    private void finalizar(int id){
        
        //Actualiza la base de datos dando a entender si fue correcta la subida.
        try{
            System.out.println("[ENVIODEDATOS]: Carga finalizada...");
            ps = conectador.prepareStatement("UPDATE ingresos_centros_verdes SET "
                + "carga_sastifactoria = " + true +" WHERE id_ingreso = " + id);
            ps.executeUpdate();
            //Verificador de carga, para enviar mensaje al front
            this.elOk = true;
            
        } catch (Exception e) {
        
            System.out.println("[ENVIODEDATOS]: Error en la carga: " + e);
            //Verificador de carga, para enviar mensaje al front
            this.elOk = false;
        
        }
        
    } 
    
}
