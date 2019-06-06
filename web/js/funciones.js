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
            $.post("mandarMetodo", { metodo: armarString(res, 0), canal: data['canal'], tipo: "no" }, function (res) {
                canal = JSON.parse(res);
                if (data['tipo'] != "rapido") {
                    if (metodoE) {
                        window.open('carga.jsp', '_self');
                    } else {
                        camion.nuevoCanal(canal.id, canal.metodo);
                    }
                } else {
                    if (metodoE) {
                        window.open('cargaInsitu.jsp', '_self');
                    } else {
                        camion.nuevoCanal(canal.id, canal.metodo);
                    }
                }
            });
        }
    });

}
function alerta(text) {
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
function armarJson(valor) {
    var final = '';
    for (var i = 0; i < valor.length; i++) {
        if (valor.charAt(i) != '"') {
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
function consultaOpcionesSelect(_consulta, idHtml, _tipoDeConsulta) {
    $.post('buscador', { consulta: _consulta, tipoDeConsulta: _tipoDeConsulta }, function (e) {
        for (var index = 0; index < e.length; index++)
            $(idHtml).append('<option value =' + e + '>' + e + '</option>');

    }
    )
}
function armarEtapa() {
    $.post('buscador', {
        id: $("#idCoop").val()
    }, function (res) {
        var lista = JSON.parse(res);
        for (var i in lista.etapas) {
            $("#etapa").append('<option id = '+lista.valorEtapa[i]+' value =' + lista.valorEtapa[i] + '>' +
                lista.etapas[i] + '</option>');
        }
    });
}
function armarFormato(_material){
    $.post('buscadorFormato',{
        material: _material,
        id: $("idCv").val()
    }, function(res){
        colocarArmado('#caracteristica',res);
    });
}

function armarMaterial(){
    $.post('buscadorMaterial',{
        id: $("#idCv").val()
    },function(res){
        colocarArmado('#material',res);
    });
    
}

function colocarArmado(id,_lista){
    var lista = JSON.parse(_lista);
    console.log("COLOCARARMADO: ");
    console.log(lista);
        for (var i in lista.elementos){
            console.log(id);
            console.log(lista.elementos[i]);
            $(id).append('<option id= '+lista.elementos[i]+' value = '+ lista.elementos[i] + '>'+
            lista.elementos[i] + '</option>');
        }
}
function cambioPantalla(idNuevo, link, metodo) {
    var id = $("#idCanal").val();
    if(validarUsoMixto(idNuevo,id)){
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
            var idCv = $("#idCv").val();
            var linkViejo = $("#linkCanal").val();
            var imgNueva = $("#" + idNuevo + "img");
            var imgVieja = $("#" + id + "img");
            $("#linkCanal").val(link);
            $("#idCanal").val(idNuevo);
            imgVieja.attr("src", linkViejo + "on.png");
            imgNueva.attr("src", link + "s.png");
            limpiarZona();
            gestionarMetodos({cv:idCv,canal:idNuevo,tipo:metodo},false);
            if(camion.ultimoCanal.elementosCargados.length == 0){
                camion.canales.splice(camion.canales.length-1,1);
            }
        }
        });
    }else{
        alerta("No se puede agregar esté medio de captación, "+
        "debe terminar de cargar.");
    }
}

//Arreglar preguntar por bolson

function preguntarPorBolsonesVacios(){
        swal("Bolsones vacios en el camión:",{
        content: "input",
        })
        .then((value) =>{
            if(!isNaN(value))
                camion.bolsonesVacios = parseInt(value);
            else 
                camion.ultimoCanal.enviar();
        });
    }

function trabajoCompleto(bol) {
    var mensaje;
    var icono;
    var tiempo;
    if (bol == "true") {
        icono = "success";
        mensaje = '¡Ya se ha cargado correctamente!';
        timepo = 2000;
    }
    else {
        icono = "error";
        mensaje = '¡Ha ocurrido un error con la carga!, comunícate con administrador';
        tiempo = 3000;
    }

    swal({
        position: 'top-end',
        icon: icono,
        title: mensaje,
        showConfirmButton: bol,
        timer: tiempo
    })
}
function traerFecha(tipo) {
    var fecha = new Date();
    var valor;
    if (tipo == "f") valor = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    else valor = fecha.getHours() + ":" + fecha.getMinutes();
    return valor;
}
function limpiarZona() {
    console.log("cambiarPantalla");
    $(".seccionBolsonSelect div, .seccionBolson input, #botonEnviar, #botonCargar, #botonEntradaSalida, #tablaResumen,#mostradorCantidad, #mostradorPeso").css("display", "none");
    $("#botonEnviar").attr("disabled", true);
    $("#botonEntradaSalida").attr("disabled", true);
    $("#tablaResumen").html(
        "<thead>" +
        "<tr>" +
        "<th>PROYECTO</th>" +
        "<th>BOLSON</th>" +
        "<th>ASOCIADO</th>" +
        "<th>PESO</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
    );
}
function limpiarInput(bool, metodo) {
    $(".seccionBolson input").val("");
    $("#botonCargar").attr("disabled", true);
    if (bool) {
        $("#patente").val("");
        $("#cantidadMostrado").html("0");
        $("#pesoMostrado").html("0,00KG");
        limpiarZona();
        $().css("display", "none");
        camion = new Camion();
        camion.nuevoCanal($("#idCanal").val(), metodo);

    }
}
function crearResumen() {

    var elemento = camion.ultimoCanal.elementosCargados
          .sort((unElemento, otroElemento) => unElemento.idBolson - otroElemento.idBolson)
            .sort((unElemento, otroElemento) => unElemento.etapa.localeCompare(otroElemento.etapa));
//     var elemento = camion.ultimoCanal.elementosCargados.sort(
//             function(un,otro){
//                 
//             })
    if (elemento[elemento.length - 1].idBolson) id = elemento[elemento.length - 1].idBolson;
    else id = "No Disponible";

    $("#tablaResumen tbody").html("");
    for (var i = 0; i < elemento.length; i++) {
        $("#tablaResumen").append("<tr>" +
        "<td>" + elemento[i].etapaV + "</td>" +
        "<td>" + elemento[i].idBolson + "</td>" +
        "<td>" + elemento[i].nombre+ "</td>" +
        "<td>" + elemento[i].pesoTotal + "</td>" +
        "<td><button onclick = 'elminarElementoCargado("+ elemento[i].referencia+");'> X </button></td>"+
        "</tr>");

    }
}
function sumaDePesos(){
    var pesoE = $("#pesoEntrada").val();
    var pesoS = $("#pesoSalida").val();
    if(pesoE>pesoS)$("#pesoMostrado").html(pesoE-pesoS + "KG");
    else $("#pesoMostrado").html(pesoS-pesoE + "KG");
}

function eliminarElementoCargado(id){
    
    const elementoCargado = camion.ultimoCanal.elementosCargados.filter(elemento => elemento.refencia == id)[0];

    camion.ultimoCanal.elementosPorMaterial.map(elementoMaterial =>{
        if(elementoMaterial.material== elementoCargado.material) elementoMaterial.pesoTotal -= elementoCargado.pesoTotal
    });

    camion.ultimoCanal.elementosCargados = camion.ultimoCanal.elementosCargados.filter(elemento => elemento !== elementoCargado);

    crearResumen();

}



