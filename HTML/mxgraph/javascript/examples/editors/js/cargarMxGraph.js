if(typeof dojo!='undefined'){
	// Se agrega una funcion cuando se cargan las pestañas de dojo
dojo.addOnLoad(
	// El cometido de la funcion es instalar en las pestañas la funcionalidad
	// de cargar la aplicación mxGraph (mxApplication.js) al cambiarse a la pestaña
	// correspondiente
	function() {
		var tabContainer = dijit.byId("mainTabContainer");
		// dojo.connect con el parametro "_transition" hace que se ejecute la funcion
		// pasada como parámetro al cambiar de pestaña en el tabContainer
		dojo.connect(tabContainer, "_transition",
			// Cuando el usuario clickea en una pestaña distina a la que tiene el foco
			// se dispara esta función, a la que dojo le pasa como parámetros newPage y oldPage.
			// newPage es la pestaña que presiono el usuario y oldPage es la que tenía el foco
			// antes del evento
			function(newPage, oldPage) {
				// Si el mxGraph (pestaña Gráficos) tenía el foco y fue cambiada
				// tengo que ocultar la barra de herramientas
				if (oldPage.id == "Graficos") {
					// toolbarContainer es el id del div que contiene la barra
					// de herramientas del editor del mxGraph
					var tb = document.getElementById("toolbarContainer");
				}
				// Si la pestaña del mxGraph fue la que se presiono y se está tratando de
				// abrir se debe cargar la aplicación mxGraph o el visualizador de mxGraph
				// dependiendo si se está en modo edición o lectura
				if (newPage.id == "Graficos") {
					var edicion = document.forms[0].modo.value == "1";
					if (!edicion) {
						// Cargo la aplicación solo la primera vez
						if (editor == undefined) {
							var tb = document.getElementById("toolbarContainer");
							var xmlString = document.getElementById("XML").value
							var recorrido = new Array();
							editor = new mxVisualizacion('/mxgraph/javascript/examples/editors/config/workfloweditor.xml', xmlString, recorrido);
						}
					} else {
						if (editor == undefined) {
							var tb = document.getElementById("toolbarContainer");
							editor = new mxApplication('/mxgraph/javascript/examples/editors/config/workfloweditor.xml', true);
						} else {
							var tb = document.getElementById("toolbarContainer");
							tb.style.visibility = "visible";
						}
					}
				}
			} // function(newPage, oldPage)
		); // dojo.connect(tabContainer, "_transition",
	} // function() {
); // dojo.addOnLoad(
}else{
//ESTO FUNCIONA SOLO PARA LA VERSION DE JQUERY UI 1.8
// Se agrega una funcion cuando se cargan las pestañas de jquery
// El cometido de la funcion es instalar en las pestañas la funcionalidad
// de cargar la aplicación mxGraph (mxApplication.js) al cambiarse a la pestaña
// correspondiente
$("#mainTabContainer").bind("tabsselect", function(event, ui) {
	// Cuando el usuario clickea en una pestaña distina a la que tiene el foco
	// se dispara esta función, a la que jquery le pasa como parámetros event y ui.
	// ui.panel.id es la pestaña que presiono el usuario
	// Si la pestaña del mxGraph fue la que se presiono y se está tratando de
	// abrir se debe cargar la aplicación mxGraph o el visualizador de mxGraph
	// dependiendo si se está en modo edición o lectura
	if (ui.panel.id == "Graficos") {
		var edicion = document.forms[0].modo.value == "1";
		if (!edicion) {
			alert("not edicion");
			// Cargo la aplicación solo la primera vez
			if (editor == undefined) {
				var tb = document.getElementById("toolbarContainer");
				var xmlString = document.getElementById("XML").value
				var recorrido = new Array();
				editor = new mxVisualizacion('/mxgraphjquery/javascript/examples/editors/config/workfloweditor.xml', xmlString, recorrido);
			}
		} else {
			if (editor == undefined) {
				var tb = document.getElementById("toolbarContainer");
				editor = new mxApplication('/mxgraphjquery/javascript/examples/editors/config/workfloweditor.xml', true);
			} else {
				var tb = document.getElementById("toolbarContainer");
				tb.style.visibility = "visible";
			}
		}
	}else{
		// Si el mxGraph (pestaña Gráficos) tenía el foco y fue cambiada
		// tengo que ocultar la barra de herramientas
		// toolbarContainer es el id del div que contiene la barra
		// de herramientas del editor del mxGraph
		var tb = document.getElementById("toolbarContainer");
		if (tb.style.visibility == "visible") {
			tb.style.visibility = "hidden";
		}
	}
});
$("#mainTabContainer").bind("tabsactivate", function(event, ui) {
	// Cuando el usuario clickea en una pestaña distina a la que tiene el foco
	// se dispara esta función, a la que jquery le pasa como parámetros event y ui.
	// ui.panel.id es la pestaña que presiono el usuario
	// Si la pestaña del mxGraph fue la que se presiono y se está tratando de
	// abrir se debe cargar la aplicación mxGraph o el visualizador de mxGraph
	// dependiendo si se está en modo edición o lectura
	if (ui.newPanel.attr("id")== "Graficos") {
		var edicion = document.forms[0].modo.value == "1";
		if (!edicion) {
			// Cargo la aplicación solo la primera vez
			if (editor == undefined) {
				var tb = document.getElementById("toolbarContainer");
				var xmlString = document.getElementById("XML").value
				var recorrido = new Array();
				editor = new mxVisualizacion('/mxgraphjquery/javascript/examples/editors/config/workfloweditor.xml', xmlString, recorrido);
			}
		} else {
			if (editor == undefined) {
				var tb = document.getElementById("toolbarContainer");
				editor = new mxApplication('/mxgraphjquery/javascript/examples/editors/config/workfloweditor.xml', true);
			} else {
				var tb = document.getElementById("toolbarContainer");
				tb.style.visibility = "visible";
			}
		}
	}else{
		// Si el mxGraph (pestaña Gráficos) tenía el foco y fue cambiada
		// tengo que ocultar la barra de herramientas
		// toolbarContainer es el id del div que contiene la barra
		// de herramientas del editor del mxGraph
		var tb = document.getElementById("toolbarContainer");
		if (tb.style.visibility == "visible") {
			tb.style.visibility = "hidden";
		}
	}
});
}