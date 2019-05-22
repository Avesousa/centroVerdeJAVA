
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
    public int id_centroverde = 0;
    public int id_coop = 0;
    public String centroverde;
    public String cooperativa;
    
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
            traerCentroVerde(id_centroverde);
            switch(cargo){
                case 1: 
                    traerMetodos(id_centroverde);
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
                + "WHERE M.id_centroverde = "+idcv+"  and C.id_canal = M.id_canal";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                imgCanales.add(resultado.getString("C.imagen"));
                imgCanalesDos.add(resultado.getString("C.imagendos"));
                nombreCanal.add(resultado.getString("C.nombre"));
                idCanal.add(resultado.getString("C.id_canal"));
                abreviaturaCanal.add(resultado.getString("C.abreviatura"));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
              
    }
}
