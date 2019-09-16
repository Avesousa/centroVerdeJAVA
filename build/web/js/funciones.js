history.forward();
function tipoDeCarga(nombre, idCanal, idCv, otro) {
    swal({
        type: "Aviso informátivo",
        text: nombre + ": ¿Qué tipo de carga querés realizar?",
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
            gestionarMetodos({ cv: idCv, canal: idCanal, tipo: value, esOtro: otro }, true);
        } else {
            swal.close();
        }
    });
}
function textoDelMetodo(letra) {
    switch (letra) {
        case "b":
            return "Bolsón";

        case "e":
            return "Peso de Entrada y peso de Salida";

        case "s":
            return "Material y peso Salida";

        case "v":
            return "Identificación Visual";

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
                        if(!data['esOtro'])
                            window.open('carga.jsp', '_self');
                        else
                            window.open('cargaOtros.jsp','_self');
                    } else {
                        camion.nuevoCanal(canal.id, canal.metodo);
                            if(camion.ultimoCanal.elementosCargados.length > 0)
                                moverCargaComun();
                    }
                } else {
                    if (metodoE) {
                        if(!data['esOtro'])
                            window.open('cargaInsitu.jsp', '_self');
                        else
                            window.open('cargaInsituOtros.jsp', '_self');
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
        closeOnClickOutside: false,
        closeOnEsc: false,
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
function armarEtapa(esUnica) {
    if(esUnica){
        $("#etapa").append('<option id = "UNICA" value="UNICA" selected>UNICA</option>');
    }else{
        $("#etapa").append('<option value="sin">Procedencia:</option>');
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
}
function armarFormato(_material){
    $("#caracteristica").html("");
    $.post('buscadorFormato',{
        material: _material,
        id: $("#idCv").val()
    }, function(res){
        colocarArmado('#caracteristica',res); 
        camion.ultimoCanal.metodo.verificadorCargar();
    });
}
function armarMaterial(){
    $("#material").html("");
    $.post('buscadorMaterial',{
        id: $("#idCv").val()
    },function(res){
        colocarArmado('#material',res);
        armarFormato($("#material").val());
    });
}
function colocarArmado(id,_lista){
    var lista = JSON.parse(_lista);
    if(lista.elementos.length > 0){
        for (var i in lista.elementos){
            $(id).append('<option value = "'+ lista.elementos[i] + '">'+
            lista.elementos[i] + '</option>');
        }
    } else {
        alerta("No tiene elementos para cargar...");
    }
    
}
function cambioPantalla(idNuevo, link, metodo,id) {
        swal({
            type: "Aviso informátivo",
            text: "¿Desea terminar la carga de esté canal?",
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
}
function preguntarPorBolsonesVacios(){
        swal("Bolsones vacios en el camión:",{
        content: "input",
        closeOnClickOutside: false,
        closeOnEsc: false,
        })
        .then((value) =>{
            if(!isNaN(value))
                camion.bolsonesVacios = parseInt(value);
            else 
                camion.ultimoCanal.enviar();
        });
    }
function comentar(texto,valor){
        swal(texto,{
        content: "input",
        closeOnClickOutside: false,
        closeOnEsc: false,
        })
        .then((value) =>{
            if(value != ""){
                camion.comentarios += " / " + value +  " / ";
            }
            if(valor){
                camion.ultimoCanal.enviar();
            }
        });
    }
function trabajoCompleto(bol) {
    var mensaje;
    var icono;
    var tiempo;
    if (bol == "true") {
        icono = "success";
        mensaje = '¡Ya se ha cargado correctamente!';
        tiempo = 2000;
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
        //showConfirmButton: bol,
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
    $(".seccionBolsonSelect div, .seccionBolson input, #botonEnviar,#botonSacar,"+
    "#botonCargar, #botonEntradaSalida, #tablaResumen,#mostradorCantidad, #mostradorPeso").css("display", "none");
    $("#botonEnviar, #botonSacar").attr("disabled", true);
    $("#botonEntradaSalida").attr("disabled", true);
    $("#tablaResumen").html(
        "<thead>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
    );
    $("#cargaComun").css("display","none");
    $("#sectorCamion").css("display","inline-block");
    $("#fecha").val("");
    $("#hora").val("");
    $("#cantidadMostrado").html("0");
    $("#pesoMostrado").html("0,00 kg");
}
function limpiarInput(bool, metodo) {
    $(".seccionBolson input, .seccionBolson textarea").val("");
    $(".seccionBolson textarea").prop("disabled",false);
    $("#botonCargar").attr("disabled", true);
    $("#botonSeguir").attr("disabled",true);
    $("#validadorBolson, #validadorPatente").css("display","none");
    
    if (bool) {
        $("#patente").val("");
        limpiarZona();
        $().css("display", "none");
        camion = new Camion();
        camion.nuevoCanal($("#idCanal").val(), metodo);
        $("#patente").focus();

    }
}
function eliminarCanal(){
    delete camion.ultimoCanal.metodo;
    delete camion.ultimoCanal;
}
function crearResumen() {

    var elemento = camion.ultimoCanal.elementosCargados
          .sort((unElemento, otroElemento) => unElemento.segundo() - otroElemento.segundo())
            .sort((unElemento, otroElemento) => unElemento.primero().localeCompare(otroElemento.primero()));

    if (elemento[elemento.length - 1].segundo()) id = elemento[elemento.length - 1].segundo();
    else id = "No Disponible";

    $("#tablaResumen tbody").html("");
    for (var i = 0; i < elemento.length; i++) {
        $("#tablaResumen").append("<tr>" +
        "<td>" + elemento[i].primero() + "</td>" +
        "<td>" + elemento[i].segundo() + "</td>" +
        "<td>" + elemento[i].tercero() + "</td>" +
        "<td>" + elemento[i].cuarto() + "</td>" +
        "<td><button class='botonEliminar' onclick = 'eliminarElementoCargado("+ elemento[i].referencia+");'> X </button></td>"+
        "</tr>");

    }
}
function sumaDePesos(){
    var pesoE = $("#pesoEntrada").val();
    var pesoS = $("#pesoSalida").val();
    var idCanal = parseInt($("#idCanal").val());
    if(idCanal < 5)$("#pesoMostrado").html(pesoE-pesoS + "KG");
    else $("#pesoMostrado").html(pesoS-pesoE + "KG");
    return pesoS-pesoE;
}
function eliminarElementoCargado(id){
    const elementoCargado = camion.ultimoCanal.elementosCargados.filter(elemento => elemento.referencia == id)[0];
    swal({
            type: "Aviso informátivo",
            text: "¿Desea eliminar el elemento cargado?",
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
                camion.ultimoCanal.elementosPorMaterial.map(elementoMaterial =>{
                    if(elementoMaterial.material== elementoCargado.material){
                        elementoMaterial.pesoTotal -= elementoCargado.pesoTotal;
                        elementoMaterial.cantidad--;
                    }
                });

                camion.ultimoCanal.elementosCargados = camion.ultimoCanal.elementosCargados.filter(elemento => elemento !== elementoCargado);
                if(camion.ultimoCanal.elementosCargados.length > 0){
                    crearResumen();
                    actualizarTablero();
                }
                else{
                    $("#tablaResumen tbody").html("");
                }
                actualizarTablero(camion.ultimoCanal.elementosCargados.length > 0);
                
                }
        });
    
    
    

}
function actualizarTablero(bool){
    if(bool){
        $("#cantidadMostrado").html(camion.ultimoCanal.obtenerCantidadTotal());
        $("#pesoMostrado").html(camion.ultimoCanal.obtenerPesoTotal() + " kg");
        $("#botonSacar").prop("disabled",false);
    } else {
        $("#cantidadMostrado").html("0");
        $("#pesoMostrado").html("0 kg");
        $("#botonSacar").prop("disabled",true);
    }
}
function retornarPeso(_material,_caracteristica,_cantidad){
      $.post("pesoPorMaterial",{cv: $('#idCv').val(),mat: _material,car: _caracteristica},function(res){
          console.log("PESO: " + res);
          if(_cantidad != ""){
              pesoCaracteristica = parseFloat(res) * parseInt(_cantidad);
          }else {
            pesoCaracteristica = 0;
          }
    });
    return pesoCaracteristica;
  }
function mostrarTabla(primero,segundo,tercero,_cuarto){
    var cuarto = _cuarto;
    if(!cuarto)cuarto = "PESO";
    $("#tablaResumen thead").html(
        '<tr>'+
        '<th>'+primero+'</th>'+
        '<th>'+segundo+'</th>'+
        '<th>'+tercero+'</th>'+
        '<th>'+cuarto+'</th>'+
        '</tr>'
    )
}
function consultarBolsones(){
    $("#tableroConsulta").css("display","block");
    $.post('consultar',{
        id:$("#id_user").val(),
        caso: "bolson"
    },function(res){
        var lista = JSON.parse(res);
        $("#tablaConsulta tbody, #tablaConsulta thead").html("");
        $("#tablaConsulta thead").html(
            "<tr><th>ID INGRESO</th>"+
            "<th>FECHA</th>"+
            "<th>PATENTE</th>"+
            "<th>ETAPA</th>"+
            "<th>ID BOLSON</th>"+
            "<th>MEDIO DE CAPTACIÓN</th>"+
            "<th>CENTRO VERDE</th>"+
            "<th>ID ASOCIADO</th>"+
            "<th>ASOCIADO</th>"+
            "<th>PESO</th>"+
            "<th>USUARIO</th><tr>");
        for (var i = 0; i < lista.elementos.length; i++) {
            $("#tablaConsulta").append("<tr>" +
            "<td>" + lista.elementos[i].id_ingreso + "</td>" +
            "<td>" + lista.elementos[i].fecha + "</td>" +
            "<td>" + lista.elementos[i].patente + "</td>" +
            "<td>" + lista.elementos[i].etapa + "</td>" +
            "<td>" + lista.elementos[i].id_bolson + "</td>" +
            "<td>" + lista.elementos[i].canal + "</td>" +
            "<td>" + lista.elementos[i].centroverde + "</td>" +
            "<td>" + lista.elementos[i].id_asociado + "</td>" +
            "<td>" + lista.elementos[i].asociado + "</td>" +
            "<td>" + lista.elementos[i].peso + "</td>" +
            "<td>" + lista.elementos[i].usuario + "</td>"+
            "</tr>");
        }
        //$('#tablaConsulta').DataTable();
        console.log("TERMINO");
    });
}
function consultarMaterial(){
    $("#tableroConsulta").css("display","block");
    $.post('consultar',{
        id:$("#id_user").val(),
        caso: "material"
    },function(res){
        var lista = JSON.parse(res);
        $("#tablaConsulta tbody, #tablaConsulta thead").html("");
        $("#tablaConsulta thead").html(
            "<tr><th>ID INGRESO</th>"+
            "<th>ID MATERIAL</th>"+
            "<th>FECHA</th>"+
            "<th>PATENTE</th>"+
            "<th>MEDIO DE CAPTACIÓN</th>"+
            "<th>CENTRO VERDE</th>"+
            "<th>FORMATO</th>"+
            "<th>MATERIAL</th>"+
            "<th>PESO</th>"+
            "<th>USUARIO</th><tr>");
        for (var i = 0; i < lista.elementos.length; i++) {
            $("#tablaConsulta").append("<tr>" +
            "<td>" + lista.elementos[i].id_ingreso + "</td>" +
            "<td>" + lista.elementos[i].id_material + "</td>" +
            "<td>" + lista.elementos[i].fecha + "</td>" +
            "<td>" + lista.elementos[i].patente + "</td>" +
            "<td>" + lista.elementos[i].canal + "</td>" +
            "<td>" + lista.elementos[i].centroverde + "</td>" +
            "<td>" + lista.elementos[i].formato + "</td>" +
            "<td>" + lista.elementos[i].material + "</td>" +
            "<td>" + lista.elementos[i].peso + "</td>" +
            "<td>" + lista.elementos[i].usuario + "</td>"+
            "</tr>");
        }
        //$('#tablaConsulta').DataTable();
        console.log("TERMINO datatable");
    });
}
function consultarCamiones(){
    $("#tableroConsulta").css("display","block");
    $.post('consultar',{
        id:$("#id_user").val(),
        caso: "camion"
    },function(res){
        var lista = JSON.parse(res);
        $("#tablaConsulta tbody, #tablaConsulta thead").html("");
        $("#tablaConsulta thead").html(
            "<tr><th>ID INGRESO</th>"+
            "<th>FECHA</th>"+
            "<th>PATENTE</th>"+
            "<th>MEDIO DE CAPTACIÓN</th>"+
            "<th>CENTRO VERDE</th>"+
            "<th>PESO</th>"+
            "<th>USUARIO</th><tr>");
        for (var i = 0; i < lista.elementos.length; i++) {
            $("#tablaConsulta").append("<tr>" +
            "<td>" + lista.elementos[i].id_ingreso + "</td>" +
            "<td>" + lista.elementos[i].fecha + "</td>" +
            "<td>" + lista.elementos[i].patente + "</td>" +
            "<td>" + lista.elementos[i].canal + "</td>" +
            "<td>" + lista.elementos[i].centroverde + "</td>" +
            "<td>" + lista.elementos[i].peso + "</td>" +
            "<td>" + lista.elementos[i].usuario + "</td>"+
            "</tr>");
        }
    });
}
function moverCargaComun(){
    $("#cargaComun").slideToggle(50);
    $("#sectorCamion").slideToggle(50);
}