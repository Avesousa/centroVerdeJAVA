package Servelt;

import Conectadores.TraerDatos;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author 20956852766
 */
public class buscadorId extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {
        response.setContentType("text/html;charset=UTF-8");
        String etapa = request.getParameter("etapa");
        String medio = request.getParameter("medio");
        String idRecuperador = request.getParameter("idRecuperador");
        
        int id = Integer.parseInt(request.getParameter("id"));
        int coop = Integer.parseInt(request.getParameter("coop"));
        TraerDatos td = new TraerDatos();
        System.out.println("ENTRO EN UN BUSCADOR DE ID");
        System.out.println(idRecuperador);
        if(idRecuperador.equals("si"))
            td.traerId(medio, id, coop);
        else
            td.traerId(id, etapa, medio, coop);
        try {
            JSONObject valor = new JSONObject();
        if(td.nombre != null){
            valor.put("nombre", td.nombre);
            valor.put("id",td.id);
        } else{
            valor.put("nombre", "No encontrado");
            valor.put("id", 0);
        }
            valor.put("proyecto", etapa);
            response.getWriter().write(valor.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (JSONException ex) {
            Logger.getLogger(buscadorId.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (JSONException ex) {
            Logger.getLogger(buscadorId.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
