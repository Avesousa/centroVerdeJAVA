package Conectadores;

import Movilizadores.Reportes;
import java.util.ArrayList;
import java.util.List;

public class TraerReporte extends Conexion implements Runnable{

    public List<Reportes> reportes;
    boolean tipo;
    private String fechaStart;
    private String fechaEnd;
    

    public TraerReporte(boolean tipo,String fechaStart, String fechaEnd){
        super();
        this.tipo = tipo;
        this.fechaStart = fechaStart;
        this.fechaEnd = fechaEnd;
    }

    @Override
    public void run() {
        if(tipo) traerBolson();
        else traerCamion();
    }
    
    
    public void traerBolson() {
        try {
            String sql = "SELECT "
                    + "CV.nombre_centroverde as 'CV',"
                    + "COP.abreviatura_cooperativa as 'COOP',"
                    + "I.id_ingreso AS 'ID INGRESO',"
                    + "B.id_bolson_pk AS 'ID BOLSON PK',"
                    + "B.id_asociado AS 'ID RECUPERADOR',"
                    + "concat(R.nombre,\" \",R.apellido) AS 'ASOCIADO',"
                    + "B.id_bolson AS 'ID BOLSON',"
                    + "DATE(I.fecha) as 'FECHA',"
                    + "DATE_FORMAT(I.fecha,'%H:%I:%S') AS 'HORA',"
                    + "B.etapa as 'ETAPA CARGADA',"
                    + "Ca.patente as 'PATENTE',"
                    + "round(B.peso,2) as 'PESO',"
                    + "round((B.peso-10*B.peso/100)-2,2) as 'PESO-10%-2',"
                    + "round(4.5*((B.peso-10*B.peso/100)-2),2) as  'MONTO $',"
                    + "U.usuario_usuario AS 'USUARIO DE CARGA',  "
                    + "I.fecha_carga AS 'FECHA DE CARGA',"
                    + "R.proyecto as 'ETAPA FINAL',"
                    + "B.otra as 'METODO' "
                    + "FROM "
                    + "centroverde.bolsones B, "
                    + "centroverde.asociados R, "
                    + "centroverde.usuarios U, "
                    + "centroverde.historico_ingresos_usuario HU, "
                    + "centroverde.ingresos_centros_verdes I, "
                    + "centroverde.ingreso_camiones Ca, "
                    + "centroverde.canales Can, "
                    + "centroverde.centro_verde CV, "
                    + "centroverde.cooperativas COP "
                    + "WHERE "
                    + "HU.id_ingreso = B.id_ingreso and "
                    + "B.id_asociado = R.id_asociado and "
                    + "I.id_ingreso = HU.id_ingreso and "
                    + "HU.id_usuario = U.id_usuario and "
                    + "Ca.id_ingreso = I.id_ingreso and "
                    + "B.id_canal = Can.id_canal and "
                    + "I.id_cv = CV.id_centroverde and "
                    + "CV.id_cooperativa= COP.id_cooperativa and "
                    + "CV.id_cooperativa = 4 and "
                    + "I.fecha BETWEEN '"+fechaStart+"' AND '"+fechaEnd+"'"
                    + "order by fecha DESC;";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            reportes = new ArrayList();
            reportes.add(new Reportes());
            while (resultado.next()) {
                reportes.add(new Reportes(
                        resultado.getString(1),
                        resultado.getString(2),
                        resultado.getString(3),
                        resultado.getString(4),
                        resultado.getString(5),
                        resultado.getString(6),
                        resultado.getString(7),
                        resultado.getString(8),
                        resultado.getString(9),
                        resultado.getString(10),
                        resultado.getString(11),
                        resultado.getFloat(12),
                        resultado.getFloat(13),
                        resultado.getFloat(14),
                        resultado.getString(15),
                        resultado.getString(16),
                        resultado.getString(17),
                        resultado.getInt(18)
                ));
            }
        } catch (Exception e) {
            throw new NullPointerException("No conecto por error: " + e);
        } finally {
            cerrarConexion();
        }
    }
    public void traerCamion() {
        try {
            String sql = "SELECT " +
                "CV.nombre_centroverde AS 'CV'," +
                "CO.abreviatura_cooperativa AS 'COOP'," +
                "MI.id_ingreso AS 'ID INGRESO'," +
                "DATE(I.fecha) AS 'FECHA'," +
                "DATE_FORMAT(I.fecha,'%H:%I:%S') AS 'HORA'," +
                "CA.patente AS 'PATENTE'," +
                "C.abreviatura AS 'CANAL'," +
                "MI.formato AS 'FORMATO'," +
                "MI.material AS 'MATERIAL'," +
                "ROUND(MI.peso_total,2) AS 'PESO'," +
                "U.usuario_usuario AS 'USUARIO DE CARGA'," +
                "I.fecha_carga AS 'FECHA DE CARGA' " +
                "FROM " +
                "centroverde.material_ingreso MI, " +
                "centroverde.ingresos_centros_verdes I," +
                "centroverde.canales C," +
                "centroverde.historico_ingresos_usuario HU," +
                "centroverde.usuarios U," +
                "centroverde.ingreso_camiones CA," +
                "centroverde.centro_verde CV," +
                "centroverde.cooperativas CO " +
                "WHERE " +
                "MI.id_ingreso = I.id_ingreso AND " +
                "MI.id_canal = C.id_canal AND " +
                "MI.id_ingreso = HU.id_ingreso AND " +
                "HU.id_usuario = U.id_usuario AND " +
                "CA.id_ingreso = MI.id_ingreso AND " +
                "CV.id_centroverde = I.id_cv AND " +
                "CO.id_cooperativa = CV.id_cooperativa AND " +
                "I.fecha BETWEEN '"+fechaStart+"' AND '"+fechaEnd+"'" +
                "ORDER BY I.fecha_carga";
            ps = conectador.prepareStatement(sql);
            resultado = ps.executeQuery();
            System.out.println("TERMINÓ TRAERREPORTE - CONEXION -");
            reportes = new ArrayList();
            reportes.add(new Reportes("null"));
            while (resultado.next()) {
                reportes.add(new Reportes(
                        resultado.getString(1),
                        resultado.getString(2),
                        resultado.getString(3),
                        resultado.getString(4),
                        resultado.getString(5),
                        resultado.getString(6),
                        resultado.getString(7),
                        resultado.getString(8),
                        resultado.getString(9),
                        resultado.getFloat(10),
                        resultado.getString(11),
                        resultado.getString(12)
                ));
            }
        } catch (Exception e) {
            throw new NullPointerException("No conecto por error: " + e);
        } finally {
            cerrarConexion();
        }
    }
    

}
