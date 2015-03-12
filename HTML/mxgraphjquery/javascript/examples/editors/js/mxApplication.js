
{

// *****************************************************************************
// *************** F U N C I O N E S   A U X I L I A R E S  ********************
// *****************************************************************************

	
	/* Funcion que obtiene la URL de la base Organizacion.nsf, necesaria
	para obtener las oficinas que existen en la instalación */
	function getURLOrganizacion() {
		var protocolo = document.getElementById("Protocolo").value;
		var host = document.forms[0].sHostOrgan.value;
		var path = document.forms[0].sPathOrgan.value;
		return protocolo + '://' + host + '/' + path;
	}
	
	/* Funcion que obtiene la URL de la base Organizacion.nsf, necesaria
	para obtener las oficinas que existen en la instalación */
	function getURLWorkFlow() {
		var protocolo = document.getElementById("Protocolo").value;
		var host = document.forms[0].sHostWorkflowSystem.value;
		var path = document.forms[0].sPathWorkflowSystem.value;
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
					// *** Inicio petición AJAX
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
					var urlVistaUnidades = getURLOrganizacion() + '/VUniCodAjax?OpenView&count=5000';
					var req = new mxXmlRequest(urlVistaUnidades, '', 'GET', true);
	
					req.send(onload, onerror);
	
					// *** Fin petición AJAX
					// *** Inicio petición AJAX
					// Obtengo tipos de acciones disponibles
					var tiposAcciones;
					
					var onload = function(reqTA) {
						var txt = reqTA.getText();
						tiposAcciones = eval(txt);
						tiposAcciones.sort();
					}
					var onerror = function(reqTA) {
						mxUtils.alert(reqTA.getStatus());
					}
					var urlVistaTipos = getURLWorkFlow() + '/MxTiposAccionesParaAjax?OpenView&count=5000';
					var reqTA = new mxXmlRequest(urlVistaTipos, '', 'GET', true);
					reqTA.send(onload, onerror);
					// *** Fin petición AJAX
					
					// *** Inicio petición AJAX
					// Obtengo los grupos disponibles
					var grupos;
					var onload = function(reqG) {
						var txt = reqG.getText();
						grupos = eval(txt);
						grupos.sort();
					}
					var onerror = function(reqG) {
						mxUtils.alert(reqG.getStatus());
					}
					var urlVistaGrupos = getURLOrganizacion() + '/VGruxCodAjax?OpenView&count=5000';
					var reqG = new mxXmlRequest(urlVistaGrupos, '', 'GET', true);
					reqG.send(onload, onerror);
					// *** Fin petición AJAX

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
									// Muevo el combo a la posición relativa a la celda
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
								} 
								else if (cell.getAttribute("tipo") == "Accion"){
								
									sender.startEditingAtCell(cell);
									posLeft = cell.getGeometry().x + 55;
									posTop = cell.getGeometry().y + cell.getGeometry().height + 10;
									var combo = document.getElementById('comboAcciones');
									// Limpio opciones del combo
									for (i = combo.length - 1; i > 0; i--) {
										combo.remove(i);
									}
									// Llenar el combo con los tipos de accion disponibles
									for (i = 0; i < tiposAcciones.length; i++) {
										var opt = document.createElement('option');
										opt.text = tiposAcciones[i].nombre;
										opt.value = tiposAcciones[i].codigo;
										try {
											combo.add(opt, null); // W3C standard
										} catch(ex) {
											combo.add(opt); // Para Internet Explorer
										}
									}								
									// Muevo el combo a la posición relativa a la celda
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
								}
								else if (cell.getAttribute("tipo") == "Grupo"){
								
									sender.startEditingAtCell(cell);
									posLeft = cell.getGeometry().x + 55;
									posTop = cell.getGeometry().y + cell.getGeometry().height + 10;
									var combo = document.getElementById('comboGrupos');
									// Limpio opciones del combo
									for (i = combo.length - 1; i > 0; i--) {
										combo.remove(i);
									}
									// Llenar el combo con los tipos de accion disponibles
									for (i = 0; i < grupos.length; i++) {
										var opt = document.createElement('option');
										opt.text = grupos[i].nombre;
										opt.value = grupos[i].codigo;
										try {
											combo.add(opt, null); // W3C standard
										} catch(ex) {
											combo.add(opt); // Para Internet Explorer
										}
									}								
									// Muevo el combo a la posición relativa a la celda
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
								}
								else{
									sender.startEditingAtCell(cell);
								}
							}
						}
					});
					
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
					
					//****************************************
				} else {
					editor.graph.setEnabled(false);
				}
				
					
				// Displays version in statusbar
			//	editor.setStatus('mxGraph ' + mxClient.VERSION);
					
				// Cargar XML
				var xmlString = document.getElementById("XML").value

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
								urlImagen = '/mxgraph/javascript/examples/editors/images/overlays/numeros/' + numHoras + 'Dia.png';
								var overlay = new mxCellOverlay(new mxImage(urlImagen, 16, 16), 'Horas ' + numHoras);
								overlay.align = "right";
								overlay.verticalAlign = "top";
								editor.graph.addCellOverlay(cell, overlay);
								editor.graph.refresh(cell);
							}
							*/
							var idAccion = cell.getAttribute('idAccion');
							var nombreAccion = cell.getAttribute('nombre');

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
				}
				
				// Muestra la aplicación
				alert("8");
				hideSplash();
				alert("9");
			}
		} catch (e) {
			hideSplash();

			// Shows an error message if the editor cannot start
			mxUtils.alert('Hubo un problema al cargar la aplicación: ' + e.message);
			throw e; // for debugging
		}

		return editor;
	}
	
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
}
