var frm;
var nro;
var dlgTomarConocimiento;
var xmlDoc;
var CamposObligatorios;
var Etiquetas;
var TipoCampos;
var TodosCampos;
var TodosValoresCampos;
var TodosTipoCampos;
var TodosEtiquetasCampos;
var TodosTamanos;
var TodosAgentes;
var TodosEsObligatorio;
var TodosTipoOpciones;
var TodosOpciones;
var Agentes;
var Parametros;
var URLs;
var aUsu;

function agregarUsu(value){ 
	if (aUsu=="GE")	
		agregarUsuGE(value);
	else
		agregarUsuMC(value);;
}

//Pregunta para confirmar la operación
function ConfirmarOperacion(op){ 
	if (confirm('¿Desea continuar con la operación ' + op + '?'))	
		return true;
	else
		return false;
}

//Oculta la barra de Menu
function OcultarMenu(){
	document.getElementById('barraMenu').style.display = "none";
}

//Valida los campos y hace un submit para guardar
function Salvar() {
	if (ConfirmarOperacion('Guardar')) {
		if (ValidarCampos()) { 
			OcultarMenu();
			AlmacenarCamposNotes();
			//Cuando el documento es nuevo se ejecuta la acci de crear expediente
			document.forms[0].sAccion.value = "acc_crear";	
			
			document.forms[0].submit();	
		}
	}
}

function ValidarCampos() {
	if (document.forms[0].sTema.value == ""){
		alert("Debe seleccionar el tema del Expediente");
		return false;
	}
	if ((document.forms[0].corrector.value == "0") && (document.forms[0].editandoAsunto.value == "1")) {
		eWebEditPro.instances[0].editor.MediaFile().AutomaticUpload().AllowUpload = false;	
		var texto = eWebEditPro.instances[0].editor.getBodyText();
		if ((texto == "" || texto.indexOf("<!--") == 0)) {
			alert("Debe ingresar el Asunto del Expediente");
			return false;
		}	
		else {
			eWebEditPro.instances[0].editor.ExecCommand("cmdspellcheck","",0);
			texto = eWebEditPro.instances[0].editor.getBodyText();
			document.forms[0].sAsunto.value = texto.toUpperCase();
		}
	}
	else {
		if (document.forms[0].ccEstado.value == "En Generación") {
			if (document.getElementsByName('cTipoObligatorio')[0].value == "1") {
				if (document.getElementById("Obligatorio").value == "") {
					alert("Debe seleccionar el Tipo de Expediente");
					return false;
				}
			}
		}
		if (validar(frm.sAsunto,"Debe ingresar el Asunto del Expediente")) {		
			if (document.forms[0].rTienePaquete.value == "Si" && document.forms[0].sDescPaquete.value == "") {
				alert("Debe ingresar la descripción del paquete");
				return false;
			}
		}
		else {
			return false;
		}
	}
	//Modificado porque en IE no andaba la funcion
	if($.trim($('#sAsunto').val()) == ''){
		//textarea is empty or contains only white-space
		alert("Debe ingresar el Asunto del Expediente");
		return false;
	}
	for (var i=CamposObligatorios.length-1; i>=0; i--) {
		if (TipoCampos[i] == "Combobox") {
			campoAux = document.getElementById(CamposObligatorios[i]);
			if (campoAux.options[campoAux.selectedIndex].text == "") {
				alert("Debe ingresar un valor para el campo " + Etiquetas[i]);
				return false;
			}
		}
		else if (TipoCampos[i] == "PickList") {
			campoAux = document.getElementById(CamposObligatorios[i]);
			if (campoAux.value == "") {
				alert("Debe ingresar un valor para el campo " + Etiquetas[i]);
				return false;
			}
		}
		else if (TipoCampos[i] == "Radio" || TipoCampos[i] == "Checkbox") {
			if ($('input[name='+CamposObligatorios[i]+']:checked').val() == undefined) {
				alert("Debe ingresar un valor para el campo " + Etiquetas[i]);
				return false;
			}
		}
		else if (TipoCampos[i] != "Botón") {
			if (document.getElementById(CamposObligatorios[i]).value == "") {
				alert("Debe ingresar un valor para el campo " + Etiquetas[i]);
				return false;
			}
		}
	}
	for (var i=TodosCampos.length-1; i>=0; i--) {
		if (TodosTipoCampos[i] == "Numérico" && !isNumber(document.getElementById(TodosCampos[i]).value)) {
			alert("El campo " + TodosEtiquetasCampos[i] + " solo acepta valores numéricos");
			return false;
		}
		else if (TodosTipoCampos[i] == "Fecha") {
			var fecha = document.getElementById(TodosCampos[i]);
			var dateString = fecha.value.substring(3,5);
			dateString += "/" + fecha.value.substring(0,2) + fecha.value.substring(5,10);
			var valorFecha = new Date(dateString);
			if (valorFecha.toString() == "Invalid Date") {
				alert("El campo " + TodosEtiquetasCampos[i] + "solo acepta valores tipo fecha con formato dd/mm/aaaa");
				return false;
			}
		}
	}
	if ($("#sTipoLegal").val() == "") {
		//select is empty or contains only white-space
		alert("Debe ingresar el Tipo Legal del Expediente");
		return false;
	}

	return true;
}

