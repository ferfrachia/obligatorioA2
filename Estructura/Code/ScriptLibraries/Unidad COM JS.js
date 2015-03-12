/*function cargarMiembrosComunicaciones(){
	var vValores =  StringToVector3(document.forms[0].nbMiembrosComunicaciones.value,",");
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (document.getElementById("Edicion").value == 1){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroComunicacion("+ i+ ")\" style='cursor:pointer'></td>";
		}		
		row+="</tr>";
	}
	row+="</table>"
		document.getElementById("nbMiembrosComunicacion-List").innerHTML=row;	
}

function QuitarMiembroComunicacion(indice){
	vValores =  StringToVector3(document.forms[0].nbMiembrosComunicacion.value,",");
	vValores.vBorrar(indice)
	document.forms[0].nbMiembrosComunicacion.value=VectorToString2(vValores,",");
	cargarMiembrosComunicaciones();	
}*/

function crearComunicacion() {
	var codigo = document.forms[0].selCom.options[document.forms[0].selCom.selectedIndex].value;
	var loc = DirABS() + "MiembrosComunicacion?OpenForm&unidad=" + document.getElementById("sNroUnidad").value+"&codigo="+codigo;
	location.replace(loc);
}

function abrirCom(id) {
	var loc = DirABS() + "0/" + id + "?OpenDocument";
	location.replace(loc);
}

function borrarComunicaciones(codigo) {
	if (confirm("¿Está seguro que desea quitar la comunicación seleccionada?")) {
		var unidad = document.getElementById("sNroUnidad").value;
		var loc = DirABS() + "(ComController)?OpenAgent&unidad=" + unidad + "&codigo=" + codigo;
		location.replace(loc);
	}
}