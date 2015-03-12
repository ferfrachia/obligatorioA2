var xmlDoc;

function removeOptions(obj) {
	if (obj == null) return;
	if (obj.options == null) return;
	obj.options.length = 0;	 // That's it!
}
function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function loadXML(str){
//load xml file
// code for IE
	if (window.ActiveXObject){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(str);
	}
// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument){
		var parser=new DOMParser();
		xmlDoc=parser.parseFromString(str,"text/xml");
	}
	else{
		alert('Su navegador no permite ejecutar el script');
	}
}

function selBusqueda(){
	if (document.forms[0].sBusqueda[0].checked){
		div = document.getElementById("BusqNro")
		div.style.display="block"
		obtenerOrden(document.forms[0].sNroSesionNro.options[document.forms[0].sNroSesionNro.selectedIndex].text)
	}else{
		div = document.getElementById("BusqNro")
		div.style.display="none"
	}
	if (document.forms[0].sBusqueda[1].checked){
		div = document.getElementById("BusqFecha")
		div.style.display="block"
		obtenerOrden(document.forms[0].sNroSesionFecha.options[document.forms[0].sNroSesionFecha.selectedIndex].value)
	}else{
		div = document.getElementById("BusqFecha")
		div.style.display="none"
	}
}



function obtenerOrden(nro){
	document.forms[0].sNroSesion.value=nro;	
	div = document.getElementById("Ordenes");
	html="<table width='600' cellspacing=0 cellpading=\"5\" CLASS=\"TABLAENCABEZADO\" border=\"0\" ><tr><td  colspan=2 class= \"leyendaTabla\">&nbsp;ORDEN DEL DÍA ACTUAL : &nbsp; "+nro+"</td></tr><tr><td><table cellpadding=\"5\" cellspacing=\"0\" width=\"100%\">";
	html=html+"<tbody id=\"Orden\"></tbody></table></td></tr></table>";
	div.innerHTML=html;
	var bindArgs = {
		url: document.forms[0].sPathdb.value+'/VPuntosPorSesion2?readviewentries&RestrictToCategory='+nro+"&count=1000",
		error: function(type,data,evt){
				//alert("error!!"+data);
		},
		load: cargoOrden,
		mimetype: "text/plain",
		preventCache: true
		//formNode: document.getElementById("myForm")
	};
	dojo.io.bind(bindArgs);
}

function cargoOrden(type,data,evt){
	loadXML(data);
//	var root = xmlDoc.getElementsByTagName('viewentries')[0];
	var entries = xmlDoc.getElementsByTagName("viewentry");
	var cant =0;
	for (var i=0; i<entries.length; i++) {
		valores = entries[i].getElementsByTagName("text")
		nroPto = valores.item(0).firstChild.nodeValue;
		nroExp = valores.item(1).firstChild.nodeValue;
		asunto = valores.item(2).firstChild.nodeValue;
		estado = valores.item(3).firstChild.nodeValue;
		unid = valores.item(4).firstChild.nodeValue;
		if ((i % 2)==1){
			row= "<tr class=\"filaVista\" onmouseover=\"this.className='filaOvr'\" onmouseout=\"this.className='filaVista'\" onclick=\"abrirPto('"+unid+"')\"><td><b>"+nroPto+"</b></td><td><b>"+nroExp+"</b></td><td><b>"+asunto+"</b></td><td><b>"+estado+"</b></td></tr>";
		}else{
				row= "<tr class=\"filaVista\" onmouseover=\"this.className='filaOvr'\" onmouseout=\"this.className='filaVista'\"  style=\"background-color:#eeeeee;\"  onclick=\"abrirPto('"+unid+"')\"><td><b>"+nroPto+"</b></td><td><b>"+nroExp+"</b></td><td><b>"+asunto+"</b></td><td><b>"+estado+"</b></td></tr>";
		}
		new Insertion.Bottom('Orden', row);
		cant=cant+1;
	}
	//document.forms[0].nNroPto.value=cant+1
	var combo = document.getElementById("nNroPto");
	removeOptions(combo);
	cant= cant + 1;
	for (var i=cant; i>= 1 ; i --) {
    		var option = document.createElement("option");
    		option.text = i ;
    		option.value =  i;
		combo.options.add(option);
	}
}

function abrirPto(univid){
	
	window.open( DirABS()+'/0/'+univid+'/?Opendocument');
}

function aceptar(){
	document.getElementById('btnAceptar').style.visibility = "hidden";
	document.getElementById('btnCancelar').style.visibility = "hidden";

	document.forms[0].submit();

}

function cancelar(){
	document.getElementById('btnAceptar').style.visibility = "hidden";
	document.getElementById('btnCancelar').style.visibility = "hidden";
	if (document.forms[0].frameorigen.value != ""){
		location.href = document.forms[0].Protocolo.value+'://'+document.forms[0].frameorigen.value
	}else{
		window.history.back();
	}
}

function cargarPuntos(){
	html="";
	//numeros=StringToVector2(document.forms[0].NroPuntos.value,"##")
	//referencias=StringToVector2(document.forms[0].Puntos.value,"##")
	//nrosExp=StringToVector2Null(document.forms[0].NrosExp.value,"##")

}