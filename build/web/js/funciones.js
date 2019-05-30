function tipoDeCarga(nombre, idCanal, idCv) { 
    
    //PLANTEAR OPERACIÓN A REALIZAR:
    //-INGRESO
    //-EGRESO
    //-RITRO BOLSON
    //-OTRO
    swal({
        type: "Aviso informátivo",
        text: "Con el medio de captación de " + nombre + "¿Qué tipo de carga querés realizar?",
        buttons: {
            rapido: {
                text: "IN SITU",
                value: "rapido",
                visible: true,
                closeModal: true
            },
            normal: {
                text: "NORMAL",
                value: "normal",
                visible: true,
                closeModal: true
            }
        }
    }).then((value) => {
        if (value == "rapido" || value == "normal") {
            gestionarMetodos({ cv: idCv, canal: idCanal, tipo: value }, true);
        } else {
            swal.close();
        }
    });
}

function textoDelMetodo(letra) {

    switch (letra) {
        case "b":
            return "Carga con Bolson";
            
        case "e":
            return "Carga con Peso de entrada y salida";
         
        case "s":
            return "Carga con Peso de salida";
           
        case "v":
            return "Carga con visualización";
            
    }

}

/*Por medio de está función realiza la gestión con respecto a los métodos,
 * en caso tal de que sean dos métodos, o relacionan si son por el método INSITU (llamado por Miguel)
 * o método normal.*/
function gestionarMetodos(data, metodoE) {
    var canal;
    $.post("abrirMetodo", data, function (res) {
        //Cuándo es más de un método.                
        if (!res.includes('u')) {
            swal({
                type: "Aviso informátivo",
                text: "Tienes dos métodos de cargas disponible, ¿Cuál deseas utilizar?",
                buttons: {
                    rapido: {
                        text: textoDelMetodo(res.charAt(1)),
                        value: res.charAt(1),
                        visible: true,
                        closeModal: true
                    },
                    normal: {
                        text: textoDelMetodo(res.charAt(2)),
                        value: res.charAt(2),
                        visible: true,
                        closeModal: true
                    }
                }
            }).then((value) => {
                if (value == "b" || value == "e" || value == "s" || value == "v") {
                    $.post("mandarMetodo", { cv: data['cv'], canal: data['canal'], tipo: value }, function (res) {
                        canal = JSON.parse(res);
                        if (data['tipo'] != "rapido") {
                            window.open('carga.jsp', '_self');
                        } else {
                            window.open('cargaInsitu.jsp', '_self');
                        }
                    });
                } else {
                    bandera = false;
                    swal.close();
                }
            });
        }
        //cuando es un solo método.
        else {
            $.post("mandarMetodo", {metodo:armarString(res, 0),canal:data['canal'],tipo:"no" }, function (res) {
                canal = JSON.parse(res);
                if (data['tipo'] != "rapido") {
                    if (metodoE) {
                        window.open('carga.jsp', '_self');
                    }else{
                        camion.nuevoCanal(canal.id,canal.metodo);
                    }
                } else {
                    if (metodoE) {
                        window.open('cargaInsitu.jsp', '_self');
                    }else{
                        camion.nuevoCanal(canal.id,canal.metodo);
                    }
                }
            });
        }
    });
    
}

function alerta(text){
   swal({
                type: "Aviso informátivo",
                text: text,
                buttons: {
                    rapido: {
                        text: "Aceptar",
                        visible: true,
                        closeModal: true
                    }
                }
            });
}
function armarJson(valor){
    var final = '';
    for(var i = 0; i < valor.length; i++){
        if(valor.charAt(i) != '"'){
            final += valor.charAt(i);
        }
    }
    return final;
}

function armarString(valor, ubicacion) {
    var resultado = "";
    for (var i = 0; i < valor.length; i++) {
        if (ubicacion != i) {
            resultado += valor.charAt(i);
        }
    }
    return resultado;
}