function AlmacenarCamposNotes() {
	//Voy a guardar en los campos notes los valores de los campos html dinamicos
	//etiquetaCampo #% nombreCampo #% tamaño #% {valorCampo[,valor],agente} [#%esObligatorio[#%TipoOpciones#%Opciones]], esto se guardara en los campos notes
	var indiceNum = 0;
	var indiceDate = 0;
	var indiceText = 0;
	var indiceCal = 0;
	var indiceBot = 0;
	var indiceCom = 0;
	var indicePic = 0;
	var indiceRad = 0;
	var indiceChe = 0;
	var indiceAut = 0;

	document.getElementById("VectorCampos").value = "";
	
	for (var i=0; i<TodosCampos.length; i++) {
		if (TodosTipoCampos[i] == "Botón") {
			document.getElementById("Boton_"+indiceBot.toString()).value =
				TodosEtiquetasCampos[i] + "#%"
				+ TodosCampos[i] + "#%"
				+ TodosTamanos[i] + "#%"
				+ TodosAgentes[i] + "#%";
			document.getElementById("VectorCampos").value += "Boton_" + indiceBot.toString() + "#%";
			indiceBot++;
		}
		else {
			var valor = "*undefined*";
			if (TodosTipoCampos[i] == "Fecha") {
				if (document.getElementById(TodosCampos[i]).value != "") {
					valor = document.getElementById(TodosCampos[i]).value;
				}
				document.getElementById("Fecha_"+indiceDate.toString()).value = 
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosEsObligatorio[i];
				document.getElementById("VectorCampos").value += "Fecha_" + indiceDate.toString() + "#%";
				indiceDate++; 
			}
			else if (TodosTipoCampos[i] == "Texto") {
				if (document.getElementById(TodosCampos[i]).value != "") {
					valor = document.getElementById(TodosCampos[i]).value;
				}
				document.getElementById("Texto_"+indiceText.toString()).value = 
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosEsObligatorio[i];
				document.getElementById("VectorCampos").value += "Texto_" + indiceText.toString() + "#%";
                indiceText++; 
			}
			else if (TodosTipoCampos[i] == "Numérico") {
				if (document.getElementById(TodosCampos[i]).value != "") {
					valor = document.getElementById(TodosCampos[i]).value;
				}
				document.getElementById("Numerico_"+indiceNum.toString()).value =
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosEsObligatorio[i];
				document.getElementById("VectorCampos").value += "Numerico_" + indiceNum.toString() + "#%";
			 	indiceNum++; 
			}
			else if (TodosTipoCampos[i] == "Calculado") {
				if (document.getElementById(TodosCampos[i]).value != "") {
					valor = document.getElementById(TodosCampos[i]).value;
				}
				document.getElementById("Calculado_"+indiceCal.toString()).value =
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosEsObligatorio[i];
				document.getElementById("VectorCampos").value += "Calculado_" + indiceCal.toString() + "#%";
				indiceCal++;
			}
			else if (TodosTipoCampos[i] == "Combobox") {
				if (document.getElementById(TodosCampos[i]).text != "") {
					valor = document.getElementById(TodosCampos[i]).value;
				}
				document.getElementById("Combobox_"+indiceCom.toString()).value =
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosEsObligatorio[i] + "#%"
					+ TodosOpciones[i] + "#%"
					+ TodosTipoOpciones[i];
				document.getElementById("VectorCampos").value += "Combobox_" + indiceCom.toString() + "#%";
				indiceCom++;
			}
			else if (TodosTipoCampos[i] == "PickList") {
				var opciones = StringToVector3(TodosOpciones[i],",");
				var valores = "";
				if (document.getElementById(TodosCampos[i]).value != "") {
					valores = document.getElementById(TodosCampos[i]).value;
				}
				if (valores == ""){
					valores="*undefined*";
				}
				document.getElementById("PickList_"+indicePic.toString()).value =
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valores + "#%"
					+ TodosEsObligatorio[i] + "#%"
					+ TodosOpciones[i] + "#%"
					+ TodosTipoOpciones[i];
				document.getElementById("VectorCampos").value += "PickList_" + indicePic.toString() + "#%";
				indicePic++;
			}
			else if (TodosTipoCampos[i] == "Radio") {
				if ($('input[name='+TodosCampos[i]+']:checked').val() != undefined) {
					valor = $('input[name='+TodosCampos[i]+']:checked').val();
				}
				document.getElementById("Radio_"+indiceRad.toString()).value =
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosEsObligatorio[i] + "#%"
					+ TodosOpciones[i] + "#%"
					+ TodosTipoOpciones[i];
				document.getElementById("VectorCampos").value += "Radio_" + indiceRad.toString() + "#%";
				indiceRad++;
			}
			else if (TodosTipoCampos[i] == "Checkbox") {
				var opciones = StringToVector3(TodosOpciones[i],",");
				var valores = "";
				var checks = new Array();
				$("input:checkbox[name="+TodosCampos[i]+"]").each(
						function() {
						    	checks.push($(this).is(':checked'));
							});
				for (var j=0; j<checks.length; j++) {
					valores += checks[j].toString() + ",";
				}
				document.getElementById("Checkbox_"+indiceChe.toString()).value =
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valores + "#%"
					+ TodosEsObligatorio[i] + "#%"
					+ TodosOpciones[i] + "#%"
					+ TodosTipoOpciones[i];
				document.getElementById("VectorCampos").value += "Checkbox_" + indiceChe.toString() + "#%";
				indiceChe++;
			}
			else if (TodosTipoCampos[i] == "Autocompletado") {
				
				if (document.getElementById(TodosCampos[i]).value != "") {
					valor = document.getElementById(TodosCampos[i]).value;
				}
				document.getElementById("Autocompletado_"+indiceAut.toString()).value = 
					TodosEtiquetasCampos[i] + "#%"
					+ TodosCampos[i] + "#%"
					+ TodosTamanos[i] + "#%"
					+ valor + "#%"
					+ TodosAgentes[i] + "#%"
					+ TodosEsObligatorio[i];
				
				document.getElementById("VectorCampos").value += "Autocompletado_" + indiceAut.toString() + "#%";
				indiceAut++; 
			}
		}
	}

	//Almacena los agentes y sus parámetros en sus respectivos campos notes
	document.getElementById("Agentes").value = "";
	document.getElementById("Parametros").value = "";
	document.getElementById("URLs").value ="";
	for (var i=0; i<Agentes.length; i++) {
		document.getElementById("Agentes").value += Agentes[i] + "#%";
		document.getElementById("Parametros").value += Parametros[i] + "#%";
		document.getElementById("URLs").value += URLs[i] + "#%";
	}
}

