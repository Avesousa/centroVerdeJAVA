package Movilizadores;

import java.util.ArrayList;
import java.util.List;

public class datosBolson {
    public int id_ingreso;
    public int id_bolson;
    public String id_asociado;
    public String asociado;
    public float peso;
    public int id_canal;
    
    public datosBolson(int ingreso, int bolson, String idasociado,
            String _asociado, float _peso, int canal){
        id_ingreso = ingreso;
        id_bolson = bolson;
        id_asociado = idasociado;
        asociado = _asociado;
        peso = _peso;
        id_canal = canal;     
    }
}
