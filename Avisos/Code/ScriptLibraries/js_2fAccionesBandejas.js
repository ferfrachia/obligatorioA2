function Configuracion(){	var tipoDoc = document.getElementById("tipoDoc").options[document.getElementById("tipoDoc").selectedIndex].value;	var protocolo = document.getElementById("Protocolo").value;	var puerto = document.getElementById("Puerto").value;	var host = document.getElementById("sHostAdmin").value;	var path = document.getElementById("sPathAdmin").value;		var url = protocolo + "://" + host + ":" + puerto + "/" + path + "/";	if (tipoDoc.toUpperCase() == "EXPEDIENTE") {		url += "fVisConfiguracion";	} else {		url += "Configuracion " + tipoDoc;	}	url += "?OpenForm";	location.replace(url);}function Estructura() {	// modulo seleccionado	var tipoDoc = document.getElementById("tipoDoc").options[document.getElementById("tipoDoc").selectedIndex].value;		// año seleccionado	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;	// unidad seleccionada	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;	// armo la url de retorno	var url = location.href;	url = url.substring(url.indexOf("://")+3);	if (url.indexOf("&tipoDoc=") != -1) {		url = url.substring(0, url.indexOf("&tipoDoc="));	}	if (url.indexOf("&anio=") != -1) {		url = url.substring(0, url.indexOf("&anio="));	}	if (url.indexOf("&unidad=") != -1) {		url = url.substring(0, url.indexOf("&unidad="));	}	url = url + "&tipoDoc=" + tipoDoc + "&anio=" + anio + "&unidad=" + unidad;		// armo la url	url = document.getElementById("Protocolo").value+"://"			+document.getElementById("sHostDbOrg").value+":"			+document.getElementById("Puerto").value+"/"			+document.getElementById("sPathDbOrg").value+"/Inicio?OpenFrameset&orig="+url;	location.replace(url);}function Informes(){	alert("ir a Informes")}function Ayuda(){	alert("ir a Ayuda")}// Va a la busquedafunction BusquedaAvanzada(){	var url =document.forms[0].urlBusquedas.value + "fBusqueda?OpenForm";	window.open(url);	//document.forms[0].Protocolo.value+"://"+document.forms[0].sHostDbBusquedas.value+":"+document.forms[0].Puerto.value+"/"+document.forms[0].sPathDbBusquedas.value+"/BusquedaGeneral?OpenForm"}function Buscar(event){	// si no es el Enter no realizo la búsqueda	if (window.event && window.event.keyCode>0 && window.event.keyCode!=13) {		return true;	} else if (event && event.which && event.which>0 && event.which!=13) {		return true;	}	if (document.forms[0].TextoBusqueda.value==""){		alert("Debe ingresar el texto a Buscar");	}else{		var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value		//var tipo = document.getElementById("tipoDoc").options[document.getElementById("tipoDoc").selectedIndex].value				var url =document.forms[0].urlBusquedas.value+"aBusqueda?OpenAgent&tipo=URL"		if (anio!="Todos")				url += "&sFechaCreacion=01/01/"+anio+"&sFechaCreacionFin=31/12/"+anio;		strPal =document.forms[0].TextoBusqueda.value;				url +="&sPalabra=" + strPal;		window.open(url);	}}