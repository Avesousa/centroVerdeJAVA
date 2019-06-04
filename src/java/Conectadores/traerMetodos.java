package Conectadores;

import java.util.ArrayList;
import java.util.List;

public class traerMetodos extends Conexion {
    public int cantidadMetodos;
    public String nombreMetodo;
    public List nombresDeMetodos = new ArrayList();
    public List tipos = new ArrayList();
    public List etapas = new ArrayList();
    public List etapasValue = new ArrayList();
    public String nombreDelSegundoMetodo;
    
    public void traerLosMetodos(int idCv, int idCanal){
        try {
            String sql = "SELECT CV.cantidad_metodo, M.nombre_metodo, M.tipo_metodo " +
                    "FROM canal_centroverde CV, metodos M " +
                    "WHERE CV.id_centroverde = "+idCv+" and CV.id_canal = "+
                    idCanal+" and M.id_metodo = CV.id_metodo";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                cantidadMetodos = resultado.getInt("CV.cantidad_metodo");
                nombreMetodo = resultado.getString("M.nombre_metodo");
                nombresDeMetodos.add(resultado.getString("M.nombre_metodo"));
                tipos.add(resultado.getString("M.tipo_metodo"));
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos: " + e);
        }
    }
   
    public void traerMetodosDeDos(int idCv, int idCanal, String tipo){
        try {
            String sql = "SELECT M.nombre_metodo " +
            "FROM canal_centroverde CV, metodos M " +
            "WHERE CV.id_centroverde = "+idCv+" and CV.id_canal = "+idCanal+" and M.id_metodo = CV.id_metodo and M.tipo_metodo ="+tipo;
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                nombreDelSegundoMetodo = resultado.getString("M.nombre_metodo");
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos: " + e);
        }
    }
    
    public void traerEtapas(int idCoop){
        try {
            String sql = "SELECT etapa_visual, etapa  " +
            "FROM etapas " +
            "WHERE id_cooperativa = "+idCoop+
            " order by etapa ASC";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                etapas.add(resultado.getString("etapa_visual"));
                etapasValue.add(resultado.getString("etapa"));
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos: " + e);
        }
    }
    
}
