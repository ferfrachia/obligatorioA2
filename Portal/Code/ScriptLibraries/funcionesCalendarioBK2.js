/**
 * @author Ismael Olivet
 * 
 */

/**
 * estas constantes son para evaluar la forma en la que vamos a abrir los
 * documentos
 */
var EXPEDIENTE = "Expediente";
var RESOLUCION = "Resolucion";
var ASUNTO = "Asunto";
var SESION = "Sesion";
var FORMULARIO = "Formulario";
var DOCUMENTO = "Documento";
var miVarAux;
var MODOEDICION=false;
var DIALOGOABIERTO;
var EV_EVENTOACTUAL;
var nuevo = false;
function init() {

	mostrarInfoCorta();
	scheduler.config.xml_date = "%d/%m/%Y %H:%i";
	scheduler.config.prevent_cache = true;

	// definicionDeLightBox();

	// seccion_template_URL();
	// seccion_template_Creador();
	// seccion_notificacion();
	// seccion_detalle();

	scheduler.config.first_hour = 4;
	// scheduler.locale.labels.section_location = "Location";

	var custom_form = document.getElementById("miForm");

	scheduler.init('scheduler_here', new Date(), "month");

	// scheduler.attachEvent("onEventAdded", function(ev, e) {
	// return agregarEvento(ev, e);
	// });
	// scheduler.attachEvent("onEventChanged", function(ev, e) {
	// return modificarEvento(ev, e);
	// });
	// scheduler.attachEvent("onClick", function(id, e) {
	// // mostrarCalendarSoloEnLectura(true);
	// alert(id);
	// return true;
	// });
	scheduler.templates.tooltip_date_format = function(date) {
		formatFunc = scheduler.date.date_to_str("%d/%m/%Y %H:%i");
		return formatFunc(date);
	}
//	tooltipDefinicion();
	mostrarEventosSoloEnModoLectura(false);
	// mostrarCalendarSoloEnLectura();
	scheduler.config.cascade_event_display = true;
	scheduler.config.cascade_event_count = 4;
	scheduler.config.cascade_event_margin = 30;
	scheduler.config.drag_move = false;
	scheduler.config.drag_create = false;
	// scheduler.attachEvent("onClick", function() {
	// //mostrarEventosSoloEnModoLectura(true);
	//		
	// return false;
	// })

	scheduler.config.details_on_dblclick = true;
	scheduler.config.dblclick_create = true;
	var nroOfi = document.getElementById("unidad");
	scheduler.load(document.getElementById("absCalendar").value
			+ "/EventosXML?" + "openView&RestrictToCategory=" + nroOfi.value
			+ "&count=10000");

	scheduler.showLightbox = function(id) {
		var ev = scheduler.getEvent(id);
		EV_EVENTOACTUAL = ev;
		DIALOGOABIERTO = true;
		miVarAux = ev.id.toString();
		if (miVarAux.length < 32) {
			// es nuevo debo setear la oficina actual.
			var x = document.getElementById("unidad").selectedIndex;
			var y = document.getElementById("unidad").options;
			html("nombreUnidad").value = y[x].text;
			html("nroUnidad").value=y[x].value;
//			alert("Index: " + y[x].value + " is " + y[x].text);
			setEdicion();
			nuevo=true;
			$("#my_form").dialog("open");
		} else {
		
			setModoLectura();
			nuevo=false;
			// scheduler.startLightbox(id, html("my_form"));
			// html("usuarios").value = ev.usuarios
			// html("sDetalle").focus();
			html("iddocEv").value = ev.idDoc;
			html("tipodocEv").value = ev.tipoDoc;
			html("sDetalle").value =  ev.text;
			html("sDescripcion").value =ev.details;
			html("nombreUnidad").value = ev.unidad;
			html("nroUnidad").value = ev.nroUnidad;
			// tipo evento
			if (ev.personal == "No")
				htmlName("personal")[0].checked = true;
			else
				htmlName("personal")[1].checked = true;
			// tipo notificacion
			if (ev.notificar == "Oficina")
				htmlName("notificar")[0].checked = true;
			else if (ev.notificar == "Usuario")
				htmlName("notificar")[1].checked = true;
			else
				htmlName("Ambos")[2].checked = true;
			html("Usuarios").value = ev.usuarios;
			if (html("Usuarios") != "") {
				cargarLectores();
				mostrarUsuario();
			}
			html("HoraInicio").value = ev.horaInicio;
			html("HoraFin").value = ev.horaFin;

			// formateo la fecha ini y fin(sin las horas)
			formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
			html("FechaInicio").value = formatFunc(ev.start_date);
			html("FechaFin").value = formatFunc(ev.end_date);
			html("minutos").value = ev.minutos;
			if (ev.aviso == "No")
				htmlName("aviso")[0].checked = true;
			else {
				htmlName("aviso")[1].checked = true;
				mostrarMinutos();
			}
			html("documento").innerHTML = ev.url;
			$(".evCross").hide();
			$(".evPeople").hide();
			// $("#description").prop("disabled",true);
			$("#my_form").dialog("open");
		}
		if (ev.url ==undefined){
			
			html("documento").innerHTML = " --- ";
		}
		else {
			$("#documento").innerHTML =  ev.url;
//			$("a").css( {
//				"color" : "blue",
//				"text-decoration" : "none"
//			});
//			$("a").mouseover( function() {
//				$(this).css( {
//					"color" : "dark-blue",
//					"text-decoration" : "underline",
//					"font-weight" : "Bold"
//				})
//			});
//			$("a").mouseout( function() {
//				$(this).css( {
//					"color" : "blue",
//					"text-decoration" : "none",
//					"font-weight" : ""
//				})
//			});
		}
		;
	}
}
var html = function(id) {
	return document.getElementById(id);
}; // just a helper
var htmlName = function(id) {
	return document.getElementsByName(id);
}; // just a helper

