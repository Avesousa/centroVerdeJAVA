
class EntradaSalida {

    constructor(_pesoMenor, _pesoMayor,_material,_caracteristica) {
        this.pesoMenor = _pesoMenor;
        this.pesoMayor = _pesoMayor;
        this.material = _material;
        this.caracteristica= _caracteristica;
    }
    obtenerPesoTotal() {
        return this.pesoMayor - this.pesoMenor;
    }

}

/*module.exports = {
    EntradaSalida: EntradaSalida
};*/