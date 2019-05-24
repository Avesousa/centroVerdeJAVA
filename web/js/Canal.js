
class Canal {
    constructor(_nombre) {
        this.nombreCanal = _nombre;
        this.elementosCargados = [];
    }

    cargar() {
        this.elementosCargados.push(this.metodo.cargar());
        $("#cantidadMostrado").html(this.elementosCargados.length);
        $("#pesoMostrado").html(this.obtenerPesoTotal()+"KG");
        limpiarInput();
    }
    
    enviar(){
        camion.cargarDatos();
        var metodo = camion.ultimoCanal.metodo;
        delete camion.ultimoCanal;
        delete this.metodo;
        var datos = JSON.stringify(camion);
        limpiarInput(true,metodo);
        $.post("enviarDatos", {valor: datos,cv:$("#idCv").val()}, function (res){
            console.log(res);
        });
    }

    comenzarMetodo(_metodo){
        this.metodo = _metodo;
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
            alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
            //this.metodo = new entradaSalida();
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
        return parseFloat(this.metodo.pesoTotal(this.elementosCargados).toFixed(2));
    }

}

/*module.exports = {
    Canal: Canal
};*/
