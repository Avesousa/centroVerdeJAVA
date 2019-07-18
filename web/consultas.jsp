<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%@include file='include/infocabecera.html' %>
    <body>
    <%@include file='include/cabecera.jsp' %>  
    <div id="escritorio" class="contenedorEs">
        <div>
          <div class="cajaCarga">
              <%@include file='include/informacion_usuario.jsp' %>
            <div id="divIngreso">
                <h1 class="tituloEscritorio">Consultas en Base de Datos:</h1>
                <input id="id_user" type="hidden" value="<%=Integer.parseInt((String)request.getSession().getAttribute("id_coop").toString())%>">
                <img class="camionImg" src="image/CAMION.png" alt="Camion de centros verdes"><br>
                <select name="material" id="selconsultor">
                    <option>Seleccione tipo de consulta</option>
                    <option value="b">CONSULTA POR BOLSONES</option>
                    <option value="m">CONSULTA POR MATERIAL</option>
                    <option value="c">CONSULTA POR CAMIONES</option>
                </select><br>
                <!--<button onclick="consultarBolsones();">CONSULTA POR BOLSONES</button>
                <button onclick="consultarMaterial();">CONSULTA POR MATERIAL</button>
                <button onclick="consultarCamiones();">CONSULTA POR CAMIONES</button>-->
            </div>
            <div id="tableroConsulta">
              <h1 class="tituloEscritorio">Resultado</h1>
              <div>
                <table id="tablaConsulta">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
            </div>
            <!--<div id="divOtros">
              <h1 class="tituloEscritorio">Otras cargas</h1>
            </div>-->
          </div>
        </div>
    </div>
        <%@include file='include/pie.html' %>
    </body>
</html>
