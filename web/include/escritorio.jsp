<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Iterator"%>

<div id="escritorio" class="contenedorEs">
    <div>
      <div class="caja">
          <%@include file='informacion_usuario.jsp' %>
          <%
              if(cargo < 3){
          %>
        <div id="divIngreso">
          <h1 class="tituloEscritorio">Ingreso</h1>
          <%
            List lista = (List)request.getSession().getAttribute("lista");
            List listaDos = (List)request.getSession().getAttribute("listados");
            List canales = (List)request.getSession().getAttribute("canales");
            List nombreCanal = (List)request.getSession().getAttribute("listaCanal");
            List idCanal = (List)request.getSession().getAttribute("listaId");
            int idCv = (int)request.getSession().getAttribute("id_centroverde").hashCode();
            String link;
            String canal;
            String nombre;
            int id;
            String linkdos;
            for(int i = 0; i < lista.size(); i++){
                canal = canales.get(i).toString();
                linkdos = listaDos.get(i).toString();
                id = Integer.parseInt(idCanal.get(i).toString());
                if(id <= 4){
                    link = lista.get(i).toString();
                    nombre = nombreCanal.get(i).toString();
          %>
          <a onclick="tipoDeCarga('<%=nombre%>',<%=id%>,<%=idCv%>);">
              <img id="<%=id%>img" class="botonIngreso" alt="Boton del método <%=canal%>" src="<%=link%>.png" 
               onmouseover="hacerHover('<%=linkdos%>','<%=id%>img','')" onmouseout="hacerHover('<%=linkdos%>','<%=id%>img','on')">
          </a>
             <%
                }
                    }
             %> 
        </div>
        <div id="divEgreso">
          <h1 class="tituloEscritorio">Egreso</h1>
          <%
              for(int i = 0; i < lista.size(); i++){
                  canal = canales.get(i).toString();
                  linkdos = listaDos.get(i).toString();
                  id = Integer.parseInt(idCanal.get(i).toString());
                  if(id > 4 && id <= 6){
                      link = lista.get(i).toString();                  
                      nombre = nombreCanal.get(i).toString();
            %>
            <a onclick="tipoDeCarga('<%=nombre%>',<%=id%>,<%=idCv%>);">
                <img id="<%=id%>img" class="botonIngreso" alt="&quot;Boton del método RD&quot;" src="<%=link%>.png" 
               onmouseover="hacerHover('<%=linkdos%>','<%=id%>img','')" onmouseout="hacerHover('<%=linkdos%>','<%=id%>img','on')">
            </a>
            <%
              }}
          %>
        </div>
        <div id="divOtros">
          <h1 class="tituloEscritorio">Otras cargas</h1>
            <%
              for(int i = 0; i < lista.size(); i++){
                  canal = canales.get(i).toString();
                  linkdos = listaDos.get(i).toString();
                  id = Integer.parseInt(idCanal.get(i).toString());
                  if(id > 6){
                      link = lista.get(i).toString();                     
                      nombre = nombreCanal.get(i).toString();
            %>
            <a onclick="tipoDeCarga('<%=nombre%>',<%=id%>,<%=idCv%>,true);">
                <img id="<%=id%>img" class="botonIngreso" alt="&quot;Boton del método RD&quot;" src="<%=link%>.png" 
               onmouseover="hacerHover('<%=linkdos%>','<%=id%>img','')" onmouseout="hacerHover('<%=linkdos%>','<%=id%>img','on')">
            </a>
            <%
              }}
          %>
        </div>
        <%
            }else{
        %>
        <div>
            <div id="divIngreso">
                <h1 class="tituloEscritorio">Sistema</h1>
                <span>BIENVENID@ <%=usuarioR%>, vista para DGREC</span>
            </div>
            
            
        </div>
        <%
            }
        %>
      </div>
    </div>
</div>