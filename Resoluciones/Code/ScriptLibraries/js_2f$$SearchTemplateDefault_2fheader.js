function DirABS(){ 
var pathname=location.pathname;  
pathname=pathname.toUpperCase();
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5)))  
} 

function Salir(){
	var pathDB = DirABS();
	window.location.href = pathDB;
}