function cargarCampos() {
	
	var protocolo = document.forms[0].Protocolo.value;
	var server = document.forms[0].sHostDbRuta.value;
	var puerto = document.forms[0].Puerto.value;
	var pathRutas = document.forms[0].sPathDbRuta.value;
	var pathDatosExt = document.forms[0].sPathDbDatosExt.value;
	var nro = document.forms[0].nCodTema.value;
	//Modo edición
	if (document.getElementById("modo").value == "1") {
		
		if (document.forms[0].sTema.value != "" ) {
			if (document.getElementById("editarCombo").value == "1"){
				document.getElementById("Obligatorio").value = document.forms[0].sTema.value;
			}
	
			CamposObligatorios = new Array();
			Etiquetas = new Array();
			TodosCampos = new Array();
			TipoCampos = new Array();
			TodosTipoCampos = new Array();
			TodosEtiquetasCampos = new Array();
			TodosTamanos = new Array();
			TodosAgentes = new Array();
			TodosEsObligatorio = new Array();
			TodosTipoOpciones = new Array();
			TodosOpciones = new Array();
			Agentes = new Array();
			Parametros = new Array();
			URLs = new Array();
			
			//Cargo los campos html con sus valores correspondientes para editar
			//Formato: etiquetaCampo #% nombreCampo #% tamaño #% {valorCampo[,valor],agente} [#%esObligatorio[#%Opciones#%TipoOpciones]], esto se guardara en los campos notes
			var campos = StringToVector3($("[name='VectorCampos']").val(),"#%");
			for (var i=0; i<campos.vArray.length; i++) {
				if (campos.vArray[i] != "") {
					var tipo = campos.vArray[i].split("_")[0];
					var valores = StringToVector3($("[name='"+campos.vArray[i]+"']").val(),"#%");
					var html = "";
					
					if (tipo=="Autocompletado"){
						TodosEtiquetasCampos.push(valores.vArray[0]);
						TodosCampos.push(valores.vArray[1]);
						TodosTamanos.push(valores.vArray[2]);
						TodosAgentes.push(valores.vArray[4]);
						TodosEsObligatorio.push(valores.vArray[3]);
						TodosOpciones.push(valores.vArray[5]);
						TodosTipoOpciones.push(valores.vArray[6]);
					}else{
						
						TodosEtiquetasCampos.push(valores.vArray[0]);
						TodosCampos.push(valores.vArray[1]);
						TodosTamanos.push(valores.vArray[2]);
						TodosAgentes.push(valores.vArray[3]);
						TodosEsObligatorio.push(valores.vArray[4]);
						TodosOpciones.push(valores.vArray[5]);
						TodosTipoOpciones.push(valores.vArray[6]);
					}
					if (valores.vArray[4] == "Si") {
 						Etiquetas.push(valores.vArray[0]);
 						CamposObligatorios.push(valores.vArray[1]);
 						if (tipo == "Boton") {
 							TipoCampos.push("Botón");
 						}
 						else if (tipo == "Numerico") {
 							TipoCampos.push("Numérico");
 						}
 						else {
 							TipoCampos.push(tipo);
 						}
 					}
					
			    	//Si es botón no lleva título
					if (tipo == "Boton") {
						TodosTipoCampos.push("Botón");
						html += "<tr><td class='CeldaTitulo' width='100'></td>";
						html += "<td class='CeldaItems'><input type='button' " + getEstilo("Botón",valores.vArray[2]) + " class='agentbutton' name='" + valores.vArray[1] + "' id='" + valores.vArray[1] + "' onclick='llamarAgente(" + '"' + valores.vArray[3] + '"' + ")' value='" + valores.vArray[0] + "'></td></tr>";
					}
					else {
						var valor = valores.vArray[3];
						if (valor.indexOf("*undefined*")>=0) {
							valor = "";
						}
						if (valores.vArray[4] == "Si") {
							html += "<tr><td class='CeldaTitulo' width='100'>&nbsp;" + valores.vArray[0] + ": * &nbsp;</td>";
						}
						else {
							html += "<tr><td class='CeldaTitulo' width='100'>&nbsp;" + valores.vArray[0] + ": &nbsp;</td>";
						}
						if (tipo == "Fecha") {
							TodosTipoCampos.push(tipo);
							html += "<td class='CeldaItems'><input type='text' " + getEstilo("Fecha",valores.vArray[2]) + " class='CampoTransparenteVerde datepickerN' value='" + valor + "' name='"+ valores.vArray[1] +"' id='"+ valores.vArray[1] +"'></td></tr>";	    
	 					}
	 					else if (tipo == "Calculado") {
	 						TodosTipoCampos.push(tipo);
	 						html += "<td class='CeldaItems'><input type='text' class='CampoTransparenteVerde' disabled='true' value='" + valor + "' " + getEstilo("Calculado",valores.vArray[2]) + " name='"+ valores.vArray[1]+"' id='"+ valores.vArray[1] +"'></td></tr>";
	 					}
						else if (tipo == "Combobox") {
	 						TodosTipoCampos.push(tipo);
 	 						html += "<td class='CeldaItems'><select " + getEstilo("Combobox",valores.vArray[2]) + " name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"'>";
 	 						
 	 						if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 	 						
 	 						for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							if (trim(opcion.split("|")[1]) == valores.vArray[3]) {
 	 								html += "<option value='"+trim(opcion.split("|")[1])+"' selected>" + trim(opcion.split("|")[0]) + "</option>";
 	 							}
 	 							else {
 	 								html += "<option value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "</option>";
 	 							}
 	 						}
 	 						html += "</select></td></tr>";
 	 					}
						else if (tipo == "PickList") {
							TodosTipoCampos.push(tipo);
 							html += "<td class='CeldaItems'>";
 							
 							if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 	 						
 	 						seleccion="<select name='sel"+valores.vArray[1]+"' id='sel"+valores.vArray[1]+"'>";
 							for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							seleccion += "<option value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "</option>";
 	 						}
 							seleccion += "</select>";
 							html += "<input type='hidden' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+valores.vArray[3]+"'>"
 							html += "<div class='picklistDiv' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value=''>"+seleccion+"<input type='button' value='agregar' onclick='agregarPick(\""+valores.vArray[1]+"\")'><div>"
 	 						html += "<table type='' name='table"+valores.vArray[1]+"' id='table"+valores.vArray[1]+"'>"
 							
 	 						
 							var checked = StringToVector3(valores.vArray[3],",");
 							for (var j=0; j<checked.vArray.length; j++) {
 								for (var k=0; k<opciones.vArray.length; k++) {
 									var opcion = opciones.vArray[k];
 									if (checked.vArray[j] == trim(opcion.split("|")[1])) {
 										html += "<tr>";
 										html += 	"<td>";
 										html += 	opcion.split("|")[0];
 										html += 	"</td>";
 										html += 	"<td>";
 										html += 	"<input type='button' value='X' onclick='borrarPick(\""+valores.vArray[1]+"\",this,"+j+")'/>";
 										html += 	"</td>";
 										html += "</tr>";
 									}
 								}
 	 						}
 							
 							html += "</table>"
 	 						html += "</td></tr>";
 	 					}
 	 					else if (tipo == "Radio") {
 	 						TodosTipoCampos.push(tipo);
 	 						html += "<td class='CeldaItems'>";
 	 						
 	 						//var opciones = StringToVector3(valores.vArray[5],",");
 	 						if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 	 						
 	 						for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							if (trim(opcion.split("|")[1]) == valores.vArray[3]) {
 	 								html += "<input type='radio' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"' checked>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 							else {
 	 								html += "<input type='radio' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 						}
 	 						html += "</td></tr>";
 	 					}
 	 					else if (tipo == "Checkbox") {
 	 						TodosTipoCampos.push(tipo);
 							html += "<td class='CeldaItems'>";
 							
 							//var opciones = StringToVector3(valores.vArray[5],",");
 	 						if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 	 						
 							var checked = StringToVector3(valores.vArray[3],",");
 							for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							if (checked.vArray[j] == "true") {
 	 								html += "<input type='checkbox' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"' checked>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 							else {
 	 								html += "<input type='checkbox' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 						}
 	 						html += "</td></tr>";
 	 					}
 	 					else if (tipo == "Autocompletado") {
 	 						TodosTipoCampos.push(tipo);
 	 						//html += "<td class='CeldaItems'><input type='text' class='CampoTransparenteVerde' value='" + valor + "' " + getEstilo("Texto",valores.vArray[2]) + " name='"+ valores.vArray[1]+"' id='"+ valores.vArray[1] +"' onKeyPress='cargarAutocomplete("+'"'+data.lista[i].Campo+'",'+'"'+data.lista[i].Agente+'"'+")'"+"></td></tr>";
 	 						html += "<td class='CeldaItems'>" +
 	 									"<input type='text' class='CampoTransparenteVerde' value='" + valor + "' " + getEstilo("Texto",valores.vArray[2]) + " name='"+ valores.vArray[1]+"' id='"+ valores.vArray[1] +"' onKeyPress='cargarAutocomplete("+'"'+valores.vArray[1]+'",'+'"'+valores.vArray[4]+'"'+")'"+">" +
 	 								"</td>" +
 	 								"<td class='CeldaItems'></td>" +
 	 								"</tr>";
 	 					}
						else {
	 						if (tipo == "Numerico") {
	 							TodosTipoCampos.push("Numérico");
	 						}
	 						else {
	 							TodosTipoCampos.push(tipo);
	 						}
	 						html += "<td class='CeldaItems'><input type='text' class='CampoTransparenteVerde' value='" + valor + "' " + getEstilo("Texto",valores.vArray[2]) + " name='"+ valores.vArray[1]+"' id='"+ valores.vArray[1] +"'></td></tr>";
	 					}
					}
					
					//Agrego dinamicamente las rows
			    	$("#Objetivo").closest('tr').after(html);
			    	//Agrego el datepicker
			    	$('.datepickerN').not('.hasDatePicker').datepicker();
				}
			}
			
			//Cargo los campos html con sus valores correspondientes para editar
			//Formato: etiquetaCampo #% nombreCampo #% tamaño #% {valorCampo,agente} [#%esObligatorio]
			var agentes = StringToVector3($("[name='Agentes']").val(),"#%");
			var parametros = StringToVector3($("[name='Parametros']").val(),"#%");
			var urls = StringToVector3($("[name='URLs']").val(),"#%");
			for (var i=0; i<agentes.vArray.length; i++) {
				if (agentes.vArray[i] != "") {
					Agentes.push(agentes.vArray[i]);
					Parametros.push(parametros.vArray[i]);
					URLs.push(urls.vArray[i]);
				}
			}
      	}
	}
	//Modo lectura
	else {

		if (document.forms[0].sTema.value != "") {
			//Cargo los campos html con sus valores correspondientes para visualizar
			//Formato: etiquetaCampo #% nombreCampo #% tamaño #% {valorCampo,agente} [#%esObligatorio]
			var campos = StringToVector3($("[name='VectorCampos']").val(),"#%");

			for (var i=0; i<campos.vArray.length; i++) {
				var html = "";
				if (campos.vArray[i] != "") {
					var tipo = campos.vArray[i].split("_")[0];
					var valores = StringToVector3($("[name='"+campos.vArray[i]+"']").val(),"#%");
					var html = "";
					
			    	//Si es botón no lleva título
					if (tipo != "Boton") {
						if (valores.vArray[4] == "Si") {
							html += "<tr><td class='CeldaTitulo' width='100'>&nbsp;" + valores.vArray[0] + ": * &nbsp;</td>";
						}
						else {
							html += "<tr><td class='CeldaTitulo' width='100'>&nbsp;" + valores.vArray[0] + ": &nbsp;</td>";
						}
						if (tipo == "Combobox") {
							if (valores.vArray[3] == "*undefined*") {
								html += "<td class='CeldaItems'></td></tr>";
							}
							else {
								//var opciones = StringToVector3(valores.vArray[5],",");
	 	 						if(valores.vArray[6] == "Valores"){
	 	 							var opciones = StringToVector3(valores.vArray[5],",");
	 	 						}else{
	 	 							var opciones;
	 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
	 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
	 	 					 		 function(data) {
	 	 								stringAux = "";
	 	 								stringSep = "";
	 	 								for(d = 0; d<data.valores.length;d++){
	 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
	 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
	 	 										stringSep = ","
	 	 									}
	 	 								}
	 	 								opciones = StringToVector3(stringAux,",");
	 	 							});
	 	 						}
	 	 						
	 	 						for (var j=0; j<opciones.vArray.length; j++) {
	 	 							var opcion = opciones.vArray[j];
	 	 							if (trim(opcion.split("|")[1]) == valores.vArray[3]) {
	 	 								html += "<td class='CeldaItems'>"+trim(opcion.split("|")[0])+"</td><td class='CeldaItems' colspan='2'></td></tr>";
	 	 							}
	 	 						}
							}
						}
						else if (tipo == "PickList") {
							html += "<td class='CeldaItems'>";
 	 						if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 	 						
 	 						html += "<table type='' name='table"+valores.vArray[1]+"' id='table"+valores.vArray[1]+"'>"
 	 						
 							var checked = StringToVector3(valores.vArray[3],",");
 							for (var j=0; j<checked.vArray.length; j++) {
 								for (var k=0; k<opciones.vArray.length; k++) {
 									var opcion = opciones.vArray[k];
 									if (checked.vArray[j] == trim(opcion.split("|")[1])) {
 										//html += "<input type='checkbox' name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"' checked>" + trim(opcion.split("|")[0]) + "&nbsp";
 										html += "<tr>";
 										html += 	"<td>";
 										html += 	opcion.split("|")[0];
 										html += 	"</td>";
 										html += "</tr>";
 									}
 								}
 	 						}
 							
 							html += "</table>"
 	 						html += "</td><td class='CeldaItems' colspan='2'></td></tr>";
						}
						else if (tipo == "Radio") {
							html += "<td class='CeldaItems'>";
							//var opciones = StringToVector3(valores.vArray[5],",");
 	 						if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 	 						for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							if (trim(opcion.split("|")[1]) == valores.vArray[3]) {
 	 								html += "<input type='radio' disabled name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"' checked>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 							else {
 	 								html += "<input type='radio' disabled name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 						}
 	 						html += "</td><td class='CeldaItems' colspan='2'></td></tr>";
						}
						else if (tipo == "Checkbox") {
							html += "<td class='CeldaItems'>";
							//var opciones = StringToVector3(valores.vArray[5],",");
 	 						if(valores.vArray[6] == "Valores"){
 	 							var opciones = StringToVector3(valores.vArray[5],",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+valores.vArray[5],
 	 					 		 function(data) {
 	 								stringAux = "";
 	 								stringSep = "";
 	 								for(d = 0; d<data.valores.length;d++){
 	 									if(data.valores[d].Valor != "##termina##" && data.valores[d].Clave != "##termina##"){
 	 										stringAux += stringSep + data.valores[d].Valor + "|" + data.valores[d].Clave;
 	 										stringSep = ","
 	 									}
 	 								}
 	 								opciones = StringToVector3(stringAux,",");
 	 							});
 	 						}
 							var checked = StringToVector3(valores.vArray[3],",");
 							for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							if (checked.vArray[j] == "true") {
 	 								html += "<input type='checkbox' disabled name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"' checked>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 							else {
 	 								html += "<input type='checkbox' disabled name='"+valores.vArray[1]+"' id='"+valores.vArray[1]+"' value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 							}
 	 						}
 	 						html += "</td><td class='CeldaItems' colspan='2'></td></tr>";
						}
						/*else if (tipo == "Autocompletado") {
							html += "<td class='CeldaItems'><input type='text' disabled class='CampoTransparenteVerde' value='" + valor + "' " + getEstilo("Texto",valores.vArray[2]) + " name='"+ valores.vArray[1]+"' id='"+ valores.vArray[1] +"' onKeyPress='cargarAutocomplete("+'"'+valores.vArray[1]+'",'+'"'+valores.vArray[4]+'"'+")'"+"></td></tr>";
						}*/
						else if (valores.vArray[3] == "*undefined*") {
							html += "<td class='CeldaItems' ></td><td class='CeldaItems' colspan='2'></td></tr>";
						}
						else {
							html += "<td class='CeldaItems'>"
										+valores.vArray[3]+
									"</td>" +
									"<td class='CeldaItems' ></td>" +
								"</tr>";
						}
					}
					//Agrego dinamicamente las rows
			    	$("#Objetivo").closest('tr').after(html);
			    	//Agrego el datepicker
			    	$('.datepickerN').not('.hasDatePicker').datepicker();
				}
			}
		}
	}
}

