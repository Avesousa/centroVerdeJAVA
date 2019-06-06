
class Canal {
    constructor(_nombre) {
        this.nombreCanal = _nombre;
        this.elementosCargados = [];
        this.elementosPorMaterial = [];
    }
    validarExistenciaDeMaterial(_elemento) {

        var indice = this.elementosPorMaterial.map(elemento => elemento.material).indexOf(_elemento.material);
        if (indice != -1) {
            this.elementosPorMaterial[indice].pesoTotal += _elemento.pesoTotal;
            this.elementosPorMaterial[indice].cantidad += _elemento.cantidad;
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
        limpiarInput();
        $("#nombreRecuperador").html("");
        console.log(this.elementosCargados);
        if (this.metodo.envioDirecto) this.enviar(); 
        else crearResumen();
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
        console.log(this.nombreMetodo);
        switch (_metodo) {
            case "cargaBolsonEtapa":
                this.metodo = new CargaConBolsonesEtapa();
                break;
            case "cargaBolson":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolson();
                break;
            case "cargaBolsonNombre":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonNombre();
                break;
            case "salidaMaterialE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new salidaMaterialE();
                break;
            case "salidaE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new salidaE();
                break;
            case "cargaBolsonIDREF":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonIDREF();
                break;
            case "entradaSalida":
                this.metodo = new EntradaSalida();
                break;
            case "cantidadPesoE":
                this.metodo = new CantidadPesoE();
                break;
            case "entradaSalidaE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new entradaSalidaE();
                break;
            case "cargaBolsonNOMBREID":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonNOMBREID();
                break;
            case "cantidadPesoASOC":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cantidadPesoASOC();
                break;
            case "cargaBolsonASOC":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonASOC();
                break;
            case "cantidadPesoASOCE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cantidadPesoASOCE();
                break;
            case "entradaSalidaASOCE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new entradaSalidaASOCE();
                break;
            default:
                return alerta("EL METODO AGREGADO NO EXISTE");

        }
        console.log("ya selecciono el metodo ");
        console.log(this.metodo);
    
        this.metodo.mostrarPantallaDeMetodo();
    }
    obtenerPesoTotal() {
        return this.elementosCargados.map(elemento => elemento.pesoTotal).reduce((elemento1, elemento2) => elemento1 + elemento2);
    }
}

/*module.exports = {
    Canal: Canal
};*/
