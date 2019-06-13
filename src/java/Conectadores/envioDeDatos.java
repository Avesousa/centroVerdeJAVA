
package Conectadores;

import domain.Camion;
import domain.Camion.Canal;
import java.sql.*;
import java.sql.Statement;
import javax.swing.JOptionPane;

public class envioDeDatos extends Conexion {
    public void recibirDatos(Camion camion,String cv,String user) {
        try {
            System.out.println("[ENTRO EN BASE DE DATOS]: ENTRO RECIEN, CAMION: " +camion + " CV: " + cv );
            System.out.println("[ENTRO EN BASE DE DATOS]: FECHA: " + camion.getFecha());
            String sql = "INSERT INTO ingresos_centros_verdes(fecha,id_cv,peso_total,carga_sastifactoria,esingreso,comentarios) VALUES('"+
                    new Timestamp(camion.getFecha().getTime())+"',"+cv+","+camion.getPesoTotal()+
                    ","+false+","+camion.esIngreso+",'"+camion.comentarios+"');";
            ps = conectador.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.executeUpdate();
            resultado = this.ps.getGeneratedKeys();
            while(resultado.next()){
                subirRestante(resultado.getInt(1),camion,user);
            }
        } catch (Exception e) {
            this.elOk = false;
            System.out.println("[RECIBIRDATOS]: Ha ocurrido un error " + e);
            
        }
    }
    
    private void subirRestante(int id, Camion camion,String user){
        System.out.println("[SUBIRRESTANTE]: INGRESO :D");
        try {
            
            //Escritura en ingreso de camiones.
            ps = conectador.prepareStatement("INSERT INTO ingreso_camiones "+
                "VALUES("+id+",'"+camion.getPatente()+"'); ");
            ps.executeUpdate();
            
            //Escritura en el historico de los ingreso de cada usuario.
            ps = conectador.prepareStatement("INSERT INTO historico_ingresos_usuario "+
                "VALUES("+id+",'"+user+"'); ");
            ps.executeUpdate();
            
            //Escritura en los bolsones vacios.
            ps = conectador.prepareStatement("INSERT INTO bolsonesvacios "+
                "VALUES("+id+","+camion.bolsonesVacios+","+camion.esIngreso+");");
            ps.executeUpdate();
            
            //La variable i, significa index del for que intera canales
        for(int i = 0; i < camion.getCanales().size(); i++){
            System.out.println("[SUBIRRESTANTE]: ENTRO PRIMER FOR");
            Canal ca = camion.getCanales().get(i);
                ps = conectador.prepareStatement("INSERT INTO canales_asociados"
                        + " VALUES("+id+","+ca.getNombreCanal()+","
                        +ca.getPesoTotal()+"); ");
                ps.executeUpdate();
            //Colocar el if para comprobar si es bolson o no....   
            if(ca.getBolsones().get(0).esBolson){
                //La variable j, significa index de la ubicación del bolsón iterado.
                for(int j = 0; j < ca.getBolsones().size();j++){
                    System.out.println("[SUBIRRESTANTE]: ENTRO SEGUNDO FOR");
                    Camion.Canal.InnerElementosCargados bo = ca.getBolsones().get(j);
                    ps = conectador.prepareStatement("INSERT INTO bolsones (id_ingreso,"
                            + "id_bolson,peso,etapa,subetapa,id_canal,id_asociado) VALUES("+
                        id+",'"+bo.idBolson+"',"+bo.getPesoTotal()+",'"+bo.etapa+"','"+
                        bo.subEtapa+"','"+ca.nombreCanal+"',"+bo.idRecuperador+"); ");
                    ps.executeUpdate();
                }
            }
            //La variable d index.
            if(ca.elementosCargados.size() > 0){
                for(int d = 0; d < ca.getElementosPorMaterial().size(); d++){
                    System.out.println("[SUBIRRESTANTE]: ENTRO EN ELEMENTOS MATERIAL");
                    Camion.Canal.InnerElementosPorMaterial el = ca.getElementosPorMaterial().get(d);
                    ps = conectador.prepareStatement("INSERT INTO material_ingreso "
                            + "(material,formato,peso_total,id_ingreso) "
                            + "VALUES ('"+el.material+"','"+el.caracteristica+"',"
                            + el.pesoTotal+","+id+");");
                    ps.executeUpdate();
                }
            }
            
        }
        ps = conectador.prepareStatement("UPDATE ingresos_centros_verdes SET "
                + "carga_sastifactoria = " + true +" WHERE id_ingreso = " + id);
                ps.executeUpdate();
        this.elOk = true;
        } catch (Exception e) {
            System.out.println("[SUBIRRESTANTE]: ERROR OCURRIDO POR: " + e);
            this.elOk = false;
        }
        
    }
}