function llamarAgente(nombreAgente) {
	//Parseo de la lista de parámetros
	var i=0;
	while (Agentes[i] != nombreAgente && i<Agentes.length) {
		i++;
	}
	if (Agentes[i] != nombreAgente) {
		return;
	}
	
	var url = URLs[i];

	//Obetención de los campos de los parametros y colocación en el qs
	if (parametros != "*undefined*") {
		var parametros = StringToVector3(Parametros[i],",");
		for (var i=0; i<parametros.vArray.length; i++) {
			var campo = $('[name="' + parametros.vArray[i] + '"]');
			if (campo != undefined) {
				if (campo.is(':radio')) {
					if ($('input[name='+parametros.vArray[i]+']:checked').val() == undefined) {
						alert("Debe completar el campo " + trim(campo.closest('tr').find('td:first').text().split(":")[0]));
						return false;
					}
					else {
						url += "&" + parametros.vArray[i] + "=" + $('input[name='+parametros.vArray[i]+']:checked').val();
					}
				}
				else if (campo.is(':checkbox')) {
					if ($('input[name='+parametros.vArray[i]+']:checked').val() == undefined) {
						alert("Debe completar el campo " + trim(campo.closest('tr').find('td:first').text().split(":")[0]));
						return false;
					}
					else {
						var checks = new Array();
						$("input:checkbox[name="+parametros.vArray[i]+"]:checked").each(
								function() {
								    	checks.push($(this).val());
									});
						for (var j=0; j<checks.length; j++) {
							url += "&" + parametros.vArray[i] + "=" + checks[j].toString();
						}
					}
				}
				else {
					if (campo.val() == "") {
						alert("Debe completar el campo " + trim(campo.closest('tr').find('td:first').text().split(":")[0]));
						return;
					}
					if ((indice = jQuery.inArray(parametros.vArray[i], TodosCampos)) != -1) {
						if (TodosTipoCampos[indice] == "Numérico" && !isNumber(campo.val())) {
							alert("El campo " + trim(campo.closest('tr').find('td:first').text().split(":")[0]) + " solo acepta valores numéricos");
							return;
						}
						else if (TodosTipoCampos[indice] == "Fecha") {
							var fecha = campo.val();
							var dateString = fecha.substring(3,5);
							dateString += "/" + fecha.substring(0,2) + fecha.substring(5,10);
							var valorFecha = new Date(dateString);
							if (valorFecha.toString() == "Invalid Date") {
								alert("El campo " + trim(campo.closest('tr').find('td:first').text().split(":")[0]) + "solo acepta valores tipo fecha con formato dd/mm/aaaa");
								return;
							}
						}
					}
					url += "&" + parametros.vArray[i] + "=" + campo.val();
				}
				
			}
		}
	}

	$.ajaxSetup({cache: false, async: true});
	//Llama al agente pasado como parámetro, pasándole los campos necesarios
	$.getJSON(url,
		function(data) {
			if (data.codError == "0") {
 				var i = data.calculados.length - 1;
 				while (data.calculados[i] != null) {
 					//Control de existencia del campo
 					var campo = $('[name="' + data.calculados[i].Campo + '"]');
 					if (campo != undefined) {
 						campo.val(data.calculados[i].Valor);
 					}
 					i--;
 				}
 			}
 			else {
 				alert(data.Error);
      		}
      	});
}

