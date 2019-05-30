class PesoTotalEntradaSalida {


  constructor(_pesoEntrada,_pesoSalida) {

    this.pesoTotal = _pesoEntrada - _pesoSalida;
    this.material = "mixto";
    this.cantidad = 1;

  }

  pesoTotal(){
    return this.pesoTotal;
}

}