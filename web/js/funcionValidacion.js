function verificarPatente(patente) {
    var banderaP = false;
    switch (patente.length) {
        case (6):
            var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)) && isNaN(patente.charAt(2))); //Primer parámetro (deben ser 3 letras).
            var dos = !isNaN((patente.charAt(3) + patente.charAt(4) + patente.charAt(5))); //Segundo Parámetro (deben ser 3 números).
            banderaP = (uno && dos);
            break;
        case (7):
            var uno = (isNaN(patente.charAt(0)) && isNaN(patente.charAt(1)));
            var dos = !isNaN((patente.charAt(2) + patente.charAt(3) + patente.charAt(4)));
            var tres = (isNaN(patente.charAt(5)) && isNaN(patente.charAt(6)));
            banderaP = (uno && dos && tres);
            break;
        case (0):
            banderaP = alertarCorreo("¡Haz ingresado una patente vacia!");
            if (banderaP) {
                document.getElementById("patente").value = "SIN DATO";
                document.getElementById("patente").disabled = true;
            }
            break;
    }
    if (!banderaP) {
        validador(false,"<p>¡Debes ingresar una patente válida, AB123CD ó ABC123</p>","#validadorPatente");
    }else{
        $("#validadorPatente").css("display","none");
    }
    $('#botonEnviar').prop("disabled",!banderaP);
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
    } else {
        $(id).css("background-color","#FA5858");
    }
}

function validarPesoBolson(pesoBolson) {

    if(pesoBolson>300)  
    validador(pesoBolson < 300,"El peso máximo por bolsón es 300 kg", "#validadorBolson");



}