/*Permite instanciar un nuevo camión al cual se le puede settear la patente y distintos canales de recolección que pueden tener bolsones asociados o no*/

class Camion {
    /*Constructor, permite instanciar setteando la patente*/
    /*const camion = new Camion("ABC123")*/

    constructor() {
        console.log("*********HA CREADO UN NUEVO CAMION************");
        this.canales = [];
        this.bolsonesVacios = 0;
    }
    
    nuevoCanal(_nombre,_metodo) {
        this.ultimoCanal = new Canal(_nombre);
        this.ultimoCanal.comenzarMetodo(_metodo);
        this.canales.push(this.ultimoCanal);
    }

    cargarDatos(){
        //Elimine hora, para que pueda recibirlo de mejor manera en JAVA
        this.patente = $('#patente').val();
        if($('#fecha').val() == "in"){
            this.fechaHora = new Date().toString();
        }else{
            this.fechaHora = new Date($('#fecha').val() + " " + $('#hora').val());
        }
    }
    /*Este método devuelve el peso total de todos los canales asociados al camión*/
   pesoTotal(){
        return this.canales.map(canal => canal.obtenerPesoTotal()).reduce((valor1,valor2)=> valor1+valor2);
    }
}

/*module.exports = {
    Camion: Camion
};*/