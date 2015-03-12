function DirABS(){ 
var pathname=location.pathname;  

return(document.getElementById("Protocolo").value+'://'+location.hostname+":"+document.getElementById("Puerto").value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
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

function salir(){
	var pathname=location.pathname; 
	pathname=document.getElementById("Protocolo").value+'://'+location.hostname+":"+document.getElementById("Puerto").value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	location.href = pathname+"/publico";
}
function imprimir(univid){
	var pathname=location.pathname; 
	var urlorigen = ""
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	window.open(pathname+'/Resolucion Publicada?OpenForm&id='+univid+'&imprimir=1','ResolucionImp','menubar=no,status=yes,resizable=yes,scrollbars=yes,width=790,height=590');
}
function dibujarImg(nombre){

	return "<img src='"+ DirABS() +document.getElementById("unid").value+"/$FILE/" + nombre+"' alt='' />";
}