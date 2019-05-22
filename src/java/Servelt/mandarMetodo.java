package Servelt;

import Conectadores.traerMetodos;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.Object;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

public class mandarMetodo extends HttpServlet {
   
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String tipo = request.getParameter("tipo");
        String canal = request.getParameter("canal");        
        JSONObject valor = new JSONObject();  
        if(tipo.equals("no")){
            request.getSession().setAttribute("metodo", request.getParameter("metodo"));
            request.getSession().setAttribute("canalUsado", canal);
            valor.put("id", canal);
            valor.put("metodo", request.getParameter("metodo"));
            response.getWriter().write(valor.toString());
        } else{
            traerMetodos co = new traerMetodos();
            co.traerMetodosDeDos(Integer.parseInt(request.getParameter("canal")), 
                    Integer.parseInt(request.getParameter("cv")),tipo);
            request.getSession().setAttribute("metodo", co.nombreDelSegundoMetodo);
            request.getSession().setAttribute("canalUsado", canal);
            valor.put("id", canal);
            valor.put("metodo", co.nombreDelSegundoMetodo);
            response.getWriter().write(valor.toString());
            //response.getWriter().print("{metodo:"+co.nombreDelSegundoMetodo+",canal:"+canal+"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
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
