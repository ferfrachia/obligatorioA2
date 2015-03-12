function crearPunto(){
	var pathname=location.pathname;
	var urlorigen = location.hostname+"/"+ document.forms[0].cvBase.value + document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/FPunto?Openform&urlorigen='+urlorigen+"&unidad="+document.forms[0].cUnidades.options[document.forms[0].cUnidades.selectedIndex].value;
}
function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function cambiarUnidad(bandeja){
	var div=document.getElementById("iframe"+bandeja);
	var unidad;
	if (bandeja=="Borrador"){
		unidad=document.forms[0].cUnidades.options[document.forms[0].cUnidades.selectedIndex].value;
	}else{
		unidad=document.forms[0].cUnidadesAplazado.options[document.forms[0].cUnidadesAplazado.selectedIndex].value;
	}
	div.src=DirABS()+"/GenerarBandejaXML?OpenAgent&estado="+bandeja+"&unidad="+unidad;
}