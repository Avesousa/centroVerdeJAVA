class CaracteristicaMaterial{


  constructor(_cantidad,_material,_caracteristica,_peso,_pesoSalida) {
    this.caracteristica = _caracteristica;
    this.cantidad = _cantidad;
    this.material = _material;
    this.pesoSalida = _pesoSalida;
    if(!_peso)
        this.pesoTotal = retornarPeso(this.material,this.caracteristica,this.cantidad);
    this.pesoTotal = parseInt(_peso);
    this.referencia = camion.ultimoCanal.elementosCargados.length;
    console.log(this);
  }
  
  primero(){
      return this.caracteristica;
  }
  
  segundo(){
      return this.material;
  }
  
  tercero(){
      return this.cantidad;
  }
  
  cuarto(){
      return this.pesoTotal;
  }
 
}