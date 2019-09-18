package Servelt;

import Conectadores.TraerReporte;
import Hilos.CrearDatos;
import clases.Excel;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Sheet;

public class Reporte extends HttpServlet {
        TraerReporte conBo;
        TraerReporte conCa;
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //FECHA PARA COLOCARLE EN NOMBRE
        Date fecha = new Date();
        
        //Cabecera
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment;filename=reporte "+fecha.getDate()+"-"+ (fecha.getMonth()+ 1) +".xlsx");
        
        //PARAMETROS RECOGIDOS
        String fechaStart = request.getParameter("fechastart");
        String fechaEnd = request.getParameter("fechaend");
        
        //CREACIÓN DEL LIBRO
        Excel libro = new Excel();
        
        //CREACIÓN DE HOJA Y BOLSONES AL EXCEL
        conBo = new TraerReporte(true,fechaStart,fechaEnd);
        Thread hiloConBo = new Thread(conBo);
        hiloConBo.start();
        System.out.println("--- CREANDO BOLSONES ---");
        
        //CREACIÓN DE HOJA Y CAMIONES AL EXCEL
        conCa = new TraerReporte(false,fechaStart,fechaEnd);
        Thread hiloConCa = new Thread(conCa);
        hiloConCa.start();
        System.out.println("--- CREANDO CAMIONES ---");
        
        try {
            hiloConBo.join();
            hiloConCa.join();
            Thread hiloBo = new Thread(new CrearDatos(conBo,libro.dameHoja("REPORTE DE BOLSONES")));
            Thread hiloCa = new Thread(new CrearDatos(conCa,libro.dameHoja("REPORTE DE CAMIONES")));
            hiloBo.start();
            hiloCa.start();
            hiloBo.join();
            hiloCa.join();
            libro.libro.write(response.getOutputStream());
            libro.libro.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("LIBRO CERRADO :D");
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
        processRequest(request, response);
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
        processRequest(request, response);
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
