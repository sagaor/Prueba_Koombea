
function getXMLHTTPRequest() {
    var req = false;
    try {
        req = new XMLHttpRequest(); // Chrome, Firefox, Opera, IE 10.
    }
    catch (err1) {
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP"); // algunas versiones IE
        }
        catch (err2) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP"); // algunas versiones IE
            }
            catch (err3) {
                req = false;
            }
        }
    }
    return req;
}

//Almacena el contenido de la tabla obtenida desde la base de datos.
var table;


function llamarAjax(param) {
    try {
        var miPeticion = new getXMLHTTPRequest();
        var url = "http://localhost:8080/Prueba_Koombea/servlet";
        miPeticion.open("POST", url, true);
        miPeticion.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        miPeticion.onreadystatechange = function() {
            respuestaAjax(miPeticion);
        };
        miPeticion.send(param);
    } catch (e) {
        alert(e.name + ': ' + e.message);
    }
}


function respuestaAjax(miPeticion) {
    try {
        if (miPeticion.readyState === 4 && miPeticion.status === 200) {
            table = JSON.parse(miPeticion.responseText);
            llenarTabla();
        }
    } catch (e) {
        alert(e.name + ': ' + e.message);
    }
}
