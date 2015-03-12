function DirABS(){ 
var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}
function dibujarImg(nombre){

	return "<img src='"+ DirABS() +document.getElementById("unid").value+"/$FILE/" + nombre+"' alt='' />";
}