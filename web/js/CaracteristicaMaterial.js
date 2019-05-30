class CaracteristicaMaterial{


  constructor(_cantidad,_material,_caracteristica) {
    //Falta por añadir ubicación del id del centro verde.
    $.post("pesosPorMaterial",{cv: $().val(),mat: _material,car: _caracteristica},function(res){
       this.pesoTotal = parseFloat(res) * parseInt(_cantidad);
    })
    this.caracteristica = _caracteristica;
    this.cantidad = _cantidad;
    this.material = _material;
  }
   
  pesoTotal(){
      return this.pesoTotal;
  }

}