function cargarMiembrosExp(){
	
	var edit =document.getElementById("Edicion").value;
	var rolEspecialEXP =document.getElementById("RolEspecialEXP").value == "1";
	
	vValores =  StringToVector3(document.forms[0].nbMiembrosExp.value,",");
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (edit == 1 && rolEspecialEXP){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroExpediente("+ i+ ")\" style='cursor:pointer'></td>";
		}		

		row+="</tr>";
	}
	row+="</table>";
	document.getElementById("nbMiembrosExp-List").innerHTML=row;
}

function cargarRoles(){
	
	var edit =document.getElementById("Edicion").value;
	var rolEspecialEXP =document.getElementById("RolEspecialEXP").value == "1";
	
	var html="";
	var i;
	var miembros = new Vector(0);
	valores=document.forms[0].nbMiembrosExp.value;
	miembros = StringToVector3(valores,",");
	var manejaRolesExp = document.forms[0].ManejaRoles.value=="1";

	valores=document.forms[0].RolCreador.value;
	var creadores=StringToVector3(valores,";")

	valores=document.forms[0].RolReceptor.value;
	var receptores=StringToVector3(valores,";")

	valores=document.forms[0].RolEditor.value;
	var editores=StringToVector3(valores,";")

	valores=document.forms[0].RolFirmante.value;
	var firmantes=StringToVector3(valores,";")

	valores=document.forms[0].RolPase.value;
	var pases=StringToVector3(valores,";")

	valores=document.forms[0].RolGestion.value;
	var gestion=StringToVector3(valores,";")

	valores=document.forms[0].RolModificarPlazo.value;
	var plazo=StringToVector3(valores,";")

	valores = document.forms[0].RolArchivar.value;
	var archivo=StringToVector3(valores,";")
	
	valores=document.forms[0].RolManejarConf.value;
	var confidencial=StringToVector3(valores,";")
	
	valores = document.forms[0].RolAgregar.value;
	var agregar = StringToVector3(valores,";")

	html=html+'<tr class="tipoletranegra">	<td  style="width:200">&nbsp;</td><td  align="center" style="width:50">Creador</td>';
	html=html+'<td  align="center" style="width:60px">Receptor</td>';
	html=html+'<td  align="center" style="width:60px">Editor</td>';
	html=html+'<td  align="center" style="width:60px">Firmante</td>';
	html=html+'<td  align="center" style="width:60px">Pase</td>';
	html=html+'<td  align="center" style="width:60px">Gestión</td>';
	html=html+'<td  align="center" style="width:60px">Archivo</td>';
	html=html+'<td  align="center" style="width:60px">Plazo</td>';
	html=html+'<td  align="center" style="width:60px">Confiden</td>';
	html=html+'<td	align="center" style="width:60px">Agregar</td>';
	html=html+'<td  style="width:20px">&nbsp;&nbsp;&nbsp;&nbsp;</td> <td  style="width:20px">&nbsp;&nbsp;</td>';
	html=html+'</tr>';
	for(i=0;i<miembros.vArray.length;i++){		
		html=html+"<tr class=\"tipoletranegra\" id=\"" +miembros.vArray[i] + "\"><td align=\"left\" style=\"width:200\">"+miembros.vArray[i]+"</td>";
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"creador",creadores,"60",rolEspecialEXP);	
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"receptor",receptores,"60",rolEspecialEXP);			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"editor",editores,"60",rolEspecialEXP);			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"firmante",firmantes,"60",rolEspecialEXP);			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"pase",pases,"60",rolEspecialEXP);		
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"gestion",gestion,"60",rolEspecialEXP);		
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"archivo",archivo,"60",rolEspecialEXP);		
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"plazo",plazo,"60",rolEspecialEXP);		
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"confidencial",confidencial,"60",rolEspecialEXP);
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"agregar",agregar,"60",rolEspecialEXP);
		
		//Agregue esto
		var a =miembros.vArray[i];

		if ( edit == 1 && rolEspecialEXP) {
			html=html +"<td align='center' style='width:100'><a href ='javascript:selectAll(\"" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/check.gif\"></a></td>";
			html=html +"<td align='center' style='width:100'><a href ='javascript:unselectAll(\"" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/remove.gif\"></a></td>";
			html+= "</tr>";
		}else{
			html=html + "<td>&nbsp;</td><td>&nbsp;</td></tr>"
		}	
	}

	html=" <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">"+html+"</table>";
	DIV= document.getElementById("selRolesExpediente");

	DIV.innerHTML=html;
	//   }
}

