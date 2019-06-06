class CaracteristicaMaterial{


  constructor(_cantidad,_material,_caracteristica) {
    this.caracteristica = _caracteristica;
    this.cantidad = _cantidad;
    this.material = _material;
    retornarPeso(this.material,this.caracteristica,this.cantidad,this);
    console.log(this);
  }
  
 
}