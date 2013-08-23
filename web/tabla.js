function getCelda(rowIndex, colIndex) {
    return table.row[rowIndex][colIndex];
}


function getCabecera(colIndex) {
    return table.col[colIndex];
}

/**
 * Funcion encargada de crear y llenar y mostrar tablas con base en la informacion
 * contenida en la variable table, la cual es manipulada por las llamadas ajax.
 */
function llenarTabla() {
    //alert(table);
   if (typeof(table.row) !== "undefined") {
        var creartabla = '<table class="especial" border="5" cellpadding="3" >';
        creartabla += '<tr class="cabecera">';
        for (var k = 0; k < table.col.length; k++) {
            creartabla += '<th>' + getCabecera(k) + '</th>';
        }
        creartabla += '</tr>';
        for (var i = 0; i < table.row.length; i++) {
            creartabla += '<tr>';
            for (var j = 0; j < table.col.length; j++) {
                creartabla += '<td>' + getCelda(i, j) + '</td>';
            }
            creartabla += '</tr>';
        }
        creartabla += '</table>';
        document.getElementById("tabla").innerHTML = creartabla;
    } 
}


