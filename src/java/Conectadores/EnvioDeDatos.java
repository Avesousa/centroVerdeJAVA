
package Conectadores;

import domain.Camion;
import domain.Camion.Canal;
import static java.lang.System.in;
import java.sql.*;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

public class EnvioDeDatos extends Conexion {
    private int id = 0;
    private String cv = "";
    private String json = "";
    private String comentario = "";
    public void recibirDatos(Camion camion,String cvR,String user,String json) {
        this.cv = cvR;
        this.comentario = camion.comentarios;
        try {
            System.out.println("[ENTRO EN BASE DE DATOS]: ENTRO RECIEN, CAMION: " +camion + " CV: " + cv );
            System.out.println("[ENTRO EN BASE DE DATOS]: FECHA: " + camion.getFecha());
            this.sql = "INSERT INTO ingresos_centros_verdes(fecha,id_cv,peso_total,carga_sastifactoria,esingreso,comentarios) VALUES('"+
                    new Timestamp(camion.getFecha().getTime())+"',"+cv+","+camion.getPesoTotal()+
                    ","+false+","+camion.esIngreso+",'"+camion.comentarios+"');";
            ps = conectador.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.executeUpdate();
            resultado = this.ps.getGeneratedKeys();
            while(resultado.next()){
                this.id = resultado.getInt(1);
                if(subirComunes(camion,user)
                && subirCanal(camion))
                finalizar();
            }
            if(!camion.comentarios.equals(""))
                cargarNotificacion("m",0);
        } catch (Exception e) {
            this.elOk = false;
            System.out.println("[RECIBIRDATOS]: Ha ocurrido un error " + e);
            cargarNotificacion("c",0);
            this.json = json;
        }
        finally{
           cerrarConexion();
        }
    }
    
