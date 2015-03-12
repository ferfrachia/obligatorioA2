function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+document.forms[0].Protocolo.value+"://"+urlorigen;
}

function crearPuntoPres(){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/FParametrosPres?Openform&urlorigen='+urlorigen;
}
