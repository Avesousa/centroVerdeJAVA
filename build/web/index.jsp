<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%@include file='include/infocabecera.html' %>
    <body>
        <%
            if(((String)request.getSession().getAttribute("inicio") != null)){
                
        %>
        <%@include file='include/cabecera.jsp' %>
        <%@include file='include/escritorio.jsp' %>
        <%
        } else{
            //String l = request.getSession().getAttribute("inicio").toString();
        %>
        <%@include file='include/cabecerados.html' %>
        <div id="contenido">
            <div id="ingreso-principal" class ="ingreso contenedor contenedorIngreso">
                <div class="caja">
                    <div id ="aviso" class="Validador">
                    </div>
                    <br>
                    <form action="iniciar" id="ingreso">
                        <h3>Usuario</h3>
                        <input type="text" name="usuario" id="usuario" placeholder="Tu nombre de usuario"><br>
                        <h3>Contraseña</h3>
                        <input type="password" name="clave" id="clave" placeholder="Tu contraseña"><br>
                        <BR>
                        <input type="button" class="boton" value="Entrar" id="botonIngresar">
                    </form>

                </div>
            </div>    
        </div>
        <%
        }
        %>
        <%@include file='include/pie.html' %>
    </body>
</html>