function cambioTipoLegalSeleccionado(){
	fila = document.getElementById("JustRes");
	var e = document.getElementById("sTipoLegalSelect");
	var seleccionado = e.options[e.selectedIndex].text;
	//document.getElementById("sTipoLegal").value = seleccionado;
	$("#sTipoLegal").val(seleccionado);
	//document.forms[0].sTipoLegal.value = seleccionado;
	if(seleccionado!="Reservado"){
	 	document.getElementById("JustRes").style.display = "none";
	 	$('#sJustificacionTipoReservado').val('');
	}
	else{
		document.getElementById("JustRes").style.display = "";
	}
}

function cambioJustTipoLegalSeleccionado(){
	var e = document.getElementById("sJustTipoLegalSelect");
	var seleccionado = e.options[e.selectedIndex].text;
	$('#sJustificacionTipoReservado').val(seleccionado);
}

function EditarActuacion(){

	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	if (ConfirmarOperacion('Editar Actuación'))	{
		OcultarMenu();
		window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_carat_edit_act" + ",ID=" + nro;	
	}
}

function Recibir(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	if (ConfirmarOperacion('Recibir'))	{
		OcultarMenu();
		window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_recibir" + ",ID=" + nro;	
	}
}

function pathGestion(){
	var pathname=location.pathname; 
	return(pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))
}

function DirABS(){ 
	var pathname=location.pathname;  
	//return(pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))
	return ("../")
} 

function verRecorrido() {
	var pathDB=DirABS();
	window.open(pathDB+"/FRecorrido?OpenForm&ID="+document.forms[0].ccNroExp.value,'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=320,TOP=260,width=800,height=400');
}

function verAgregados() {
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	window.open(pathDB+"/FAgregados?OpenForm&" + nro,'Agregados','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=350');
}

function AnularPase(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	if (ConfirmarOperacion('Anular Pase'))	{
		OcultarMenu();
		window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_anular_pase" + ",ID=" + nro;	
	}
}

function MarcarConfidencial(){
	$("#dialogMarcarConfidencial").dialog('open');
}

function QuitarConfidencialidad(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;
	var msg = document.forms[0].sMsgConfidencialidad.value;
	
	if (msg == ""){
		if (ConfirmarOperacion('Quitar Confidencialidad'))	{
			OcultarMenu();
			window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_quitarConfidencialidad" + ",ID=" + nro;
		}
	}else{
		var mensajes = StringToVector3(msg,",");
		
		for(var i=0; i<mensajes.vArray.length;i++ ){
			if (!confirm(mensajes.vArray[i])){
				return;
			}else if (i==mensajes.vArray.length-1){
				OcultarMenu();
				window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_quitarConfidencialidad" + ",ID=" + nro;	
			}
			
		}
	}
	
	/*if (ConfirmarOperacion('Quitar Confidencialidad'))	{
		OcultarMenu();
		window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_quitarConfidencialidad" + ",ID=" + nro;	
	}*/

}

function addlectoresConfidencial(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	OcultarMenu();
	window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=FParametrosAddLectConfidencial" + ",ID=" + nro;	

}

function QuitarLectores(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	OcultarMenu();
	window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=FParametrosDelLectConfidencial" + ",ID=" + nro;	
}

function CopiarExpediente(strID){

	window.location = "/"+ pathCopia + "/FParametrosCopiarExpediente?openForm&ID=" + strID;

}

function verCopiasExpediente() {
	var pathDB=DirABS();
	window.open(pathDB+"/FVerCopiasExpediente?OpenForm&ID="+document.forms[0].ccNroExp.value,'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=320,TOP=260,width=750,height=400');
}

function verHistorialEnvioDeAvisosManual() {
	var pathDB=DirABS();
	window.open(pathDB+"/FVerHistorialEnvioAvisosManual?OpenForm&ID="+document.forms[0].ccNroExp.value,'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=320,TOP=260,width=750,height=400');
}

function ModificarPlazo(){
	$("#dialogModificarPlazo").dialog("open");
}

function SacarDeArchivo(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	if (ConfirmarOperacion('Sacar de Archivo'))	{
		OcultarMenu();
		window.parent.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_sacar_archivo" + ",ID=" + nro;
	}
}

function Agregar(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var unidad=document.forms[0].ccOficinaActual.value;

	OcultarMenu();
	window.location=pathDB + "/FParametrosAgregarExp?openForm&ID=" + nro + ",UNIDAD=" + unidad + ',urlorigen=' + window.location;	
}

function Desagregar(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	OcultarMenu();
	window.location=pathDB + "Controller?openAgent&User=" + usuario + ",Accion=FParametrosDesagregar" + ",ID=" + nro;	
}

function SalirBandejas(edicion){
	var pathDB=DirABS();
	var nro;

	if (document.forms[0].Query_String_Decoded.value.indexOf("Salida=1")>-1 ){
		var oficina = document.forms[0].ccOficinaAnterior.value;
	}else{
		var oficina = document.forms[0].ccOficinaActual.value;
	}
//	var oficina = document.forms[0].ccOficinaActual.value;
	if (!edicion)
		nro=document.forms[0].sNroExp.value;

	if (ConfirmarOperacion('Salir a Bandejas'))	{
		OcultarMenu();
		//window.location=pathDB + "/PostOperacion?openAgent&Accion=ir_bandejas" + ",nroExp=" + nro + ",unidad=" + oficina;	

		window.location.replace("/"+document.getElementById("sPathDbPortal").value+"/Bandejas?OpenForm&tipoDoc=Expediente")
	}
}

