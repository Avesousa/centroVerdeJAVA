class Metodo {
    constructor(){
        this.nombre = "Metodo creado";
        armarEtapa();
        limpiarZona();
        //consultaOpcionesSelect(idcv, "#etapa",'e');
        //consultaOpcionesSelect(idcanal, "#material",'m');
    }
    datos(){
        this.etapa = $('#etapa').val();
        this.subetapa = $('#subetapa').val();
        this.material = $('#material').val();
        this.caracteristica = $('#caracteristica').val();
        this.nombre = $('#nombre').val();
        this.idRecuperador = $('#idRecuperador').val();
        this.idBolson = $('#idBolson').val();
        this.pesoEntrada = $('#pesoEntrada').val();
        this.cantidad = $('#cantidad').val();
        this.pesoSalida = $('#pesoSalida').val();
        this.pesoUnitario = $('#pesoUnitario').val();
        
    }
    
}

class CargaConBolsonesEtapa extends Metodo{

    mostrarPantallaDeMetodo() {
        $('#etapaDiv').slideToggle(50);
        $('#idBolson').slideToggle(50);
        $('#pesoEntrada').slideToggle(50);
        //consultar();
    }

    cargar() {
       this.datos();
       return new Bolson(this.idBolson, parseFloat(this.pesoEntrada),
       this.etapa, this.subetapa, "Mixto");
    }

    pesoTotal(elementosCargados) {
        return elementosCargados.map(elemento => elemento.obtenerPesoTotal()).reduce((elemento1, elemento2) => elemento1 + elemento2);
    }
}


/*module.exports = {
    Metodo: Metodo
};
*/

