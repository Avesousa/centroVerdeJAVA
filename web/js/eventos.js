//window.onload = (function(){
$(document).ready(function(){
    $("#idBolson, #idRecuperador, #etapa").on({
        keyup:function(){
            console.log("entro en eventos");
            camion.ultimoCanal.metodo.buscadorId();
            camion.ultimoCanal.metodo.verificadorCargar();
        },
        change:function(){
            console.log("ENTRO EN CHANGE");
            camion.ultimoCanal.metodo.buscadorId();
        }
    });
    
    $("#pesoEntrada, #pesoSalida, #cantidad").on({
        keyup:function(){
            camion.ultimoCanal.metodo.verificadorCargar();
        }
    });
    
    $("#btn-menu").on({
        click:function(){
            if($("#menu-res").css("display") != "none"){
                $(".obj .img").css("background","#979A9A");
            }else{
                $(".obj .img").css("background","#F7F9F9");
            }
            $("#menu-res").slideToggle(10);
            
        }
    });
    
    $("#cargamenu").on({
        click:function(){
            window.open("index.jsp",'_self');
        }
    });
    
    $("#consultamenu").on({
        click:function(){
            alerta("¡Está en mantenimiento!");
            //window.open("index.jsp",'_self');
        }
    });
});