function SalirBandejasNotificaciones(edicion){
	var pathDB=DirABS();
	var nro;

	if (document.forms[0].Query_String_Decoded.value.indexOf("Salida=1")>-1 ){
		var oficina = document.forms[0].ccOficinaAnterior.value;
	}else{
		var oficina = document.forms[0].ccOficinaActual.value;
	}
//	var oficina = document.forms[0].ccOficinaActual.value;
	if (!edicion)
		nro=document.forms[0].sNroExp.value;

	if (ConfirmarOperacion('Salir a Bandejas de Notificaciones'))	{
		OcultarMenu();
		//window.location=pathDB + "/PostOperacion?openAgent&Accion=ir_notif" + ",nroExp=" + nro + ",unidad=" + oficina;	
		window.location.replace("../../Portal.nsf/Bandejas?OpenForm&tipoDoc=Expediente&bandeja=tabNotificados")
	}
}

function SalirBandejasMarcados(edicion){
	var pathDB=DirABS();
	var nro;
	var url = "/"+document.forms[0].sPathDbPortal.value
	if (document.forms[0].Query_String_Decoded.value.indexOf("Salida=1")>-1 ){
		var oficina = document.forms[0].ccOficinaAnterior.value;
	}else{
		var oficina = document.forms[0].ccOficinaActual.value;
	}
//	var oficina = document.forms[0].ccOficinaActual.value;
	if (!edicion)
		nro=document.forms[0].sNroExp.value;

	if (ConfirmarOperacion('Salir a Bandeja de Expedientes Marcados'))	{
		OcultarMenu();
		//window.location=pathDB + "/PostOperacion?openAgent&Accion=ir_marcados" + ",nroExp=" + nro + ",unidad=" + oficina;	
		window.location.replace("../../Portal.nsf/Bandejas?OpenForm&tipoDoc=Expediente&bandeja=tabMarcados")
	}
}

function SalirBandejasCopiaExp(edicion){
	var pathDB=DirABS();
	var nro;
	var url = "/"+document.forms[0].sPathDbPortal.value
	if (document.forms[0].Query_String_Decoded.value.indexOf("Salida=1")>-1 ){
		var oficina = document.forms[0].ccOficinaAnterior.value;
	}else{
		var oficina = document.forms[0].ccOficinaActual.value;
	}

	if (!edicion)
		nro=document.forms[0].sNroExp.value;

	if (ConfirmarOperacion('Salir a Bandeja de Copia Expediente'))	{
		OcultarMenu();
		//window.location=pathDB + "/PostOperacion?openAgent&Accion=ir_marcados" + ",nroExp=" + nro + ",unidad=" + oficina;	
		window.location.replace("../../Portal.nsf/Bandejas?OpenForm&tipoDoc=Expediente&bandeja=tabCopiaExp")

	}
}

function BandejaMaximizada(widget,bandeja){

	var pathDB=DirABS();
	var nro;
	if (document.forms[0].Query_String_Decoded.value.indexOf("Salida=1")>-1 ){
		var oficina = document.forms[0].ccOficinaAnterior.value;
	}
	else{
		var oficina = document.forms[0].ccOficinaActual.value;
	}
	nro=document.forms[0].sNroExp.value;

	if (ConfirmarOperacion('Salir a Bandejas'))	{
		OcultarMenu();
		//window.location=pathDB + "/PostOperacion?openAgent&Accion=ir_bandejas_max" + ",nroExp=" + nro + ",unidad=" + oficina +",bandeja=" + bandeja;	
		window.location= pathDB+"../Portal.nsf/Bandejas?OpenForm&tipoDoc=Expediente&bandeja="+widget+"&estado="+bandeja+"$max"
	}
}

function SalirInicio(edicion){
	var pathDB=DirABS();
	var nro;
	if (ConfirmarOperacion('Salir a Inicio'))	{
		OcultarMenu();	
		var url = "/"+document.getElementById("sPathDbPortal").value;
		if (!edicion){
			nro=document.forms[0].sNroExp.value;
			"../PostOperacion?openAgent&Accion=ir_inicio" + ",nroExp=" + nro;
		}
		window.location= url;
		
	}
}

function Editar(){

	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;

	var usuario=document.forms[0].sUsuarioActual.value;

	if (ConfirmarOperacion('Editar'))	{
		OcultarMenu();
		window.parent.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=acc_carat_edit" + ",ID=" + nro;
	}
}	

function SalvarCaratula() {
	if (ConfirmarOperacion('Guardar')) {
		if (ValidarCampos()) {
			AlmacenarCamposNotes();
			OcultarMenu();
			document.forms[0].sAccion.value = "acc_carat_guardar";	
			
			document.forms[0].submit();		
		}
	}
}

function PantallaAnterior(){

	OcultarMenu();
	history.go(-1);
	//window.history.back();
}

