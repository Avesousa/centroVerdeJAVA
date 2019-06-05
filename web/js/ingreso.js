$(document).ready(function(){
    $('#botonIngresar').click(function(){
      var usuario = $('#usuario').val();
        var clave = $('#clave').val();
        var data = {
             user:usuario,
             pass:clave
        };
        $.post('iniciar',data,function(respuesta){
            var res = JSON.parse(respuesta);
            console.log(res);
            if(res.entro){
                window.open("index.jsp",'_self');
            } else {
                $("#aviso").html("<p>Usuario y/o Clave incorrecto</p>");
            }
        });    
    });
});
/*
 * 
 */