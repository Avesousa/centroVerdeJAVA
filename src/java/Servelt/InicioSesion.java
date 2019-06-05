package Servelt;

import Conectadores.Iniciar;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

public class InicioSesion extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
//        PrintWriter out = response.getWriter();
        String usuario = request.getParameter("user");
        String contraseña = request.getParameter("pass");
        Iniciar in = new Iniciar();
        boolean valor = in.ingresar(usuario, contraseña);
        JSONObject res = new JSONObject();
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
        request.getSession().setAttribute("cargo", in.cargo);
        if(valor){
            request.getSession().setAttribute("inicio","si");
            res.put("nombre", in.nombreApellido);
            res.put("entro", true);
        }else {
            res.put("entro", false);
            request.getSession().setAttribute("inicio",null);
        }
        response.getWriter().write(res.toString());
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