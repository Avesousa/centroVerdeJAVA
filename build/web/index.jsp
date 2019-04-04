<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="css/estilos.css" rel="stylesheet" type="text/css"/>
        <script src="js/jquery-3.3.1.js" type="text/javascript"></script>
        <script src="js/estilos.js" type="text/javascript"></script>
        <script src="js/ingreso.js" type="text/javascript"></script>
    </head>
    <body>
        <header>
            <img src="http://carlitos.com.ar/DGREC/image/SED.png" alt="logo" onMouseOver="hacerHover('SED', this, 'on')" onMouseOut="hacerHover('SED', this, '')">
            <img class = "logoCV" src="http://carlitos.com.ar/DGREC/image/LEYENDA.png" alt="Logo de la dirección">
        </header>
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
        
        <footer>
            <h1>Contacto</h1>
            <p><span>Correo: </span><a href="mailto:soportedgrec@gmail.com">soportedgrec@gmail.com</a>
                <span>Teléfono Fijo:</span> <a href=”tel:43606000”>4360-6000</a> INT:2901
            </p>
        </footer>
    </body>
</html>
