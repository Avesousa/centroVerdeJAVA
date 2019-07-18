package Conectadores;

import Movilizadores.Elemento;
import Movilizadores.ElementoConsultado;
import Movilizadores.InformacionMixta;
import com.google.gson.Gson;

public class Consultas extends Conexion {
    private Elemento ele = new Elemento();
    private String sql;
    public String elementos;
    public void consultarBolson(int coop){
        System.out.println("La cooperativa a evaluar es: ");
        System.out.println(coop);
        try {
            sql = "SELECT I.id_ingreso, Ca.patente, B.id_bolson, B.id_asociado, R.asociado, B.peso,"+
            " Can.abreviatura, I.fecha, U.usuario_usuario, CV.nombre_centroverde, B.etapa"+
            " FROM bolsones B, recuperadores R,"+
            " usuarios U, historico_ingresos_usuario HU,"+
            " ingresos_centros_verdes I, ingreso_camiones Ca,"+
            " canales Can, centro_verde CV"+
            " WHERE HU.id_ingreso = B.id_ingreso and B.id_asociado = R.id_recuperador"+
            " and I.id_ingreso = HU.id_ingreso and HU.id_usuario = U.id_usuario"+
            " and Ca.id_ingreso = I.id_ingreso and B.id_canal = Can.id_canal"+
            " and CV.id_cooperativa = " + coop +
            " and I.id_cv = CV.id_centroverde" +
            " order by fecha DESC;";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                ElementoConsultado bolson = new ElementoConsultado(
                        resultado.getInt("I.id_ingreso"),
                        resultado.getString("Ca.patente"),
                        resultado.getInt("B.id_bolson"),
                        resultado.getString("B.id_asociado"),
                        resultado.getString("R.asociado"),
                        resultado.getFloat("B.peso"),
                        resultado.getString("Can.abreviatura"),
                        resultado.getDate("I.fecha"),
                        resultado.getString("U.usuario_usuario"),
                        resultado.getString("CV.nombre_centroverde"),
                        resultado.getString("B.etapa")
                );
                ele.addElemento(bolson);
            }
            hacerGson();
        } catch (Exception e) {
            System.out.println("[CONSULTARBOLSON]: " + e);
        }
       
    }
    
    public void consultarMaterial(int coop){
        System.out.println("La cooperativa a evaluar es: ");
        System.out.println(coop);
        try {
            sql = " SELECT I.id_ingreso, Ca.patente, M.id_material_ingreso, "+
            " M.formato, M.material, M.peso_total, CV.nombre_centroverde, "+
            " Can.abreviatura, I.fecha, U.usuario_usuario"+
            " FROM material_ingreso M,"+
            " usuarios U, historico_ingresos_usuario HU, "+
            " ingresos_centros_verdes I, ingreso_camiones Ca,"+
            " canales Can, centro_verde CV, canales_asociados CaA"+
            " WHERE HU.id_ingreso = M.id_ingreso and I.id_ingreso = HU.id_ingreso and HU.id_usuario = U.id_usuario "+
            " and Ca.id_ingreso = I.id_ingreso and CaA.id_ingreso = I.id_ingreso"+
            " and Can.id_canal = CaA.id_canal and I.id_cv = CV.id_centroverde"+
            " and CV.id_cooperativa = " + coop +
            " order by fecha DESC";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                ElementoConsultado material = new ElementoConsultado(
                        resultado.getInt("I.id_ingreso"),
                        resultado.getString("Ca.patente"),
                        resultado.getInt("M.id_material_ingreso"),
                        resultado.getString("M.formato"),
                        resultado.getString("M.material"),
                        resultado.getFloat("M.peso_total"),
                        resultado.getString("Can.abreviatura"),
                        resultado.getDate("I.fecha"),
                        resultado.getString("U.usuario_usuario"),
                        resultado.getString("CV.nombre_centroverde"),
                        resultado.getString("CV.nombre_centroverde")
                );
                ele.addElemento(material);
            }
            hacerGson();
        } catch (Exception e) {
            System.out.println("[CONSULTARBOLSON]: " + e);
        }
       
    }
    
    public void consultarCamion(int coop){
        System.out.println("La cooperativa a evaluar es: ");
        System.out.println(coop);
        try {
            sql = " SELECT I.id_ingreso, I.fecha, Ca.patente, Can.nombre, "+
            " CV.nombre_centroverde, P.peso_total, U.usuario_usuario"+
            " FROM canales_asociados P,"+
            " usuarios U, historico_ingresos_usuario HU, "+
            " ingresos_centros_verdes I, ingreso_camiones Ca,"+
            " canales Can, centro_verde CV"+
            " WHERE HU.id_ingreso = P.id_ingreso and I.id_ingreso = HU.id_ingreso and HU.id_usuario = U.id_usuario "+
            " and Ca.id_ingreso = I.id_ingreso and P.id_ingreso = I.id_ingreso"+
            " and Can.id_canal = P.id_canal and CV.id_cooperativa = "+ coop +" and I.id_cv = CV.id_centroverde"+
            " order by fecha DESC"; 
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                ElementoConsultado material = new ElementoConsultado(
                        resultado.getInt("I.id_ingreso"),
                        resultado.getString("Ca.patente"),
                        resultado.getFloat("P.peso_total"),
                        resultado.getString("Can.nombre"),
                        resultado.getDate("I.fecha"),
                        resultado.getString("U.usuario_usuario"),
                        resultado.getString("CV.nombre_centroverde")
                );
                ele.addElemento(material);
            }
            hacerGson();
        } catch (Exception e) {
            System.out.println("[CONSULTARBOLSON]: " + e);
        }
       
    }
    
    public void verificadorMixto(int cv){
        try {
            sql = "SELECT id_canal_uno, id_canal_dos FROM validacionmixto " +
                  "WHERE id_centroverde = " + cv;
            System.out.println("[verificadorMixto]");
            System.out.println(sql);
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            while(resultado.next()){
                InformacionMixta info = new InformacionMixta(
                        resultado.getInt("id_canal_uno"),
                        resultado.getInt("id_canal_dos")
                );
                ele.addElemento(info);
            }
            hacerGson();
            
        } catch (Exception e) {
            System.out.println("[VERIFICADORMIXTO]: " + e);
        }
    }
    
    public void hacerGson(){
        Gson objeto = new Gson();
        elementos = objeto.toJson(this.ele);
        System.out.println(elementos);
    }
}
