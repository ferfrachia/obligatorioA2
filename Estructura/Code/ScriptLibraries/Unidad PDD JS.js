//Cargo los roles de las cartas de servicio
function cargarRolesPDD(){
	
	var edit =document.getElementById("Edicion").value;
	var rolEspecialPDD =document.getElementById("RolEspecialPDD").value == "1";
	
	var html="";
	var i;
	var valores=document.forms[0].nbMiembrosPDD.value;
	var miembros=StringToVector3(valores,',');

	valores = document.forms[0].RolCreadorPDD.value;
	var creadores = StringToVector3(valores,",");

	valores = document.forms[0].RolEditorPDD.value;
	var editores = StringToVector3(valores,",");
	
	valores = document.forms[0].RolAsignantePDD.value;
	var asignantes = StringToVector3(valores,",");

	valores = document.forms[0].RolFirmantePDD.value;
	var firmantes = StringToVector3(valores,",");

	valores=document.forms[0].RolPublicadorPDD.value;
	var publicadores = StringToVector3(valores,",");

	valores=document.forms[0].RolArchivadorPDD.value;
	var archivadores = StringToVector3(valores,",");
	html=html+'<tr class="tipoletranegra">	<td  style="width:200">&nbsp;</td><td  align="center" style="width:50">Creador</td>';
	html=html+'<td  align="center" style="width:60px">Editor</td>';
	html=html+'<td  align="center" style="width:60px">Asignante</td>';
	html=html+'<td  align="center" style="width:60px">Firmante</td>';
	html=html+'<td  align="center" style="width:60px">Publicador</td>';
	html=html+'<td  align="center" style="width:60px">Archivo</td>';
   	html=html+'<td>&nbsp;</td>';
	html=html+'</tr>';
	for(i=0;i<miembros.vArray.length;i++){
		html=html+"<tr class=\"tipoletranegra\"  id=\"PDD" + miembros.vArray[i] + "\"><td align=\"left\" style=\"width:200\">"+ miembros.vArray[i]+"</td>";
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"creadorPDD",creadores,"60",rolEspecialPDD);
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"editorPDD",editores,"60",rolEspecialPDD);
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"asignantePDD",asignantes,"60",rolEspecialPDD);			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"firmantePDD",firmantes,"60",rolEspecialPDD);			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"publicadorPDD",publicadores,"60",rolEspecialPDD);	
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"archivarPDD",archivadores,"60",rolEspecialPDD);	
		
		//Agregue esto
        var a = miembros.vArray[i];
		if ( edit == 1 && rolEspecialPDD) {
			html=html +"<td align='center' style='width:70'><a href ='javascript:selectAll(\"PDD" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/check.gif\"></a></td>";
          	html=html +"<td align='center' style='width:80'><a href ='javascript:unselectAll(\"PDD" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/remove.gif\"></a></td>";
        }
		html=html+"<td>&nbsp;</td></tr>";
	}

	html=" <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" >"+html+"</table>";
	DIV= document.getElementById("selRolesPublicDoc");
	DIV.innerHTML=html;
}

function guardarRolesPDD(){
	var frm=document.forms[0];
	var valores=document.forms[0].nbMiembrosPDD.value;
	//var valores = document.getElementById("nbMiembrosPDD").value;
	var miembros=StringToVector3(valores,',');
	
	if (miembros.vLength>0){
		
		var creadores = crearVectorDeRol(frm.creadorPDD, miembros);
		var editores = crearVectorDeRol(frm.editorPDD,miembros);
		var asignantes = crearVectorDeRol(frm.asignantePDD, miembros);
		var firmantes = crearVectorDeRol(frm.firmantePDD, miembros);
		var publicadores = crearVectorDeRol(frm.publicadorPDD, miembros);
		var archivadores = crearVectorDeRol(frm.archivarPDD, miembros);
			
		//document.getElementById("RolCreadorPDD").value= VectorToString2(creadores,",");
		document.forms[0].RolCreadorPDD.value = VectorToString2(creadores,",");
		//document.getElementById("RolEditorPDD").value= VectorToString2(editores,",");
		document.forms[0].RolEditorPDD.value = VectorToString2(editores,",");
		//document.getElementById("RolAsignantePDD").value= VectorToString2(asignantes,",");
		document.forms[0].RolAsignantePDD.value = VectorToString2(asignantes,",");
		//document.getElementById("RolFirmantePDD").value= VectorToString2(firmantes,",");
		document.forms[0].RolFirmantePDD.value = VectorToString2(firmantes,",");
		//document.getElementById("RolPublicadorPDD").value= VectorToString2(publicadores,",");
		document.forms[0].RolPublicadorPDD.value = VectorToString2(publicadores,",");
		//document.getElementById("RolArchivadorPDD").value= VectorToString2(archivadores,","); 
		document.forms[0].RolArchivadorPDD.value =  VectorToString2(archivadores,","); 

	}
}

