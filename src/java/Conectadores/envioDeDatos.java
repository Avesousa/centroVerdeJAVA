
package Conectadores;

import domain.*;
import java.sql.Statement;
import javax.swing.JOptionPane;

public class envioDeDatos extends Conexion {
    Camion camion;
    int id = 0;
    public void recibirDatos(Camion ca,String cv) {
        camion = ca;
        try {
            System.out.println("[ENTRO EN BASE DE DATOS]: ENTRO RECIEN, CAMION: " +camion + " CV: " + cv );
            System.out.println("[ENTRO EN BASE DE DATOS]: FECHA: " + camion.getFecha());
            String sql = "INSERT INTO ingresos_centros_verdes(fecha_y_hora,id_cv,peso_total) VALUES("+
                    camion.getFecha()+","+cv+","+camion.getPesoTotal()+");";
            ps = conectador.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            resultado = this.ps.getGeneratedKeys();
            ps.executeUpdate();
            while(resultado.next()){
                id = resultado.getInt(0);
            }
            resultado.close();
            
        } catch (Exception e) {
            System.out.println("Ha ocurrido un error " + e);
            
        }
    }
    
    private void subirRestante(){
        String canalesSQL = "";
        String bolsonSQL = "";
        String camionSQL = "INSERT INTO camiones (patente)"+
                "VALUES("+id+");";
        for(int i = 0; i < camion.getCanales().size(); i++){
            Canal ca = camion.getCanales().get(i);
            canalesSQL += "INSERT INTO canales_asociados VALUES("+
                id+","+ca.nombreCanal+","+ca.getPesoTotal()+");";
            for(int j = 0; j < ca.getBolsones().size();i++){
                Bolson bo = ca.getBolsones().get(j);
                bolsonSQL += "INSERT INTO bolsones VALUES("+
                    id+","+bo.idBolson+","+bo.pesoTotal+","+bo.etapa+","+
                    bo.subEtapa+","+bo.material+","+ca.nombreCanal+");";
            }
        }
        String sql = canalesSQL+bolsonSQL+camionSQL;
        try {
            ps = conectador.prepareStatement(sql);
            ps.executeUpdate();
        } catch (Exception e) {
            System.out.println("Ha ocurrido un error " + e);
        }
        
    }
}