function save_form() {
//	alert("1");
	ev = scheduler.getEvent(scheduler.getState().lightbox_id);

	if(nuevo){
		
		agregarEvento("",ev);
	}else{
		b =modificarEvento(EV_EVENTOACTUAL.id, EV_EVENTOACTUAL); 
		if(b==true) {
			MODOEDICION = false;
			setModoLectura();
		}
		//else $("#btnEditar").prop("disabled",false);
		
//		b = false;
//		b = modificarEvento(EV_EVENTOACTUAL.id, EV_EVENTOACTUAL);
//		alert(b);
	}
//	alert("4");
	//scheduler.endLightbox(true, html("my_form"));
//	alert("5");
	//miVarAux ="";
	$("#my_form").dialog("close");
}
function close_form() {
	if (DIALOGOABIERTO){
		if(nuevo){
			scheduler.deleteEvent(miVarAux);
		}
//		alert(MODOEDICION);
		if(MODOEDICION==true){
			str = "";
			str = "acc_liberar&-%-@"
			str = str + miVarAux + "&-%-@";
			str = str + html("name").value + "&-%-@";
			//ajaxReserva(str);
			 if(ajaxReserva(str)==true) {
			 MODOEDICION = true;
			 setEdicion();
			 }
			setModoLectura();
			scheduler.endLightbox(false, html("my_form"));
		}
		miVarAux=""
		LimpiarDialogo();
		MODOEDICION = false;
		DIALOGOABIERTO=false;
		$("#btnEditar").prop("disabled",false);
		$("#my_form").dialog("close");
		
	}
}
function edit_event() {
	// tengo que hacer pedido ajax para bloquear, y si ok poner en eddicion los
	// campos
	
	$("#btnEditar").prop("disabled",true);
	str = "";
	str = "acc_reservar&-%-@"
	str = str + miVarAux + "&-%-@";
	str = str + html("name").value + "&-%-@";
	if(ajaxReserva(str)==true) {
		MODOEDICION = true;
		setEdicion();
	}else $("#btnEditar").prop("disabled",false);
}

function delete_event() {
	var event_id = scheduler.getState().lightbox_id;

	scheduler.endLightbox(false, html("my_form"));
	scheduler.deleteEvent(miVarAux);
	setModoLectura();
	miVarAux="";
	$("#my_form").dialog("close");
}

// ·················definicion·de·labels····························
/**
 * EN ESTA PARTE DEFINIMOS LAS ETIQUETAS PARA EL MUESTREO DE LOS EVENTOS
 */

function seccion_template_URL() {
	scheduler.locale.labels.section_templateURL = 'URL';
}
function seccion_template_Creador() {
	scheduler.locale.labels.section_templateCreador = 'Creador';
}
function seccion_detalle() {
	scheduler.locale.labels.section_detalle = "Detalle";
}
function seccion_notificacion() {
	scheduler.locale.labels.section_aviso = 'Aviso';
}
// ·················FIN·definicion·de·labels····························

// ######################################################################

// ·················Definicion·de·formulario·de·muestra·de·eventos······

