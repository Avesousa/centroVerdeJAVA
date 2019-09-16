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
                <h1 class="tituloEscritorio">Reporte de carga:</h1>
                <input id="id_user" type="hidden" value="<%=Integer.parseInt((String)request.getSession().getAttribute("id_coop").toString())%>">
                <img class="camionImg" src="image/CAMION.png" alt="Camion de centros verdes"><br>
                <span id="textoRepuesta"></span>
                
                <form id="formularioReporte" action="<%=request.getContextPath()%>/Reporte">
                    <label>Desde:</label><br>
                    <input type="date" name="fechastart" id="fechaStart"><br>
                    <label>Hasta:</label><br>
                    <input type="date" name="fechaend" id="fechaEnd"><br>
                    <input type="submit" value="Descargar">
                </form>
                <img id="pensativo" src="image/carga.gif">
            </div>
          </div>
        </div>
    </div>
        <%@include file='include/pie.html' %>
    </body>
</html>
