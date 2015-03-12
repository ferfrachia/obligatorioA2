function cargarRolesResoluciones(){
	if (document.forms[0].ModResoluciones.value=="0"){
		return;
	}
	var edit =document.getElementById("Edicion").value;
	var RolEspecialRES =document.getElementById("RolEspecialRES").value == "1";
	var tbody = document.getElementById('chkRolesResol');
	while(tbody.rows.length>0){
		tbody.deleteRow(tbody.rows[1])
	}
	var miembros = StringToVector3(document.forms[0].nbMiembrosResol.value,",")
	var creadores = StringToVector3(document.forms[0].CreadoresAsuntosResol.value,",")
	var fila =""
	row = "<tr class=\"tipoletranegra\" ><td align=\"left\">&nbsp;</td><td align=\"center\">Creador de Asunto</td></tr>"
	$('#chkRolesResol').append(row);
	for (var i=0;i<miembros.vLength;i++){
		fila="<tr class=\"tipoletranegra\" ><td align=\"left\">"+miembros.vArray[i]+"</td>";
		fila=fila + crearCeldaHtmlDeRol(miembros.vArray[i],"CreadorAsuntoResol",creadores,"60",RolEspecialRES);
		fila=fila+"</tr>";
		$('#chkRolesResol').append(fila);
	}
}

function guardarRolesResoluciones(){
	var miembros=StringToVector3(document.forms[0].nbMiembrosResol.value,",");
	var creadores = document.forms[0].CreadorAsuntoResol;
	var nombres = new Vector(0)
	if (creadores){
		if (creadores.length){
			for (var i=0;i<creadores.length;i++){
				if (creadores[i].checked && miembros.vIsMember(creadores[i].value)){
					nombres.vAgregar(creadores[i].value)
				}
			}
		}else{
			if (creadores.checked && miembros.vIsMember(creadores.value)){
				nombres.vAgregar(creadores.value)
			}
		}
	}
	document.forms[0].CreadoresAsuntosResol.value=VectorToString2(nombres,",")
}

function cargarMiembrosResol(){
	vValores =  StringToVector3(document.forms[0].nbMiembrosResol.value,",");
	
	var edit =document.getElementById("Edicion").value;
	var RolEspecialRES =document.getElementById("RolEspecialRES").value == "1";
	
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (edit == 1 && RolEspecialRES){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroResoluciones("+ i+ ")\" style='cursor:pointer'></td>";
		}
		row+="</tr>";
	}
	row+="</table>"
	document.getElementById("nbMiembrosResol-List").innerHTML=row;
}

function QuitarMiembroResoluciones(indice){
	vValores =  StringToVector3(document.forms[0].nbMiembrosResol.value,",");
	var obj = vValores.vObjeto(indice);

	vValores.vBorrar(indice);
	document.forms[0].nbMiembrosResol.value=VectorToString2(vValores,",");

	var creadores = StringToVector3(document.forms[0].CreadoresAsuntosResol.value,",")
	var indiceAux=creadores.vIndice(obj); 	
	//quito al supervisor de miembros resoluciones
	if ($.trim(obj) == $.trim(document.forms[0].sSupervisorResol.value)){

		document.forms[0].sSupervisorResol.value="";
	} 
	if (indiceAux!=-1){
		creadores.vBorrar(indiceAux);
		document.forms[0].CreadoresAsuntosResol.value=VectorToString2(creadores,",");
	}
	//Fin creadores
	cargarMiembrosResol();
	cargarRolesResoluciones();
}

function borrarSupervisor(){
	if (document.forms[0].sSupervisorResolBorrado.value!=""){
		document.forms[0].sSupervisorResolBorrado.value=document.forms[0].sSupervisorResolBorrado.value+","+document.forms[0].sSupervisorResol.value;
	}else{
		document.forms[0].sSupervisorResolBorrado.value=document.forms[0].sSupervisorResol.value;
	}
	document.forms[0].sSupervisorResol.value='';
}

function QuitarSupervisor(){
	document.forms[0].sSupervisorResol.value="";
}