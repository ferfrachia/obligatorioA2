function DirABS(){ 
var pathname=location.pathname;  
return(document.getElementById("Protocolo").value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function buscar()
{
	if (document.forms[0].Query.value==""){
		alert("Debe ingresar Texto para realizar la búsqueda");
	}else{
		var pathDB = document.getElementById("BaseBusqueda").value;
		//top.location.href = pathDB+"/Busqueda?OpenAgent&TIPO=URL,texto="+document.forms[0].Query.value
		top.location.href = document.getElementById("Protocolo").value + "://" + pathDB+"/Search?OpenAgent&tipo=URL&tipoDoc=Resoluciones&sOrigen=Resoluciones&sPalabra=" +document.forms[0].Query.value
	}
}

function buscarPublica()
{
	if (document.forms[0].Query.value==""){
		alert("Debe ingresar Texto para realizar la búsqueda");
	}else{
		var pathDB = DirABS();
		top.location.href = pathDB+"/BusquedaPublica?OpenAgent&tipoDoc=Resoluciones&TIPO=URL,texto="+document.forms[0].Query.value
	}
}
function BusquedaAvanzada(){
	var pathDB = document.getElementById("BaseBusqueda").value;
	top.location.href = document.getElementById("Protocolo").value + "://" + pathDB+"/BusquedaGeneral?OpenForm&tipoDoc=Resoluciones&sOrigen=Resoluciones"
}
function cambiarContrasena(){
	top.location.href = document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/names.nsf?ChangePassword";
}

function IniciarSesion(){
	var pathDB = DirABS();
	top.location.href = pathDB+"?login&redirectto="+pathDB;
}