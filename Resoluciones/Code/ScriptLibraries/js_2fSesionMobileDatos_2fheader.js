function DirABS(){ 
var pathname=location.pathname;  
	return(document.getElementById('Protocolo').value+'://'+location.hostname+":"+document.getElementById('Puerto').value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}