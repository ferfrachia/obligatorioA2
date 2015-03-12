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
var MODOEDICION = false;
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

	scheduler.init('scheduler_here', new Date(), "day");

	scheduler.templates.tooltip_date_format = function(date) {
		formatFunc = scheduler.date.date_to_str("%d/%m/%Y %H:%i");
		return formatFunc(date);
	}
	// tooltipDefinicion();
	mostrarEventosSoloEnModoLectura(true);
	// mostrarCalendarSoloEnLectura();
	scheduler.config.cascade_event_display = true;
	scheduler.config.cascade_event_count = 4;
	scheduler.config.cascade_event_margin = 30;
	scheduler.config.drag_move = false;
	scheduler.config.drag_create = false;

	scheduler.config.show_loading = true;
	scheduler.config.details_on_dblclick = true;
	scheduler.config.details_on_create = true;
	// scheduler.config.icons_edit = [ 'icon_custom', 'icon_save', 'icon_cancel'
	// ];
	scheduler.config.icons_select = [ 'icon_details' ];

	// scheduler.config.edit_on_create = false;

	scheduler.config.dblclick_create = true;
	scheduler.setLoadMode("day");
	// alert(scheduler.getState().mode);
	scheduler.attachEvent("onBeforeViewChange", function(old_mode, old_date,
			mode, date) {
		// alert(mode);
			scheduler.load(cambiarVistaEventos(mode, date));
			return true;
		})

	scheduler.load(cambiarVistaEventos("day", new Date()));

	scheduler.showLightbox = function(id) {
		var ev = scheduler.getEvent(id);
		EV_EVENTOACTUAL = ev;
		DIALOGOABIERTO = true;
		miVarAux = ev.id.toString();

		if (miVarAux.length < 32) {
			// es nuevo debo setear la oficina actual.
			x = document.getElementById("unidad").selectedIndex;
			y = document.getElementById("unidad").options;
			document.getElementById("nombreUnidad").value = y[x].text;
			document.getElementById("nroUnidad").value = y[x].value;

			formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
			document.getElementById("FechaInicio").value = formatFunc(ev.start_date);
			document.getElementById("FechaFin").value = formatFunc(ev.end_date);// "%H:%i"
			var vista = scheduler.getState().mode;
			// si estamos en una vista con horas, tomamos y seteamos la hora en
			// la que cliqueo
			if (vista == "day" || vista == "week") {
				formatFunc = scheduler.date.date_to_str("%h:%i %A");
				document.getElementById("HoraInicio").value = formatFunc(ev.start_date);
				document.getElementById("HoraFin").value = formatFunc(ev.end_date);
			}
			setEdicion();
			nuevo = true;
			$("#my_form").dialog("open");
		} else {

			setModoLectura();
			nuevo = false;
			document.getElementById("iddocEv").value = ev.idDoc;
			document.getElementById("tipodocEv").value = ev.tipoDoc;
			document.getElementById("sDetalle").value = ev.details;
			document.getElementById("sDescripcion").value = ev.text;
			document.getElementById("nombreUnidad").value = ev.unidad;
			document.getElementById("nroUnidad").value = ev.nroUnidad;
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
				htmlName("notificar")[2].checked = true;
			document.getElementById("Usuarios").value = ev.usuarios;
			if (document.getElementById("Usuarios") != "") {
				cargarLectores();
				mostrarUsuario();
			}
			document.getElementById("HoraInicio").value = ev.horaInicio;
			document.getElementById("HoraFin").value = ev.horaFin;

			// formateo la fecha ini y fin(sin las horas)
			formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
			document.getElementById("FechaInicio").value = formatFunc(ev.start_date);
			document.getElementById("FechaFin").value = formatFunc(ev.end_date);

			document.getElementById("minutos").value = ev.minutos;
			if (ev.aviso == "No" || ev.aviso == "")
				htmlName("aviso")[0].checked = true;
			else {
				htmlName("aviso")[1].checked = true;
				mostrarMinutos();
			}
			document.getElementById("documento").innerHTML = ev.url;
			$(".evCross").hide();
			$(".evPeople").hide();
			// $("#description").prop("disabled",true);
			$("#my_form").dialog("open");
		}
		if (ev.url == undefined || ev.idDoc == " ") {

			document.getElementById("documento").innerHTML = " --- ";
		} else {
			$("#documento").innerHTML = ev.url;
		}
	}
}

