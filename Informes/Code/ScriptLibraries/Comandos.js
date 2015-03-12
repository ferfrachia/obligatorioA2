function Guardar()
{
	if (Confirmar("Guardar")) {
		if (Validar()) {
			if (document.forms[0].EstadoSolicitud.value == "Pendiente") {
				AlmacenarCampos();
				document.forms[0].submit();
			}
			else {
				alert("El informe ya fue generado, no puede modificarse");
			}
		}
	}
}

function Confirmar(op)
{
	if (confirm('Desea solicitar el reporte especificado?')) {
		return true;
	}
	else {
		return false;
	}
}

function Validar()
{
	return true;
}

function AlmacenarCampos()
{
	var resultado = document.forms[0].Resultado;
	var etiquetas = document.forms[0].Etiquetas;
	resultado.value = "";
	etiquetas.value = "";

	var select = document.forms[0].multi;
	
	//Guardar nombres de unidades
	unOrigen = document.forms[0].UnidadOrigen;
	document.forms[0].NombreUnidadOrigen.value = unOrigen.options[unOrigen.selectedIndex].text;
	unDestino = document.forms[0].UnidadDestino;
	document.forms[0].NombreUnidadDestino.value = unDestino.options[unDestino.selectedIndex].text;

	//Guardar tema
	document.getElementById("Tema").value = document.getElementById("SelectTema").value;

	//Agregar campos y sus etiquetas al resultado
	for (i=0; i<select.length; i++) {
		if (select[i].selected) {
			if (i != 0) {
				resultado.value += "##" + select[i].value;
				etiquetas.value += "##" + select[i].text;
			}
			else {
				resultado.value += select[i].value;
				etiquetas.value += select[i].text;
			}
		}
	}
}
