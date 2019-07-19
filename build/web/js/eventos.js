//Todas la funciones creadas para JQuery
$(document).ready(function(){
    //Funciones que realiza en el metodo de carga.
    $("#idBolson, #idRecuperador, #etapa").on({
        keyup:function(){
            camion.ultimoCanal.metodo.buscadorId();
            camion.ultimoCanal.metodo.verificadorCargar();
        },
        change:function(){
            if($("#idCanal").val() < 7)
                camion.ultimoCanal.metodo.buscadorId();
            camion.ultimoCanal.metodo.verificadorCargar();
        }
    });
    
    $("#pesoEntrada, #pesoSalida, #cantidad").on({
        keyup:function(){
            camion.ultimoCanal.metodo.verificadorCargar();
        },
        change:function(){
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
    
    $("#patente").on({
        keyup:function(){
            camion.verificarDatos();
        },
        change:function(){
            camion.verificarDatos();
        }
    });
    
    $("#fecha,#hora").on({
        blur:function(){
            camion.verificarDatos();
        }
    })
    
    $("#cargamenu").on({
        click:function(){
            window.open("index.jsp",'_self');
        }
    });
    
    $("#cerrar").on({
       click:function(){
           $.post("cerrarSesion");
           window.open("index.jsp",'_self');
       }
    });
    
    $("#consultamenu").on({
        click:function(){
            window.open("consultas.jsp",'_self');
        }
    });
    
    $("#selconsultor").on({
        change:function(){
            var e = $("#selconsultor").val();
            switch(e){
               case "b":
                   consultarBolsones();
                   break;
               case "m":
                   consultarMaterial();
                   break;
               case "c":
                   consultarCamiones();
                   break;
                   
            }
        }
    });
    
    $("#botonSeguir").on({
        click:function(){
            moverCargaComun();
        }
    });
    
    $("#botonSacar").click(function(){
        swal({
            type: "Aviso informátivo",
            text: "¿Desea eliminar todas las cargas?",
            timer:5000,
            buttons: {
                rapido: {
                    text: "SI",
                    value: true,
                    visible: true,
                    closeModal: true
                },
                normal: {
                    text: "NO",
                    value: false,
                    visible: true,
                    closeModal: true
                }
            }
        }).then((value) => {
            if(value){
                var metodo = camion.ultimoCanal.nombreMetodo;
                console.log(metodo);
                eliminarCanal();
                limpiarInput(true, metodo); 
            }
        });
    });
    
});

