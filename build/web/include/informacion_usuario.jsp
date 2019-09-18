<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String centroverdeR = (String)request.getSession().getAttribute("centroverde");
    String cooperativaR = (String)request.getSession().getAttribute("cooperativa");
    String usuarioR = (String)request.getSession().getAttribute("usuario");
    int cargo = ((int)request.getSession().getAttribute("cargo").hashCode());
%>
<div id="divInformacion">
    <div class="infouser">
       <p><b>Usuario:</b> <%=usuarioR%></p>
       <%
           if(cargo > 2){
       %>
       <p><b>Lugar:</b> DGREC</p>
       <%
       } else {
       %>
       <p><b>Cooperativa:</b> <%=cooperativaR%></p>
       <p><b>Centro Verde:</b> <%=centroverdeR%></p>
       <%
       }
       %>
    </div>
</div>
