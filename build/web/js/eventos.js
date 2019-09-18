//Todas la funciones creadas para JQuery
$(document).ready(function(){
    //Funciones que realiza en el metodo de carga.
    $("#idBolson, #idRecuperador, #etapa, #idPuntoVerde").on({
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
    
    $("#cambiarClave").on({
        click:function(){
            swal("Ingresa la nueva clave",{
            content:"input",
        }).then((value) => {
            if(value != "")
            $.post("cambiarClave",
            {
                id: $("#idUsuario").val(),
                clave: value
            },function(res){
                alerta(res);
            });
            else
                alerta("¡NO TIENE DATOS PARA CAMBIAR!");
        });
            
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
    
    $(".obj").on({
        click:function(){
            if($("#menu-res").css("display") != "none")
                $(".obj .img").css("background","#979A9A");
            else{
                $(".obj .img").css("background","#F7F9F9");
                if($("#menu-notificacion").css("display") != "none")
                    $("#menu-notificacion").slideToggle(10);
            }
            $("#menu-res").slideToggle(10);
            
        }
    });
    $(".notificacion").on({
        click:function(){
            if($("#menu-notificacion").css("display") != "none")
                $(".obj .img").css("background","#979A9A");
            else{
                $(".obj .img").css("background","#F7F9F9");
                if($("#menu-res").css("display") != "none")
                    $("#menu-res").slideToggle(10);
            }
            $("#menu-notificacion").slideToggle(10);
            
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
    
    $("#dgrecmenu").on({
        click:function(){
            window.open("reporte.jsp","_self");
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
    
    
    $("#formularioReporte input[type=submit]").on({
        click:function(){
            $("#textoRepuesta").html("Espera mientras se realiza el documento...");
            $("#textoRepuesta").addClass("espera");
            setTimeout(function(){
                $("#textoRepuesta").html("");
                $("#textoRepuesta").removeClass("espera");
            },10000);
        }
    });
    
    $("#fechaStart, #fechaEnd").on({
        change:function(){
            if(new Date($("#fechaStart").val()) > new Date($("#fechaEnd").val())){
                $("#textoRepuesta").html("¡La fecha DESDE no puede ser mayor a la de HASTA!");
                $("#formularioReporte input[type=submit]").prop("disabled",true);
                $("#textoRepuesta").addClass("error");
            }else{
                $("#textoRepuesta").html("");
                $("#formularioReporte input[type=submit]").prop("disabled",false);
                $("#textoRepuesta").removeClass("error");
            }
        }
    });
    
    var fecha = new Date();
    $("#fechaEnd").val(fecha.getFullYear() + "-" + ((fecha.getMonth()+1) > 9 ? (fecha.getMonth()+1) : ("0" + (fecha.getMonth()+1))) + "-" + fecha.getDate());
    fecha.setDate(fecha.getDate() - 30);
    $("#fechaStart").val(fecha.getFullYear() + "-" + ((fecha.getMonth()+1) > 9 ? (fecha.getMonth()+1) : ("0" + (fecha.getMonth()+1))) + "-" + fecha.getDate());
    
    
});




    
    

