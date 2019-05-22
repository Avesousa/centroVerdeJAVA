<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%@include file='include/infocabecera.html' %>
    <body>
        <%@include file='include/cabecera.html' %>
<div class="contenedorMenu">
    <%
            List lista = (List)request.getSession().getAttribute("lista");
            List listaDos = (List)request.getSession().getAttribute("listados");
            List canales = (List)request.getSession().getAttribute("canales");
            List nombreCanal = (List)request.getSession().getAttribute("listaCanal");
            List idCanal = (List)request.getSession().getAttribute("listaId");
            String metodo = (String)request.getSession().getAttribute("metodo");
            String canalUsadoString = (String)request.getSession().getAttribute("canalUsado").toString();
            String idCvString = (String)request.getSession().getAttribute("id_centroverde").toString();
            String idCoopString = (String)request.getSession().getAttribute("id_coop").toString();
            int idCv = Integer.parseInt(idCvString);
            int idCoop = Integer.parseInt(idCoopString);
            int canalUsado = Integer.parseInt(canalUsadoString);
            String link;
            String canal;
            String nombre;
            String linkdos;
            String linkDosUsado = "Ha ocurrido un error";
            int id;
            for(int i = 0; i < lista.size(); i++){
                canal = canales.get(i).toString();
                link = lista.get(i).toString();
                linkdos = listaDos.get(i).toString();
                nombre = nombreCanal.get(i).toString();
                id = Integer.parseInt(idCanal.get(i).toString());  
                System.out.println("El id del actual es: " + id + " Canal seleccionado es: " + canalUsado);
                if(canalUsado == id){
                    linkDosUsado = linkdos;
          %>
    <div class="botonMenu" id="<%=id%>">
        <a id="<%=id%>a" onclick="cambioPantalla('<%=id%>','<%=linkdos%>','rapido')">
            <img id="<%=id%>img" alt="Boton del método RD" src="<%=linkdos%>s.png">
        </a>
        
    </div>
        <%
            }else if(!canal.equals("VENTA" ) && !canal.equals("DESCARTE")){
            System.out.println("**** EL ID ES IGUAL DEL CANAL USADO**********");
        %>
        <div class="botonMenu" id="<%=id%>">
       <a id="<%=id%>a" onclick="cambioPantalla('<%=id%>','<%=linkdos%>','rapido')">
            <img id="<%=id%>img" alt="Boton del método RD" src="<%=link%>.png">
        </a>
    </div>    
        <%
        }else{
        %>
        <div class="botonMenu" id="<%=id%>">
        <a id="<%=id%>a" onclick="cambioPantalla('<%=id%>','<%=linkdos%>','rapido')">
            <img id="<%=id%>img" alt="Boton del método RD" src="<%=link%>.png">
        </a>
        </div>
        <%
        }
                }
             %> 
    </div>
             <input type="hidden" value="<%=canalUsado%>" id="inputVariable">
</div>
<div id="carga" class="contenedor carga contenedorCargaMovil">
                <div class="caja cajaCarga cajaMovil">
                  <div id="bolson" class="contenedorCarga">
                    <h1 class="tituloEscritorio cargaTitulo">Carga de datos:</h1>
                    <!--INFORMACIÓN CON PESO Y CANTIDADES DE BOLSONES-->
                    <div class="mostrador" id="mostrador">
                        <!--CANTIDAD-->
                        <div id="mostradorCantidad" class="contador">
                            <p>Cantidad:</p>
                            <p id="cantidadMostrado">0</p>
                        </div>
                        <!--PESO-->
                        <div id="mostradorPeso" class="contador">
                            <p>Peso total:</p>
                            <p id="pesoMostrado">0,00KG</p>
                        </div><br><br>
                    </div>
                    <!--COMIENZA A CARGAR--> 
                    <!--AGREGAR PATENTE-->
                    <div class="contenidoCarga">
                    <div id ="validadorPatente" class = "divValidacion">Hola que tal:D</div>
                      <div class="seccionBolsonSelect">
                            <input type="text" name="patente" id="patente" placeholder="AA123AA" maxlength="7"
                            title="Deberás ingresar valores de patente ejemplo: AA123AA ó AAA123"
                            pattern="([A-Z]{3}[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2})"
                            oninput="this.value = this.value.toUpperCase(); verificarPatente(this.value);" 
                            onblur="verificarPatente(this.value);" required><br><br>
                            <input type="hidden" id="fecha" value="21/05/2019"> 
                            <input type="hidden" id="hora" value="18:00"> 
                            <input type="hidden" id="idCanal" value="<%=canalUsado%>">
                            <input type="hidden" id="linkCanal" value="<%=linkDosUsado%>">
                            <input type="hidden" id="idCv" value="<%=idCv%>">
                            <input type="hidden" id="idCoop" value="<%=idCoop%>">
                            <input type="hidden" id="metodo">
                            <div id="etapaDiv">
                            <select name="etapa" id="etapa"></select><br>
                        </div>
                        <div id="materialDiv">
                            <select name="material" id="material" onchange="consulta(this.value,'#caracteristica','c')"></select><br>
                        </div>
                        <div id="caracteristicaDiv">
                        <select name="caracteristica" id="caracteristica"></select><br>
                        </div>
                      </div><br>
                      <div class="seccionBolson" id="datosParaAgregar">
                        <!-- FIJAR QUE ES LO QUE NECESITA CAMBIAR PARA VERIFICAR NOMBRE E ID-->
                        <input type="text" name="NOMBRERD" id="nombre" placeholder = "Recuperador">
                        <input type="number" name="IDRD" id="idRecuperador" min = "1" max ="5" placeholder = "ID del Recuperador">
                        <input type="number" name="IDBL" id="idBolson" min = "1" max ="5" placeholder = "ID del Bolsón">
                        <input type="number" name="peso" id="pesoBolson" placeholder = "Peso Bolson(KG)">
                        <input type="number" name="peso" id="pesoEntrada" placeholder = "P. Entrada(KG)">
                        <input type="number" name="cantidad" id="cantidad" placeholder = "Cantidad">
                        <input type="number" name="peso" id="pesoSalida" placeholder = "P. Salida(KG)">
                        <input type="number" name="peso" id="pesoUnitario" placeholder = "P. Material(KG)">
                        <button id="botonCargar" class="boton botonCargar" name="btn1" onClick="camion.ultimoCanal.cargar();">Cargar</button>
                      </div>
                      <div class="seccionBolson">
                          <table id="tablaResumen">
                          </table>
                              <button disabled id="botonEnviar" class="boton botonCargar" name="btn1" onClick="camion.ultimoCanal.enviar()">Enviar</button>
                      </div>
                    </div>
                  </div>
            </div>
<%@include file='js/cargaScript.html' %>
<%@include file='include/pie.html' %>
    </body>
</html>