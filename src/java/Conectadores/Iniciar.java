
package Conectadores;

import java.lang.Exception;

public class Iniciar extends Conexion{
    
    public boolean ingresar(String usuario, String contraseña){
        try {
           String sql = "SELECT * FROM usuarios WHERE user_usuario = ? and " +
                   "clave_usuario = ?";
           ps = conectador.prepareStatement(sql);
           ps.setString(1, usuario);
           ps.setString(2, contraseña);
           resultado = ps.executeQuery();
           return resultado.absolute(1);
        } catch (Exception e) {
            throw new NullPointerException ("No conecto por error: " + e);
        }
        finally{
           cerrarConexion();
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
