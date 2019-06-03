
class Canal {
    constructor(_nombre) {
        this.nombreCanal = _nombre;
        this.elementosCargados = [];
        this.elementosPorMaterial = [];
    }

    validarExistenciaDeMaterial(_elemento) {

        var indice = elementosPorMaterial.map(elemento => elemento.material).indexOf(_elemento.material);
        if (indice != -1) {
            this.elementosPorMaterial[indice].pesoTotal += _elemento.pesoTotal();
            this. elementosPorMaterial[indice].cantidad += _elemento.cantidad;
        }
        else {
          this.elementosPorMaterial.push(new SumaTotalPorMaterial(_elemento.material,_elemento.cantidad,_elemento.caracteristica,_elemento.pesoTotal));
        }
    }

    cargar() {
        var nuevoElementoCargado = this.metodo.cargar();
        this.elementosCargados.push(nuevoElementoCargado);
        this.validarExistenciaDeMaterial(nuevoElementoCargado);
        $("#cantidadMostrado").html(this.elementosCargados.length);
        $("#pesoMostrado").html(this.obtenerPesoTotal() + "KG");
        crearResumen();
        limpiarInput();
        $("#nombreRecuperador").html("");
        if (this.metodo.envioDirecto) this.enviar();
    }


    enviar() {
        camion.cargarDatos();
        //this.elementosPorMaterial();
        const metodoBandera = this.nombreMetodo;
        delete camion.ultimoCanal;
        delete this.metodo;
        var datos = JSON.stringify(camion);
        $.post("enviarDatos", {valor: datos,cv:$("#idCv").val(),user:$("#idUser").val()}, function (res){
            trabajoCompleto(res);
            limpiarInput(true,metodoBandera);
        });
    }

    comenzarMetodo(_metodo) {
        this.nombreMetodo = _metodo;
        limpiarZona();
    switch (_metodo) {
        case "cargaBolsonEtapa":
            this.metodo = new CargaConBolsonesEtapa();
            this.metodo.mostrarPantallaDeMetodo();
            break;
        case "cargaBolson":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cargaBolson();
            break;
        case "cargaBolsonNombre":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cargaBolsonNombre();
            break;
        case "salidaMaterialE":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new salidaMaterialE();
            break;
        case "salidaE":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new salidaE();
            break;
        case "cargaBolsonIDREF":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cargaBolsonIDREF();
            break;
        case "entradaSalida":
            alert("Está en mantenimiento dicho metodo");
            this.metodo = new EntradaSalida();
            this.metodo.mostrarPantallaDeMetodo();
            break;
        case "cantidadPesoE":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cantidadPesoE();
            break;
        case "entradaSalidaE":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new entradaSalidaE();
            break;
        case "cargaBolsonNOMBREID":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cargaBolsonNOMBREID();
            break;
        case "cantidadPesoASOC":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cantidadPesoASOC();
            break;
        case "cargaBolsonASOC":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cargaBolsonASOC();
            break;
        case "cantidadPesoASOCE":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new cantidadPesoASOCE();
            break;
        case "entradaSalidaASOCE":
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new entradaSalidaASOCE();
            break;
        default:
            alerta("EL METODO AGREGADO NO EXISTE");

    }
    }

    obtenerPesoTotal() {
        return this.elementosCargados.map(elemento => elemento.pesoTotal).reduce((elemento1, elemento2) => elemento1 + elemento2);
    }

}

/*module.exports = {
    Canal: Canal
};*/
