package Servelt;

import Conectadores.Iniciar;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InicioSesion extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
//        PrintWriter out = response.getWriter();
        String usuario = request.getParameter("user");
        String contraseña = request.getParameter("pass");
        Iniciar in = new Iniciar();
        boolean valor = in.ingresar(usuario, contraseña);
        request.getSession().setAttribute("lista",in.imgCanales);
        request.getSession().setAttribute("listados", in.imgCanalesDos);
        request.getSession().setAttribute("canales", in.abreviaturaCanal);
        request.getSession().setAttribute("listaCanal",in.nombreCanal);
        request.getSession().setAttribute("listaId",in.idCanal);
        request.getSession().setAttribute("id_centroverde", in.id_centroverde);
        request.getSession().setAttribute("usuario",usuario);
        request.getSession().setAttribute("centroverde",in.centroverde);
        request.getSession().setAttribute("cooperativa", in.cooperativa);
        request.getSession().setAttribute("id_coop", in.id_coop);
        request.getSession().setAttribute("id_user", in.id_user);
        if(valor){
            request.getSession().setAttribute("inicio","si");
            response.getWriter().write("ok"+in.cargo);
        }else {
            response.getWriter().write("noOk");
            request.getSession().setAttribute("inicio",null);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    @Override
    public String getServletInfo() {
        return "Short description";
    }

}