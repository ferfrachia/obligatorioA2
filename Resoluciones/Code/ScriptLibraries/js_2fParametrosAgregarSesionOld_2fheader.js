var xmlDoc;

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
	html="<table width='600' cellspacing=0 cellpading=0 CLASS=\"TABLAENCABEZADO\" border=\"1\" bordercolor=\"#02468D\" ><tr><td  colspan=2 class= \"leyendaTabla\">&nbsp;ORDEN DEL DÍA ACTUAL : &nbsp; "+nro+"</td></tr><tr><td><table>";
	html=html+"<tbody id=\"Orden\"></tbody></table></td></tr></table>";
	div = document.getElementById("Ordenes");
	div.innerHTML=html;
	var bindArgs = {
		url: document.forms[0].sPathdb.value+'/VPuntosPorSesion2?readviewentries&RestrictToCategory='+nro+"&count=1000",
		error: function(type,data,evt){
				alert("error!!"+data);
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
		row= "<tr class=\"filaVista\" onmouseover=\"this.className='filaOvr'\" onmouseout=\"this.className='filaVista'\" onclick=\"abrirPto('"+unid+"')\"><td>"+nroPto+"</td><td>"+nroExp+"</td><td>"+asunto+"</td><td>"+estado+"</td></tr>";
		new Insertion.Bottom('Orden', row);
		cant=cant+1;
	}
	document.forms[0].nNroPto.value=cant+1
}

function abrirPto(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	window.open( pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen);
}