/*funcion para traer el nombre del usuario  sabiendo el centro verde y la*/
function nombreRU(idBolson, _etapa) {

    $.post("traeridru", { id: idBolson, etapa: _etapa }, function (e) {
        if (e != "n")
            $("#validador").html("<p>El nombre del recuperador es " + e + "</p>");
        else
            $("#validador").html("<p>El Id especificado no existe en la base de datos</p>");

        $("#").prop("disabled", e != "n");
    });


}

function consultaOpcionesSelect(_consulta, idHtml, _tipoDeConsulta) {
    $.post('buscador', { consulta: _consulta, tipoDeConsulta: _tipoDeConsulta }, function (e) {
        for (var index = 0; index < e.length; index++)
            $(idHtml).append('<option value =' + e + '>' + e + '</option>');

    }
    )
}

function armarEtapa(){
    $.post('buscador',{
        id: $("#idCoop").val()
    },function(res){
        var lista = JSON.parse(res);
        for(var i in lista.etapas){
           $("#etapa").append('<option value =' + lista.etapas[i] + '>' + 
                   lista.etapas[i] + '</option>'); 
        }
    });
}

function cambioPantalla(idNuevo, link, metodo) {
    
    swal({
        type: "Aviso informátivo",
        text: "¿Desear terminar la carga por esté canal y agregar otro medio de captación dentro del mismo camión?",
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
        console.log("ES POSITIVO PARA ALCOLOIDE DE SI :d");
        var idCv = $("#idCv").val();
        var id = $("#idCanal").val();
        var linkViejo = $("#linkCanal").val();
        var imgNueva = $("#" + idNuevo + "img");
        var imgVieja = $("#" + id + "img");
        $("#linkCanal").val(link);
        $("#idCanal").val(idNuevo);
        $("#"+id+"a").attr("onclick","");
        imgVieja.attr("src", linkViejo + "on.png");
        imgNueva.attr("src", link + "s.png");
        gestionarMetodos({cv:idCv,canal:idNuevo,tipo:metodo},false);
        if(camion.ultimoCanal.elementosCargados.length == 0){
            camion.canales.splice(camion.canales.length-1,1);
        }
    }
    });
}

function trabajoCompleto(bol){
  var mensaje;
  var icono;
  if(bol == "true"){
     icono = "success";
     mensaje = '¡Ya se ha cargado correctamente!';
  }
  else {
      icono = "error";
      mensaje = '¡Ha ocurrido un error con la carga!';
  }
  
  swal({
  position: 'top-end',
  icon: icono,
  title: mensaje,
  showConfirmButton: bol,
  timer: 1500
})
}

function traerFecha(tipo){
    var fecha = new Date();
    var valor;
    if(tipo == "f")valor = fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
    else valor = fecha.getHours()+":"+fecha.getMinutes();
    return valor;
}

function limpiarZona(){
    $(".seccionBolsonSelect div, seccionBolson input, #botonEnviar, #botonCargar").css("display","none");
}
function limpiarInput(bool,metodo){
    $(".seccionBolson input").val("");
    if(bool){
        $("#patente").val("");
        $("#cantidadMostrado").html("0");
        $("#pesoMostrado").html("0,00KG");
        limpiarZona();
        $().css("display","none");
        camion = new Camion();
        camion.nuevoCanal($("#idCv").val(),metodo);
        
    }
}

function crearResumen() {
    var listaBolson = document.getElementById("tablaResumen");
    var fila = document.createElement("TR");
    fila.setAttribute("id", ("n" + elementoCargado));
    for (var indices = 0; datosextras.length > indices; indices++) {
        var columna = document.createElement("TD");
        var textColumna = document.createTextNode(datosextras[indices]);
        columna.appendChild(textColumna);
        fila.appendChild(columna);
    }
    var btn = document.createElement("TD");
    btn.innerHTML = '<button onclick="eliminar(' + elementoCargado +')"> x </button>';
    fila.appendChild(btn);
    cantidad++;
    elementoCargado++;
    listaBolson.appendChild(fila);
}
