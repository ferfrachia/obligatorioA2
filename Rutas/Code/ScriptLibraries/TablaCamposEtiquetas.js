var idFila="";

function delRow()
{
	//Control de fila
	if (idFila == "") {
		alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		return;
	}

	var cells = $("#"+idFila).find('td');

	var valoresE = $("[name='Etiquetas']").val();
	var valoresC = $("[name='NombresCampos']").val();
	var valoresO = $("[name='EsObligatorio']").val();
	var valoresTip = $("[name='TipoCampos']").val();
	var valoresA = $("[name='Agentes']").val();
	var valoresTam = $("[name='Tamanos']").val();
	var valoresTipoOpc = $("[name='TipoOpcionesCampos']").val();
	var valoresOpc = $("[name='OpcionesCampos']").val();

	var vValores = StringToVector3(valoresC,",");
	var indInt = vValores.vIndice(cells[0].innerHTML);

	$("#"+idFila).remove();

    vValores = StringToVector3(valoresE,",");
	vValores.vBorrar(indInt);
	document.forms[0].Etiquetas.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresC,",");
	vValores.vBorrar(indInt);
	document.forms[0].NombresCampos.value = VectorToString2(vValores,",");
	
	vValores = StringToVector3(valoresTip,",");
	vValores.vBorrar(indInt);
	document.forms[0].TipoCampos.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresO,",");
	vValores.vBorrar(indInt);
	document.forms[0].EsObligatorio.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresTam,",");
	vValores.vBorrar(indInt);
	document.forms[0].Tamanos.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresA,",");
	vValores.vBorrar(indInt);
	document.forms[0].Agentes.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresTipoOpc,",");
	vValores.vBorrar(indInt);
	document.forms[0].TipoOpcionesCampos.value = VectorToString2(vValores,",");
	
	vValores = StringToVector3(valoresOpc,";");
	vValores.vBorrar(indInt);
	document.forms[0].OpcionesCampos.value = VectorToString2(vValores,";");

	var Tipo = document.forms[0].Tipo;
	var Requerido = document.forms[0].Requerido;
	var Tamano = document.forms[0].Tamano;
	var Agente = document.forms[0].Agente;
	var TipoOpciones = document.forms[0].TipoOpciones;
	
	Tipo.selectedIndex = 0;
    Requerido.selectedIndex = 0;
    Tamano.selectedIndex = 0;
    Agente.selectedIndex = 0;
    TipoOpciones.selectedIndex = 0;
    document.getElementById("Campo").value = "";
    document.getElementById("Etiqueta").value = "";
    document.getElementById("Opciones").value = "";

    cells[0].style.fontWeight="normal";
	cells[1].style.fontWeight="normal";
	cells[2].style.fontWeight="normal";
	cells[3].style.fontWeight="normal";
	cells[4].style.fontWeight="normal";
	cells[5].style.fontWeight="normal";
	cells[6].style.fontWeight="normal";
    idFila = "";
}

