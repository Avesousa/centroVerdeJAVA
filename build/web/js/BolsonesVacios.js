class BolsonesVacios{


  constructor(_cantidad,_etapa) {
    this.cantidad = _cantidad;
    this.etapa = _etapa;
    this.pesoTotal = 0;
    this.referencia = (camion.ultimoCanal.elementosCargados.length+1);
    this.esBolsonVacio = true;
    console.log(this);
  }
  
  segundo(){
      return this.referencia;
  }
  
  primero(){
      return this.etapa;
  }
  
  tercero(){
      return "Ingreso";
  }
  
  cuarto(){
      return this.cantidad;
  }
 
}
