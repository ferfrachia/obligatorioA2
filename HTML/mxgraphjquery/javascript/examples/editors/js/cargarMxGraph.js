if(typeof dojo!='undefined'){
	// Se agrega una funcion cuando se cargan las pesta�as de dojo
dojo.addOnLoad(
	// El cometido de la funcion es instalar en las pesta�as la funcionalidad
	// de cargar la aplicaci�n mxGraph (mxApplication.js) al cambiarse a la pesta�a
	// correspondiente
	function() {
		var tabContainer = dijit.byId("mainTabContainer");
		// dojo.connect con el parametro "_transition" hace que se ejecute la funcion
		// pasada como par�metro al cambiar de pesta�a en el tabContainer
		dojo.connect(tabContainer, "_transition",
			// Cuando el usuario clickea en una pesta�a distina a la que tiene el foco
			// se dispara esta funci�n, a la que dojo le pasa como par�metros newPage y oldPage.
			// newPage es la pesta�a que presiono el usuario y oldPage es la que ten�a el foco
			// antes del evento
			function(newPage, oldPage) {
				// Si el mxGraph (pesta�a Gr�ficos) ten�a el foco y fue cambiada
				// tengo que ocultar la barra de herramientas
				if (oldPage.id == "Graficos") {
					// toolbarContainer es el id del div que contiene la barra
					// de herramientas del editor del mxGraph
					var tb = document.getElementById("toolbarContainer");
				}
				// Si la pesta�a del mxGraph fue la que se presiono y se est� tratando de
				// abrir se debe cargar la aplicaci�n mxGraph o el visualizador de mxGraph
				// dependiendo si se est� en modo edici�n o lectura
				if (newPage.id == "Graficos") {
					var edicion = document.forms[0].modo.value == "1";
					if (!edicion) {
						// Cargo la aplicaci�n solo la primera vez
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
// Se agrega una funcion cuando se cargan las pesta�as de jquery
// El cometido de la funcion es instalar en las pesta�as la funcionalidad
// de cargar la aplicaci�n mxGraph (mxApplication.js) al cambiarse a la pesta�a
// correspondiente
$("#mainTabContainer").bind("tabsselect", function(event, ui) {
	// Cuando el usuario clickea en una pesta�a distina a la que tiene el foco
	// se dispara esta funci�n, a la que jquery le pasa como par�metros event y ui.
	// ui.panel.id es la pesta�a que presiono el usuario
	// Si la pesta�a del mxGraph fue la que se presiono y se est� tratando de
	// abrir se debe cargar la aplicaci�n mxGraph o el visualizador de mxGraph
	// dependiendo si se est� en modo edici�n o lectura
	if (ui.panel.id == "Graficos") {
		var edicion = document.forms[0].modo.value == "1";
		if (!edicion) {
			alert("not edicion");
			// Cargo la aplicaci�n solo la primera vez
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
		// Si el mxGraph (pesta�a Gr�ficos) ten�a el foco y fue cambiada
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
	// Cuando el usuario clickea en una pesta�a distina a la que tiene el foco
	// se dispara esta funci�n, a la que jquery le pasa como par�metros event y ui.
	// ui.panel.id es la pesta�a que presiono el usuario
	// Si la pesta�a del mxGraph fue la que se presiono y se est� tratando de
	// abrir se debe cargar la aplicaci�n mxGraph o el visualizador de mxGraph
	// dependiendo si se est� en modo edici�n o lectura
	if (ui.newPanel.attr("id")== "Graficos") {
		var edicion = document.forms[0].modo.value == "1";
		if (!edicion) {
			// Cargo la aplicaci�n solo la primera vez
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
		// Si el mxGraph (pesta�a Gr�ficos) ten�a el foco y fue cambiada
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