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
    
    $("#pesoEntrada, #pesoSalida").on({
        keyup:function(){
            camion.ultimoCanal.metodo.verificadorCargar();
            sumaDePesos();
        }
    });
    
    $("#btn-menu").on({
        click:function(){
            $("#menu-res").slideToggle(10);
        }
    })
});