function cambiarVistaEventos(vista, date) {
	// alert(algo);
	var nroOfi = document.getElementById("unidad");
	// scheduler.load(document.getElementById("absCalendar").value
	// + "/EventosXML?" + "openView&RestrictToCategory=" + nroOfi.value
	// + "&count=10000");
	formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
	// = formatFunc(date);
	res = formatFunc(date).split("/");
	if (vista == "day")
		return document.getElementById("absCalendar").value + "/EventosXMLAMD?"
				+ "openView&RestrictToCategory=" + nroOfi.value + res[2]
				+ res[1] + res[0] + "&count=10000";
	if (vista == "month")
		return document.getElementById("absCalendar").value + "/EventosXMLAM?"
				+ "openView&RestrictToCategory=" + nroOfi.value + res[2]
				+ res[1] + "&count=10000";
	if (vista == "year")
		return document.getElementById("absCalendar").value + "/EventosXMLA?"
				+ "openView&RestrictToCategory=" + nroOfi.value + res[2]
				+ "&count=10000";
	if (vista == "week")
		return document.getElementById("absCalendar").value + "/EventosXMLAM?"
				+ "openView&RestrictToCategory=" + nroOfi.value + res[2]
				+ res[1] + "&count=10000";
}
// var html = function(id) {
// return document.getElementById(id);
// }; // just a helper
var htmlName = function(id) {
	return document.getElementsByName(id);
}; // just a helper

function save_form() {
	ev = scheduler.getEvent(scheduler.getState().lightbox_id);
	$("#save").prop('disabled', true);
	if (validarCampos()) {

		$("#save").prop('disabled', true);
		if (nuevo) {

			agregarEvento("", ev);
		} else {
			b = modificarEvento(EV_EVENTOACTUAL.id, EV_EVENTOACTUAL);
			if (b == true) {
				MODOEDICION = false;
				setModoLectura();
			}

		}
		$("#save").prop('disabled', false);

		// las siguientes dos lineas se encargan de limpiar y actualizar la
		// grilla
		scheduler.clearAll();
		scheduler.load(cambiarVistaEventos(scheduler.getState().mode, scheduler
				.getState().date))
		$("#my_form").dialog("close");
	} else {
		$("#save").prop('disabled', false);
	}
}
function limpiarYCargar() {
	// esto es para cuando se intenta limpiar y cargar cuando el scheduler no
	// esta inicializado.
	if (scheduler.getState().mode != undefined) {
		scheduler.clearAll();
		scheduler.load(cambiarVistaEventos(scheduler.getState().mode, scheduler
				.getState().date));
	}
}
function close_form() {
	if (DIALOGOABIERTO) {
		if (nuevo) {
			scheduler.deleteEvent(miVarAux);
		}
		// alert(MODOEDICION);
		if (MODOEDICION == true) {
			str = "";
			str = "acc_liberar&-%-@"
			str = str + miVarAux + "&-%-@";
			str = str + document.getElementById("name").value + "&-%-@";
			// ajaxReserva(str);
			if (ajaxReserva(str) == true) {
				MODOEDICION = true;
				setEdicion();
			}
			setModoLectura();
			scheduler.endLightbox(false, document.getElementById("my_form"));
		}
		miVarAux = ""
		LimpiarDialogo();
		MODOEDICION = false;
		DIALOGOABIERTO = false;
		$("#btnEditar").prop("disabled", false);
		$("#my_form").dialog("close");

	}
}
function edit_event() {
	// tengo que hacer pedido ajax para bloquear, y si ok poner en eddicion los
	// campos

	$("#btnEditar").prop("disabled", true);
	str = "";
	str = "acc_reservar&-%-@"
	str = str + miVarAux + "&-%-@";
	str = str + document.getElementById("name").value + "&-%-@";
	if (ajaxReserva(str) == true) {
		MODOEDICION = true;
		setEdicion();
	} else
		$("#btnEditar").prop("disabled", false);
}

