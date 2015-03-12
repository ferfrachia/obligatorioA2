function validarFirmas(usuarios,Firmantes,Fechas){
for (var i =0;i<usuarios.vLength;i++){
		usuario = usuarios.vArray[i];
		txtFecha= Fechas.vArray[i];
		if (Firmantes.vIsMember(usuarios.vArray[i])){
		 	// Aca tenemo que imprimir la firma
			document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
		} else{
			// No se pudo validar la firma del creador
			document.write('<tr> <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+usuario+' . Consulte con el Administrador del sistema. </td></tr>');
		}
	}
}

function DirABS(){ 
var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}
function dibujarImg(nombre){

	return "<img src='"+ DirABS() +document.getElementById("unid").value+"/$FILE/" + nombre+"' alt='' />";
}
