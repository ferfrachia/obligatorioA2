/**
 * @author Ismael Olivet
 * 
 */

var EXPEDIENTE = "Expediente";
var RESOLUCION = "Resolucion";
var ASUNTO = "Asunto";
var SESION = "Sesion";
var FORMULARIO = "Formulario";
var DOCUMENTO = "Documento";

function init() {
	// scheduler.config.xml_date = "%d/%m/%Y %H:%i";
	// label();
//alert("aca");
	
	scheduler.config.readonly = true;
	scheduler.config.init_date = new Date();
	// definicionDeLightBox();
	// the method allows you to hide the address bar on iPhone/iPod to save the
	// space for application
	dhx.ui.fullScreen();

	// object constructor
	dhx.ui( {
		view : "scheduler",
		id : "scheduler"
	});
	// method load() lets you to populate the scheduler with data
	$$("scheduler")
			.load(
					DirABS()+ "/mEventosXML?openView&count=10000",
					"scheduler");

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

function previewDef() {
//	alert("nnnn");
	scheduler.templates.selected_event = function(obj) {
		var html = "", fts = "", fte = "";
		var start = obj.start_date;
		var end = obj.end_date;
		if (!start)
			return html;
		// parte basica
		html += "<div  class='selected_event "
				+ scheduler.templates.event_class(obj)
				+ "' style='"
				+ (obj.color ? "background-color:" + obj.color + ";" : "")
				+ (obj.fontColor || obj.textColor ? "color:"
						+ (obj.fontColor || obj.textColor) : "") + "'>";

		if (obj.creador && obj.creador !== "") {
			html += "<div class='event_title'>"
					+ scheduler.locale.labels.label_creador + "</div>";
			html += "<div class='event_text'>" + obj.creador + "</div>";

		}
		if (obj.url && obj.url !== "") {
			html += "<div class='event_title'>"
					+ scheduler.locale.labels.label_url + "</div>";
			html += "<div class='event_text'>" + obj.url + "</div>";
		}

		// por aca agregar el tipo de documento con la llamada a al goto
		html += "<div class='event_title'>"
				+ scheduler.locale.labels.section_description + "</div>";
		html += "<div class='event_text'>" + obj.text + "</div>"

		if (dhx.Date.datePart(start).valueOf() == dhx.Date.datePart(end)
				.valueOf()) {
			var fd = dhx.i18n.dateFormatStr(start);
			fts = dhx.i18n.timeFormatStr(start);
			fte = dhx.i18n.timeFormatStr(end);
			html += "<div class='event_title'>"
					+ scheduler.locale.labels.label_fecha + "</div>";
			html += "<div class='event_text'>" + fd + "</div>";
			html += "<div class='event_title'>"
					+ scheduler.locale.labels.label_duracion + "</div>";
			html += "<div class='event_text'>"
					+ scheduler.locale.labels.label_from + " " + fts + " "
					+ scheduler.locale.labels.label_to + " " + fte + "</div>";
		} else {
			var fds = dhx.i18n.longDateFormatStr(start);
			var fde = dhx.i18n.longDateFormatStr(end);
			/* if not "all-day" event */
			if (!(dhx.Date.datePart(start).valueOf() == start.valueOf() && dhx.Date
					.datePart(end).valueOf() == end.valueOf())) {
				fts = dhx.i18n.timeFormatStr(start) + " ";
				fte = dhx.i18n.timeFormatStr(end) + " ";
			}
			html += "<div class='event_text'>"
					+ scheduler.locale.labels.label_from + " " + fts + fds
					+ "</div>";
			html += "<div class='event_text'>"
					+ scheduler.locale.labels.label_to + " " + fte + fde
					+ "</div>";
		}
		if (obj.details && obj.details !== "") {
			html += "<div class='event_title'>"
					+ scheduler.locale.labels.label_details + "</div>";
			html += "<div class='event_text'>" + obj.details + "</div>";
		}

		// fin parte básica

		html += "</div>";
		return html;
	};

}
// ·················FIN·definicion·de·labels····························

// ######################################################################

// ·················Definicion·de·formulario·de·muestra·de·eventos······

/**
 * 
 * @return setea la visualizacion de informacion en el formato corto.
 */
function mostrarInfoCorta() {
	scheduler.config.quick_info_detached = false;
}

/**
 * 
 * @return configura el lightBox para que solo sea de lectura
 */
function mostrarEventosSoloEnModoLectura() {
	scheduler.config.readonly_form = true;
}

function mostrarCalendarSoloEnLectura() {

	scheduler.config.readonly = true;
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
//		window.open(document.getElementById("absPortal").value
//				+ "/AbrirDocumento?OpenAgent&id=" + id + "&tipoDoc=EXPEDIENTE");
		window.open("http://desarrollo2.isaltda.com.uy/Desarrollo/Gestion14.nsf/fVerExpedienteMobile?openForm&urlAnterior=&ID=2014-9014-11-0088");
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