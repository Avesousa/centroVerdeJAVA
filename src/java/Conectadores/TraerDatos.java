
package Conectadores;

import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;


public class TraerDatos extends Conexion{
    public String nombre;
    public String id;
    public void traerId(int id, String etapa, String tipo, int coop){
        try {
           String sql = "SELECT * FROM asociados WHERE id_bolson = "+id+" and " +
                   "proyecto = '" + etapa + "' and medio = '" + tipo + "' and cooperativa = " + coop;
            System.out.println(sql);
           ps = conectador.prepareStatement(sql);
           resultado = ps.executeQuery();
            
           if(resultado.next()){
                this.nombre = resultado.getString("nombre") + " " + resultado.getString("apellido");
                this.id = resultado.getString("id_asociado");  //
                System.out.println(this.nombre);
                
           }
        } catch (Exception e) {
            throw new NullPointerException ("No conecto por error: " + e);
        }
        finally{
           cerrarConexion();
        }
    }
    
    public void traerId(String tipo, int id, int coop){
        try {
           String sql = "SELECT * FROM asociados WHERE id_asociado = "+id+" and " +
                   "medio = '" + tipo + "' and cooperativa = " + coop + " and proyecto <> '0'";
           ps = conectador.prepareStatement(sql);
           resultado = ps.executeQuery();
            System.out.println(sql);
           if(resultado.next()){
                this.nombre = resultado.getString("nombre") + " " + resultado.getString("apellido");
                this.id = resultado.getString("id_asociado");  //
                
           }
        } catch (Exception e) {
            throw new NullPointerException ("No conecto por error: " + e);
        }
        finally{
           cerrarConexion();
        }
    }
    
}