/**
 * esta funcion define las secciones del dialogo que muestra el evento
 */
/**function definicionDeLightBox() {
	var notif = [ {
		key : "Si",
		label : "Si"
	}, {
		key : "No",
		label : "No"
	} ];
	scheduler.config.lightbox.sections = [ {
		name : "templateCreador",
		height : 20,
		type : "template",
		map_to : "creador"
	}, {
		name : "templateURL",
		height : 20,
		type : "template",
		map_to : "url"
	}, {
		name : "aviso",
		height : 20,
		options : notif,
		type : "radio",
		map_to : "aviso",
		default_value : "No"
	}, {
		name : "detalle",
		height : 100,
		type : "textarea",
		map_to : "details"
	}, {
		name : "description",
		height : 40,
		map_to : "text",
		type : "textarea",
		focus : true
	}, {
		name : "time",
		height : 72,
		type : "time",
		map_to : "auto",
		time_format : [ "%H:%i", "%d", "%m", "%Y" ]
	} ];

}**/

/**
 * 
 * @return setea la visualizacion de informacion en el formato corto.
 */
function mostrarInfoCorta() {
	scheduler.config.quick_info_detached = false;
}

function tooltipDefinicion() {
	scheduler.templates.tooltip_text = function(start, end, ev) {
		return "<table><tr><td>Evento:</td><td>" + ev.text
				+ "</td></tr><tr><td>Desde: </td><td> "
				+ scheduler.templates.tooltip_date_format(start)
				+ "</td></tr><tr><td>Hasta: </td><td> "
				+ scheduler.templates.tooltip_date_format(end)
				+ "</td></tr></table>";

	};
	// "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " +
	// scheduler.templates.tooltip_date_format(start)+
	// "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
}

/**
 * 
 * @return configura el lightBox para que solo sea de lectura
 */
function mostrarEventosSoloEnModoLectura(sino) {
	scheduler.config.readonly_form = sino;
}

function mostrarCalendarSoloEnLectura() {

	scheduler.config.readonly = false;
}

// ·················FIN·Definicion·de·formulario·de·muestra·de·eventos····························

function DirABS() {
	var pathname = location.pathname;
	return (document.getElementById("Protocolo").value + '://'
			+ location.hostname + ":" + document.getElementById("Puerto").value + pathname
			.substring(0, (pathname.toUpperCase().indexOf('.NSF') + 5)))
}

function goTo(id, tipoDoc) {
	// alert(id + " " + tipoDoc);
	switch (tipoDoc) {
	case EXPEDIENTE:
		window.open(document.getElementById("absPortal").value
				+ "/AbrirDocumento?OpenAgent&id=" + id + "&tipoDoc=EXPEDIENTE");
		break;

	case RESOLUCION:
		window.open(document.getElementById("absPortal").value
				+ "/AbrirDocumento?OpenAgent&id=" + id + "&tipoDoc=ASUNTO");

		break;

	case FORMULARIO:
		window.open(document.getElementById("absPortal").value
				+ "/AbrirDocumento?OpenAgent&id=" + id + "&tipoDoc=FORMULARIO");

		break;

	case DOCUMENTO:
		window.open(document.getElementById("absPortal").value
				+ "/AbrirDocumento?OpenAgent&id=" + id + "&tipoDoc=DOCUMENTOS");
		break;

	default:
		alert("No se reconoce el Documento.")
		break;
	}

}

