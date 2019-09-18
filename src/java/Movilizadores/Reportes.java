package Movilizadores;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.List;

public class Reportes {
    
    /*DATOS GENERALES*/
    private String cv;
    private String coop;
    private String id;
    private String fecha;
    private String hora;
    private String patente;
    private String peso;
    private String usuario;
    private String fechaCarga;
    
    /*DATOS PARA EL CAMIÓN*/
    private String canal;
    private String formato;
    private String material;
    
    /*DATOS PARA EL BOLSÓN*/
    private String filaBolson;
    private String idAsociado;
    private String asociado;
    private String idBolson;
    private String etapaCarga;
    private String pesoPorciento;
    private String monto;
    private String etapa;
    private int metodo;
    public List lista = new ArrayList();
    
    
    private DecimalFormat numero = new DecimalFormat("#.00");
    

    public Reportes(String cv, String coop, String id, String filaBolson, String idAsociado, String asociado, String idBolson, String fecha, String hora, String etapaCarga, String patente, double peso, double pesoPorciento, double monto, String usuario, String fechaCarga, String etapa, int metodo) {
        this.cv = cv;
        this.coop = coop;
        this.id = id;
        this.filaBolson = filaBolson;
        this.idAsociado = idAsociado;
        this.asociado = asociado;
        this.idBolson = idBolson;
        this.fecha = fecha;
        this.hora = hora;
        this.etapaCarga = etapaCarga;
        this.patente = patente;
        this.peso = numero.format(peso);
        this.pesoPorciento = numero.format(pesoPorciento);
        this.monto = numero.format(monto);
        this.usuario = usuario;
        this.fechaCarga = fechaCarga;
        this.etapa = etapa;
        this.metodo = metodo;
        crearListaBolson();
    }

    public Reportes(String cv, String coop, String id, String fecha, String hora, String patente,  String canal,String formato, String material, double peso, String usuario, String fechaCarga) {
        this.cv = cv;
        this.coop = coop;
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.patente = patente;
        this.peso = numero.format(peso);
        this.usuario = usuario;
        this.fechaCarga = fechaCarga;
        this.canal = canal;
        this.formato = formato;
        this.material = material;
        crearListaCamion();
    }
    
    //CABECERA CAMIÓN
    public Reportes(String camion){
        lista.add("Centro Verde");
        lista.add("Cooperativa");
        lista.add("ID");
        lista.add("Fecha");
        lista.add("Hora");
        lista.add("Patente");
        lista.add("Medio de Captación");
        lista.add("Formato");
        lista.add("Material");
        lista.add("Peso");
        lista.add("Usuario");
        lista.add("Fecha de Carga");
    }
    
    public Reportes(){
        lista.add("Centro Verde");
        lista.add("Cooperativa");
        lista.add("ID Ingreso");
        lista.add("ID PK  Bolsón ");
        lista.add("ID Asociado");
        lista.add("Asociado");
        lista.add("ID Bolsón Cargado");
        lista.add("Fecha");
        lista.add("Hora");
        lista.add("Etapa Cargada");
        lista.add("Patente");
        lista.add("Peso");
        lista.add("-10% -2KG");
        lista.add("Monto");
        lista.add("Usuario de carga");
        lista.add("Fecha de Carga");
        lista.add("Etapa Asociada");
        lista.add("Metodo");
    }
    
    
    private void crearListaCamion(){
        lista.add(cv);
        lista.add(coop);
        lista.add(id);
        lista.add(fecha);
        lista.add(hora);
        lista.add(patente);
        lista.add(canal);
        lista.add(formato);
        lista.add(material);
        lista.add(peso);
        lista.add(usuario);
        lista.add(fechaCarga);
    }
    
    private void crearListaBolson(){
        lista.add(cv);
        lista.add(coop);
        lista.add(id);
        lista.add(filaBolson);
        lista.add(idAsociado);
        lista.add(asociado);
        lista.add(idBolson);
        lista.add(fecha);
        lista.add(hora);
        lista.add(etapaCarga);
        lista.add(patente);
        lista.add(peso);
        lista.add(pesoPorciento);
        lista.add(monto);
        lista.add(usuario);
        lista.add(fechaCarga);
        lista.add(etapa);
        lista.add(metodo);
    }

}