function cargarMiembrosPDD(){
	
	var rolEspecialPDD =document.getElementById("RolEspecialPDD").value == "1";
	
	
	if (document.forms[0].ModPublicDocumentos.value="1"){
		vValores =  StringToVector3(document.forms[0].nbMiembrosPDD.value,",");
		var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
		for (i = 0; i < vValores.vArray.length; i++){
			row+= "<tr>";
			row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
          	if (document.getElementById("Edicion").value == 1 && rolEspecialPDD){
				row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroPDD("+ i+ ")\" style='cursor:pointer'></td>";
			}		
			row+="</tr>";
		}
		row+="</table>"
		document.getElementById("nbMiembrosPDD-List").innerHTML=row;
	}
}

function QuitarMiembroPDD(indice){
	vValores =  StringToVector3(document.forms[0].nbMiembrosPDD.value,",");
	
	var obj = vValores.vObjeto(indice);
	
	vValores.vBorrar(indice);
	document.forms[0].nbMiembrosPDD.value=VectorToString2(vValores,",");
	//Roles
	//Rol Creador
	valores = document.forms[0].RolCreadorPDD.value;
	var creadores = StringToVector3(valores,",");
	
	var indiceAux=creadores.vIndice(obj); 	
	
	if (indiceAux!=-1){
	    creadores.vBorrar(indiceAux);
	    document.forms[0].RolCreadorPDD.value=VectorToString2(creadores,",");
	}
	//Fin Rol Creador
	//Rol editor pdd
	valores = document.forms[0].RolEditorPDD.value;
	var editores = StringToVector3(valores,",");
	
	indiceAux=editores.vIndice(obj); 	
	
	if (indiceAux!=-1){
	    editores.vBorrar(indiceAux);
	    document.forms[0].RolEditorPDD.value=VectorToString2(editores,",");
	}
	//Fin rol editor pdd
	//Rol asignante
	valores = document.forms[0].RolAsignantePDD.value;
	var asignantes = StringToVector3(valores,",");
	
	indiceAux=asignantes.vIndice(obj); 	
	
	if (indiceAux!=-1){
	    asignantes.vBorrar(indiceAux);
	    document.forms[0].RolAsignantePDD.value=VectorToString2(asignantes,",");
	}
	//Fin rol asignante
	//Rol Firmante
	valores = document.forms[0].RolFirmantePDD.value;
	var firmantes = StringToVector3(valores,",");
	
	indiceAux=firmantes.vIndice(obj); 	
	
	if (indiceAux!=-1){
	    firmantes.vBorrar(indiceAux);
	    document.forms[0].RolFirmantePDD.value=VectorToString2(firmantes,",");
	}

	//Fin rol firmante
	//Rol Publicador
	valores=document.forms[0].RolPublicadorPDD.value;
	var publicadores = StringToVector3(valores,",");
	
	indiceAux=publicadores.vIndice(obj); 	
	
	if (indiceAux!=-1){
	    publicadores.vBorrar(indiceAux);
	    document.forms[0].RolPublicadorPDD.value=VectorToString2(publicadores,",");
	}	
	
	//Fin rol publicador
	//Rol archivador
	valores=document.forms[0].RolArchivadorPDD.value;
	var archivadores = StringToVector3(valores,",");
	
	indiceAux=archivadores.vIndice(obj); 	
	
	if (indiceAux!=-1){
	    archivadores.vBorrar(indiceAux);
	    document.forms[0].RolArchivadorPDD.value=VectorToString2(archivadores,",");
	}	

	//Fin rol archivador
	//Fin roles
	cargarMiembrosPDD();
	cargarRolesPDD();
}
function cargarRolesPublicDoc(){
	cargarRolesPDD();
}