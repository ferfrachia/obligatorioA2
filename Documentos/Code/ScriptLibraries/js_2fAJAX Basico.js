function nuevoAjax(){	var xmlhttp=false;	try {	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");	} catch (e)	{	try {	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");			} catch (E) 			{	xmlhttp = false;			}	}	if (!xmlhttp && typeof XMLHttpRequest!='undefined')	{	xmlhttp = new XMLHttpRequest();	}	return xmlhttp;}function cargarContenido(url, contenedor){	var contenedor;	contenedor = document.getElementById(contenedor);	ajax=nuevoAjax();	ajax.open("GET", url,	true);	ajax.onreadystatechange=function() {					if (ajax.readyState==4)					{	//  alert(ajax.responseText);																contenedor.innerHTML = ajax.responseText					}	}	ajax.send(null)} 