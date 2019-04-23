
package Conectadores;

import java.lang.Exception;
import java.util.ArrayList;
import java.util.List;

public class Iniciar extends Conexion{
    public int cargo = 0;
    public List imgCanales = new ArrayList();
    public List imgCanalesOn = new ArrayList();
    
    public boolean ingresar(String usuario, String contraseña){
        try {
           String sql = "SELECT * FROM usuarios WHERE usuario_usuario = ? and " +
                   "clave_usuario = ?";
           ps = conectador.prepareStatement(sql);
           ps.setString(1, usuario);
           ps.setString(2, contraseña);
           resultado = ps.executeQuery();
           if(resultado.next()){
            cargo = resultado.getInt("id_cargo");
            switch(cargo){
                case 1: 
                    traerMetodos(resultado.getInt("id_centroverde"));
                    break;
                default:
                    System.out.println("Aun no ha sido preparado los otros cargos");
            }
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
            String sql = "SELECT DISTINCT C.imagen, C.imagendos "
                + "FROM canales C, canal_centroverde M "
                + "WHERE M.id_centroverde = "+idcv+"  and C.id_canal = M.id_canal";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                imgCanales.add(resultado.getString("C.imagen"));
                imgCanalesOn.add(resultado.getString("C.imagendos"));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        
              
    }

    public boolean registrar(String user, String nombre, String clave, 
            String correo, int cargo, String fecha){
        try {
            String sql = "INSERT INTO usuarios(usuario_usuario, nombre_usuario,"+
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
