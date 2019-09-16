
package Hilos;

import Conectadores.TraerReporte;
import org.apache.poi.ss.usermodel.Sheet;

public class CrearDatos implements Runnable {
    
    TraerReporte con;
    Sheet hoja;
    
    public CrearDatos(TraerReporte con, Sheet hoja){
        this.con = con;
        this.hoja = hoja;
    }
    
    
    
    @Override
    public void run() {
        for(int i = 0; i < con.reportes.size(); i++){
            System.out.println("REPORTE: " + i + "/" + con.reportes.size());
            for(int j = 0; j < con.reportes.get(i).lista.size(); j++){
                (j > 0 ? hoja.getRow(i) : hoja.createRow(i)).createCell(j).setCellValue(con.reportes.get(i).lista.get(j).toString());
            }
        }
    }
    
    
    
}
