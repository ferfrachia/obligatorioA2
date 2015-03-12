function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 
function imprimirFirmas(usuarios,Fechas){
if (usuarios.vLength>0){
	document.write('<table cellpadding="0" cellspacing="0">')
}
for (var i =0;i<usuarios.vLength;i++){
		usuario = usuarios.vArray[i];
		txtFecha= Fechas.vArray[i];
		 	// Aca tenemo que imprimir la firma
			document.write('<tr> <td class="TablaIconoChico" >  </td> <td class="TextoFirmaOK">Resolución incluída en el Acta firmada  por ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
	}
if (usuarios.vLength>0){
	document.write('</table>');
}
}
function validarFirmas(usuarios,Firmantes,Fechas){
for (var i =0;i<usuarios.vLength;i++){
		usuario = usuarios.vArray[i];
		txtFecha= Fechas.vArray[i];
		if (Firmantes.vIsMember(usuarios.vArray[i])){
		 	// Aca tenemo que imprimir la firma
			document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
		} else{
			// No se pudo validar la firma del creador
			document.forms[0].ErrorFirma.value="1";
			document.write('<tr> <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+usuario+' . Consulte con el Administrador del sistema. </td></tr>');
		}
	}
}
function dibujarImg(nombre){

	return "<img src='"+ DirABS() +document.getElementById("unid").value+"/$FILE/" + nombre+"' alt='' />";
}