function modificarEvento(id, e) {
	data = "acc_editar" + "&-%-@"; 	//(1)accion
	data += miVarAux + "&-%-@";		//(2)id
	if (html("sDescripcion").value == "") {
		data += " " + "&-%-@";
	} else {
		data += html("sDescripcion").value + "&-%-@";
	}//(3)detalles
	
	data += html("FechaFin").value + "&-%-@"; 	//(4)fecha fin

	data += html("HoraFin").value+ "&-%-@";		//(5) hora fin


	data += html("HoraInicio").value + "&-%-@";//(6)hora Inicio

	data += html("iddocEv").value + "&-%-@";//(7) id doc (id de busqueda no unid necesariamente)
	data += html("minutos").value + "&-%-@";//(8) minutos previso de notificacion
	
	//(9) notificar
	if(htmlName("notificar")[0].checked==true)data+=htmlName("notificar")[0].value+ "&-%-@";
	if(htmlName("notificar")[1].checked==true)data+=htmlName("notificar")[1].value+ "&-%-@";
	if(htmlName("notificar")[2].checked==true)data+=htmlName("notificar")[2].value+ "&-%-@";
	
	// (10) tipo evento 
	if(htmlName("personal")[0].checked==true)data+=htmlName("personal")[0].value+ "&-%-@"
	if(htmlName("personal")[1].checked==true)data+=htmlName("personal")[1].value+ "&-%-@"
	
	data += html("FechaInicio").value + "&-%-@"; //(11) fecha de inicio

	data += html("tipodocEv").value + "&-%-@"; 						//(12) tipo documento
	data += html("nombreUnidad").value + "&-%-@";//(13) Nombre unidad
	data += html("nroUnidad").value + "&-%-@"; // (14) nro unidad
	data += html("Usuarios").value + "&-%-@"; // (15) usuarios
	if (html("sDetalle").value == "") {
		data += " " + "&-%-@";
	} else {
		data += html("sDetalle").value + "&-%-@";
	} // (16) texto (resumen)
	data += html("name").value + "&-%-@"; //(17) usuario actual
	return ajax(data);
}

function agregarEvento(id, e) {
	
	
	data = "acc_crear" + "&-%-@"; 	//(1)accion
	data += miVarAux + "&-%-@";		//(2)id
	if (html("sDetalle").value == "") {
		data += " " + "&-%-@";
	} else {
		data += html("sDescripcion").value + "&-%-@";
	}//(3)detalles
	
	data += html("FechaFin").value + "&-%-@"; 	//(4)fecha fin

	data += html("HoraFin").value+ "&-%-@";		//(5) hora fin


	data += html("HoraInicio").value + "&-%-@";//(6)hora Inicio

	//(7) id doc (id de busqueda no unid necesariamente)
	if( html("iddocEv").value=="") data += " " + "&-%-@";
	else data += html("iddocEv").value + "&-%-@";
	
	//(8) minutos previso de notificacion
	if(html("minutos").value =="")data+=" "+ "&-%-@";
	else data += html("minutos").value + "&-%-@";
	
	//(9) notificar
	if(htmlName("notificar")[0].checked==true)data+=htmlName("notificar")[0].value+ "&-%-@";
	if(htmlName("notificar")[1].checked==true)data+=htmlName("notificar")[1].value+ "&-%-@";
	if(htmlName("notificar")[2].checked==true)data+=htmlName("notificar")[2].value+ "&-%-@";
	
	// (10) tipo evento 
	if(htmlName("personal")[0].checked==true)data+=htmlName("personal")[0].value+ "&-%-@"
	if(htmlName("personal")[1].checked==true)data+=htmlName("personal")[1].value+ "&-%-@"
	
	data += html("FechaInicio").value + "&-%-@"; //(11) fecha de inicio
	
	//(12) tipo documento
	if(html("tipodocEv").value=="")data += " " + "&-%-@";
	else data += html("tipodocEv").value + "&-%-@"; 						
	
	data += html("nombreUnidad").value + "&-%-@";//(13) Nombre unidad
	
	data += html("nroUnidad").value + "&-%-@"; // (14) nro unidad
	
	// (15) usuarios
	if (html("Usuarios").value=="")data += " " + "&-%-@";
	else data += html("Usuarios").value + "&-%-@"; 
	
	// (16) texto (resumen)
	if (html("sDetalle").value == "") {
		data += " " + "&-%-@";
	} else {
		data += html("sDetalle").value + "&-%-@";
	} 
	
	data += html("name").value + "&-%-@"; //(17) usuario actual
	return ajax(data);
}

function ajax(data) {
 ret = true;
	$.ajax( {
		type : "POST",
		url : html("absCalendar").value + "/ControllerEv?openAgent",
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		async : false,
		data : data,
		dataType : 'json',
		success : function(response) {
			//alert(response.msg);
			if(response.error=="1"){
				alert("response success" + response.mensaje);
				ret=false;
			}else ret=true;
			
		},
		error : function() {
			alert(".error");
			ret=false;
		}
	});
	return ret;
}
function ajaxReserva(data) {
	resultado=true;
	 $.ajax( {
		type : "POST",
		url : html("absCalendar").value + "/ControllerEv?openAgent",
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		async : false,
		data : data,
		dataType : 'json',
		success : function(response) {
			if(response.error == "1"){
				alert(response.mensaje);
				resultado =false;
			}else resultado= true;
		},
		error : function() {
			alert("error");
			resultado= false;
		}
	});
	
	 return resultado;

}