function delete_event() {
	var event_id = scheduler.getState().lightbox_id;

	// hago el data para borrar y mando a borrar
	// scheduler.endLightbox(false, document.getElementById("my_form"));
	// scheduler.deleteEvent(miVarAux);
	// setModoLectura();
	// miVarAux = "";
	// $("#my_form").dialog("close");
	// alert(miVarAux);
	// return;
	// alert("S");
	$("#delete").prop("disabled", true);
	if (MODOEDICION == true) {
		str = "";
		str = "acc_eliminar&-%-@"
		str = str + miVarAux + "&-%-@";
		str = str + document.getElementById("name").value + "&-%-@";
		// ajaxReserva(str);
		if (ajaxReserva(str) == true) {
			// MODOEDICION = true;
			// setEdicion();
			// alert("retorno trueeeeee");
		}
	}

	MODOEDICION = false;
	scheduler.clearAll();
	scheduler.load(cambiarVistaEventos(scheduler.getState().mode, scheduler
			.getState().date))
	$("#my_form").dialog("close");
	$("#delete").prop("disabled", false);
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
/*******************************************************************************
 * function definicionDeLightBox() { var notif = [ { key : "Si", label : "Si" }, {
 * key : "No", label : "No" } ]; scheduler.config.lightbox.sections = [ { name :
 * "templateCreador", height : 20, type : "template", map_to : "creador" }, {
 * name : "templateURL", height : 20, type : "template", map_to : "url" }, {
 * name : "aviso", height : 20, options : notif, type : "radio", map_to :
 * "aviso", default_value : "No" }, { name : "detalle", height : 100, type :
 * "textarea", map_to : "details" }, { name : "description", height : 40, map_to :
 * "text", type : "textarea", focus : true }, { name : "time", height : 72, type :
 * "time", map_to : "auto", time_format : [ "%H:%i", "%d", "%m", "%Y" ] } ]; }
 ******************************************************************************/

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
	data = "acc_editar" + "&-%-@"; // (1)accion
	data += miVarAux + "&-%-@"; // (2)id
	if (document.getElementById("sDetalle").value == "") {
		data += " " + "&-%-@";
	} else {
		data += document.getElementById("sDetalle").value + "&-%-@";
	}// (3)detalles

	data += document.getElementById("FechaFin").value + "&-%-@"; // (4)fecha
	// fin

	data += document.getElementById("HoraFin").value + "&-%-@"; // (5) hora fin

	data += document.getElementById("HoraInicio").value + "&-%-@";// (6)hora
	// Inicio

	data += document.getElementById("iddocEv").value + "&-%-@";// (7) id doc
	// (id de
	// busqueda no
	// unid necesariamente)
	if (document.getElementById("minutos").value != "")
		data += document.getElementById("minutos").value + "&-%-@";
	else
		data += " " + "&-%-@";// (8) minutos
	// previso de
	// notificacion

	// (9) notificar
	if (htmlName("notificar")[0].checked == true)
		data += htmlName("notificar")[0].value + "&-%-@";
	if (htmlName("notificar")[1].checked == true)
		data += htmlName("notificar")[1].value + "&-%-@";
	if (htmlName("notificar")[2].checked == true)
		data += htmlName("notificar")[2].value + "&-%-@";

	// (10) tipo evento
	if (htmlName("personal")[0].checked == true)
		data += htmlName("personal")[0].value + "&-%-@"
	if (htmlName("personal")[1].checked == true)
		data += htmlName("personal")[1].value + "&-%-@"

	data += document.getElementById("FechaInicio").value + "&-%-@"; // (11)
	// fecha de
	// inicio

	data += document.getElementById("tipodocEv").value + "&-%-@"; // (12) tipo
	// documento
	data += document.getElementById("nombreUnidad").value + "&-%-@";// (13)
	// Nombre
	// unidad
	data += document.getElementById("nroUnidad").value + "&-%-@"; // (14) nro
	// unidad
	if (document.getElementById("Usuarios").value != "")
		data += document.getElementById("Usuarios").value + "&-%-@";
	else
		data += " " + "&-%-@";// (15)
	// usuarios
	if (document.getElementById("sDescripcion").value == "") {
		data += " " + "&-%-@";
	} else {
		data += document.getElementById("sDescripcion").value + "&-%-@";
	} // (16) texto (resumen)
	data += document.getElementById("name").value + "&-%-@"; // (17) usuario
	// actual
	// 18 si aviso
	if (htmlName("aviso")[0].checked == true)
		data += "No" + "&-%-@"
	if (htmlName("aviso")[1].checked == true)
		data += "Si" + "&-%-@"
	data += " " + "&-%-@";// 19 formaDocumntal
	return ajax(data);
}