function modRow()
{
	var Etiqueta = document.getElementById("Etiqueta").value;
	var Campo = document.getElementById("Campo").value;
	var Requerido = document.forms[0].Requerido;
	var Tipo = document.forms[0].Tipo;
	var Agente = document.forms[0].Agente;
	var Tamano = document.forms[0].Tamano;
	var TipoOpciones = document.forms[0].TipoOpciones;
	var Opciones = document.getElementById("Opciones").value;
	var TextReq, TextAg, TextOp, TextTam, TextTipoOp, textoAuxOp;
	
	//Control de Errores
	if (idFila == "") {
		alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		return;
	}
	if (Tipo.selectedIndex == 0 || Campo == "" || Etiqueta == "") {
		alert("Debe completar todos los campos");
		return;
	} else if ((Tipo.selectedIndex == 5 && Agente.selectedIndex == 0) 
			|| (Tipo.selectedIndex != 5 && Requerido.selectedIndex == 0)
			|| ((Tipo.selectedIndex == 6 || Tipo.selectedIndex == 7 || Tipo.selectedIndex == 8 || Tipo.selectedIndex == 9) && Opciones == "")
			|| (Tipo.selectedIndex != 7 && Tipo.selectedIndex != 8 && Tipo.selectedIndex != 9 && Tamano.selectedIndex == 0)) {
		
		alert("Debe completar todos los campos");
		return;
	}
	if (Tipo.selectedIndex == 5) {
		TextReq = "N/C";
		TextTipoOp = "N/C";
		TextOp = "N/C";
		TextAg = Agente.options[Agente.selectedIndex].text;
	}
	else if (Tipo.selectedIndex == 6 || Tipo.selectedIndex == 7 || Tipo.selectedIndex == 8|| Tipo.selectedIndex == 9) {
		if (TipoOpciones.options[TipoOpciones.selectedIndex].text == "Valores"){
			if (!validarOpciones(Opciones)) {
				alert("Las opciones se ingresan según el formato: etiqueta|valor, ..., etiqueta|valor");
				return;
			}
		}
		TextReq = Requerido.options[Requerido.selectedIndex].text;
		TextTipoOp = TipoOpciones.options[TipoOpciones.selectedIndex].text
		TextOp = Opciones;
		TextAg = "N/C";
	}else if(Tipo.selectedIndex == 10){
		TextReq = Requerido.options[Requerido.selectedIndex].text;
		TextTipoOp = "N/C";
		TextOp = "N/C";
		TextAg = Agente.options[Agente.selectedIndex].text;
	}
	else {
		TextReq = Requerido.options[Requerido.selectedIndex].text;
		TextTipoOp = "N/C";
		TextOp = "N/C";
		TextAg = "N/C";
	}
	if (Tipo.selectedIndex == 7 || Tipo.selectedIndex == 8 || Tipo.selectedIndex == 9) {
		TextTam = "N/C";
	}
	else {
		TextTam = Tamano.options[Tamano.selectedIndex].text;
	}

	var valoresE = $("[name='Etiquetas']").val();
	var valoresC = $("[name='NombresCampos']").val();
	var valoresO = $("[name='EsObligatorio']").val();
	var valoresTip = $("[name='TipoCampos']").val();
	var valoresA = $("[name='Agentes']").val();
	var valoresTam = $("[name='Tamanos']").val();
	var valoresTipoOpc = $("[name='TipoOpcionesCampos']").val();
	var valoresOpc = $("[name='OpcionesCampos']").val();

	var cells = $("#"+idFila).find('td');

	//Si se hace cambio de nombre de campo, se verifica que no exista
	vValores = StringToVector3(valoresC,",");
	if (Campo != cells[0].innerHTML) {
		if (vValores.vIsMember(Campo)) {
			alert(Campo + " ya existe en la tabla");
			return;
		}
	}

	var indInt = vValores.vIndice(cells[0].innerHTML);

	cells[0].innerHTML = document.getElementById("Campo").value; 
    cells[1].innerHTML = Tipo.options[Tipo.selectedIndex].text;
    cells[2].innerHTML = document.getElementById("Etiqueta").value;
    cells[3].innerHTML = Tamano.options[Tamano.selectedIndex].text;
    cells[4].innerHTML = Agente.options[Agente.selectedIndex].text;
    cells[5].innerHTML = Requerido.options[Requerido.selectedIndex].text;
    if (document.getElementById("Opciones").value == ""){
    	cells[6].innerHTML = "";
    }else{
    	cells[6].innerHTML = TipoOpciones.options[TipoOpciones.selectedIndex].text + " - " + document.getElementById("Opciones").value;
    }
    
    vValores = StringToVector3(valoresO,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(TextReq,indInt);
	document.forms[0].EsObligatorio.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresC,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(document.getElementById("Campo").value,indInt);
	document.forms[0].NombresCampos.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresE,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(document.getElementById("Etiqueta").value,indInt);
	document.forms[0].Etiquetas.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresTip,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(Tipo.options[Tipo.selectedIndex].text,indInt);
	document.forms[0].TipoCampos.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresTam,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(TextTam,indInt);
	document.forms[0].Tamanos.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresA,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(TextAg,indInt);
	document.forms[0].Agentes.value = VectorToString2(vValores,",");

	vValores = StringToVector3(valoresTipoOpc,",");
	vValores.vBorrar(indInt);
	vValores.vInsert(TextTipoOp,indInt);
	document.forms[0].TipoOpcionesCampos.value = VectorToString2(vValores,",");
	
	vValores = StringToVector3(valoresOpc,";");
	vValores.vBorrar(indInt);
	vValores.vInsert(TextOp,indInt);
	document.forms[0].OpcionesCampos.value = VectorToString2(vValores,";");

    Tipo.selectedIndex = 0;
    Requerido.selectedIndex = 0;
    Tamano.selectedIndex = 0;
    Agente.selectedIndex = 0;
    TipoOpciones.selectedIndex = 0;
    document.getElementById("Campo").value = "";
    document.getElementById("Etiqueta").value = "";
    document.getElementById("Opciones").value = "";

    cells[0].style.fontWeight="normal";
	cells[1].style.fontWeight="normal";
	cells[2].style.fontWeight="normal";
	cells[3].style.fontWeight="normal";
	cells[4].style.fontWeight="normal";
	cells[5].style.fontWeight="normal";
	cells[6].style.fontWeight="normal";
    idFila = "";
}     		
          
function appRow()
{
	var Etiqueta =  document.getElementById("Etiqueta").value;
	var Campo = document.getElementById("Campo").value;
	var Requerido = document.forms[0].Requerido;
	var Tipo = document.forms[0].Tipo;
	var Agente = document.forms[0].Agente;
	var Tamano = document.forms[0].Tamano;
	var TipoOpciones = document.forms[0].TipoOpciones;
	var Opciones = document.getElementById("Opciones").value;
	var TextReq, TextAg, TextOp, TextTam, TextTipoOp;
	var html = "";
	
	//Control de Errores
	if (Tipo.selectedIndex == 0 || Campo == "" || Etiqueta == "") {
		alert("Debe completar todos los campos");
		return;
	} else if ((Tipo.selectedIndex == 5 && Agente.selectedIndex == 0) 
			|| (Tipo.selectedIndex != 5 && Requerido.selectedIndex == 0)
			|| ((Tipo.selectedIndex == 6 || Tipo.selectedIndex == 7 || Tipo.selectedIndex == 8 || Tipo.selectedIndex == 9) && Opciones == "")
			|| (Tipo.selectedIndex != 7 && Tipo.selectedIndex != 8 && Tipo.selectedIndex != 9 && Tamano.selectedIndex == 0)) {
		
		alert("Debe completar todos los campos");
		return;
	}
	//Existencia de campo
	var valoresC = $("[name='NombresCampos']").val();
	var vValores = StringToVector3(valoresC,',');
	if (vValores.vIsMember(Campo)) {
		 alert(Campo + " ya existe en la tabla");
		 return;
	}
	
	if (Tipo.selectedIndex == 5) {
		TextReq = "N/C";
		TextTipoOp = "N/C";
		TextOp = "N/C";
		TextAg = Agente.options[Agente.selectedIndex].text;
	}
	else if (Tipo.selectedIndex == 6 || Tipo.selectedIndex == 7 || Tipo.selectedIndex == 8 || Tipo.selectedIndex == 9) {
		if (TipoOpciones.options[TipoOpciones.selectedIndex].text == "Valores"){
			if (!validarOpciones(Opciones)) {
				alert("Las opciones se ingresan según el formato: etiqueta|valor[, etiqueta|valor]");
				return;
			}
		}
		TextReq = Requerido.options[Requerido.selectedIndex].text;
		TextTipoOp = TipoOpciones.options[TipoOpciones.selectedIndex].text;
		TextOp = Opciones;
		TextAg = "N/C";
	} else if (Tipo.selectedIndex==10){
		TextReq = Requerido.options[Requerido.selectedIndex].text;
		TextTipoOp = "N/C";
		TextOp = "N/C";
		TextAg = Agente.options[Agente.selectedIndex].text;
	}
	else {
		TextReq = Requerido.options[Requerido.selectedIndex].text;
		TextTipoOp = "N/C";
		TextOp = "N/C";
		TextAg = "N/C";
	}
	if (Tipo.selectedIndex == 7 || Tipo.selectedIndex == 8 || Tipo.selectedIndex == 9) {
		TextTam = "N/C";
	}
	else {
		TextTam = Tamano.options[Tamano.selectedIndex].text;
	}
    
	if (document.forms[0].Etiquetas.value == "") {
    	document.forms[0].Etiquetas.value = Etiqueta;
    }
    else {
    	$("[name='Etiquetas']").val($("[name='Etiquetas']").val()+ ","+ Etiqueta);  
    }
    if (document.forms[0].NombresCampos.value == "") {
      	document.forms[0].NombresCampos.value = Campo; 
    }
    else {
      	document.forms[0].NombresCampos.value += "," + Campo; 
    }
	if (document.forms[0].TipoCampos.value == "") {
		document.forms[0].TipoCampos.value = Tipo.options[Tipo.selectedIndex].text;
	}
	else {
		document.forms[0].TipoCampos.value += "," + Tipo.options[Tipo.selectedIndex].text;
	}
	if (document.forms[0].EsObligatorio.value == "") {
		document.forms[0].EsObligatorio.value = TextReq;
	}
	else {
		document.forms[0].EsObligatorio.value += "," + TextReq;      
	}
	if (document.forms[0].Tamanos.value == "") {
		document.forms[0].Tamanos.value = TextTam;
	}
	else {
		document.forms[0].Tamanos.value += "," + TextTam;
	}
	if (document.forms[0].Agentes.value == "") {
		document.forms[0].Agentes.value = TextAg;
	}
	else {
		document.forms[0].Agentes.value += "," + TextAg;
	}
	if (document.forms[0].TipoOpcionesCampos.value == "") {
		document.forms[0].TipoOpcionesCampos.value = TextTipoOp;
	}
	else {
		document.forms[0].TipoOpcionesCampos.value += "," + TextTipoOp;      
	}
	if (document.forms[0].OpcionesCampos.value == "") {
      	document.forms[0].OpcionesCampos.value = TextOp;
    }
    else {
      	document.forms[0].OpcionesCampos.value += ";" + TextOp; 
    }

	var estilo = "filaBlanca";
	var idR = "B" + vValores.vArray.length.toString();
	if (vValores.vArray.length != 0) {
		idR = "B" + (Number($('#userstbody tr:last').attr('id').split("B")[1]) + 1).toString();
	}
    html+="<tr id="+idR+" style='font-family: Arial,Verdana' ondblclick='camposSeleccionados(this);' class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
    html+="<td width='12%'>" + Campo
    html+="</td><td width='12%'>" + Tipo.options[Tipo.selectedIndex].text
    	+ "</td><td width='12%'>" + Etiqueta
    	+ "</td><td width='12%'>" + Tamano.options[Tamano.selectedIndex].text
    	+ "</td><td width='12%'>" + Agente.options[Agente.selectedIndex].text
    	+ "</td><td width='12%'>" + Requerido.options[Requerido.selectedIndex].text
    	+ "</td><td width='28%'>" + (Opciones!=""?TipoOpciones.options[TipoOpciones.selectedIndex].text + " - " + Opciones:"")
    	+ "</td></tr>";

    $("#userstbody").append(html);

	Requerido.selectedIndex = 0;
	Tipo.selectedIndex = 0;
	Tamano.selectedIndex = 0;
	Agente.selectedIndex = 0;
	TipoOpciones.selectedIndex = 0;
    document.getElementById("Campo").value = "";
    document.getElementById("Etiqueta").value = "";
    document.getElementById("Opciones").value = "";

    if (idFila != "") {
    	var cells = $("#"+idFila).find('td');
        cells[0].style.fontWeight="normal";
    	cells[1].style.fontWeight="normal";
    	cells[2].style.fontWeight="normal";
    	cells[3].style.fontWeight="normal";
    	cells[4].style.fontWeight="normal";
    	cells[5].style.fontWeight="normal";
    	cells[6].style.fontWeight="normal";
        idFila = "";
    }
}

function camposSeleccionados(row)
{
	if (idFila != "") {
		var cells = $("#"+idFila).find('td');
	    cells[0].style.fontWeight="normal";
		cells[1].style.fontWeight="normal";
		cells[2].style.fontWeight="normal";
		cells[3].style.fontWeight="normal";
		cells[4].style.fontWeight="normal";
		cells[5].style.fontWeight="normal";
		cells[6].style.fontWeight="normal";
	    idFila = "";
	}

	var Tipo = document.forms[0].Tipo;
	var Requerido = document.forms[0].Requerido;
	var Tamano = document.forms[0].Tamano;
	var Agente = document.forms[0].Agente;
	var TipoOpciones = document.forms[0].TipoOpciones;
	
	

	cells = row.getElementsByTagName('td');
	idFila = row.id;
	
	var TextoTipoOpciones = cells[6].innerHTML.substring(0,cells[6].innerHTML.indexOf(" - "))
	var TextoOpciones = cells[6].innerHTML.substring(cells[6].innerHTML.indexOf(" - ")+3,cells[6].innerHTML.length)

	var cell = $(row).find("td:eq(1)");
	var t = cell.html();
	Tipo.selectedIndex = getSelIndex(t,"1");

	cell = $(row).find("td:eq(5)");
	t = cell.html();
	Requerido.selectedIndex = getSelIndex(t,"2");

	cell = $(row).find("td:eq(3)");
	t = cell.html();
	Tamano.selectedIndex = getSelIndex(t,"3");

	cell = $(row).find("td:eq(4)");
	t = cell.html();
	Agente.selectedIndex = getSelIndex(t,"4");
	
	t = TextoTipoOpciones;
	TipoOpciones.selectedIndex = getSelIndex(t,"5");

	Tipo.options[Tipo.selectedIndex].text = cells[1].innerHTML;
	Requerido.options[Requerido.selectedIndex].text = cells[5].innerHTML;
	Agente.options[Agente.selectedIndex].text = cells[4].innerHTML;
	document.getElementById("Campo").value = cells[0].innerHTML;
	document.getElementById("Etiqueta").value = cells[2].innerHTML;
	Tamano.options[Tamano.selectedIndex].text = cells[3].innerHTML;
	//document.getElementById("Opciones").value = cells[6].innerHTML;
	//TipoOpciones.options[TipoOpciones.selectedIndex].text = TextoTipoOpciones;
	document.getElementById("Opciones").value = TextoOpciones;

	cells[0].style.fontWeight="bold";
	cells[1].style.fontWeight="bold";
	cells[2].style.fontWeight="bold";
	cells[3].style.fontWeight="bold";
	cells[4].style.fontWeight="bold";
	cells[5].style.fontWeight="bold";
	cells[6].style.fontWeight="bold";
	bloqCampos();
}

function getSelIndex(T,tip)
{	

	if (T == null || T == "" || T == "undefined" || T == "N/C") {
		return (0);
	}
	if (tip == "1") {
		if (T == "Texto") {
           	return (1);
        }
        else if (T == "Numérico") {
          	return(2);
        }
 		else if (T == "Fecha"){
	  	    return(3);
        }
 		else if (T == "Calculado") {
 			return (4);
 		}
 		else if (T == "Botón") {
 			return (5);
 		}
 		else if (T == "Combobox") {
 			return (6);
 		}
 		else if (T == "Radio") {
 			return (7);
 		}
 		else if (T == "Checkbox") {
 			return (8);
 		}else if (T == "PickList") {
 			return (9);
 		}
 		else if (T == "Autocompletado") {
 			return (10);
 		}
	}
	else if (tip == "2") {
		if (T == "Si") {
       		return (1);
		}
		else if (T == "No") {
      		return(2);
		}
	}
	else if (tip == "3") {
		if (T == "Muy Pequeño") {
			return (1);
		}
		else if (T == "Pequeño") {
			return (2);
		}
		else if (T == "Mediano") {
			return (3);
		}
		else if (T == "Grande") {
			return (4);
		}
		else if (T == "Muy Grande") {
			return (5);
		}
	}
	else if (tip == "4") {
		var valoresNomAg = $("[name='NombresAgentes']").val();
		var nomAgentes = StringToVector3(valoresNomAg,';');
	 	return (nomAgentes.vArray.indexOf(T) + 1);
	}else if (tip == "5") {
		if (T == "Valores") {
			return (0);
		}
		else if (T == "DatoExterno") {
			return (1);
		}
	}
}

function cargarTablaBusqueda()
{
	var valoresE = $("[name='Etiquetas']").val();
	var valoresC = $("[name='NombresCampos']").val();
	var valoresO = $("[name='EsObligatorio']").val();
	var valoresTip = $("[name='TipoCampos']").val();
	var valoresTam = $("[name='Tamanos']").val();
	var valoresAg = $("[name='Agentes']").val();
	var valoresTipoOpc = $("[name='TipoOpcionesCampos']").val();
	var valoresOpc = $("[name='OpcionesCampos']").val();
 	var estilo = "filaBlanca";
 	
 	if (document.forms[0].modo.value == "1") {
		//Cargar agentes en select
	 	var valoresNomAg = $("[name='NombresAgentes']").val();
	 	var nomAgentes = StringToVector3(valoresNomAg,';');
	 	for(i=0; i<nomAgentes.vArray.length; i++) {
	 		var option = new Option(nomAgentes.vArray[i],i+1);
	 		document.forms[0].Agente.add(option,null);
	 	}
 	}
 	if (valoresC != "") {
 		var etiquetas = StringToVector3(valoresE,',');
 		var campos = StringToVector3(valoresC,',');
 		var obs = StringToVector3(valoresO,',');
 		var tipos = StringToVector3(valoresTip,',');
 		var tamanos = StringToVector3(valoresTam,',');
 		var agentes = StringToVector3(valoresAg,',');
 		var tipoOpciones = StringToVector3(valoresTipoOpc,',');
 		var opciones = StringToVector3(valoresOpc,';');
		var html = "";
		//Si el modo es edición
		if (document.forms[0].modo.value == "1") {
			for (i=0; i<campos.vArray.length; i++) {
     			var idR ="B" + i.toString();
     			html+="<tr id="+idR+" style='font-family: Arial,Verdana' ondblclick='camposSeleccionados(this);' class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
	    		html+="<td width='12%'>" + campos.vArray[i];
	    		html+="</td><td width='12%'>" + tipos.vArray[i]
	    			+ "</td><td width='12%'>" + etiquetas.vArray[i]
                	+ "</td><td width='12%'>";
    			if (tamanos.vArray[i] != "N/C")
	    			html += tamanos.vArray[i];
            	html += "</td><td width='12%'>";
            	if (agentes.vArray[i] != "N/C")
            		html += agentes.vArray[i];
            	html += "</td><td width='12%'>";
            	if (obs.vArray[i] != "N/C")
            		html += obs.vArray[i];
            	html += "</td><td width='28%'>";
            	if (opciones.vArray[i] != "N/C"){
            		html += tipoOpciones.vArray[i] + " - ";
            		html += opciones.vArray[i];
            	}
            	html += "</td></tr>";
			}
		}
		else {
			for (i=0; i<campos.vArray.length; i++) {
				var idR ="B" + i.toString();
				html+="<tr id="+idR+" style='font-family: Arial,Verdana' class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
	    		html+="<td width='12%'>" + campos.vArray[i];
	    		html+="</td><td width='12%'>" + tipos.vArray[i]
	    			+ "</td><td width='12%'>" + etiquetas.vArray[i]
                	+ "</td><td width='12%'>";
    			if (tamanos.vArray[i] != "N/C")
	    			html += tamanos.vArray[i];
            	html += "</td><td width='12%'>";
            	if (agentes.vArray[i] != "N/C")
            		html += agentes.vArray[i];
            	html += "</td><td width='12%'>";
            	if (obs	.vArray[i] != "N/C")
            		html += obs.vArray[i];
            	html += "</td><td width='28%'>";
            	if (opciones.vArray[i] != "N/C"){
            		html += tipoOpciones.vArray[i] + " - ";
            		html += opciones.vArray[i];
            	}
            	html += "</td></tr>";
	    	}
		}
		$("#users > tbody").html(html);
 	}
}

function validarOpciones(op) {
	var opciones = StringToVector3(op,",");
	for (var j=0; j<opciones.vArray.length; j++) {
		opcionesSplit = opciones.vArray[j].split("|")
		if (opcionesSplit.length != 2) {
			return false;
		}
		else if (opcionesSplit[0] == "" || opcionesSplit[1] == "") {
			return false;
		}
	}
	return true;
}