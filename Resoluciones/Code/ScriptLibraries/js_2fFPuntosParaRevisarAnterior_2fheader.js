function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function cambiarUnidad(){
	var div=document.getElementById("iframe");
	var unidad;
	unidad=document.forms[0].cUnidades.options[document.forms[0].cUnidades.selectedIndex].value;
	div.src=DirABS()+"/GenerarBandejaParaRevisarXML?OpenAgent&estado=ParaRevisar&unidad="+unidad;
}