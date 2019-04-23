
package Conectadores;

import javax.swing.JOptionPane;

public class Probar extends Conexion{

    public Probar(String valor) {
        try {
            String sql = "INSERT INTO prueba (valor) "
                    + "VALUES ('"+valor+"')";
            ps = conectador.prepareStatement(sql);
            ps.executeUpdate();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null,"Ha ocurrido un error " + e);
            
        }
    }
    
    
    
}
