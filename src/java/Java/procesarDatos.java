package Java;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Santiago
 */
public class procesarDatos {

    private static Connection conn = null;
    JSONObject json = new JSONObject();
    ResultSet rs = null;

    //Metodo para realizar la conexion con la base de datos.
    private Connection Conectar() throws SQLException {
        if (conn == null) {
            DriverManager.registerDriver(new org.apache.derby.jdbc.ClientDriver());
            conn = DriverManager.getConnection("jdbc:derby://localhost:1527/Prueba_Koombea");
        }
        return conn;
    }

    //Metodo para desconectar de la base de datos.
    private void Desconectar() throws SQLException {
        if (conn != null) {
            conn.close();
            conn = null;
        }
    }

    //
    public JSONObject llenarTabla(String name, String id, String gender) {
        try {
            Conectar();
            Statement s = Conectar().createStatement();
            if (!id.isEmpty()) {
                String sql = "select * from USUARIOS where ID=\'" + id + "\'";
                rs = s.executeQuery(sql);
                if (!rs.next()) {
                    sql = "INSERT INTO USUARIOS(ID, NAME, GENDER) VALUES(\'"
                            + id + "\'" + ",\'" + name + "\'" + ",\'" + gender + "\')";
                    s.executeUpdate(sql);

                    sql = "select ID, NAME, GENDER from USUARIOS";
                    rs = s.executeQuery(sql);
                } else {
                    sql = "select ID, NAME, GENDER from USUARIOS";
                    rs = s.executeQuery(sql);
                }
            }
            json = convertir(rs);
            s.close();
            Desconectar();
        } catch (SQLException | JSONException e) {
            System.out.println(e.getMessage());
        }
        return json;
    }

    //
    public static JSONObject convertir(ResultSet rs) throws SQLException,
            JSONException {

        JSONObject obj = new JSONObject();
        ResultSetMetaData rsmd = rs.getMetaData();
        int numColumnas = rsmd.getColumnCount();

        for (int i = 1; i < numColumnas + 1; i++) {
            obj.append("col", rsmd.getColumnName(i));
        }

        while (rs.next()) {

            Object[] objeto = new Object[numColumnas];

            for (int i = 1; i < numColumnas + 1; i++) {
                String nombreColumna = rsmd.getColumnName(i);

                if (rsmd.getColumnType(i) == java.sql.Types.VARCHAR) {
                    objeto[i - 1] = (rs.getString(nombreColumna));
                } else {
                    objeto[i - 1] = (rs.getString(i));
                }
            }
            obj = obj.append("row", objeto);
        }
        return obj;
    }
}
