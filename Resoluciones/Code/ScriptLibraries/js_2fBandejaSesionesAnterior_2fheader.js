function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
}

function crearSesion(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/FSesion?Openform&urlorigen='+urlorigen+"&unidad="+document.forms[0].sUnidad.value;
}
function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 
function actualizarIFrame(){
	var frm = document.forms[0];
	try{
		var unidad = frm.sUnidad.options[frm.sUnidad.selectedIndex].value;
		var estado = frm.sEstado.options[frm.sEstado.selectedIndex].value;
		var iframe = document.getElementById("frameSesiones")
		var path = DirABS();
		iframe.src=path+'/GenerarBandejaSesionXML?OpenAgent&estado='+estado+"&unidad="+unidad
	}catch(e){		
		var estado = frm.sEstado.options[frm.sEstado.selectedIndex].value;
		var iframe = document.getElementById("frameSesiones")
		var path = DirABS();
		iframe.src=path+'/GenerarBandejaSesionXML?OpenAgent&estado='+estado+"&unidad="
	}	
}