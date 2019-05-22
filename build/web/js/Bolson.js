

class Bolson {
    /*Permite instanciar un bolson setteando id y peso*/
    /*const bolson = new Boldon(idBolson,peso);*/
    constructor(_idBolson, _pesoTotal, _etapa, _subEtapa,_material) {
        this.idBolson = _idBolson;
        this.pesoTotal = _pesoTotal;
        this.etapa = _etapa;
        this.subEtapa = _subEtapa;
        this.material = _material;
        this.caracteristica = "bolson";
    }

    /*Se obtiene el peso total del bolson*/
    /*bolson.obtenerPesototal();*/

    obtenerPesoTotal() {
        return this.pesoTotal;
    }
}

/*module.exports = {
    Bolson: Bolson,
};*/
