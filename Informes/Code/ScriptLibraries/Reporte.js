var NombresCamposCaratula;
var EtiquetasCamposCaratula;
var NombresCamposTema;
var EtiquetasCamposTema;

function load() {
	
	$(function() {
	    $(".datepicker").datepicker();
	});

	//Carga de Temas
	cargarTemas();

	//Inicialización de memoria para campos de temas
	NombresCamposTema = new Array();
	EtiquetasCamposTema = new Array();
	
	//Carga de campos de caratula en memoria interna
	NombresCamposCaratula = new Array(	"ccNroExp",
										"ccfCreacion",
										"ccEstado",
										"sAsunto",
										"sTipoLegal",
										"sTema",
										"sJustificacionTipoReservado",
										"sSolAcceso",
										"sSolicitante",
										"sTelefono",
										"sEmail",
										"sDatosComplementarios",
										"sNroExterno",
										"sNroAnterior",
										"sNroInterno",
										"rTienePaquete",
										"sUsuario",
										"sReservadoPor",
										"cCantAct");
	EtiquetasCamposCaratula = new Array("Nro Expediente",
										"Fecha de Creación",
										"Estado",
										"Asunto",
										"Clasificación de Información",
										"Tema",
										"Justificación Reservado",
										"Solicitud de Acceso",
										"Solicitante",
										"Teléfono",
										"Correo Electrónico",
										"Datos Complementarios",
										"Nro Expediente Externo",
										"Nro Expediente Anterior",
										"Nro Interno del Expediente",
										"Tiene Paquete",
										"Usuario Creador",
										"Reservado Por",
										"Cantidad de Actuaciones");
	for (var i=0; i<EtiquetasCamposCaratula.length; i++) {
		var newoption = new Option(EtiquetasCamposCaratula[i],NombresCamposCaratula[i]);
	    document.forms[0].multi.options[i] = newoption;
	}

	//Campo multiselect
	$(function() {
		$('#multi').multiselectable({
			selectableLabel: 'Todos los Campos',
			selectedLabel: 'Campos Seleccionados'
		});
		$('#multi').sortOptions();
	});
}

function cargarTemas() {
	var url = document.forms[0].Protocolo.value + "://"
			+ document.forms[0].hostRutas.value + ":"
			+ document.forms[0].Puerto.value + "/"
			+ document.forms[0].pathRutas.value
			+ "/SeleccionTema?ReadForm";
	$.ajax({
      	cache: false,
      	url: url,
      	contentType: "text/json; charset=iso-8859-1",
      	success: function(data) {
			newoption = new Option("");
			document.forms[0].SelectTema.options[0] = newoption;
			for (var i=0; i<data.infoTemas.length-1; i++) {
				var newoption = new Option(data.infoTemas[i].nombreTema,data.infoTemas[i].tipoRuta);
			    document.forms[0].SelectTema.options[i+1] = newoption;
			}
			//Si el modo es edicion, cargo el tema guardado y sus campos
			if (document.forms[0].Modo.value == "0") {
				$("#SelectTema").val(document.getElementById("Tema").value);
				cargarCampos(true);
			}
		}
	});
}

function cargarCampos(inicio) {
	var temas = document.getElementById("SelectTema");
	
	if (!inicio) {
		//Quitar campos de tema viejo
		for (var i=0; i<NombresCamposTema.length; i++) {
			$("select#multi option[value='" + NombresCamposTema[i] + "']").remove();
		}
	}

	NombresCamposTema = new Array();
	EtiquetasCamposTema = new Array();

	//Si se selecciona un tema
	if (temas.options[temas.selectedIndex].value != "") {
		var nro = temas.options[temas.selectedIndex].value.split("##")[1];
		var url = document.forms[0].Protocolo.value + "://"
				+ document.forms[0].hostRutas.value + ":"
				+ document.forms[0].Puerto.value + "/"
				+ document.forms[0].pathRutas.value
				+ "/JSONTemasCamposEtiquetas?OpenAgent&clave=" + nro;
		//Cargar campos nuevos
		$.ajax({
	      	cache: false,
	      	url: url,
	      	contentType: "text/json; charset=iso-8859-1",
	      	success: function(data) {
				size = NombresCamposCaratula.length;
				for (var i=0; i<data.lista.length; i++) {
					if (data.lista[i].Tipo != "Botón") {
						NombresCamposTema.push(data.lista[i].Campo);
						EtiquetasCamposTema.push(data.lista[i].Etiqueta);
						var newoption = new Option(data.lista[i].Etiqueta,data.lista[i].Campo);
						document.forms[0].multi.options[i+size] = newoption;
					}
				}
				//Recarga del campo con campos guardados
				$('.multiselectable').remove();
				$(function() {
					$('#multi').val(document.getElementById("Resultado").value.split("##"));
					$('#multi').multiselectable({
						selectableLabel: 'Todos los Campos',
						selectedLabel: 'Campos Seleccionados'
					});
					$('#multi').sortOptions();
					$('#multi').val(document.getElementById("Resultado").value.split("##"));
				});
			}
		});
	}
	else {
		//Recarga del campo con campos guardados
		$('.multiselectable').remove();
		$(function() {
			$('#multi').val(document.getElementById("Resultado").value.split("##"));
			$('#multi').multiselectable({
				selectableLabel: 'Todos los Campos',
				selectedLabel: 'Campos Seleccionados'
			});
			$('#multi').sortOptions();
			$('#multi').val(document.getElementById("Resultado").value.split("##"));
		});
	}
}

function selCriterio() {
	var e = document.getElementById("CriterioBusqueda");
	var sel = e.options[e.selectedIndex].text;
	var campo = document.getElementById("UnidadDestino");
	var tdOr = document.getElementById("tdOrigen");
	var tdDes = document.getElementById("tdDestino");
	var campoO = document.getElementById("UnidadOrigen");

	if (sel == "Ninguno") {
		campoO.style.visibility = 'hidden';
		campoO.selectedIndex = 0;
		campo.style.visibility = 'hidden';
		campo.selectedIndex = 0;
		tdOr.innerHTML = "<td width='20%'></td>";
		tdDes.innerHTML = "<td width='10%'></td>";
	}
	if (sel == "Origen") {
		campoO.style.visibility = 'visible';
		campo.style.visibility = 'hidden';
		campo.selectedIndex = 0;
		tdOr.innerHTML = "<td width='20%'>Unidad Origen</td>";
		tdDes.innerHTML = "<td width='10%'></td>";
	}
	else if (sel == "Ubicación Actual") {
		campoO.style.visibility = 'visible';
		campo.style.visibility = 'hidden';
		campo.selectedIndex = 0;
		tdOr.innerHTML = "<td width='20%'>Unidad Actual</td>";
		tdDes.innerHTML = "<td width='10%'></td>";
	}
	else if (sel == "Ubicación Anterior") {
		campoO.style.visibility = 'visible';
		campo.style.visibility = 'hidden';
		campo.selectedIndex = 0;
		tdOr.innerHTML = "<td width='20%'>Unidad Anterior</td>";
		tdDes.innerHTML = "<td width='10%'></td>";
	}
	else if (sel == "Enviado" || sel == "Enviado y Recibido") {
		campoO.style.visibility = 'visible';
		campo.style.visibility = 'visible';
		tdOr.innerHTML = "<td width='20%'>Enviado desde</td>";
		tdDes.innerHTML = "<td width='10%'>hasta</td>";
	}
}
