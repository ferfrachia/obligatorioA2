function DirABS(){ 
	var pathname=location.pathname;  
	pathname=pathname.toUpperCase();
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5)))  
}

function guardar(){
	document.forms[0].submit();
}
function goBack(){
	history.back();
}