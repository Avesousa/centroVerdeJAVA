class Metodo {
    constructor() {
        this.nombre = "Metodo creado";
        armarEtapa();
        limpiarZona();
        this.envioDirecto = false;
        //consultaOpcionesSelect(idcv, "#etapa",'e');
        //consultaOpcionesSelect(idcanal, "#material",'m');
    }

    datos() {
        this.etapa = $('#etapa').val();
        this.etapaVisual = $('#'+this.etapa).html();
        this.subetapa = $('#subetapa').val();
        this.material = $('#material').val();
        this.caracteristica = $('#caracteristica').val();
        this.nombre = $('#nombre').val();
        this.idRecuperador = $('#idRecuperador').val();
        this.idBolson = $('#idBolson').val();
        this.pesoBolson = $('#pesoBolson').val();
        this.pesoEntrada = $('#pesoEntrada').val();
        this.cantidad = $('#cantidad').val();
        this.pesoSalida = $('#pesoSalida').val();
        this.pesoUnitario = $('#pesoUnitario').val();

    }
}

class CargaConBolsonesEtapa extends Metodo {

    mostrarPantallaDeMetodo() {
        $('#idBolson,#pesoBolson,#botonEnviar,#botonCargar').css("display","inline-block");
        $('#etapaDiv').css("display","block");
        
//        $('#etapaDiv').slideToggle(50);
//        $('#idBolson').slideToggle(50);
//        $('#pesoBolson').slideToggle(50);
//        $('#botonEnviar').slideToggle(50);
//        $('#botonCargar').slideToggle(50);
    }

    cargar() {
        this.datos();
        return new Bolson(this.idBolson, parseFloat(this.pesoBolson),
            this.etapa, this.subetapa, "Mixto", this.idRecuperador, this.nombre,this.etapaVisual);
    }

    verificadorCargar(){
        $("#botonCargar").attr("disabled",
        (validarPesoBolson($("#pesoBolson").val())&& $("#idBolson").val() != ""));
    }
    
    buscadorId(){
        if($("#idBolson").val() != ""){
        $.post("buscadorId",{
            id:$("#idBolson").val(),
            etapa:$("#etapa").val()
        },function(res){
            var recuperador = JSON.parse(res);
            $("#nombreRecuperador").html(recuperador.nombre);
            $("#nombre").val(recuperador.nombre)
            $("#idRecuperador").val(recuperador.id); //DEBE SER TOMADO POR EL OBJETO BOLSON EN EL CONVERSOR
        }); 
        }else{
             $("#nombreRecuperador").html("");
        }
        
    }

}

class EntradaSalida extends Metodo {

    constructor() {
        super();
        this.envioDirecto = true;
    }

    cargar() {
        this.datos();
        return new PesoTotalEntradaSalida(this.pesoEntrada, this.pesoSalida);
    }

    verificadorCargar(){
        $("#botonEntradaSalida").attr("disabled",
            $("#pesoSalida").val() != "" 
            && $("#pesoEntrada").val() != "" 
            && verificarPatente($("#patente").val())
            && parseInt($("#pesoSalida").val()) > parseInt($("#pesoEntrada").val()));
    }

    mostrarPantallaDeMetodo() {
        $('#pesoSalida').slideToggle(50);
        $('#botonCargar').css("display","none");
        $('#pesoEntrada').slideToggle(50);
        $('#botonEntradaSalida').css("display","block");
        //consultar();
    }


}

class CantidadPesoE{

   cargar() {
     this.datos();
     return new CaracteristicaMaterial(this.cantidad,this.material,this.caracteristica);

   }



}

/*module.exports = {
    Metodo: Metodo
};
*/

