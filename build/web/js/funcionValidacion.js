function verificarPatente() {
    var patente = $("#patente").val();
    console.log(patente);
    console.log("VERIFICANDO PATENTE");
    var banderaP = patenteVerificador(patente);
    console.log(banderaP);
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
            case (0):
                return (patente == "SIN DATO");
            default:
                return false;
        }
}
function validarDatosDeCamion() {

    /* sintaxis jQuery para habilitar el boton de id botonSeguir*/
    $("#botonSeguir").prop("disabled", ($("#patente").val() != "" && $("#fecha").val() != "" && $("#hora").val() != "00:00"));

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
function verificarFecha() {
    var dif = parseInt((new Date() - new Date($("#fecha").val())) / (1000 * 60 * 60 * 24));
    var b = [(5 >= dif),(31 >= dif),(0 <= dif),isNaN(dif)];
    if(!b[0] && b[1] && !b[3]){
        comentar("La fecha ingresada es mayor del plazo de los 5 días,"+
                " indica las razones:");
        return !b[0];
    } else if((!b[1] || !b[2]) && !b[3]) {
        validador(false,"<p>¡La fecha ingresada no es válida!</p>","#validadorPatente");
    }
    return (b[1]&&b[2]);
}
function verificarHora() {
            return ($("#hora").val() != "00:00");
        }