    private boolean subirComunes(Camion camion,String user){
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
    
    private boolean subirCanal(Camion camion){
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
                                    this.sql = "INSERT INTO bolsones (id_ingreso,"+
                                        "id_bolson,peso,etapa,id_canal,id_asociado,otra) VALUES("+
                                        id+",'"+bo.idBolson+"',"+bo.getPesoTotal()+",(SELECT etapa FROM etapas WHERE etapa_visual = '"+bo.etapa+
                                        "'),'"+ca.nombreCanal+"','"+bo.idRecuperador+"',"+bo.otra+");";
                                    ps = conectador.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
                                    ps.executeUpdate();
                                    resultado = ps.getGeneratedKeys();
                                    if(resultado.next()){
                                        String tipo = "";
                                        int fila = resultado.getInt(1);
                                        if(bo.idRecuperador.equals("0"))
                                            tipo = "b";
                                        else if(bo.pesoTotal > 299)
                                            tipo = "p";
                                        else if(!verificarEtapa(bo.idRecuperador,bo.etapa))
                                            tipo = "e";
                                        if(tipo != "")
                                            cargarNotificacion(tipo,fila);
                                    }
                                }
                            }
                             //Se realiza la subida de los detalles por materiales subidos.
                            //la letra d es la variable de ubicación de las cargas.
                            for(int d = 0; d < ca.getElementosPorMaterial().size(); d++){
                                System.out.println("[SUBIRCANALES]: -- material_ingreso");
                                Camion.Canal.InnerElementosPorMaterial el = ca.getElementosPorMaterial().get(d);
                                ps = conectador.prepareStatement("INSERT INTO material_ingreso "
                                        + "(material,formato,peso_total,id_ingreso,id_canal) "
                                        + "VALUES ('"+el.material+"','"+el.caracteristica+"',"
                                        + el.pesoTotal+","+id+","+ca.getNombreCanal()+");");
                                ps.executeUpdate();
                                if(!(el.pesoTotal > 0))
                                    cargarNotificacion("j",0);
                                    
                            }
                    }else if(ca.elementosCargados.get(0).esBolsonVacio){
                        //la letra j es la variable de ubicación de los elementos cargados.
                        for(int j = 0; j < ca.elementosCargados.size(); j++){
                            //Escribe los bolsones vacios de cada una de las etapas que se llevaron.
                            System.out.println("[SUBIRCANALES]: -- bolsonesVacios[Modo Mixto] " + (j+1) + "/" + ca.elementosCargados.size());
                            ps = conectador.prepareStatement("INSERT INTO bolsonesvacios "+
                            "(id_ingreso, bolsones, esingreso, etapa) VALUES("+
                            id+","+ca.elementosCargados.get(j).cantidad+","+
                            camion.esIngreso+",SELECT etapa FROM etapas WHERE etapa_visual = '"+ca.elementosCargados.get(j).etapa+"');");
                            ps.executeUpdate();
                        }
                    }
            }
                
            }
            return true;
        }catch (Exception e) {
            System.out.println(this.sql);
            System.out.println("[SUBIRCANALES]: -- Error ocurrido: " + e);
            //Verificador de carga, para enviar mensaje al front
            return false;
        
        }
    }
    
    private void finalizar(){
        
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
    
    private void cargarNotificacion(String tipo, int bolson_pk){
        String texto = "";
        this.sql = "INSERT INTO centroverde.error(cv,descripcion,tipo,";
        switch(tipo){
            case("b"):
                texto = "En el ingreso " + id + 
                        " tiene un error en la fila " + bolson_pk +
                        " ya que el pesaje no está asignado a ningún recuperador";
                sql += "id_bolson_pk,id_ingreso,identificacion) "+
                       "VALUES("+cv+",'"+texto+"','"+tipo+"',"+bolson_pk+","+id+",1)";
                break;
            case("p"):
                texto = "En el ingreso " + id + 
                        " en el bolsón de la fila " + bolson_pk +
                        " el pesaje es dudoso por ser mayor a 300Kg, falta verificación ";
                sql += "id_bolson_pk,id_ingreso,peso) "+
                       "VALUES("+cv+",'"+texto+"','"+tipo+"',"+bolson_pk+","+id+",1)";
                break;
            case("j"):
                texto = texto = "En el ingreso " + id + 
                        " hay un pesaje con 0 KG";
                sql += "id_ingreso,peso) "+
                       "VALUES("+cv+",'"+texto+"','p',"+id+",1)";
            case("e"):
                texto = "En el ingreso " + id + 
                        " en el bolson de la fila " + bolson_pk +
                        " el asociado en Base de datos no figura con la etapa ingresada ";
                sql += "id_bolson_pk,id_ingreso,carga) "+
                       "VALUES("+cv+",'"+texto+"','"+tipo+"',"+bolson_pk+","+id+",1)";
                break;
            case("c"):
                texto = "En el ingreso " + id + 
                        " hubo un error de carga, por lo cual no cargo ningún elemento "+
                        " y los datos arrojados son: " + this.json;
                sql += "id_ingreso,carga) "+
                       "VALUES("+cv+",'"+texto+"','"+tipo+"',"+id+",1)";
                break;
            case("m"):
                texto = "Han ingresado un comentario en el ingreso " + id +
                        " lo cual dice: " + this.comentario;
                sql += "id_ingreso,carga) "+
                       "VALUES("+cv+",'"+texto+"','"+tipo+"',"+id+",1)";
        }
        
        try {
            this.ps = this.conectador.prepareStatement(sql);
            this.ps.executeUpdate();
        } catch (SQLException ex) {
            System.out.println("[NOTIFICACION]: " + ex);
        }
        
    }
    
    private boolean verificarEtapa(String asociado,String etapa) throws SQLException{
        List<String> etapas = new ArrayList();
        this.sql = "SELECT * FROM etapas WHERE etapa_visual = '"+etapa+"';";
            ps = this.conectador.prepareStatement(sql);
            resultado = this.ps.executeQuery();
            while(resultado.next()){
                etapas.add(resultado.getString("etapa"));
            }
            return verificacion(asociado,etapas);
    }
    
    private boolean verificacion(String asociado, List<String> etapa) throws SQLException{
        boolean valor = false;
        for(int i = 0; i < etapa.size(); i++){
            this.sql = "SELECT * FROM centroverde.asociados WHERE id_asociado = '" +asociado+"' AND proyecto = '"+etapa.get(i)+"';"; 
            this.ps = this.conectador.prepareStatement(sql);
            this.resultado = this.ps.executeQuery();
            valor = valor ? valor : this.resultado.next();
        }
        return valor;
    }
    
    public boolean cambioClave(int id, String clave){
        
        try {
            this.sql = "UPDATE centroverde.usuarios SET clave_usuario = ? WHERE id_usuario = ?";
            ps = this.conectador.prepareStatement(sql);
            ps.setString(1, clave);
            ps.setInt(2, id);
            ps.executeUpdate();
            return true;
        
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
}

