

class Bolson {
    /*Permite instanciar un bolson setteando id y peso*/
    /*const bolson = new Boldon(idBolson,peso);*/
    constructor(_idBolson, _pesoTotal, _etapa,_material,_idRecuperador, _nombre, _etapaVisual, _otra) {
        this.idBolson = _idBolson;
        this.pesoTotal = _pesoTotal;
        this.etapaV = _etapaVisual;
        this.etapa = _etapa;
        this.material = _material;
        this.caracteristica = "BOLSONES";
        this.esBolson = true;
        this.cantidad = 1;
        this.otra = _otra;
        this.idRecuperador = _idRecuperador;
        this.nombre = _nombre;
        this.referencia = camion.ultimoCanal.elementosCargados.length;
    }

    /*Se obtiene el peso total del bolson*/
    /*bolson.obtenerPesototal();*/
    pesoTotal(){
        return this.pesoTotal;
    }
    
    primero(){
      return this.etapaV;
    }
  
    segundo(){
        return this.idBolson;
    }

    tercero(){
        return this.nombre;
    }
    
    cuarto(){
        return this.pesoTotal;
    }
}
