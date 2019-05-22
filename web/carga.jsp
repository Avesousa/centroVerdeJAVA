<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%@include file='include/infocabecera.html' %>
    <body>
        <%@include file='include/cabecera.html' %>
<div id="carga" class="contenedor carga contenedorCargaMovil">
        <div class="caja cajaCarga">
          <div id="bolson" class="contenedorCarga">
            <h1 class="tituloEscritorio cargaTitulo">Carga de datos:</h1>
            <div class="mostrador" id="mostrador">
                <div id="mostradorCantidad" class="contador">
                    <p>Cantidad:</p>
                    <p id="cantidadMostrado">0</p>
                </div>
                <div id="mostradorPeso" class="contador">
                    <p>Peso total:</p>
                    <p id="pesoMostrado">0,00KG</p>
                </div><br><br>
            </div>
            <div class="contenidoCarga">
              <div id ="validador" class = "divValidacion"></div>
              <div class="seccionBolsonSelect">
                <div id="etapaDiv">
                  <input id="etapa" type="hidden" name="etapa" onblur="gestionarSubEtapa()"><br>
                </div>
                <div id="subetapaDiv">
                    <input id="subetapa" type="hidden" name="subEtapa"><br>
                </div>  
                <div id="materialDiv">
                  <input id="material" type="hidden" name="material">
                </div>
                <div id="caracteristicaDiv">
                  <input type="hidden"  id="caracteristica" name="caracteristica">
                </div>
              </div><br>
              <div class="seccionBolson" id="datosParaAgregar">
                <!-- FIJAR QUE ES LO QUE NECESITA CAMBIAR PARA VERIFICAR NOMBRE E ID-->
                <input type="hidden" name="NOMBRERD" id="nombre" placeholder = "Nombre del Recuperador">
                <input type="hidden" name="IDRD" id="id" min = "1" max ="4" placeholder = "ID del Recuperador">
                <input type="hidden" name="peso" id="pesoEntrada" placeholder = "Peso de Entrada(KG)" oninput="user.verificarPeso(); cambiarBoton(); clickear();" value="0">
                <input type="hidden" name="cantidad" id="cantidad" placeholder = "Cantidad" value="0" >
                <input type="hidden" name="peso" id="pesoSalida" placeholder = "Peso de Salida(KG)" oninput="user.verificarPeso(); cambiarBoton(); clickear();" value="0">
                <input type="hidden" name="peso" id="pesoUnitario" placeholder = "Peso Material(KG)" oninput="user.verificarPeso(); cambiarBoton(); clickear();" value="0">
                <button id="botonCargar" class="boton botonCargar" name="btn1" onClick="metodoParaCargar.cargar();" disabled>Cargar</button>
              </div>
              <div class="seccionBolson">
                  <table id="tablaResumen">
                  </table>
                      <button disabled id="botonEnviar" class="boton botonCargar" name="btn1" onClick="metodoParaCargar.enviar()">Enviar</button>
                      <button disabled id="botonContinuar" class="boton botonCargar" name="btn1" onClick="metodoParaMixto.continuar()">Continuar</button>
              </div>
            </div>
          </div>
          <div id="mixta" class="contenedorCarga">
              <h1 class="tituloEscritorio cargaTitulo">Seleccione canal de Recolección</h1>
              <div id="seccionEstadistica" class="seccionEstadistica">
              </div>
              <div id="validadorMixto" class="mostradorPeso">
              </div>
              <div class="contenidoCarga">
                <div id="imagenMixto" class="cajaMixta">
                </div>
                <button id="botonEnviarMixto" disabled class="boton" name="btn1" onClick="metodoParaMixto.enviar()">Enviar</button>
              </div>
          </div>
        </div>
      </div>
  </div>
  <%@include file='include/pie.html' %>
    </body>
</html>