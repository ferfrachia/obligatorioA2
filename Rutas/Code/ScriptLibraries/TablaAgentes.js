var idFilaAg = "";

function delAgent()
{
	//Control de errores
	if (idFilaAg == "") {
		alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		return;
	}

	var cells = $("#"+idFilaAg).find('td');
	var Nombre = cells[0].innerHTML;

	var valoresNom = $("[name='NombresAgentes']").val();
	var valoresPar = $("[name='ParametrosAgentes']").val();
	var valoresURL = $("[name='URLAgentes']").val();

	//Control de uso de agente
	valoresAg = $("[name='Agentes']").val();
	var vValores = StringToVector3(valoresAg,",");
	if (vValores.vIsMember(Nombre)) {
		alert(Nombre + " está siendo utilizado en un botón");
		return;
	}

	$("#"+idFilaAg).remove();
	vValores = StringToVector3(valoresNom,";");
	var indInt = vValores.vIndice(Nombre);

	//Borrar agente del select
 	for (i=0; i<document.forms[0].Agente.length; i++) {
 		if (Nombre == document.forms[0].Agente.options[i].text) {
 			document.forms[0].Agente.remove(i);
 		}
 	}

    vValores = StringToVector3(valoresNom,";");
	vValores.vBorrar(indInt);
	document.forms[0].NombresAgentes.value = VectorToString2(vValores,";");

	vValores = StringToVector3(valoresPar,";");
	vValores.vBorrar(indInt);
	document.forms[0].ParametrosAgentes.value = VectorToString2(vValores,";");

	vValores = StringToVector3(valoresURL,";");
	vValores.vBorrar(indInt);
	document.forms[0].URLAgentes.value = VectorToString2(vValores,";");

	document.getElementById("NombreAgente").value = "";
    document.getElementById("ParametrosAgente").value = "";
    document.getElementById("URLAgente").value = "";

    cells[0].style.fontWeight="normal";
	cells[1].style.fontWeight="normal";
	cells[2].style.fontWeight="normal";
    idFilaAg = "";
}

function modAgent()
{
	var Nombre = document.getElementById("NombreAgente").value;
	var Parametros = document.getElementById("ParametrosAgente").value;
	var URL = document.getElementById("URLAgente").value;
	URL=URL.replace(/\\/g, '/');
	
	//Control de errores
	if (idFilaAg == ""){
		alert("No ha seleccionado ninguna fila de la tabla para modificar.");
		return;
	}
	if (Nombre == "" || URL == "") {
		alert("Debe completar los campos Nombre Agente y URL");
		return;
	}
	if (Parametros == "") {
		Parametros = "*undefined*";
	}

	var valoresNom = $("[name='NombresAgentes']").val();
	var valoresPar = $("[name='ParametrosAgentes']").val();
	var valoresURL = $("[name='URLAgentes']").val();
	
	var cells = $("#"+idFilaAg).find('td');
	var nombreViejo = cells[0].innerHTML;

	//Si se hace cambio de nombre, se verifica que no exista el nombre
	var vValores = StringToVector3(valoresNom,";");
	var cambioNombre = false;
	if (Nombre != cells[0].innerHTML) {
		cambioNombre = true;
		if (vValores.vIsMember(Nombre)) {
			alert(Nombre + " ya existe en la tabla");
			return;
		}
	}
	
	cells[0].innerHTML = Nombre;
    cells[1].innerHTML = document.getElementById("ParametrosAgente").value;
    cells[2].innerHTML = URL;

    var indInt = vValores.vIndice(nombreViejo);

    vValores = StringToVector3(valoresNom,";");
	vValores.vBorrar(indInt);
	vValores.vInsert(Nombre,indInt);
	document.forms[0].NombresAgentes.value = VectorToString2(vValores,";");

	vValores = StringToVector3(valoresPar,";");
	vValores.vBorrar(indInt);
	vValores.vInsert(Parametros,indInt);
	document.forms[0].ParametrosAgentes.value = VectorToString2(vValores,";");
	
	vValores = StringToVector3(valoresURL,";");
	vValores.vBorrar(indInt);
	vValores.vInsert(URL,indInt);
	document.forms[0].URLAgentes.value = VectorToString2(vValores,";");
	
	//Si se hace cambio de nombre se actualizan los nombres de agentes en los botones y en el select
	if (cambioNombre) {
		//Modificar agente en select
	 	document.forms[0].Agente.options[indInt+1].text = Nombre;
	 	
	 	//Modificar campo multivaluado y tabla de campos
	 	valoresAg = $("[name='Agentes']").val();
	 	var agentes = StringToVector3(valoresAg,',');
	 	var rows = document.getElementById("userstbody").getElementsByTagName("tr");
	 	for (i=0; i<agentes.vArray.length; i++) {
	 		if (nombreViejo == agentes.vArray[i]) {
	 			agentes.vBorrar(i);
	 			agentes.vInsert(Nombre,i);
	 		}
	 	}
	 	for (i=0; i<rows.length; i++) {
	 		if (nombreViejo == rows[i].getElementsByTagName('td')[4].innerHTML) {
	 			rows[i].getElementsByTagName('td')[4].innerHTML = Nombre;
	 		}
	 	}
	 	document.forms[0].Agentes.value = VectorToString2(agentes,";");
	}

	document.getElementById("NombreAgente").value = "";
    document.getElementById("ParametrosAgente").value = "";
    document.getElementById("URLAgente").value = "";

    cells[0].style.fontWeight="normal";
	cells[1].style.fontWeight="normal";
	cells[2].style.fontWeight="normal";
    idFilaAg = "";
}     		

