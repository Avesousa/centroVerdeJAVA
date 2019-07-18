function verificarPatente() {
    var patente = $("#patente").val();
    var banderaP = patenteVerificador(patente);
    console.log(banderaP);
    if (!banderaP) {
        validador(false,"<p>¡Debes ingresar una patente válida, AB123CD ó ABC123</p>","#validadorPatente");
    }else if(patente != 0){
        $("#validadorPatente").css("display","none");
    }
    $('#botonEnviar').prop("disabled",!banderaP);
    camion.ultimoCanal.metodo.verificadorCargar();
}
function patenteVerificador(patente){
    console.log(patente);
    if(patente == 0 && patente != ""){
        console.log("Entro en if de patentes");
        validador("O","<p>¡PATENTE NO REPORTADA!</p>","#validadorPatente");
        return (patente == 0);
    }
    switch (patente.length) {
            case (6):
                console.log(6);
                var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)) && isNaN(patente.charAt(2))); //Primer parámetro (deben ser 3 letras).
                var dos = !isNaN((patente.charAt(3) + patente.charAt(4) + patente.charAt(5))); //Segundo Parámetro (deben ser 3 números).
                return (uno && dos);
            case (7):
                console.log(7);
                var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)));
                var dos = !isNaN((patente.charAt(2) + patente.charAt(3) + patente.charAt(4)));
                var tres = (isNaN(patente.charAt(5)) && isNaN(patente.charAt(6)));
                return (uno && dos && tres);
            default:
                console.log("default");
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
    if(estado == "O"){
        $(id).css("background-color","#FFB533");
    }
    else if (estado) {
        $(id).css("background-color","#04B404");
    } 
    else {
        $(id).css("background-color","#FA5858");
    }
}
function validarPesoBolson(peso) {
    if((peso>300)){
        validador(false,"Peso de bolsón es mayor a 300 kg", "#validadorBolson");
        alerta("¡El peso ingresado es mayor que 300 kg! Si no es un error, omite esté mensaje...");
    }
    else if(peso != "")$("#validadorBolson").css("display","none")
    
    return peso != "";
}
function validarUsoMixto(pri,link,metodo){
    var id = $("#idCanal").val();
    var idCv = $("#idCv").val();
    $.post("validacionMixto",{id:idCv},function(e){
        for(var i in e){
            if((pri == e[i].uno && id == e[i].dos) || 
                    (pri == e[i].dos && id == e[i].uno) || 
                    camion.ultimoCanal.elementosCargados.length == 0)
                return cambioPantalla(pri,link,metodo,id);
            else if(e[i].uno == e[i].dos)
                return alerta("No se puede agregar este medio, "+
                        "primero debes terminar esta carga.");
        }
        return alerta("No se puede agregar este medio, "+
                        "primero debes terminar esta carga.");
    });
   
//    var opcionUno = ((pri == 1 && seg == 3) || (seg == 1 && pri == 3));
//    var opcionDos = ((pri == 3 && seg == 2) || (seg == 3 && pri == 2));
//    return ((opcionUno || opcionDos) || (camion.ultimoCanal.elementosCargados.length == 0));
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