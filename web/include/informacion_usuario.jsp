<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String centroverdeR = (String)request.getSession().getAttribute("centroverde");
    String cooperativaR = (String)request.getSession().getAttribute("cooperativa");
    String usuarioR = (String)request.getSession().getAttribute("usuario");
%>
<div id="divInformacion">
    <div class="infouser">
       <p><b>usuario:</b> <%=usuarioR%></p>
       <p><b>cooperativa:</b> <%=cooperativaR%></p>
       <p><b>Centro Verde:</b> <%=centroverdeR%></p>
    </div>
</div>
