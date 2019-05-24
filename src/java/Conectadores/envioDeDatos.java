
package Conectadores;

import domain.*;
import java.sql.*;
import java.sql.Statement;
import javax.swing.JOptionPane;

public class envioDeDatos extends Conexion {
    public void recibirDatos(Camion camion,String cv) {
        try {
            System.out.println("[ENTRO EN BASE DE DATOS]: ENTRO RECIEN, CAMION: " +camion + " CV: " + cv );
            System.out.println("[ENTRO EN BASE DE DATOS]: FECHA: " + camion.getFecha());
            String sql = "INSERT INTO ingresos_centros_verdes(fecha,id_cv,peso_total) VALUES('"+
                    new Timestamp(camion.getFecha().getTime())+"',"+cv+","+camion.getPesoTotal()+");";
            ps = conectador.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.executeUpdate();
            resultado = this.ps.getGeneratedKeys();
            while(resultado.next()){
                subirRestante(resultado.getInt(1),camion);
            }
        } catch (Exception e) {
            System.out.println("Ha ocurrido un error " + e);
            
        }
    }
    
    private void subirRestante(int id, Camion camion){
        try {
            ps = conectador.prepareStatement("INSERT INTO ingreso_camiones "+
                "VALUES("+id+",'"+camion.getPatente()+"'); ");
            ps.executeUpdate();
        for(int i = 0; i < camion.getCanales().size(); i++){
            System.out.println("[SUBIRRESTANTE]: ENTRO PRIMER FOR");
            Canal ca = camion.getCanales().get(i);
                ps = conectador.prepareStatement("INSERT INTO canales_asociados"
                        + " VALUES("+id+","+ca.getNombreCanal()+","
                        +ca.getPesoTotal()+"); ");
                ps.executeUpdate();
            //Colocar el if para comprobar si es bolson o no....   
            for(int j = 0; j < ca.getBolsones().size();j++){
            System.out.println("[SUBIRRESTANTE]: ENTRO SEGUNDO FOR");
                Bolson bo = ca.getBolsones().get(j);
                ps = conectador.prepareStatement("INSERT INTO bolsones VALUES("+
                    id+",'"+bo.getIdbolson()+"',"+bo.getPesoTotal()+",'"+bo.getEtapa()+"','"+
                    bo.getSubEtapa()+"','"+bo.getMaterial()+"',"+ca.getNombreCanal()+"); ");
                ps.executeUpdate();
            }
        }
        } catch (Exception e) {
            System.out.println("Ha ocurrido un error " + e);
        }
        
    }
}
