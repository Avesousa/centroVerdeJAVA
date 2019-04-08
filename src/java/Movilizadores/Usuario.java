/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Movilizadores;

public class Usuario {
    
    private String nombre_usuario;
    private String nombre_centroverde;
    private String nombre_coop;
    private String user_usuario;
    private int id_centroverde;
    private int peso_usuario;

    public Usuario(String nombre_usuario, String nombre_centroverde, 
            String nombre_coop, String user_usuario, int id_centroverde, 
            int peso_usuario) {
        this.nombre_usuario = nombre_usuario;
        this.nombre_centroverde = nombre_centroverde;
        this.nombre_coop = nombre_coop;
        this.user_usuario = user_usuario;
        this.id_centroverde = id_centroverde;
        this.peso_usuario = peso_usuario;
    }
    
    public Usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getNombre_centroverde() {
        return nombre_centroverde;
    }

    public void setNombre_centroverde(String nombre_centroverde) {
        this.nombre_centroverde = nombre_centroverde;
    }

    public String getNombre_coop() {
        return nombre_coop;
    }

    public void setNombre_coop(String nombre_coop) {
        this.nombre_coop = nombre_coop;
    }

    public String getUser_usuario() {
        return user_usuario;
    }

    public void setUser_usuario(String user_usuario) {
        this.user_usuario = user_usuario;
    }

    public int getId_centroverde() {
        return id_centroverde;
    }

    public void setId_centroverde(int id_centroverde) {
        this.id_centroverde = id_centroverde;
    }

    public int getPeso_usuario() {
        return peso_usuario;
    }

    public void setPeso_usuario(int peso_usuario) {
        this.peso_usuario = peso_usuario;
    }
    
    
    
}
