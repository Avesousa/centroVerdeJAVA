
package Conectadores;

import java.lang.Exception;
import java.util.ArrayList;

public class Iniciar extends Conexion{
    public int cargo = 0;
    public ArrayList imgCanales = new ArrayList();
    
    public boolean ingresar(String usuario, String contraseña){
        try {
           String sql = "SELECT * FROM usuarios WHERE user_usuario = ? and " +
                   "clave_usuario = ?";
           ps = conectador.prepareStatement(sql);
           ps.setString(1, usuario);
           ps.setString(2, contraseña);
           resultado = ps.executeQuery();
           if(resultado.next()){
            cargo = resultado.getInt("id_cargo");
            traerMetodos(resultado.getInt("id_centroverde"));
           }
           return true;
        } catch (Exception e) {
            throw new NullPointerException ("No conecto por error: " + e);
        }
        finally{
           cerrarConexion();
        }
    }
    
    public void traerMetodos(int idcv){
        try {
            String sql = "SELECT c.imagen_canal"
                + "FROM canales c, canalesporcentro m"
                + "WHERE m.id_centroverde = "+idcv;
            resultado = ps.executeQuery();
            while(resultado.next()){
                imgCanales.add(resultado.getString("c.imagen_canal"));
        }
        } catch (Exception e) {
        }
        
              
    }
    
    
    public boolean registrar(String user, String nombre, String clave, 
            String correo, int cargo, String fecha){
        try {
            String sql = "INSERT INTO usuarios(user_usuario, nombre_usuario,"+
                    "clave_usuario, correo_usuario, id_cargo, fecha_usuario) "+
                    "VALUES(?,?,?,?,?,?)";
            ps = conectador.prepareStatement(sql);
            ps.setString(1, user);
            ps.setString(2, nombre);
            ps.setString(3, clave);
            ps.setString(4, correo);
            ps.setInt(5, cargo);
            ps.setString(6, fecha);
            if(ps.executeUpdate() == 1){
                return true;
            } 
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
//        finally{
//            cerrarConexion();
//        }
        return false;
    
    }
    
}
