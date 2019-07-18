package Movilizadores;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ElementoConsultado {
    public int id_ingreso;
    public String patente;
    public int id_bolson;
    public int id_material;
    public String id_asociado;
    public String asociado;
    public String formato;
    public String material;
    public float peso;
    public String canal;
    public Date fecha;
    public String usuario;
    public String centroverde;
    public String etapa;
    
    //Elemento consultado de Material y Bolsones:
    public ElementoConsultado(int ingreso, String _patente, int _idelemento, 
            String _idAsoOformato,String _asociadoMaterial, float _peso, String _canal, 
            Date _fecha,String _usuario,String _cv, String _etapa){
        id_ingreso = ingreso;
        patente = _patente;
        id_bolson = _idelemento;
        id_material = _idelemento;
        id_asociado = _idAsoOformato;
        asociado = _asociadoMaterial;
        formato = _idAsoOformato;
        material = _asociadoMaterial;
        peso = _peso;
        canal = _canal;  
        fecha = _fecha;
        usuario = _usuario;  
        centroverde = _cv;
        etapa = _etapa;
    }
    
    public ElementoConsultado(int ingreso, String _patente,float _peso, String _canal, 
            Date _fecha,String _usuario,String _cv){
        id_ingreso = ingreso;
        patente = _patente;
        peso = _peso;
        canal = _canal;  
        fecha = _fecha;
        usuario = _usuario;  
        centroverde = _cv;
    }
    
}
