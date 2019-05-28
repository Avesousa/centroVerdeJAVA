class CaracteristicaMaterial{


  constructor(_cantidad,_material) {
    //Falta por añadir ubicación del id del centro verde.
    $.post("pesosPorMaterial",{cv: $().val(),mat: _material},function(res){
       this.pesoTotal = parseFloat(res) * parseInt(_cantidad);
    })
    this.cantidad = _cantidad;
    this.material = _material;
  }
   
  pesoTotal(){
      return this.pesoTotal;
  }

}