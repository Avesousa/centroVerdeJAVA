class PesoTotalEntradaSalida {


  constructor(_pesoEntrada,_pesoSalida) {

    this.pesoTotal = _pesoEntrada - _pesoSalida;
    this.material = "MIXTO";
    this.cantidad = 1;
    this.caracteristica = "A GRANEL";

  }

  pesoTotal(){
    return this.pesoTotal;
}

}