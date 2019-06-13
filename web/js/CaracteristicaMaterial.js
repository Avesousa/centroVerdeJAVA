class CaracteristicaMaterial{


  constructor(_cantidad,_material,_caracteristica) {
    this.caracteristica = _caracteristica;
    this.cantidad = _cantidad;
    this.material = _material;
    this.pesoTotal = retornarPeso(this.material,this.caracteristica,this.cantidad);
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
 
}