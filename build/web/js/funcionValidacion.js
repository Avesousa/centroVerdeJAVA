function verificarPatente() {
    var patente = $("#patente").val();
    var banderaP = patenteVerificador(patente);
    if (!banderaP) {
        validador(false,"<p>¡Debes ingresar una patente válida, AB123CD ó ABC123</p>","#validadorPatente");
    }else{
        $("#validadorPatente").css("display","none");
    }
    $('#botonEnviar').prop("disabled",!banderaP);
    camion.ultimoCanal.metodo.verificadorCargar();
}


function patenteVerificador(patente){
    switch (patente.length) {
            case (6):
                var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)) && isNaN(patente.charAt(2))); //Primer parámetro (deben ser 3 letras).
                var dos = !isNaN((patente.charAt(3) + patente.charAt(4) + patente.charAt(5))); //Segundo Parámetro (deben ser 3 números).
                return (uno && dos);
            case (7):
                var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)));
                var dos = !isNaN((patente.charAt(2) + patente.charAt(3) + patente.charAt(4)));
                var tres = (isNaN(patente.charAt(5)) && isNaN(patente.charAt(6)));
                return (uno && dos && tres);
            default:
                return (patente == "SIN DATO");
        }
}

function validarDatosDeCamion() {

    /* sintaxis jQuery para habilitar el boton de id botonSeguir*/
    $("#botonSeguir").prop("disabled", ($("#patente").val() != "" && $("#fecha").val() != "" && $("#hora").val() != "00:00"));

}

function validadPeso(){
    
}


function validador(estado, texto, id) {
    $(id).html(texto);
    $(id).css("display","flex");
    if (estado) {
        $(id).css("background-color","#04B404");
    } 
    else {
        $(id).css("background-color","#FA5858");
    }
}

function validarPesoBolson(peso) {
    if(peso>300){validador(false,"El peso máximo por bolsón es 300 kg", "#validadorBolson");}
    else if(peso != ""){$("#validadorBolson").css("display","none")}
    console.log("VALIDADORDEPESOBOLSON: " + (peso<300 && peso != ""));
    return (peso<300 && peso != "");
}

function validarUsoMixto(pri,seg){
    var opcionUno = ((pri == 1 && seg == 3) || (seg == 1 && pri == 3));
    var opcionDos = ((pri == 3 && seg == 2) || (seg == 3 && pri == 2));
    return ((opcionUno || opcionDos) || (camion.ultimoCanal.elementosCargados.length == 0));
}