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
    public List materiales = new ArrayList();
    public List formatos = new ArrayList();
    public int peso;
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
            "WHERE CV.id_centroverde = "+idCv+" and CV.id_canal = "+idCanal +
            " and M.id_metodo = CV.id_metodo and M.tipo_metodo = '"+tipo + "'";
            System.out.println(sql);
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                nombreDelSegundoMetodo = resultado.getString("M.nombre_metodo");
                System.out.println("[TRAERMETODOS DOS]: " + nombreDelSegundoMetodo);
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos de dos: " + e);
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
    
    public void traerMaterial(int idCv){
        try {
            String sql = "SELECT * " +
            "FROM materialformato " +
            "WHERE id_cv = "+idCv+ " and peso <> 0"+
            " order by material ASC";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                materiales.add(resultado.getString("material"));
                System.out.println(materiales);
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos: " + e);
        }
    }
    
    public void traerFormato(String material,int idCv){
        try {
            String sql = "SELECT * " +
            "FROM materialformato " +
            "WHERE material = "+ material +" id_cv = "+idCv+ " and peso <> 0"+
            " order by formato ASC";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                formatos.add(resultado.getString("formato"));
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos: " + e);
        }
    }
    
    public void traerPeso(String material, String formato, int idCv){
        try {
            String sql = "SELECT * FROM materialformato WHERE"+
                        "id_cv = "+idCv+" and material = " + material + " and formato = " + formato;
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            if(resultado.next()){
                this.peso = resultado.getInt("peso");
            }
        } catch (Exception e) {
            System.out.println("Error en traer metodos: " + e);
        }
    }
}
