

class Bolson {
    /*Permite instanciar un bolson setteando id y peso*/
    /*const bolson = new Boldon(idBolson,peso);*/
    constructor(_idBolson, _pesoTotal, _etapa, _subEtapa,_material,_idRecuperador, _nombre, _etapaVisual) {
        this.idBolson = _idBolson;
        this.pesoTotal = _pesoTotal;
        this.etapaV = _etapaVisual;
        this.etapa = _etapa;
        this.subEtapa = _subEtapa;
        this.material = _material;
        this.caracteristica = "bolson";
        this.esBolson = true;
        this.cantidad = 1;
        this.idRecuperador = _idRecuperador;
        this.nombre = _nombre;
        this.referencia = camion.ultimoCanal.elementosCargados.length;
    }

    /*Se obtiene el peso total del bolson*/
    /*bolson.obtenerPesototal();*/
    pesoTotal(){
        return this.pesoTotal;
    }
}

/*module.exports = {
    Bolson: Bolson,
};*/
