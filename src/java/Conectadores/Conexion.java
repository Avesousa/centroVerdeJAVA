package Conectadores;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Conexion {
    private static final String HOST = "172.27.204.57";
    private static final String PORT = "3306";
    private static final String USERNAME = "dgrecuser";
    private static final String PASSWORD = "123456789dgrec";
    private static final String DATABASE = "centroverde";
    private static final String URL = "jdbc:mysql://"+HOST+":"+PORT+"/"+DATABASE;
    public Connection conectador = null;
    public ResultSet resultado = null;
    public String nombreApellido;
    public String usuario; 
    public int id_usuario;
    public int id_cliente;
    public int cargo;
    public PreparedStatement ps = null;
    public Conexion() {
        this.conectador = establecerConexion();
    }
    
    public static Connection establecerConexion(){
       Connection conexion = null;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
        } catch(Exception e){
            System.out.println("No conectó: " + e);
        }
        return conexion;
    }
    
    public void cerrarConexion(){
        try {
           if(ps != null)ps.close();
           if(resultado != null)ps.close();
           if(conectador != null)conectador.close();
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        
    }
}