function guardarRoles(){
	var frm=document.forms[0];
	valores=document.forms[0].nbMiembrosExp.value;
	var miembros=StringToVector3(valores,',');

	if (miembros.vLength>0){		
		var creadores = crearVectorDeRol(frm.creador, miembros);
		var receptores = crearVectorDeRol(frm.receptor, miembros);
		var editores = crearVectorDeRol(frm.editor, miembros);
		var firmantes = crearVectorDeRol(frm.firmante, miembros);
		var pases = crearVectorDeRol(frm.pase, miembros);
		var gestion = crearVectorDeRol(frm.gestion, miembros);
		var plazo = crearVectorDeRol(frm.plazo, miembros);
		var confidencial = crearVectorDeRol(frm.confidencial, miembros);
		var archivo = crearVectorDeRol(frm.archivo, miembros);
		var agregar = crearVectorDeRol(frm.agregar, miembros);

		frm.RolCreador.value= VectorToString2(creadores,";");
		frm.RolReceptor.value= VectorToString2(receptores,";");
		frm.RolEditor.value= VectorToString2(editores,";");
		frm.RolFirmante.value= VectorToString2(firmantes,";");
		frm.RolPase.value= VectorToString2(pases,";");
		frm.RolGestion.value= VectorToString2(gestion,";");
		frm.RolModificarPlazo.value= VectorToString2(plazo,";");
		frm.RolManejarConf.value= VectorToString2(confidencial,";");
		frm.RolArchivar.value=VectorToString2(archivo,";");
		frm.RolAgregar.value = VectorToString2(agregar,";");
	}
	if (document.forms[0].ModCartas.value==1){
		guardarRolesCS();
	}
	if (document.forms[0].ModResoluciones.value==1){
		guardarRolesResoluciones();
	}
	if (document.forms[0].ModContratos.value==1) {
		guardarRolesContratos();
	}
	if (document.forms[0].ModPublicDocumentos.value==1){
		guardarRolesPDD();
	}
}

function QuitarMiembroExpediente(indice){
	var indiceAux;

	vValores =  StringToVector3(document.forms[0].nbMiembrosExp.value,",");

	var obj = vValores.vObjeto(indice);

	vValores.vBorrar(indice);
	// asigno los nuevos miembros
	document.forms[0].nbMiembrosExp.value=VectorToString2(vValores,",");
	valores=document.forms[0].nbMiembrosExp.value;

	//cambio los roles
	//Rol creador
	valores=document.forms[0].RolCreador.value;
	var creadores=StringToVector3(valores,";");

	indiceAux=creadores.vIndice(obj); 	

	if (indiceAux!=-1){
		creadores.vBorrar(indiceAux);
		document.forms[0].RolCreador.value=VectorToString2(creadores,";");
	}
	//Fin creadores

	//Rol receptor
	valores=document.forms[0].RolReceptor.value;
	var receptores=StringToVector3(valores,";")

	indiceAux = receptores.vIndice(obj);
	if (indiceAux!=-1){
		receptores.vBorrar(indiceAux);
		document.forms[0].RolReceptor.value=VectorToString2(receptores,";");
	}
	//Fin receptores

	//Rol editor	
	valores=document.forms[0].RolEditor.value;
	var editores=StringToVector3(valores,";")

	indiceAux = editores.vIndice(obj);
	if (indiceAux!=-1){
		editores.vBorrar(indiceAux);
		document.forms[0].RolEditor.value=VectorToString2(editores,";");
	}

	//Fin editores

	//Rol firmante
	valores=document.forms[0].RolFirmante.value;
	var firmantes=StringToVector3(valores,";")

	indiceAux = firmantes.vIndice(obj);
	if (indiceAux!=-1){
		firmantes.vBorrar(indiceAux);
		document.forms[0].RolFirmante.value=VectorToString2(firmantes,";");
	}	

	//Fin Firmantes
	//Rol pase

	valores=document.forms[0].RolPase.value;
	var pases=StringToVector3(valores,";")

	indiceAux = pases.vIndice(obj);
	if (indiceAux!=-1){
		pases.vBorrar(indiceAux);
		document.forms[0].RolPase.value=VectorToString2(pases,";");
	}	

	//Fin rol pase
	//Rol gestion
	valores=document.forms[0].RolGestion.value;
	var gestion=StringToVector3(valores,";")

	indiceAux = gestion.vIndice(obj);
	if (indiceAux!=-1){
		gestion.vBorrar(indiceAux);
		document.forms[0].RolGestion.value=VectorToString2(gestion,";");
	}	
	//Fin rol getion	
	//Rol modificar plazo
	valores=document.forms[0].RolModificarPlazo.value;
	var plazo=StringToVector3(valores,";")

	indiceAux = plazo.vIndice(obj);
	if (indiceAux!=-1){
		plazo.vBorrar(indiceAux);
		document.forms[0].RolModificarPlazo.value=VectorToString2(plazo,";");
	}	
	//Fin rol modificar plazo
	//Rol archivar	
	valores = document.forms[0].RolArchivar.value;
	var archivo=StringToVector3(valores,";")
	indiceAux = archivo.vIndice(obj);
	if (indiceAux!=-1){
		archivo.vBorrar(indiceAux);
		document.forms[0].RolArchivar.value=VectorToString2(archivo,";");
	}
	//Fin rol archivar	
	//Rol manejar confidencial
	valores=document.forms[0].RolManejarConf.value;
	var confidencial=StringToVector3(valores,";")

	indiceAux = confidencial.vIndice(obj);
	if (indiceAux!=-1){
		confidencial.vBorrar(indiceAux);
		document.forms[0].RolManejarConf.value=VectorToString2(confidencial,";");
	}
	//Fin rol manejar confidencial

	cargarMiembrosExp();

	cargarRoles();
}