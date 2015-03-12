
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
					/*
					var numDias = cell.getAttribute('numDias');
					if (numDias != undefined) {
						editor.graph.setTooltips(true);
						urlImagen = '/mxgraph/javascript/examples/editors/images/overlays/numeros/' + numDias + 'Dia.png';
						var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16), 'Dia ' + numDias);
						overlay.align = "left";
						overlay.verticalAlign = "top";
						editor.graph.addCellOverlay(cell, overlay);
						editor.graph.refresh(cell);
					}
					var numHoras = cell.getAttribute('numHoras');
					if (numHoras != undefined) {
						editor.graph.setTooltips(true);
						//urlImagen = '/mxgraph/javascript/examples/editors/images/overlays/numeros/' + numHoras + 'Dia.png';
						//var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16), 'Horas ' + numHoras);
						overlay.align = "right";
						overlay.verticalAlign = "top";
						editor.graph.addCellOverlay(cell, overlay);
						editor.graph.refresh(cell);
					}
					*/
					var idAccion = cell.getAttribute('idAccion');
					var nombreAccion = cell.getAttribute('nombreAccion');
					if (idAccion != undefined) {
						editor.graph.setTooltips(true);
						var urlImagen = '/mxgraph/javascript/examples/editors/images/overlays/numeros/' + idAccion + 'Dia.png';
						var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16), 'Accion ' + nombreAccion);	
						overlay.align = "right";
						overlay.verticalAlign = "top";
						editor.graph.addCellOverlay(cell, overlay);
						editor.graph.refresh(cell);
					}
					var tel = cell.getAttribute('avisoTelefono');
					var cel = cell.getAttribute('avisoCelular');
					var mail = cell.getAttribute('avisoMail');
					var textoTool = "Aviso por mensaje de ";
					var textoAux = "";
					if (tel == '1'){
						textoAux = "voz";
					}
					if (cel == '1'){
						if (textoAux == ""){
							textoAux = textoAux + "sms";
						}else if (mail == '1'){
							textoAux = textoAux + ", sms";
						}else{
							textoAux = textoAux + " y sms";
						}
					}
					if (mail == '1'){
						if (textoAux == ""){
							textoAux = textoAux + "mail";
						}else{
							textoAux = textoAux + "  y mail";
						}
					}
					textoTool  =  textoTool  + textoAux;
					if(textoTool != "Aviso por mensaje de "){
						var urlImagen = '/mxgraph/javascript/examples/editors/images/symbols/message_end.png'
						var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16),textoTool);
						overlay.align = "center";
						editor.graph.addCellOverlay(cell, overlay);
						editor.graph.refresh(cell);
					}
				}

			}
			//editor.graph.setEnabled(false);
			//editor.graph.setPanning(true);
			//editor.graph.setTooltips(true);
			//editor.graph.panningHandler.useLeftButtonForPanning = true;
			editor.graph.getTooltipForCell = function(cell)
					{
						var numDias = 0;
						var numHoras = 0;
						if (cell.getAttribute('numDias')!= undefined){
							numDias = cell.getAttribute('numDias');
							if (cell.getAttribute('numHoras') != undefined){
								numHoras = cell.getAttribute('numHoras')
								if (cell.getAttribute('label') != undefined) {
									return cell.getAttribute('label')+". Plazo: " + numDias+"d - " +numHoras+"h. "
								}
								return "Plazo: " + numDias+"d - " +numHoras+"h. "
							}
							return cell.getAttribute('label')+". Plazo: " +numDias+"d. "
						}
						if (cell.getAttribute('numHoras') != undefined){
							numHoras = cell.getAttribute('numHoras')
							if (cell.getAttribute('label') != undefined) {
								return cell.getAttribute('label')+". Plazo: " +numHoras+"h. "
							}
							return "Plazo: " +numHoras+"h. "
						}
						if (cell.getAttribute('label') != undefined) {
								return cell.getAttribute('label')+"."
						}
						return "Sin especificaciones"
					};
			// Pintar recorrido
			var celdas = editor.graph.model.cells;
			for (i = 0; i <= recorrido.length; i++) {
				var cell = celdas[recorrido[i]];
				if (cell != undefined) {
					var numSeccion = cell.getAttribute('numSeccion');
					var idGrupo = cell.getAttribute('idGrupo');
					var idAccion = cell.getAttribute('idAccion');
					if ((numSeccion != undefined) || (idAccion != -1)) {
						var estiloViejo = cell.getStyle();
						if (idGrupo != undefined) {
							cell.setStyle("symbol;image=/mxgraph/javascript/examples/editors/images/groups-folder-green.png");
						}else if (idAccion != undefined) {
							cell.setStyle("symbol;image=/mxgraph/javascript/examples/editors/images/gear-green.png");
						}else{
							if (estiloViejo == undefined) {
								cell.setStyle("none;gradientColor=#22AA22;");
							} else {
								cell.setStyle(estiloViejo + ";gradientColor=#22AA22");
							}
						}
						editor.graph.refresh(cell);
					}else {
						var estiloViejo = cell.getStyle();
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
