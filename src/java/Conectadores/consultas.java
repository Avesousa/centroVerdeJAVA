package Conectadores;

import Movilizadores.datosBolson;
import java.util.ArrayList;
import java.util.List;

public class consultas extends Conexion {
    public List elementos = new ArrayList();
    public void consultarBolson(int user){
        try {
            String sql = "SELECT B.id_ingreso, B.id_bolson, B.id_asociado,"+
                    " R.asociado, B.peso, B.id_canal" +
                    " FROM centroverdenueva.bolsones B, centroverdenueva.recuperadores R,"+
                    " centroverdenueva.historico_ingresos_usuario U" +
                    " WHERE U.id_ingreso = B.id_ingreso and B.id_asociado = R.id_recuperador and"+
                    " U.id_usuario = 1 ";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                datosBolson bolson = new datosBolson(
                        resultado.getInt("B.id_ingreso"),
                        resultado.getInt("B.id_bolson"),
                        resultado.getString("B.id_asociado"),
                        resultado.getString("R.asociado"),
                        resultado.getFloat("B.peso"),
                        resultado.getInt("B.id_canal")
                );
                elementos.add(bolson);
            }
        } catch (Exception e) {
            System.out.println("[CONSULTARBOLSON]: " + e);
        } finally{
           
        }
       
    }
}
