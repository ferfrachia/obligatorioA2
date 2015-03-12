function cargarComboBox() {
	var unidadInicial = document.forms[0].ccOficinaInicial.value
	if (unidadInicial.indexOf("EXP_")>=0){
		unidadInicial = unidadInicial.substring(unidadInicial.indexOf("EXP_")+4,unidadInicial.length)
	}
	var url = "/"+document.forms[0].sPathDbRuta.value;
	url = url+"/SeleccionTema?ReadForm&unidad="+unidadInicial;
	$.ajax({
          cache: false,
          url: url,
          async: false,
          contentType: "application/json; charset=iso-8859-1",
          success:  function(data) {
				var newoption = new Option("","");
				document.forms[0].combobox.options[0];
				var codTema = document.getElementById("nCodTema").value;
 				for (var i=1 ; i < data.infoTemas.length;i++) {
 					newoption = new Option(data.infoTemas[i-1].nombreTema,data.infoTemas[i-1].tipoRuta );
				    document.forms[0].combobox.options[i] = newoption;
				    if (data.infoTemas[i-1].tipoRuta.split("##")[1] == codTema )
				    	document.forms[0].combobox.options[i].selected = true;
				}      		
			}
	});
}

function cargarComboCategoria() {
	var categoriaAux = document.getElementById("sCategoriaAux").value;
	var categoria = document.getElementById("sCategoria").value;
	
	if(categoria == "" && categoriaAux=="" ){
		cargarComboBox();
	}else{
		var url = "/"+document.forms[0].sPathDbRuta.value;
		url = url+"/SeleccionCategoria?ReadForm&categoria="+categoria;
		$.ajax({
          		cache: false,
          		url: url,
          		async: false,
          		contentType: "application/json; charset=iso-8859-1",
          		success: function(data) {
						var newoption = new Option("","");
						var codTema = document.getElementById("nCodTema").value;

						for (var i=1 ; i < data.infoTemas.length;i++) {
							newoption = new Option(data.infoTemas[i-1].nombreTema,data.infoTemas[i-1].tipoRuta );
							document.forms[0].combobox.options[i] = newoption;

							if (data.infoTemas[i-1].tipoRuta.split("##")[1] == codTema ){
								document.getElementById("combobox").value = data.infoTemas[i-1].tipoRuta;
								document.forms[0].combobox.options[i].selected = true;
							}
						}
					},
				error: function(){
					alert("No hay temas configurados para la categoría.");
                	return false;
             	}
		});
	}
}

