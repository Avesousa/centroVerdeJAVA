$(document).ready(function(){
    $('#botonIngresar').click(function(){
      var usuario = $('#usuario').val();
        var clave = $('#clave').val();
        var data = {
             user:usuario,
             pass:clave
        };
        $.post('iniciar',data,function(responseText){
            console.log(responseText);
            switch(responseText){
                case "ok1":
                    $('#contenido').load("include/escritorio.jsp");
                    break;
                case "ok2":
                    $('#contenido').load("include/escritorioadmin.html");
                    break;
                case "ok3":
                    $('#contenido').load("include/escritoriodgrec.html");
                    break;
                case "noOk":
                    $("#aviso").html("<p>Hubo un error con la base de datos</p>");
                    break;
                default:
                    alert("Esta vaina no ingreso");
            } 
        });    
    });
});
