//window.onload = (function(){
$(document).ready(function(){
    $("#idBolson, #idRecuperador, #etapa").on({
        keyup:function(){
            camion.ultimoCanal.metodo.buscadorId();
            camion.ultimoCanal.metodo.verificadorCargar();
        },
        change:function(){
            console.log("ENTRO EN CHANGE");
            camion.ultimoCanal.metodo.buscadorId();
        }
    });
});