function seleccionarTema(valores) {
	var frm = document.forms[0];
	var idsAutocompletados = [];
	var agentesAutocompletados = [];
	var cant = 0;
	var $rows = $("tr");
	
	//Elimino las rows cargadas dinamicamente en la previa selección
	$("tr:lt("+ $rows.index($("#NoObjetivo")) +"):gt("+ $rows.index($("#Objetivo")) +")").remove();
	
	//Borro de los campos notes los valores de la selección anterior
	var nombreCampoNotes = ["Texto","Fecha","Numerico","Calculado","Boton","Combobox","Radio","Checkbox","PickList","Autocompletado"];
	for (var i=0 ; i<10; i++) {
		for (var j=0; j<20; j++) {
			if (document.getElementById(nombreCampoNotes[i]+"_"+ j.toString()).value != "") {
				document.getElementById(nombreCampoNotes[i]+"_"+ j.toString()).value = "";
		 	}
		}
	}

	if (valores != "") {
		v = armarVector(valores,"##");

		frm.sRuta.value = v.vArray[0]; 
		frm.nCodTema.value = v.vArray[1];
		frm.sTema.value = v.vArray[2].toUpperCase();		
		frm.nDiasExp.value = v.vArray[3];
		frm.nVersionRuta.value = v.vArray[4];

		var protocolo = document.forms[0].Protocolo.value;
		var server = document.forms[0].sHostDbRuta.value;
		var puerto = document.forms[0].Puerto.value;
		var pathRutas = document.forms[0].sPathDbRuta.value;
		var pathDatosExt = document.forms[0].sPathDbDatosExt.value;
		var nro = document.forms[0].nCodTema.value;

		$.ajaxSetup({cache: false, async: false});
		$.getJSON('/'+pathRutas+'/'+"JSONTemasCamposEtiquetas?OpenAgent&clave="+nro,
 		 function(data) {
 			if (data.codError == "0") {
 				CamposObligatorios = new Array();
 				Etiquetas = new Array();
 				TipoCampos = new Array();
 				TodosCampos = new Array();
 				TodosTipoCampos = new Array();
 				TodosEtiquetasCampos = new Array();
 				TodosTamanos = new Array();
 				TodosAgentes = new Array();
 				TodosEsObligatorio = new Array();
 				TipoCamposObligatorios = new Array();
 				TodosTipoOpciones = new Array();
 				TodosOpciones = new Array();

 				var html = "";
				var i = data.lista.length - 1;
 				while (data.lista[i] != null) {
 					//Guardo los nombres, etiquetas y los tipos de los campos
 					//Para luego guardarlos en los campos notes
 					TodosCampos.push(data.lista[i].Campo);
 					TodosTipoCampos.push(data.lista[i].Tipo);
 					TodosEtiquetasCampos.push(data.lista[i].Etiqueta);
 					TodosTamanos.push(data.lista[i].Tamano);
 					TodosAgentes.push(data.lista[i].Agente);
 					TodosEsObligatorio.push(data.lista[i].EsObligatorio);
 					TodosTipoOpciones.push(data.lista[i].TipoOpciones);
 					TodosOpciones.push(data.lista[i].Opciones);
 					
 					if (data.lista[i].EsObligatorio == "Si") {
 						CamposObligatorios.push(data.lista[i].Campo);
 						Etiquetas.push(data.lista[i].Etiqueta);
 						TipoCampos.push(data.lista[i].Tipo);
 					}
 					
 					//Si es botón no lleva título
 					if (data.lista[i].Tipo == "Botón") {
 						html += "<tr><td class='CeldaTitulo' width='100'></td>";
 						html += "<td class='CeldaItems'><input type='button' " + getEstilo("Botón",data.lista[i].Tamano) + " class='agentbutton' name='" + data.lista[i].Campo + "' id='" + data.lista[i].Campo + "' value='" + data.lista[i].Etiqueta + "' onclick='llamarAgente(" + '"' + data.lista[i].Agente + '"' + ")'></td></tr>";
 					}
 					else {
 						if (data.lista[i].EsObligatorio == "Si") {
 							html += "<tr><td class='CeldaTitulo' width='100'>&nbsp;" + data.lista[i].Etiqueta + ": * &nbsp;</td>";
 						}
 						else {
 							html += "<tr><td class='CeldaTitulo' width='100'>&nbsp;" + data.lista[i].Etiqueta + ": &nbsp;</td>";
 						}
 						if (data.lista[i].Tipo == "Fecha"){
 	 						html += "<td class='CeldaItems'><input " + getEstilo("Fecha",data.lista[i].Tamano) + " type='text' class='CampoTransparenteVerde datepickerN' name='"+ data.lista[i].Campo+"' id='"+ data.lista[i].Campo +"'></td></tr>";
 	 					}
 	 					else if (data.lista[i].Tipo == "Calculado") {
 	 						html += "<td class='CeldaItems'><input class='CampoTransparenteVerde' disabled='true' " + getEstilo("Calculado",data.lista[i].Tamano) + " type='text' name='"+ data.lista[i].Campo+"' id='"+ data.lista[i].Campo +"'></td>></tr>";
 	 					}
 	 					else if (data.lista[i].Tipo == "Combobox") {
 	 						html += "<td class='CeldaItems'><select " + getEstilo("Combobox",data.lista[i].Tamano) + " name='"+ data.lista[i].Campo+"' id='"+ data.lista[i].Campo +"'>";
 	 						if(data.lista[i].TipoOpciones == "Valores"){
 	 							var opciones = StringToVector3(data.lista[i].Opciones,",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+data.lista[i].Opciones,
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
 	 							html += "<option value='" + trim(opcion.split("|")[1]) + "'>" + trim(opcion.split("|")[0]) + "</option>";
 	 						}
 	 						html += "</select></td></tr>";
 	 					}
 						//Falta hacer lo de la ventana para el pick
 	 					else if (data.lista[i].Tipo == "PickList") {
 	 						html += "<td class='CeldaItems'>";
 							if(data.lista[i].TipoOpciones == "Valores"){
 	 							var opciones = StringToVector3(data.lista[i].Opciones,",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+data.lista[i].Opciones,
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
 							seleccion="<select name='sel"+data.lista[i].Campo+"' id='sel"+data.lista[i].Campo+"'>";
 							for (var j=0; j<opciones.vArray.length; j++) {
 	 							var opcion = opciones.vArray[j];
 	 							seleccion += "<option value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "</option>";
 	 						}
 							seleccion += "</select>";
 							html += "<input type='hidden' name='"+data.lista[i].Campo+"' id='"+data.lista[i].Campo+"' value=''>"
 							html += "<div class='picklistDiv' name='"+data.lista[i].Campo+"' id='"+data.lista[i].Campo+"' value=''>"+seleccion+"<input type='button' value='agregar' onclick='agregarPick(\""+data.lista[i].Campo+"\")'><div>"
 							html += "<table type='' name='table"+data.lista[i].Campo+"' id='table"+data.lista[i].Campo+"'>"
 							html += "</table>"
 							html += "</td></tr>";
 	 					}
 	 					else if (data.lista[i].Tipo == "Radio") {
 	 						html += "<td class='CeldaItems'>";
 	 						if(data.lista[i].TipoOpciones == "Valores"){
 	 							var opciones = StringToVector3(data.lista[i].Opciones,",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+data.lista[i].Opciones,
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
 	 							html += "<input type='radio' name='" + data.lista[i].Campo + "' id='" + data.lista[i].Campo + "' value='" + trim(opcion.split("|")[1]) + "'>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 						}
 	 						html += "</td></tr>";
 	 					}
 	 					else if (data.lista[i].Tipo == "Checkbox") {
 							html += "<td class='CeldaItems'>";
 							if(data.lista[i].TipoOpciones == "Valores"){
 	 							var opciones = StringToVector3(data.lista[i].Opciones,",");
 	 						}else{
 	 							var opciones;
 	 							$.ajaxSetup({cache: false, async: false, contentType: "application/json; charset=iso-8859-1"});
 	 							$.getJSON('/'+pathDatosExt+'/'+"DatosExternosJSON?OpenView&count=5000&RestrictToCategory="+data.lista[i].Opciones,
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
 	 							html += "<input type='checkbox' name='"+data.lista[i].Campo+"' id='"+data.lista[i].Campo+"' value='"+trim(opcion.split("|")[1])+"'>" + trim(opcion.split("|")[0]) + "&nbsp";
 	 						}
 	 						html += "</td></tr>";
 	 					}
 	 					else if (data.lista[i].Tipo == "Autocompletado") {
 	 						//onKeyPress='cargarAutocomplete("+'"'+data.lista[i].Campo+'",'+'"'+data.lista[i].Agente+'"'+")'"
 	 						idsAutocompletados[cant] = data.lista[i].Campo;
 	 						agentesAutocompletados[cant++] = data.lista[i].Agente;
 	 						html += "<td class='CeldaItems'>" +
 	 									"<input class='CampoTransparenteVerde' " + getEstilo("Texto",data.lista[i].Tamano) + " type='text' name='"+ data.lista[i].Campo+"' id='"+ data.lista[i].Campo +"' onKeyPress=cargarAutocomplete("+'"'+data.lista[i].Campo+'",'+'"'+data.lista[i].Agente+'") >' +
 	 								"</td>" +
 	 								"<td class='CeldaItems'></td>" +
 	 								"</tr>";
 	 						//html += "<td class='CeldaItems'><input class='CampoTransparenteVerde' " + getEstilo("Texto",data.lista[i].Tamano) + " type='text' name='"+ data.lista[i].Campo+"' id='"+ data.lista[i].Campo +"' onKeyPress='cargarAutocomplete("+'"'+data.lista[i].Campo+'",'+'"'+data.lista[i].URL+'"'+")'"+"></td></tr>";
 	 						
 	 					}
 	 					else {
 	 						html += "<td class='CeldaItems'><input class='CampoTransparenteVerde' " + getEstilo("Texto",data.lista[i].Tamano) + " type='text' name='"+ data.lista[i].Campo+"' id='"+ data.lista[i].Campo +"'></td><td class='CeldaItems'></td></tr>";
 	 					}
 					}
 					//Agrego dinamicamente las rows
					$("#Objetivo").closest('tr').after(html);
					
					html = "";
					i--;
				 }
                 //Agrego el datepicker
 				 $('.datepickerN').not('.hasDatePicker').datepicker();
 				 
 				 //recorro los campos autocompletados y los seteo con jquery
// 				 for (var k = 0; k<cant;k++){
// 					cargarAutocomplete(idsAutocompletados[k],agentesAutocompletados[k]);
// 				 }
      		}
 			else {
 				alert(data.Error);
      		}
          });
		//Carga los agentes y sus respectivos parámetros
		$.getJSON('/'+pathRutas+'/'+"JSONTemasAgentesParametros?OpenAgent&clave="+nro,
				function(data) { 
		 			if (data.codError == "0") {
		 				Agentes = new Array();
		 				Parametros = new Array();
		 				URLs = new Array();
		 				
		 				var i = data.lista.length - 1;
		 				while (data.lista[i] != null) {
		 					Agentes.push(data.lista[i].Agente);
		 					Parametros.push(data.lista[i].Parametros);
		 					URLs.push(data.lista[i].URL);
		 					i--;
		 				}
		 			}
		 			else {
		 				alert(data.Error);
		      		}
	          	});
		
		//Agregado para cargar los tipos legal y justificacion de reservado si se setearon en el tema
		$.getJSON('/'+pathRutas+'/'+"JSONTemasCampoTipoLegal?OpenAgent&clave="+nro, 
				function(data) { 
		 			if(data.codError == "0") {
		 					var tipoLegal = data.tipoLegal;
		 					var justTipoLegal = data.justTipoLegal;
		 					$('#sTipoLegalSelect').val(tipoLegal);
		 					$('#sTipoLegal').val(tipoLegal);
		 					if(tipoLegal=="Reservado") {
		 						document.getElementById("JustRes").style.display = "";
		 						$('#sJustificacionTipoReservado').val(justTipoLegal);
		 						$('#sJustTipoLegalSelect').val(justTipoLegal);
		 					}
		 					else {
		 						$('#sJustificacionTipoReservado').val('');
		 						$('#sJustTipoLegalSelect').val('');
		 						document.getElementById("JustRes").style.display = "none";
		 					}
		      		}
		 			else {
		      		     alert(data.Error);
		      		}		
		 });
		//Fin de carga de tipo legal de documento y justificacion
	}
	else {
		frm.sRuta.value = "";
		frm.sTema.value = "";
		frm.nCodTema.value = "";
		frm.nDiasExp.value = "";
		frm.nVersionRuta.value = "";
	}
}

function agregarPick(campo){
	campoCampo = document.getElementById(campo);
	tablaPick = document.getElementById("table"+campo);
	selectPick = document.getElementById("sel"+campo);
	
	
	var rowCount = tablaPick.rows.length;
    var row = tablaPick.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = selectPick.options[selectPick.selectedIndex].text
    
    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.type = "button";
    element2.value = "X";
    element2.onclick = function (){
    	borrarPick(campo,element2,rowCount);
    };
    cell2.appendChild(element2);
    
    if(campoCampo.value==""){
    	campoCampo.value += selectPick.options[selectPick.selectedIndex].value;
    }else{
    	campoCampo.value += ","+selectPick.options[selectPick.selectedIndex].value
    }
}

function borrarPick(campo,boton,pos){
	boton.parentNode.parentNode.parentNode.removeChild(boton.parentNode.parentNode);
	valoresPick = StringToVector3(document.getElementById(campo).value,",");
	valoresPick.vBorrar (pos);
	document.getElementById(campo).value= VectorToString2(valoresPick,",");
}

function getEstilo(tipo, tamano) {
	if (tipo == "Botón") {
		if (tamano == "Pequeño") {
			return "style='width:5%;'";
		}
		else if (tamano == "Mediano") {
			return "style='width:10%;'";
		}
		else if (tamano == "Grande") {
			return "style='width:15%;'";
		}
		else if (tamano == "Muy Grande") {
			return "style='width:20%;'";
		}
		else {
			return "";
		}
	}
	else if (tipo == "Calculado") {
		if (tamano == "Muy Pequeño") {
			return "size='25' style='background-color:#EBEBE4;'";
		}
		else if (tamano == "Pequeño") {
			return "style='width:25%; background-color:#EBEBE4;'";
		}
		else if (tamano == "Mediano") {
			return "style='width:50%; background-color:#EBEBE4;'";
		}
		else if (tamano == "Grande") {
			return "style='width:75%; background-color:#EBEBE4;'";
		}
		else if (tamano == "Muy Grande") {
			return "style='width:99%; background-color:#EBEBE4;'";
		}
	}
	else if (tipo == "Combobox") {
		if (tamano == "Muy Pequeño") {
			return "style='width:14%;'";
		}
		else if (tamano == "Pequeño") {
			return "style='width:18%;'";
		}
		else if (tamano == "Mediano") {
			return "style='width:22%;'";
		}
		else if (tamano == "Grande") {
			return "style='width:26%;'";
		}
		else if (tamano == "Muy Grande") {
			return "style='width:30%;'";
		}
	}
	else {
		if (tamano == "Muy Pequeño") {
			return "size='25'";
		}
		else if (tamano == "Pequeño") {
			return "style='width:25%;'";
		}
		else if (tamano == "Mediano") {
			return "style='width:50%;'";
		}
		else if (tamano == "Grande") {
			return "style='width:75%;'";
		}
		else if (tamano == "Muy Grande") {
			return "style='width:99%;'";
		}
	}
	
}

function cargarAutocomplete(id,agente){
	var pathRutas = document.forms[0].sPathDbRuta.value;
	var dirUrl = "";
	var dirUrl2;
	var datosResp="";
	var nro = document.forms[0].nCodTema.value;
	/*Busco la url del agente
	 * Si no se creo el documento llamo al agente para buscar la url
	 * Si ya se creo busco en los campos guardados
	 * */
	var agentes = document.getElementById("Agentes").value.split("#%");
	var urls = document.getElementById("URLs").value.split("#%");
	var urlAgentesTema = '/'+pathRutas+'/'+"JSONTemasAgentesParametros?OpenAgent&clave="+nro;
			
	//Obtengo los datos cargados
	if (document.getElementById(id).value.length >= 2){
		$.ajax({  
			url:urlAgentesTema,
			dataType: "json",
			async: false,
			success: function(data) { 
				if (data.codError == "0") {
					var i = data.lista.length - 1;
		 			while (data.lista[i] != null && dirUrl=="") {
		 				if (data.lista[i].Agente==agente){
		 					dirUrl = data.lista[i].URL;
		 				}
		 				i--;
		 			}
		 		}
		 		else {
		 			alert(data.Error);
		      	}
			}
		});
		
		$.ajax({  
			url:dirUrl,
			dataType: "text",
			async: false,
			success: function(respuesta) {
				datosResp= respuesta;
			}
		});
		
		//Los datos tienen que ser devueltos en forma de texto plano separados por ", "
		var arrayAutocomplete = datosResp.split(", ")
		arrayAutocomplete.sort();
		
		//Cargo el autocomplete con el array
		$( "#"+id ).autocomplete({
			minLength : 3,
			source: arrayAutocomplete
		});
	}
	
	
}
