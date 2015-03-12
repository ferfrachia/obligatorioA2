
{

// *****************************************************************************
// *************** F U N C I O N E S   A U X I L I A R E S  ********************
// *****************************************************************************

	
	/* Funcion que obtiene la URL de la base Organizacion.nsf, necesaria
	para obtener las oficinas que existen en la instalaci�n */
	function getURLOrganizacion() {
		var protocolo = document.forms[0].Protocolo.value;
		var host = document.forms[0].sHostOrgan.value;
		var path = document.forms[0].sPathOrgan.value;
		return protocolo + '://' + host + '/' + path;
	}
	
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************

	
// *****************************************************************************
// *************** F U N C I O N   P R I N C I P A L  **************************
// *****************************************************************************
	
	function mxApplication(config, editable) {
	
		var hideSplash = function()	{
			// Fades-out the splash screen
			var splash = document.getElementById('splash');
			
			if (splash != null) {
				try {
					mxEvent.release(splash);
					mxEffects.fadeOut(splash, 100, true);
				} catch (e) {
					alert("error");
					splash.parentNode.removeChild(splash);
				}
			}
		}
		
		try {
			if (!mxClient.isBrowserSupported()) {
				mxUtils.error('Navegador web no soportado!', 200, false);
			} else {
				
				var node = mxUtils.load(config).getDocumentElement();
				var editor = new mxEditor(node);
			//	cambiarEstilosPorDefecto(editor.graph.getStylesheet());
				
				if (editable) {
					var tbr = document.getElementById('toolbarContainer');
					tbr.style.visibility = "visible";
					var toolbar = new mxDefaultToolbar(tbr, editor);
					
					// Updates the window title after opening new files
					var title = document.title;
					var funct = function(sender) {
						document.title = title + ' - ' + sender.getTitle();
					};
					
					editor.addListener(mxEvent.OPEN, funct);
					
					// Prints the current root in the window title if the
					// current root of the graph changes (drilling).
					editor.addListener(mxEvent.ROOT, funct);
					funct(editor);
					
					// *** Inicio petici�n AJAX
					// Obtengo oficinas disponibles
					var oficinas;
					var onload = function(req) {
						var txt = req.getText();
						oficinas = eval(txt);
						oficinas.sort();
					}
					var onerror = function(req) {
						mxUtils.alert(req.getStatus());
					}
					var urlVistaUnidades = getURLOrganizacion() + '/UnidadPorCodigoParaAjax?OpenView&count=5000';
					var req = new mxXmlRequest(urlVistaUnidades, '', 'GET', true);
					req.send(onload, onerror);
					// *** Fin petici�n AJAX
					
					editor.graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt) {					
						var cell = evt.getProperty('cell');
						if (cell != null) {
							if (cell.isVertex()) {
								if (cell.getStyle() == undefined) {
									sender.startEditingAtCell(cell);
									posLeft = cell.getGeometry().x + 55;
									posTop = cell.getGeometry().y + cell.getGeometry().height + 10;
									var combo = document.getElementById('combo');
									// Limpio opciones del combo
									for (i = combo.length - 1; i > 0; i--) {
										combo.remove(i);
									}
									// Llenar el combo con las oficinas disponibles
									for (i = 0; i < oficinas.length; i++) {
										var opt = document.createElement('option');
										opt.text = oficinas[i].nombre;
										opt.value = oficinas[i].codigo;
										try {
											combo.add(opt, null); // W3C standard
										} catch(ex) {
											combo.add(opt); // Para Internet Explorer
										}
									}								
									// Muevo el combo a la posici�n relativa a la celda
									combo.style.left = posLeft;
									combo.style.top = posTop;
									// Guardo el id de la celda en un atributo del combobox para desde
									// el combo saber a que celda se le seatea la oficina seleccionada
									combo.idCelda = cell.getId();
									// Hago visible el combo
									combo.style.visibility = "visible";
									// Deshabilito el diagrama
									editor.graph.enabled = false;
									editor.toolbar.toolbar.enabled = false;
								} else {
									sender.startEditingAtCell(cell);
								}
							}
						}
					});
					
					//****************************************
					
				} else {
					editor.graph.setEnabled(false);
				}
				
					
				// Displays version in statusbar
			//	editor.setStatus('mxGraph ' + mxClient.VERSION);
					
				// Cargar XML
				var xmlString = document.forms[0].XML.value;
				// Si es vacio es porque es nuevo, sino carga el diagrama guardado en XML
				if (xmlString != "") {
					var doc = mxUtils.parseXml(xmlString);
					var node = doc.documentElement;
					editor.readGraphModel(node);
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
				}
				
				// Muestra la aplicaci�n
				hideSplash();
			}
		} catch (e) {
			hideSplash();

			// Shows an error message if the editor cannot start
			mxUtils.alert('Hubo un problema al cargar la aplicaci�n: ' + e.message);
			throw e; // for debugging
		}

		return editor;
	}
	
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
}
