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
			document.write('<tr> <td class="TablaIconoChico" >  <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Acta firmada  por ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
	}
if (usuarios.vLength>0){
	document.write('</table>');
}
}