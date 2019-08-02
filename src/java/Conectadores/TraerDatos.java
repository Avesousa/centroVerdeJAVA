
package Conectadores;

import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;


public class TraerDatos extends Conexion{
    public String nombre;
    public String id;
    public void traerId(int id, String etapa, String tipo){
        try {
           String sql = "SELECT * FROM asociados WHERE id_bolson = "+id+" and " +
                   "proyecto = '" + etapa + "' and medio = '" + tipo + "'";
            System.out.println(sql);
           ps = conectador.prepareStatement(sql);
           resultado = ps.executeQuery();
            
           if(resultado.next()){
                this.nombre = resultado.getString("asociado");
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