function Imprimir(){
	var pathDB=DirABS();
	window.open(pathDB + "/PrintCaratula?OpenForm&ID=" + document.forms[0].ccNroExp.value,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0,width=700,height=600')
}

function ImprimirExpedientePDF(nroExp){
	var nroExp=document.forms[0].ccNroExp.value;
	var cantAct=document.forms[0].cantAct.value;
	window.location=DirABS()+"/ImpresionPdf?openform&nroExp="+nroExp+"&cantAct="+cantAct;
}

function PrintConstancia(){
	var pathDB=DirABS();
	window.open("../PrintConstancia?OpenForm&ID=" + document.forms[0].ccNroExp.value,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0,width=790,height=350')
}

function irACaratula(nroExp){
	var fecha = new Date();
	var valor = fecha.getTime();
	var pathDB=DirABS();
	var url = "../OpenCaratula?OpenAgent&nroExp="+nroExp
	if (confirm("¿Desea abrir la Carátula en una nueva ventana?")){
		window.open(url,valor,"menubar=no,status=no,resizable=yes,scrollbars=yes,LEFT=1,TOP=1");
	}else{
		window.location=url;
	}
}

function UbicarPaquete(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	OcultarMenu();
	window.parent.location= "../Controller?openAgent&User=" + usuario + ",Accion=FParametrosSetPaquete" + ",ID=" + nro;	

}

function VerPaquetes(){
	var pathDB=DirABS();
	var unid=document.forms[0].unid.value;
	window.open("../VerPaquetes?openForm&ParentUNID=" + unid,'Impresion','menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=100,width=500,height=420');	
}

function tabs(tab){

	if (tab=='paquete'){

		document.all('paquete').style.display='';	
		document.all('paquetedes').style.display='';
	}
	else{

		document.all('paquete').style.display='none';		
		document.all('paquetedes').style.display='none';
	}
}

function PrintExpediente(){
	var pathDB=DirABS();
	var unid=document.forms[0].sNroExp.value;
	window.open("../FPrintExp?openForm&ID=" + unid,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=10,TOP=10,width=790,height=570');	
}

function PrintRangoActuaciones(){
	var pathDB=DirABS();
	var unid=document.forms[0].sNroExp.value;
	var fecha = document.forms[0].ccfCreacion.value.split(" ")[0];
	fecha = fecha.replace(/\//g, '.');
	window.location="../FParametrosPrintActsRango?openForm&ID=" + unid + "&fecha=" + fecha;	
}

function PrintRecorrido(){
	var pathDB=DirABS();
	var unid=document.forms[0].sNroExp.value;
	window.open("../FPrintRecorrido?openForm&ID=" + unid,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=10,TOP=10,width=790,height=570');	
}

function VerExpediente(strID){
	window.open("../FVerExp?openForm&ID=" + strID,'' ,'menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=1,TOP=1,width=740,height=480') ;	
}

function DevolverExpediente(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;
	if (ConfirmarOperacion('Devolver'))	{
		OcultarMenu();
		window.location="../Controller?openAgent&User=" + usuario + ",Accion=FParametrosDevolver" + ",ID=" + nro;	
	}
}

function TomarConocimiento(){

	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;
	OcultarMenu();
	window.location= "../Controller?openAgent&User=" + usuario + ",Accion=FParametrosTomarConoc" + ",ID=" + nro ;


}

function QuitarNotificacion(){

	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;
	OcultarMenu();
	window.location= "../Controller?openAgent&User=" + usuario + ",Accion=FParametrosQuitarNotif" + ",ID=" + nro ;
}

function verNotificaciones(){
	var pathDB=DirABS();
	var nro=document.forms[0].sNroExp.value;
	window.open("../FNotificaciones?OpenForm&ID=" + nro,'Notificaciones','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=600,height=380');
}

function MarcarExpediente(){
		$("#dialogMarcarExp").dialog('open');
}

function QuitarMarcas(){
		$("#dialogQuitarMarcas").dialog("open");
}

function VerLogAgregaciones(){
	var pathDB=DirABS();
	window.open("../FLogAgregaciones?OpenForm&ID="+document.forms[0].ccNroExp.value,'LogAgregaciones','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=750,height=380');
}

function irActuacion(){
	var nro=document.forms[0].sNroExp.value;
	var pathDB=DirABS();
	OcultarMenu();
	var url= "../FParametrosIrActuacion?OpenForm&ID=" + nro ;
	window.location=url;

}

function navegarActuacion(){
	nro = document.forms[0].ccNroExp.value;
	var actuaciones=document.all("ActuacionNro");
	var NroAct=actuaciones[actuaciones.selectedIndex].value;
	if (confirm("¿Desea abrir la actuación en una nueva ventana?"))
		window.open("../vBusqActNroAct/" + NroAct + nro +"?OpenDocument","SEE",'location=yes,menubar=yes,toolbar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=600,height=480');	
	else
		window.location= "../vBusqActNroAct/" + NroAct + nro +"?OpenDocument";
}

//Se ejecuta al hacer click en el check de paquete
function checkPaquete(){
	if (document.forms[0].rTienePaqueteView.checked){
		tabs('paquete');
		document.forms[0].rTienePaquete.value="Si"
	}else{
		tabs('no');
		document.forms[0].rTienePaquete.value=""
	}
}

function tabs(tab){

	if (tab=='paquete'){

		document.getElementById('paquete').style.display='';	
		document.getElementById('paquetedes').style.display='';
	}
	else{

		document.getElementById('paquete').style.display='none';		
		document.getElementById('paquetedes').style.display='none';
	}
}


function nombreUnidad(codigo){
	var myUnidadJson = eval('(' +document.forms[0].jsonUnidades.value+ ')');
	for(var i=0; i< myUnidadJson.unidades.length;i++){
		if (myUnidadJson.unidades[i].Codigo==codigo)
			return(myUnidadJson.unidades[i].Nombre);
	}
	return("No se encontro unidad con codigo"+ codigo);

}

function CargarComboActuaciones(){
	var combo = document.forms[0].ActuacionNro
	var UniActs = document.forms[0].UnidadActuaciones
	var vUniActs = StringToVector3(UniActs.value,";");
	for (var i=0;i<vUniActs.vLength;i++){
		combo.options[combo.options.length]=new Option((i+1)+".- "+nombreUnidad(vUniActs.vArray[i]),(i+1))
	}
}



function loadXML(str){
//	load xml file
//	code for IE
	if (window.ActiveXObject){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(str);
	}
//	code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument){
		var parser=new DOMParser();
		xmlDoc=parser.parseFromString(str,"text/xml");
	}
	else{
		alert('Su navegador no permite ejecutar el script');
	}
}

function seleccionExpAnterior(boton){
	NamePicker.init( {
		prompt: '<p>Seleccione el Expediente</p>',
		addressbook: "/"+document.forms[0].sPathMigrados.value,
		viewname: 'Caratulas',
		column: 1,
		column_codigo: 1,
		empty: true
	})
	NamePicker.open(boton, 'sNroAnterior', 'single', 'Seleccione  el Expediente');
}

function RegistrarContrato(){
	window.location=DirABS()+"RegistrarContrato?openAgent&nroExp="+document.forms[0].sNroExp.value+"&nomUnidad="+document.forms[0].ccOficinaActual.value;
}

function GenerarAsuntoExpediente(){
	$("#dialogGenerarAsunto").dialog("open");	
}

function EnviarAviso(){
	$("#dialogEnviarAviso").dialog("open");
}

function TomarNumero(){
	oficina = document.getElementById("ccOficinaActual").value;
	indice = oficina.indexOf("EXP_");
	if(indice == 0){
		oficina = oficina.substring("EXP_".length,oficina.length)
	}
	//alert( DirABS()+"FParametrosTomarNumero?OpenForm&unidad="+oficina);
	window.location.href = "./FParametrosTomarNumero?OpenForm&unidad="+oficina;
}

function GenerarEvento(){
	document.getElementById("formulario").style.display="block";
	document.getElementById("divImagen").style.display="none";
	$("#dialogGenerarEvento").dialog("open");
	$('#dialogGenerarEvento').height(508);
	
}

function DesbloquearFormulario(){
	if (ConfirmarOperacion("Desbloquear Expediente")){
		var nroForm = document.getElementById("sNroForm").value;
		var usuario = document.getElementById("sUsuario").value;
		var pathWF = document.getElementById("sPathWebForm").value;
		var nroExp = document.getElementById("ccNroExp").value;
		
		var url = DirABS() + "DesbloquearExpForm?OpenAgent";
		url += "&numForm=" + nroForm;
		url += "&pathWF=" + pathWF;
		url += "&usuario=" + usuario;
		url += "&nroExp=" + nroExp;
		url += "&pathName=" + location.pathname.substring(0,(location.pathname.toUpperCase().indexOf('.NSF')+5));
		
		var urlForm = 	invocarAgente(url);
		if(urlForm != "")
			window.location = window.location.href;
		else
			return false;
		return true;
	}
	
}

function invocarAgente(url){
	var urlAUX = "";
	$.ajax({
		type: "GET",
		url: url,
		contentType: "application/json",
		datatype:"json",
		async: false,
		success: function(data){
			if(data.error != undefined){
    			if (data.error == "true"){	
					alert("Error recibido!\n"+data.msg);
	    		}else{
  					urlAUX =  data.msg;
  				}
			}else{
				alert("ERROR - URL inválida!\n" + url);
			}
		},
		error: function (data){
			alert("Ocurrió un error inesperado!\n " + url);
		}			
	});
	return urlAUX;
}

function VincularExpediente(){
	inicializarTabla();
	//$("#dialogVincularExp").dialog('open');
	//Para IE ya que sino daba error
	var opt = {
			bgiframe: true,
			autoOpen:false,
			resizable:true,
			draggable:true,
	            		height:420,
			width: 500,
			modal: true,
			buttons:{
	        		"Aceptar":function(){
						if( vincularExpedientes()){
							$(this).dialog("close");
						}
	        		},
	        		"Cancelar":function(){
	          			$(this).dialog("close");
	        		}
	      	},
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
	};
	var theDialog = $("#dialogVincularExp").dialog(opt);
	theDialog.dialog("open");
}

function VinculosAExpedientes(){
	var expedientes =  document.getElementById("sExpedientesVinculados").value;
	var vectorExp = StringToVector3(expedientes,";");
	
	for (var i=0; i<vectorExp.vArray.length; i++) {
		if (vectorExp.vArray[i] != "") {
			var exp = campos.vArray[i].split("%")[0];
			
		}else{
			
		}
	}
}

function RecibirExterno(){
	var nro=document.forms[0].sNroExp.value;
	var usuario=document.forms[0].sUsuarioActual.value;

	if (ConfirmarOperacion('Recibir en unidad externa'))	{
		OcultarMenu();
		window.location= "../Controller?openAgent&User=" + usuario + ",Accion=acc_recibir_externo" + ",ID=" + nro;	
	}
}
function ObtenerExterno(){	
	inicializarDialogoObtExt();
	$("#accObtenerExt").dialog( "open");

}

function OpenInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
}
function SacarDatosPrivados(){
	if (ConfirmarOperacion('Quitar Datos Privados'))	{
		var usuario=document.forms[0].sUsuarioActual.value;
		OcultarMenu();
		window.location= "../Controller?openAgent&User=" + usuario + ",Accion=acc_Quitar_Datosprivados" + ",ID=" + nro;	
	}	
}

// funciones que carga en el campo autocompletado los expedientes SEM
// que hay para migrar. Y carga el botón "Migrar".
function cargarExpedientes(){
	var id = "sNroExpedientesSEM";
	var usu = document.getElementById("sUsuarioActual").value;
	var nro = document.getElementById(id).value;
	
	if(trim(nro).length >=2)
		//Cargo el autocomplete con el array
		$( "#"+id).autocomplete({
			source: cargarAutocompleteExpedientesSEM(usu,nro,id),
			select: function(){
				$('#btnSEM').css("display","block");
			},
			minLength: 3
		});
	
	
}

function cargarAutocompleteExpedientesSEM(usuario, numero){
	// obtiene la url del agente de datos externos
	var url = document.getElementById("urlAgente").value+"&usuario="+usuario+"&nroIngresado="+numero;
	var resp = "";
	var expes="";
	var obj;
	
	$.ajax({
		url: url,
		dataType: "text",
		async: false,
		success: function(data){
			resp =  data.split("&#&");
			if(resp[0] == 0){
    			expes = resp[1];
    			//Los datos tienen que ser devueltos en forma de texto plano separados por ","
    			var arrayAutocomplete = expes.split(",")
    			
    			var strJson = "[";
    			for (var i = 0;i<arrayAutocomplete.length;i++){
    				var value = trim(arrayAutocomplete[i]);
    				strJson += "{ \"label\":\"" + value + "\", \"value\":\""+value+"\"}";
    				if (i<arrayAutocomplete.length-1)
    					strJson+=",";
    			}
    			strJson += "]";
    			obj = jQuery.parseJSON(strJson);
    			
			}else{
				alert(resp[1]);
				document.getElementById("sNroExpedientesSEM").value="";
				document.getElementById("sNroExpedientesSEM").setAttribute("disabled", true);
			}
		},
		error: function(jqXHR, exception) {
	           if (jqXHR.status === 0) {
	               alert('Not connect.\n Verify Network.');
	           } else if (jqXHR.status == 404) {
	               alert('Requested page not found. [404]');
	           } else if (jqXHR.status == 500) {
	               alert('Internal Server Error [500].');
	           } else if (exception === 'parsererror') {
	               alert('Requested JSON parse failed.');
	           } else if (exception === 'timeout') {
	               alert('Time out error.');
	           } else if (exception === 'abort') {
	               alert('Ajax request aborted.');
	           } else {
	               alert('Uncaught Error.\n' + jqXHR.responseText);
	           }   
		}		
	});

	return obj;
}

	//Funcion que devuelve los campos del expediente SEM 
	function cargarCamposExpedienteSEM(){
		if(document.getElementById("combobox").value != "" || document.getElementById("Obligatorio").value !="")
		{
			var nroExpedienteSEM = document.getElementById("sNroExpedientesSEM").value;
			var url = document.getElementById("urlAgenteCargarCmpsSEM").value+"&nroIngresado="+nroExpedienteSEM;
			var vCamposSEM = "";
			var camposSEM;
			var vCamposNoCoinciden=[""];
			var cont=0;
			$.ajax({
				type: "GET",
				url: url,
				contentType: "application/json",
				datatype:"json",
				async: false,
				success: function(data){
					if(data.codigoRespuesta == "1"){
						alert(data.respuesta);
					}else{
						vCamposSEM = data.respuesta;
					}
				},
				error: function(jqXHR, exception) {
					if (jqXHR.status === 0) {
						alert('Not connect.\n Verify Network.');
		           	} else if (jqXHR.status == 404) {
		               alert('Requested page not found. [404]');
		           	} else if (jqXHR.status == 500) {
		               alert('Internal Server Error [500].');
		           	} else if (exception === 'parsererror') {
		               alert('Requested JSON parse failed.');
		           	} else if (exception === 'timeout') {
		               alert('Time out error.');
		           	} else if (exception === 'abort') {
		               alert('Ajax request aborted.');
		           	} else {
		               alert('Uncaught Error.\n' + jqXHR.responseText);
		           	}   
				}		
			});
			var cont=0;
		//guardo en los arreglos los nombres de los campos y sus valores
			for (var i=0; i<vCamposSEM.length; i++) {
				var campo = vCamposSEM[i].campo;
				var valor = vCamposSEM[i].valor.replace(/'/g,"\"");

				if(document.getElementById(campo) != null && !document.getElementById(campo)!= undefined ){
				    if(document.getElementById(campo).type == 'radio' && document.getElementById(campo).parentNode.text.replace("\n","") == valor)
				    	document.getElementById(campo).checked = true;
					else if(document.getElementById(campo).type == 'select')
				    	document.getElementById(campo)[document.getElementById(campo).selectedIndex].value = valor;
					else if(document.getElementById(campo).type == 'checkbox'){
						//var checkboxes = document.getElementById(campo).checkbox; 
						var inputs = inputs = document.getElementsByTagName("input")
						for(var j=0;j<inputs.length;j++){
							if (inputs[j].type == 'checkbox' && inputs[j].value == valor){
							//if(checkboxes[j].value == valor){
								document.getElementById(campo).checked = true;
							}
						}
					}else
						document.getElementById(campo).value = valor;
				}else{
					vCamposNoCoinciden[cont] = campo;
					cont++;
				}
			}
			if(cont>=1){
				alert("Los siguientes campos de los expedientes SEM, no existen en el expediente nuevo: \n  " + vCamposNoCoinciden.valueOf() + ".");
			}
		}else{
			alert("Debe seleccionar un tema para poder continuar con la migración.");
		}
	}

