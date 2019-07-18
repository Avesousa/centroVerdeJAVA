<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%@include file='include/infocabecera.html' %>
    <body>
        <%@include file='include/cabecera.jsp' %>
<div class="contenedorMenu">
    <%
            List lista = (List)request.getSession().getAttribute("lista");
            List listaDos = (List)request.getSession().getAttribute("listados");
            List canales = (List)request.getSession().getAttribute("canales");
            List nombreCanal = (List)request.getSession().getAttribute("listaCanal");
            List idCanal = (List)request.getSession().getAttribute("listaId");
            String metodo = (String)request.getSession().getAttribute("metodo");
            int iduser = Integer.parseInt((String)request.getSession().getAttribute("id_user").toString());
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
                if(id > 6){
                    if(canalUsado == id){
                        linkDosUsado = linkdos;
          %>
    <div class="botonMenu" id="<%=id%>">
        <a id="<%=id%>a" onclick="validarUsoMixto('<%=id%>','<%=linkdos%>','rapido')">
            <img id="<%=id%>img" alt="Boton del método RD" src="<%=linkdos%>s.png">
        </a>
        
    </div>
        <%
                }else if(!canal.equals("VENTA" ) && !canal.equals("DESCARTE")){
                System.out.println("**** EL ID ES IGUAL DEL CANAL USADO**********");
        %>
        <div class="botonMenu" id="<%=id%>">
       <a id="<%=id%>a" onclick="validarUsoMixto('<%=id%>','<%=linkdos%>','rapido')">
            <img id="<%=id%>img" alt="Boton del método RD" src="<%=link%>.png">
        </a>
    </div>    
        <%
            }else{
        %>
        <div class="botonMenu" id="<%=id%>">
        <a id="<%=id%>a" onclick="validarUsoMixto('<%=id%>','<%=linkdos%>','rapido')">
            <img id="<%=id%>img" alt="Boton del método RD" src="<%=link%>.png">
        </a>
        </div>
        <%
            }
        }
    }
             %> 
    </div>
             <input type="hidden" value="<%=canalUsado%>" id="inputVariable">
</div>
<div id="carga" class="contenedor carga contenedorCargaMovil">
                <div class="caja cajaCarga cajaMovil">
                  <div id="bolson" class="contenedorCarga">
                    <h1 class="tituloEscritorio cargaTitulo">Carga de Datos:</h1>
                    <!--INFORMACIÓN CON PESO Y CANTIDADES DE BOLSONES-->
                    <div class="mostrador" id="mostrador">
                        <!--CANTIDAD-->
                        <div id="mostradorCantidad" class="contador">
                            <p>Cantidad:</p>
                            <p id="cantidadMostrado">0</p>
                        </div>
                        <!--PESO-->
                        <div id="mostradorPeso" class="contador">
                            <p>Peso Total:</p>
                            <p id="pesoMostrado"></p>
                        </div><br><br>
                    </div>
                    <!--COMIENZA A CARGAR--> 
                    <!--AGREGAR PATENTE-->
                    <div class="contenidoCarga">
                    <div id ="validadorPatente" class = "divValidacion"></div>
                      <div class="seccionBolsonSelect">
                            <input type="text" name="patente" id="patente" placeholder="AA123AA - AAA123" maxlength="7"
                            title="Deberás ingresar valores de patente ejemplo: AA123AA ó AAA123"
                            pattern="([A-Z]{3}[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2})"
                            oninput="this.value = this.value.toUpperCase(); verificarPatente();" 
                            onblur="verificarPatente();" required><br><br>
                            <input type="hidden" id="fecha" value="in"> 
                            <input type="hidden" id="hora" value="in"> 
                            <input type="hidden" id="idCanal" value="<%=canalUsado%>">
                            <input type="hidden" id="linkCanal" value="<%=linkDosUsado%>">
                            <input type="hidden" id="idCv" value="<%=idCv%>">
                            <input type="hidden" id="idCoop" value="<%=idCoop%>">
                            <input type="hidden" id="idUser" value="<%=iduser%>">
                            <input type="hidden" id="metodo">
                            <div id="etapaDiv">
                            <select name="etapa" id="etapa"></select><br>
                        </div>
                        <div id="materialDiv">
                            <select name="material" id="material" onchange="armarFormato(this.value)"></select><br>
                        </div>
                        <div id="caracteristicaDiv">
                        <select name="caracteristica" id="caracteristica"></select><br>
                        </div>
                      </div><br>
                      <div class="seccionBolson" id="datosParaAgregar">
                        <div id ="validadorBolson" class = "divValidacion"></div>
                        <div id ="nombreRecuperador" class = "nombreDiv"></div>
                        <!-- FIJAR QUE ES LO QUE NECESITA CAMBIAR PARA VERIFICAR NOMBRE E ID-->
                        <input type="text" name="NOMBRERD" id="nombre" placeholder = "Recuperador" oninput="camion.ultimoCanal.metodo.verificadorCargar();">
                        <input type="number" name="IDRD" id="idRecuperador" min = "1" max ="5" placeholder = "ID del Recuperador">
                        <input type="number" name="IDBL" id="idBolson" min = "1" max ="5" placeholder = "ID del Bolsón">
                        <input type="number" name="peso" id="pesoBolson" placeholder = "Peso Bolsón (kg)" oninput="camion.ultimoCanal.metodo.verificadorCargar();">
                        <input type="number" name="peso" id="pesoEntrada" placeholder = "P. Entrada (kg)" oninput="camion.ultimoCanal.metodo.verificadorCargar();">
                        <input type="number" name="cantidad" id="cantidad" placeholder = "Cantidad" oninput="camion.ultimoCanal.metodo.verificadorCargar();">
                        <input type="number" name="peso" id="pesoSalida" placeholder = "P. Salida (kg)" oninput="camion.ultimoCanal.metodo.verificadorCargar();">
                        <input type="number" name="peso" id="pesoUnitario" placeholder = "P. Material (kg)" oninput="camion.ultimoCanal.metodo.verificadorCargar();">
                        <textarea type="text" name="comentario" id="comentario" placeholder = "Explique motivo de ingreso del camión" 
                        oninput="camion.ultimoCanal.metodo.verificadorCargar();" onblur="camion.ultimoCanal.metodo.cargaDato();"></textarea>
                        <button id="botonCargar" class="boton botonCargar" name="btn1" onClick="camion.ultimoCanal.cargar();" disabled>Cargar</button>
                      </div>
                      <div class="seccionBolson">
                          <table id="tablaResumen" class="tablesorter">
                              <thead>
                             </thead>
                              <tbody>
                              </tbody>
                          </table>
                              <button disabled id="botonEnviar" class="boton botonCargar botonEnviar" name="btn1" onClick="camion.ultimoCanal.metodo.enviar()">Enviar</button>
                              <button disabled id="botonEntradaSalida" class="boton botonCargar botonEnviar" name="btn1" onClick="camion.ultimoCanal.cargar()">Enviar</button>
                      </div>
                    </div>
                  </div>
            </div>
<%@include file='js/cargaScript.html' %>
<%@include file='include/pie.html' %>
    </body>
</html>