function agregarEvento(id, e) {
	formatFunc = scheduler.date.date_to_str("%H:%i");
	// document.getElementById("HoraInicio").value = formatFunc(ev.start_date);
	// document.getElementById("HoraFin").value = formatFunc(ev.end_date);

	data = "acc_crear" + "&-%-@"; // (1)accion
	data += miVarAux + "&-%-@"; // (2)id
	if (document.getElementById("sDetalle").value == "") {
		data += " " + "&-%-@";
	} else {
		data += document.getElementById("sDetalle").value + "&-%-@";
	}// (3)detalles
	// alert(document.getElementById("FechaFin").value);
	data += document.getElementById("FechaFin").value + "&-%-@"; // (4)fecha
	// fin
	// alert(document.getElementById("HoraFin").value);
	data += document.getElementById("HoraFin").value + "&-%-@"; // (5) hora fin

	data += document.getElementById("HoraInicio").value + "&-%-@";// (6)hora
	// Inicio

	// (7) id doc (id de busqueda no unid necesariamente)
	if (document.getElementById("iddocEv").value == "") {
		data += " " + "&-%-@";
		alert("1!");
	} else {
		alert("2");
		data += document.getElementById("iddocEv").value + "&-%-@";
	}
	// (8) minutos previso de notificacion
	if (document.getElementById("minutos").value == "")
		data += " " + "&-%-@";
	else
		data += document.getElementById("minutos").value + "&-%-@";

	// (9) notificar
	if (htmlName("notificar")[0].checked == true)
		data += htmlName("notificar")[0].value + "&-%-@";
	if (htmlName("notificar")[1].checked == true)
		data += htmlName("notificar")[1].value + "&-%-@";
	if (htmlName("notificar")[2].checked == true)
		data += htmlName("notificar")[2].value + "&-%-@";

	// (10) tipo evento
	if (htmlName("personal")[0].checked == true)
		data += htmlName("personal")[0].value + "&-%-@"
	if (htmlName("personal")[1].checked == true)
		data += htmlName("personal")[1].value + "&-%-@"

	data += document.getElementById("FechaInicio").value + "&-%-@"; // (11)
	// fecha de
	// inicio

	// (12) tipo documento
	if (document.getElementById("tipodocEv").value == "")
		data += " " + "&-%-@";
	else
		data += document.getElementById("tipodocEv").value + "&-%-@";

	data += document.getElementById("nombreUnidad").value + "&-%-@";// (13)
	// Nombre
	// unidad

	data += document.getElementById("nroUnidad").value + "&-%-@"; // (14) nro
	// unidad

	// (15) usuarios
	if (document.getElementById("Usuarios").value == "")
		data += " " + "&-%-@";
	else
		data += document.getElementById("Usuarios").value + "&-%-@";

	// (16) texto (resumen)
	if (document.getElementById("sDescripcion").value == "") {
		data += " " + "&-%-@";
	} else {
		data += document.getElementById("sDescripcion").value + "&-%-@";
	}

	data += document.getElementById("name").value + "&-%-@"; // (17) usuario
	// actual
	// 18 si aviso
	if (htmlName("aviso")[0].checked == true)
		data += "No" + "&-%-@"
	if (htmlName("aviso")[1].checked == true)
		data += "Si" + "&-%-@"
	data += formaDocumentalEv() + "&-%-@";// 19 formaDocumntal
	return ajax(data);
}
function formaDocumentalEv() {
	x = document.getElementById("tipoDoc").selectedIndex;
	y = document.getElementById("tipoDoc").options;
	return y[x].value;
}
function ajax(data) {
	ret = true;
	$.ajax( {
		type : "POST",
		url : document.getElementById("absCalendar").value
				+ "/ControllerEv?openAgent",
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		async : false,
		data : data,
		dataType : 'json',
		success : function(response) {
			// alert(response.msg);
		if (response.error == "1") {
			alert("Ups... " + response.mensaje);
			ret = false;
		} else
			ret = true;

	},
	error : function() {
		alert("Se Produjo un error inseperado.");
		ret = false;
	}
	});
	return ret;
}
function ajaxReserva(data) {
	resultado = true;
	$.ajax( {
		type : "POST",
		url : document.getElementById("absCalendar").value
				+ "/ControllerEv?openAgent",
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		async : false,
		data : data,
		dataType : 'json',
		success : function(response) {
			if (response.error == "1") {
				alert(response.mensaje);// no puede editar
		resultado = false;
	} else
		resultado = true;
},
error : function() {
	alert("Se Produjo un error inseperado.");
	resultado = false;
}
	});

	return resultado;

}
function clickBtnBuscarExp() {
	$("#divTablaResultados").html("");
	$("#query").val("");
	$("#dialog_busqueda_exp").dialog("open");
}

function seleccionarExpedienteEv(idExp, tipoDoc) {
	// "<a href='javascript:goTo("+"\""+idExp+"\", \""+ tipoDoc +"\");' >"+
	// tipoDoc+" </a>"+"]]></url>"
	document.getElementById("documento").innerHTML = '<a href=\"javascript:goTo(\''
			+ idExp + '\', \'' + tipoDoc + '\');\">' + tipoDoc + ' </a>';
	document.getElementById("iddocEv").value = idExp;
	document.getElementById("tipodocEv").value = "Expediente";
	$("#dialog_busqueda_exp").dialog("close");
}