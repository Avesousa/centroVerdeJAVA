
package Conectadores;


public class TraerDatos extends Conexion{
    public String nombre;
    public String id;
    public void traerId(int id, String etapa){
        try {
           String sql = "SELECT * FROM recuperadores WHERE id_bolson_recuperador = "+id+" and " +
                   "proyecto = '" + etapa+"';";
           System.out.println(sql);
           ps = conectador.prepareStatement(sql);
           resultado = ps.executeQuery();
            
           if(resultado.next()){
                this.nombre = resultado.getString("asociado");
                this.id = resultado.getString("id_recuperador");  //
                
           }
        } catch (Exception e) {
            throw new NullPointerException ("No conecto por error: " + e);
        }
        finally{
           cerrarConexion();
        }
    }
    
}
