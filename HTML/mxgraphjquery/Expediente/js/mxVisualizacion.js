
function mxVisualizacion(config, xmlString, recorrido) {
	var hideSplash = function() {
		// Fades-out the splash screen
		var splash = document.getElementById('splash');
		
		if (splash != null)
		{
			try
			{
				mxEvent.release(splash);
				mxEffects.fadeOut(splash, 100, true);
			}
			catch (e)
			{
				alert("error");
				splash.parentNode.removeChild(splash);
			}
		}
	}
	
	try {
	
		if (!mxClient.isBrowserSupported()) {
			mxUtils.error('Browser is not supported!', 200, false);
		} else {
			
			// Crear instancia del mxEditor
			var node = mxUtils.load(config).getDocumentElement();
			var editor = new mxEditor(node);
			editor.graph.setEnabled(false);
			
			// Cambiar los estilos por defecto del editor
			var style = editor.graph.getStylesheet().getDefaultVertexStyle();
			style[mxConstants.STYLE_PERIMETER_SPACING] = 6;
			style[mxConstants.STYLE_FONTFAMILY] = "Verdana";
			style[mxConstants.STYLE_WHITE_SPACE] = "wrap";
			style[mxConstants.STYLE_FILLCOLOR] = "#EEEEEE";
			style[mxConstants.STYLE_GRADIENTCOLOR] = "#888888";
			style[mxConstants.STYLE_STOKECOLOR] = "#888888";
			delete style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR];
			var style = editor.graph.getStylesheet().getDefaultEdgeStyle();
			style[mxConstants.STYLE_FONTSIZE] = '10';
				
			// Cargar XML
			var doc = mxUtils.parseXml(xmlString);
			var node = doc.documentElement;
			editor.readGraphModel(node);
			
			// Agregar numeros de seccion
			var celdas = editor.graph.model.cells;
			var maxId = editor.graph.model.nextId;
			for (i = 0; i <= maxId; i++) {
				var cell = celdas[i];
				if (cell != undefined) {
					var numSeccion = cell.getAttribute('numSeccion');
					if (numSeccion != undefined) {
						editor.graph.setTooltips(true);
						urlImagen = '/mxgraph/javascript/examples/editors/images/overlays/numeros/' + numSeccion + '.png'
						var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16), 'Seccion ' + numSeccion);
						editor.graph.addCellOverlay(cell, overlay);
						editor.graph.refresh(cell);
					}
					var numPase = cell.getAttribute('numPase');
					if (numPase != undefined) {
						editor.graph.setTooltips(true);
						urlImagen = '/mxgraph/javascript/examples/editors/images/overlays/numeros/' + numPase + 'Pase.png';
						var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16), 'Pase ' + numPase);
						overlay.align = "left"
						editor.graph.addCellOverlay(cell, overlay);
						editor.graph.refresh(cell);
					}
				}

			}
			
			// Pintar recorrido
			var celdas = editor.graph.model.cells;
			for (i = 0; i <= recorrido.length; i++) {
				var cell = celdas[recorrido[i]];
				if (cell != undefined) {
					var numSeccion = cell.getAttribute('numSeccion');
					if (numSeccion != undefined) {
						var estiloViejo = cell.getStyle();
						if (estiloViejo == undefined) {
							cell.setStyle("none;gradientColor=#22AA22;");
						} else {
							cell.setStyle(estiloViejo + ";gradientColor=#22AA22");
						}
						editor.graph.refresh(cell);
					} else {
						var estiloViejo = cell.getStyle();
						//alert(estiloViejo);
						if (estiloViejo.indexOf("symbol;image=/mxgraph/javascript/examples/editors/images/symbols/terminate.png") != -1 ) {
							cell.setStyle(estiloViejo.replace("terminate.png", "terminate_green.png"));
						}
						editor.graph.refresh(cell);
					}
				}
			}
		}
			
		// Shows the application
		hideSplash();
		
	} catch (e) {
	
		hideSplash();
			// Shows an error message if the editor cannot start
		mxUtils.alert('Cannot start application: ' + e.message + '. ' + e.description + '.');
		throw e; // for debugging
		
	}
	
	return editor;
}
