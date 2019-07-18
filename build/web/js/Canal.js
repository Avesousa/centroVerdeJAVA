
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
        actualizarTablero(true);
        limpiarInput();
        $("#nombreRecuperador").html("");
        console.log(this.elementosCargados);
        if (this.metodo.envioDirecto) camion.ultimoCanal.metodo.enviar(); 
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
            $("#patente").focus();
    }
    comenzarMetodo(_metodo) {
        this.nombreMetodo = _metodo;
        limpiarZona();
        console.log(this.nombreMetodo);
        switch (_metodo) {
            case "cargaBolsonEtapa":
                this.metodo = new CargaConBolsonesEtapa();
                break
            case "cargaBolson":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolson();
            case "cargaBolsonNombre":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonNombre();
            case "salidaMaterialE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new salidaMaterialE();
            case "salidaE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new salidaE();
            case "cargaBolsonIDREF":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonIDREF();
            case "entradaSalida":
                this.metodo = new EntradaSalida();
                break;
            case "cantidadPesoE":
                this.metodo = new CantidadPesoE();
                break;
            case "entradaSalidaE":
                this.metodo = new EntradaSalidaE();
                break;
            case "cargaBolsonNOMBREID":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonNOMBREID();
            case "cantidadPesoASOC":
                //this.metodo = new cantidadPesoASOC();
            case "cargaBolsonASOC":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cargaBolsonASOC();
            case "cantidadPesoASOCE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new cantidadPesoASOCE();
            case "entradaSalidaASOCE":
                return alerta("EL METODO QUE SE INTENTA CREAR, NO ESTÁ EN FUNCIONAMIENTO...");
                //this.metodo = new entradaSalidaASOCE();
            case "descartePatente":
                this.metodo = new DescartePatente();
                break;
            case "SalidaBolsonVacios":
                this.metodo = new SalidaBolsonVacios();
                break;
            case "OtrasCargas":
                this.metodo = new OtrasCargas();
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
    
    obtenerCantidadTotal() {
        return this.elementosCargados.map(elemento => elemento.cantidad).reduce((elemento1, elemento2) => elemento1 + elemento2);
    }
}

/*module.exports = {
    Canal: Canal
};*/
