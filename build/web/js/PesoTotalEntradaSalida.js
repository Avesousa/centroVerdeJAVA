class PesoTotalEntradaSalida {


  constructor(_pesoEntrada,_pesoSalida) {

    this.pesoTotal = _pesoEntrada - _pesoSalida;
    this.material = "Mixto";
    this.cantidad = 1;
    this.caracteristica = "A Granel";

  }

  pesoTotal(){
    return this.pesoTotal;
}

}