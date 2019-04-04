//function conectar(){
//    var usuario = $('#usuario').val();
//    var clave = $('#clave').val();
//    var data = {
//        user:usuario,
//        pass:clave
//    };
//    $.ajax({
//        type: "POST",
//        url: "iniciar",
//        contentType: "application/json",
//        data: JSON.stringify(data),
//        success: function(response){
//            document.location.href = "escritorio.jsp"
//        }
//    });
//}

$(document).ready(function(){
    $('#botonIngresar').click(function(){
      var usuario = $('#usuario').val();
        var clave = $('#clave').val();
        console.log(usuario);
        console.log(clave);
        var data = {
             user:usuario,
             pass:clave
        };
        $.post('iniciar',data,function(responseText){
            if(responseText != "noOk"){
                $('#contenido').load("escritorio.html");
                
            } else {
                $("#aviso").html("<p>Hubo un error en los datos ingresados</p>");
            }
        });    
    });
});

//function conectar(e){
//        var usuario = $("input[name=usuario]").val();
//        var clave = $("input[name=clave]").val();
//        var data = {
//            user:usuario,
//            pass:clave
//        };
//        $.post("iniciar",data,function(res,est,jqXHR){
//            
//            alert(res);
//        });
//    }