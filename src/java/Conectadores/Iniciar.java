
package Conectadores;

import java.lang.Exception;
import java.util.ArrayList;
import java.util.List;

public class Iniciar extends Conexion{
    public int cargo = 0;
    public List imgCanales = new ArrayList();
    public List imgCanalesDos = new ArrayList();
    public List nombreCanal = new ArrayList();
    public List abreviaturaCanal = new ArrayList();
    public List idCanal = new ArrayList();
    public int id_user = 0;
    public int id_centroverde = 0;
    public int id_coop = 0;
    public String centroverde;
    public String cooperativa;
    public String nombreUsuario;
    
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
            id_centroverde = resultado.getInt("id_centroverde");
            id_user = resultado.getInt("id_usuario");
            nombreUsuario = resultado.getString("nombre_y_apellido");
            traerCentroVerde(id_centroverde);
            traerMetodos(id_centroverde);
            crearConexion();
           } else{
               return false;
           }
           return true;
        } catch (Exception e) {
            //throw new NullPointerException ("No conecto por error: " + e);
            System.out.println("No conecto por error: " + e);
            return false;
        }
        finally{
           cerrarConexion();
        }
    }
    
    private void crearConexion(){
        try {
            String sql = "INSERT INTO ingreso_usuario(id_usuario) VALUES("+this.id_user+")";
            conectador.prepareStatement(sql).executeUpdate();
        } catch (Exception e) {
            System.out.println("[INICIAR - LOGS]: Error en crearconexion: " + e);
        }
    }
    
    private void traerCentroVerde(int n){
        try {
            String sql = "SELECT cv.nombre_centroverde, coop.nombre_cooperativa, coop.id_cooperativa"
                + " FROM cooperativas coop, centro_verde cv"
                + " WHERE cv.id_centroverde = "+n+" and coop.id_cooperativa = cv.id_cooperativa";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            if(resultado.next()){
                centroverde = resultado.getString("cv.nombre_centroverde");
                cooperativa = resultado.getString("coop.nombre_cooperativa");
                id_coop = resultado.getInt("coop.id_cooperativa");
            }
        } catch (Exception e) {
            System.out.println("No conecto por el siguiente error: " + e);
        }
    }
    
    public void traerMetodos(int idcv){
        try {
            String sql = "SELECT DISTINCT C.imagen, C.imagendos, C.nombre, C.abreviatura, C.id_canal "
                + "FROM canales C, canal_centroverde M "
                + "WHERE M.id_centroverde = "+idcv+"  and C.id_canal = M.id_canal"
                + " order by C.id_canal ASC";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            System.out.println("[TRAERMETODOS]");
            System.out.println(idcv);
            while(resultado.next()){
                
                imgCanales.add(resultado.getString("C.imagen"));
                imgCanalesDos.add(resultado.getString("C.imagendos"));
                nombreCanal.add(resultado.getString("C.nombre"));
                idCanal.add(resultado.getString("C.id_canal"));
                abreviaturaCanal.add(resultado.getString("C.abreviatura"));
            }
            System.out.println(imgCanales);
            System.out.println(imgCanalesDos);
        } catch (Exception e) {
            System.out.println(e);
        }
              
    }
}
