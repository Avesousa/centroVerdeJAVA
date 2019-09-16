package Servelt;

import Conectadores.TraerMetodos;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.Object;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

public class mandarMetodo extends HttpServlet {
   
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {
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
            TraerMetodos co = new TraerMetodos();
            co.traerMetodosDeDos(Integer.parseInt(request.getParameter("cv")), 
                    Integer.parseInt(request.getParameter("canal")),tipo);
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
        try {
            processRequest(request, response);
        } catch (JSONException ex) {
            Logger.getLogger(mandarMetodo.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (JSONException ex) {
            Logger.getLogger(mandarMetodo.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
