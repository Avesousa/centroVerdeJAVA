class Metodo {
    constructor() {
        this.nombre = "Metodo creado";
        this.envioDirecto = false;
        //consultaOpcionesSelect(idcv, "#etapa",'e');
        //consultaOpcionesSelect(idcanal, "#material",'m');
    }

    datos() {
        this.etapa = $('#etapa').val();
        this.etapaVisual = $('#'+this.etapa).html();
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
    
    enviar(){
        comentar("¿Deseas realizar un comentario?", true);
    }
}
class CargaConBolsonesEtapa extends Metodo {

    mostrarPantallaDeMetodo() {
        armarEtapa();
        $('#botonEnviar,#botonCargar').css("display","inline-block");
        $('#etapaDiv,#mostradorCantidad,#mostradorPeso').css("display","block");
        $('#idBolson').slideToggle(50);
        $('#pesoBolson').slideToggle(50);
        $('#tablaResumen').css("display","table");
        mostrarTabla("PROCEDENCIA", "BOLSÓN", "ASOCIADO");
        $('.contador').css("width","46%");
    }

    cargar() {
        this.datos();
        $("#idBolson").focus();
        return new Bolson(this.idBolson, parseFloat(this.pesoBolson),
            this.etapa, "Mixto", this.idRecuperador, this.nombre,this.etapaVisual);
    }

    verificadorCargar(){
        $("#botonCargar").prop("disabled",!(
        validarPesoBolson($("#pesoBolson").val()) 
        && ($("#idRecuperador").val() != "")
        && ($("#etapa").val() != "sin")));
        console.log("VERIFICADORDECARGAR: " + (
        validarPesoBolson($("#pesoBolson").val()) 
        && ($("#idRecuperador").val() != "")));
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
    
    enviar(){
        swal("Bolsones vacios en el camión:",{
        content: "input",
        })
        .then((value) =>{
            if(!isNaN(value)){
                camion.bolsonesVacios = parseInt(value);
                super.enviar();
            }else {
                camion.ultimoCanal.metodo.enviar();
            }
        });
    }

}
class EntradaSalida extends Metodo {

    constructor() {
        super();
        this.envioDirecto = true;
    }

    cargar() {
        this.datos();
        $("#pesoEntrada").focus();
        return new PesoTotalEntradaSalida(parseFloat(this.pesoEntrada), parseFloat(this.pesoSalida));
    }

    verificadorCargar(){
        $("#botonEntradaSalida").prop("disabled",!(
            $("#pesoSalida").val() != "" 
            && $("#pesoEntrada").val() != "" 
            && patenteVerificador($("#patente").val())
            && parseInt($("#pesoSalida").val()) < parseInt($("#pesoEntrada").val())));
        sumaDePesos();
    }

    mostrarPantallaDeMetodo() {
        $('#pesoSalida').slideToggle(50);
        $('#botonCargar').css("display","none");
        $('#pesoEntrada').slideToggle(50);
        $('#botonEntradaSalida, #mostradorPeso').css("display","inline-block");
        $('.contador').css("width","90%");
        //consultar();
    }


}
class EntradaSalidaE extends EntradaSalida{
    cargar(){
        this.datos();
        $("#pesoSalida").focus();
        return new PesoTotalEntradaSalida(parseFloat(this.pesoSalida),parseFloat(this.pesoEntrada));
    }
    
    verificadorCargar(){
        $("#botonEntradaSalida").prop("disabled",!(
            $("#pesoSalida").val() != "" 
            && $("#pesoEntrada").val() != "" 
            && patenteVerificador($("#patente").val())
            && parseInt($("#pesoSalida").val()) > parseInt($("#pesoEntrada").val())));
        sumaDePesos();
    }

}
class CantidadPesoE extends Metodo{

   cargar() {
     this.datos();
     $("#cantidad").focus();
     return new CaracteristicaMaterial(this.cantidad,this.material,this.caracteristica);

   }
   
   mostrarPantallaDeMetodo() {
       armarMaterial();
       $('#botonEnviar,#botonCargar').css("display","inline-block");
       $('#materialDiv,#caracteristicaDiv').css("display","flex");
       $("#mostradorPeso").css("display","block");
       $('#cantidad,#pesoUnitario').slideToggle(50);
       $('#pesoUnitario').prop("disabled","true");
       $('#tablaResumen').css("display","table");
        mostrarTabla("FORMATO", "MATERIAL", "CANTIDAD");
       $('.contador').css("width","90%");
    }
    
    verificadorCargar(){
       this.datos();
       $("#pesoUnitario").val((parseInt(retornarPeso(this.material,this.caracteristica,this.cantidad))));
       $("#botonCargar").prop("disabled",$("#cantidad").val() == "");
    }



}
class DescartePatente extends Metodo{
    mostrarPantallaDeMetodo(){
        $('#botonCargar').css("display","none");
        $('#botonEnviar').css("display","inline-block");
    }
    verificadorCargar(){
        $("#botonEnviar").prop("disabled",!(
            patenteVerificador($("#patente").val())));
    }
}
class SalidaBolsonVacios extends Metodo{
    mostrarPantallaDeMetodo() {
        armarEtapa();
        $('#botonEnviar,#botonCargar').css("display","inline-block");
        $('#etapaDiv,#mostradorCantidad').css("display","block");
        $('#cantidad').slideToggle(50);
        $('#tablaResumen').css("display","table");
        mostrarTabla("PROCEDENCIA", "REFERENCIA", "INGRESO/EGRESO","CANTIDAD");
        $('.contador').css("width","90%");
    }
    
    verificadorCargar(){
        $("#botonCargar").prop("disabled",!
            (($("#cantidad").val() != "")&&
            ($("#etapa").val() != "sin")));
    }
    
    cargar() {
        this.datos();
        $("#cantidad").focus();
        return new BolsonesVacios(parseInt(this.cantidad),this.etapa);
    }
}

class OtrasCargas extends Metodo{
    mostrarPantallaDeMetodo(){
        $('#botonCargar').css("display","none");
        $('#botonEnviar').css("display","inline-block");
    }
    
    cargaDato(){
        camion.comentarios = $("#comentario").val();
        $("#comentario").prop("disabled","true");
    }
    
    verificadorCargar(){
        $("#botonEnviar").prop("disabled",!
        (($("#comentario").val() != "")&&
         patenteVerificador($("#patente").val())));
    }
}