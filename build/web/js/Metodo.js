class Metodo {
    constructor(metodo) {
        this.envioDirecto = false;
        this.elemento;
        //consultaOpcionesSelect(idcv, "#etapa",'e');
        //consultaOpcionesSelect(idcanal, "#material",'m');
    }
    finalizar(){
        console.log("Ha finalizado la carga");
    }
    datos() {
        this.etapa = $('#etapa').val();
        this.etapaVisual = $('#'+this.etapa).html();
        this.material = $('#material').val();
        this.caracteristica = $('#caracteristica').val();
        this.nombre = $('#nombre').val();
        this.idRecuperador = $('#idRecuperador').val();
        this.idBolson = $('#idBolson').val();
        this.idPuntoVerde = $('#idPuntoVerde').val();
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
class cargaConBolson extends Metodo{
    mostrarPantallaDeMetodo() {
        $('#botonEnviar, #botonSacar,#botonCargar').css("display","inline-block");
        $('#mostradorCantidad,#mostradorPeso').css("display","block");
        $('#pesoBolson').slideToggle(50);
        $('#tablaResumen').css("display","table");
        $('.contador').css("width","46%");
    }
    cargar() {
        this.datos();
        $("#idBolson").focus();
        this.elemento = new Bolson(this.idBolson, parseFloat(this.pesoBolson),
            this.etapa, "Mixto", this.idRecuperador, this.nombre,this.etapaVisual);
    }
    verificadorCargar(){
        $("#botonCargar").prop("disabled",!(
        validarPesoBolson($("#pesoBolson").val()) 
        && ($("#idRecuperador").val() != "")
        && ($("#etapa").val() != "sin")));
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
    buscadorId(){
        if($('#idCanal').val() == 3) var idR = parseInt($("#idPuntoVerde").val());
        else var idR = $("#idBolson").val();
        console.log(idR);
        var etapa = $("#etapa").val();
        console.log(etapa);
        if(idR != ""){
        $.post("buscadorId",{
            id: idR,
            etapa: etapa, //$("#etapa").val(),
            medio:$("#idCanal").val()
        },function(res){
            var recuperador = JSON.parse(res);
            $("#nombreRecuperador").html(recuperador.nombre);
            $("#nombre").val(recuperador.nombre)
            console.log(recuperador.id);
            console.log(recuperador);
            $("#idRecuperador").val(recuperador.id); //DEBE SER TOMADO POR EL OBJETO BOLSON EN EL CONVERSOR
        }); 
        }else{
             $("#nombreRecuperador").html("");
        }
        
    }
}
class CargaConBolsonesEtapa extends cargaConBolson {

    mostrarPantallaDeMetodo() {
        super.mostrarPantallaDeMetodo();
        $('#idBolson').slideToggle(50);
        armarEtapa();
        $('#etapaDiv').css("display","block");
        mostrarTabla("PROCEDENCIA", "BOLSÓN", "ASOCIADO");
    }
}
class CargaConBolsonesPV extends cargaConBolson {

    mostrarPantallaDeMetodo() {
        super.mostrarPantallaDeMetodo();
        $('#idPuntoVerde').slideToggle(50);
        armarEtapa(true);
        mostrarTabla("PROCEDENCIA", "ID PUNTO VERDE", "PUNTO VERDE");
        $('#UNICA').val("PV");
        $('#UNICA').html("PV");
        $('#UNICA').attr("id","PV");
    }
    
    cargar(){
        $('#idBolson').val($('#idPuntoVerde').val());
        super.cargar();
        $("#idPuntoVerde").focus();
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
        this.elemento =  new PesoTotalEntradaSalida(parseFloat(this.pesoEntrada), parseFloat(this.pesoSalida));
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
        this.elemento = new PesoTotalEntradaSalida(parseFloat(this.pesoSalida),parseFloat(this.pesoEntrada));
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
class EntradaSalidaMaterialE extends EntradaSalidaE{
    constructor(){
        super();
        this.envioDirecto = false;
    }
    
    mostrarPantallaDeMetodo(){
        super.mostrarPantallaDeMetodo();
        armarMaterial();
        $('#botonEntradaSalida').css("display","none");
        $('#botonEnviar, #botonSacar,#botonCargar').css("display","inline-block");
        $('#materialDiv,#caracteristicaDiv').css("display","flex");
        $('#cantidad').slideToggle(50);
        $('#tablaResumen').css("display","table");
        mostrarTabla("FORMATO", "MATERIAL", "CANTIDAD");
    }
    
    verificadorCargar(){
       $("#botonCargar").prop("disabled",!(
            $("#pesoSalida").val() != "" 
            && $("#pesoEntrada").val() != "" 
            && parseInt($("#pesoSalida").val()) > parseInt($("#pesoEntrada").val())));
       this.datos();
    }
    
    cargar() {
     if($('#cantidad').val() == "")
        $('#cantidad').val(0);
     this.datos();
     this.elemento = new CaracteristicaMaterial(this.cantidad,this.material,this.caracteristica,sumaDePesos(),this.pesoSalida);
    }
    
    finalizar(){
        $("#pesoEntrada").val(
        camion.ultimoCanal.elementosCargados[camion.ultimoCanal.elementosCargados.length-1].pesoSalida);
        $("#pesoSalida").focus();
    }
}
class CantidadPesoE extends Metodo{
   cargar() {
     this.datos();
     $("#cantidad").focus();
     this.elemento = new CaracteristicaMaterial(this.cantidad,this.material,this.caracteristica);
   }
   
   mostrarPantallaDeMetodo() {
       armarMaterial();
       $('#botonEnviar, #botonSacar,#botonCargar').css("display","inline-block");
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
        $('#botonEnviar, #botonSacar,#botonCargar').css("display","inline-block");
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
        this.elemento = new BolsonesVacios(parseInt(this.cantidad),this.etapa);
    }
}
class OtrasCargas extends Metodo{
    mostrarPantallaDeMetodo(){
        $('#botonCargar').css("display","none");
        $('#botonEnviar, #comentario').css("display","inline-block");
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
class EntradaSalidaEtapa extends EntradaSalida{
    
    mostrarPantallaDeMetodo() {
        $('#pesoSalida').slideToggle(50);
        $('#botonCargar').css("display","none");
        $('#pesoEntrada').slideToggle(50);
        armarEtapa();
        $('#etapaDiv').css("display","block");
        $('#botonEntradaSalida, #mostradorPeso').css("display","inline-block");
        $('.contador').css("width","90%");
    }
    
    cargar(){
        this.datos();
        $("#pesoSalida").focus();
        this.elemento = new Bolson(0, (parseFloat(this.pesoEntrada) - parseFloat(this.pesoSalida)),
        this.etapa, "Mixto", 0, "NO CONTIENE",this.etapaVisual, true);
    }
    
    verificadorCargar(){
        $("#botonEntradaSalida").prop("disabled",!(
            $("#pesoSalida").val() != "" 
            && $("#pesoEntrada").val() != "" 
            && patenteVerificador($("#patente").val())
            && ($("#etapa").val() != "sin")
            && parseInt($("#pesoSalida").val()) < parseInt($("#pesoEntrada").val())));
        sumaDePesos();
    }
    
}