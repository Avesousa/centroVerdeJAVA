<%@page contentType="text/html" pageEncoding="UTF-8"%>
<header>
    <div id="btn-menu" class="lista">
        <div class="obj">
            <div class = "img"></div>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="obj">
            <div class = "img"></div>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="obj">
            <div class = "img"></div>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div id="menu-res" class="menu">
        <ul>
            <li id="cargamenu">Carga</li>
            <%
                int num = ((int)request.getSession().getAttribute("cargo").hashCode());
            if(num >= 2){
            %>
            <li id="consultamenu">Consultas</li>
            <%
            }if(num > 2){
            %>
            <li id="dgrecmenu">DGREC</li>
            <%
            }
            %>
            
            
            <li id="cerrar" class="cerrar">Salir</li>

        </ul>
         <img class = "logoCV" src="image/LEYENDA.png" alt="Logo de la dirección">
         <img src="image/SED.png" alt="logo" onMouseOver="hacerHover('SED', this, 'on')" onMouseOut="hacerHover('SED', this, '')">

    </div>
    
</header>