function newAgent()
{
	var Nombre = document.getElementById("NombreAgente").value;
	var Parametros = document.getElementById("ParametrosAgente").value;
	var URL = document.getElementById("URLAgente").value;
	URL=URL.replace(/\\/g, '/');
	
	var html = "";
	
	//Control de errores
	if (Nombre == "" || URL == "") {
		alert("Debe completar los campos Nombre Agente y URL");
		return;
	}
	valoresNom = $("[name='NombresAgentes']").val();
	var vValores = StringToVector3(valoresNom,";");
	if (vValores.vIsMember(Nombre)){
		 alert(Nombre + " ya existe en la tabla");
		 return;
	}
	if (Parametros == "") {
		Parametros = "*undefined*";
	}
	
	if (document.forms[0].NombresAgentes.value == "") {
    	document.forms[0].NombresAgentes.value = Nombre;
    }
    else {
    	document.forms[0].NombresAgentes.value += ";" + Nombre;
    }
    if (document.forms[0].ParametrosAgentes.value == "") {
      	document.forms[0].ParametrosAgentes.value = Parametros;
    }
    else {
      	document.forms[0].ParametrosAgentes.value += ";" + Parametros;
    }
    if (document.forms[0].URLAgentes.value == "") {
    	document.forms[0].URLAgentes.value = URL;
    }
    else {
    	document.forms[0].URLAgentes.value += ";" + URL;
    }

	var estilo ="filaBlanca";
	var idR = "C" + vValores.vArray.length.toString();
	if (vValores.vArray.length != 0) {
		idR = "C" + (Number($('#agentstbody tr:last').attr('id').split("C")[1]) + 1).toString();
	}
	html += "<tr id="+idR+" style='font-family: Arial,Verdana' ondblclick='agenteSeleccionado(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >"
    		+ "<td width='12%'>" + Nombre + "</td><td width='44%'>";
	if (Parametros != "*undefined*") {
		html += Parametros;
	}
	html += "</td><td width='44%'>" + URL + "</td></tr>";

    $("#agentstbody").append(html);

    //Cargar agente en select
    var option = new Option(Nombre,(Number(document.forms[0].Agente.options[document.forms[0].Agente.options.length-1].value)+1).toString());
 	document.forms[0].Agente.add(option,null);

    document.getElementById("NombreAgente").value = "";
    document.getElementById("ParametrosAgente").value = "";
    document.getElementById("URLAgente").value = "";

    if (idFilaAg != "") {
    	var cells = $("#"+idFilaAg).find('td');
	    cells[0].style.fontWeight = "normal";
		cells[1].style.fontWeight = "normal";
		cells[2].style.fontWeight = "normal";
		idFilaAg = "";
    }
}

function agenteSeleccionado(row)
{
	if (document.forms[0].modo.value == "1") {
		if (idFilaAg != "") {
			var cells = $("#"+idFilaAg).find('td');
		    cells[0].style.fontWeight = "normal";
			cells[1].style.fontWeight = "normal";
			cells[2].style.fontWeight = "normal";
			idFilaAg = "";
		}
		
		cells = row.getElementsByTagName('td');
	    idFilaAg = row.id;
	    document.getElementById("NombreAgente").value = cells[0].innerHTML;
	    document.getElementById("ParametrosAgente").value = cells[1].innerHTML;
	    document.getElementById("URLAgente").value = cells[2].innerHTML;
	    
	    cells[0].style.fontWeight = "bold";
		cells[1].style.fontWeight = "bold";
		cells[2].style.fontWeight = "bold";
	}
}

function cargarTablaAgente()
{
	var valoresNom = $("[name='NombresAgentes']").val();
	var valoresPar = $("[name='ParametrosAgentes']").val();
	var valoresURL = $("[name='URLAgentes']").val();
 	var estilo = "filaBlanca";		

 	if (valoresNom != "") {
 		var nombres = StringToVector3(valoresNom,";");
 		var parametros = StringToVector3(valoresPar,";");
 		var URLs = StringToVector3(valoresURL,";");
		var html = "";
		//Si el modo es edición
		if (document.forms[0].modo.value == "1") {
			for(i=0; i<nombres.vArray.length; i++) {
				var idR ="C" + i.toString();
				html += "<tr style='font-family: Arial,Verdana' id="+idR+" ondblclick='agenteSeleccionado(this);' class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >"
						+ "<td width='12%'>" + nombres.vArray[i] + "</td><td width='44%'>";
				if (parametros.vArray[i] != "*undefined*") {
					html += parametros.vArray[i];
				}
				html += "</td><td width='44%'>" + URLs.vArray[i] + "</td></tr>";
			}
		}
		else {
			for(i=0; i<nombres.vArray.length; i++){
				var idR ="C" + i.toString();
				html += "<tr style='font-family: Arial,Verdana' id="+idR+" ondblclick='agenteSeleccionado(this);' class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >"
						+ "<td width='12%'>" + nombres.vArray[i] + "</td><td width='44%'>";
				if (parametros.vArray[i] != "*undefined*") {
					html += parametros.vArray[i];
				}
				
				html += "</td><td width='44%'>" + URLs.vArray[i] + "</td></tr>";
	    	}
		}

		$("#agents > tbody").html(html);
 	}
}

/*function limpiar() {
	document.forms[0].NombresAgentes.value = "";
  	document.forms[0].ParametrosAgentes.value = "";
	document.forms[0].URLAgentes.value = "";
}*/
