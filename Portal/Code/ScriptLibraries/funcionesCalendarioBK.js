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

function init() {
	mostrarInfoCorta();
	scheduler.config.xml_date = "%d/%m/%Y %H:%i";
	scheduler.config.prevent_cache = true;
	scheduler.clearAll();
	definicionDeLightBox();
	
	seccion_template_URL();
	seccion_template_Creador();
	seccion_detalle();

	scheduler.config.first_hour = 4;
	// scheduler.config.readonly = true;
	scheduler.locale.labels.section_location = "Location";
//	scheduler.attachEvent("onEventCreated", function(id, ev) {
//
//		if (!ev.text) {
//			alert("Text must not be empty");
//
//		}
//		if (!ev.text.length < 20) {
//			alert("Text too small");
//			return false;
//		}
//
//	})
	// scheduler.config.details_on_create=true;
	// scheduler.config.details_on_dblclick=false;
	// scheduler.setLoadMode("month")
	// scheduler.form_blocks.textarea.set_value = function(node, value, ev) {
	// node.firstChild.value = value || "";
	// node.firstChild.disabled = ev.disabled; // or just '= true' to disable
	// // all events
	// }

	mostrarEventosSoloEnModoLectura();
	// mostrarCalendarSoloEnLectura();

	scheduler.attachEvent("onBeforeDrag", function() {
		return false;
	})
	scheduler.attachEvent("onClick", function() {
		return false;
	})
	scheduler.config.details_on_dblclick = true;
	scheduler.config.dblclick_create = true;
	scheduler.init('scheduler_here', new Date(), "day");

	var nroOfi = document.getElementById("unidad");
	nroOfi = nroOfi[nroOfi.selectedIndex].value;
	scheduler.load(document.getElementById("absCalendar").value
			+ "/EventosXML?" + "openView&RestrictToCategory=" + nroOfi
			+ "&count=10000");

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
// ·················FIN·definicion·de·labels····························

// ######################################################################

// ·················Definicion·de·formulario·de·muestra·de·eventos······

/**
 * esta funcion define las secciones del dialogo que muestra el evento
 */
function definicionDeLightBox() {
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
		name : "description",
		height : 40,
		map_to : "text",
		type : "textarea",
		focus : true
	}, {
		name : "detalle",
		height : 100,
		type : "textarea",
		map_to : "details"
	}, {
		name : "time",
		height : 72,
		type : "time",
		map_to : "auto"
	} ]
}

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
	scheduler.config.readonly_form = false;
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