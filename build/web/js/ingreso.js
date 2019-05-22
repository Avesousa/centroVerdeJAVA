$(document).ready(function(){
    $('#botonIngresar').click(function(){
      var usuario = $('#usuario').val();
        var clave = $('#clave').val();
        var data = {
             user:usuario,
             pass:clave
        };
        $.post('iniciar',data,function(respuesta){
            switch(respuesta){
                case "ok1":
                    //$('#contenido').load("include/carga.jsp");
                    $('#contenido').load("include/escritorio.jsp");                    
                    break;
                case "ok2":
                    $('#contenido').load("include/escritorioadmin.html");
                    break;
                case "ok3":
                    $('#contenido').load("include/escritoriodgrec.html");
                    break;
                case "noOk":
                    $("#aviso").html("<p>Usuario y/o Clave incorrecto</p>");
                    break;
                default:
                    $("#aviso").html("<p>Hubo un error de conexión</p>");
            } 
        });    
    });
});
/*
 * 
 */