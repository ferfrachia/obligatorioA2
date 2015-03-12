var npick="";
function  cargarListaUnidadesSeleccionadasCartas(){
	var vValores =  StringToVector3(document.forms[0].NombresUnidadesCarta.value,",");
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		var edit =document.getElementById("Edicion").value;
		if (edit == 1){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarUnidadCarta("+ i+ ")\"></td>";
		}
		row+="</tr>";
		//new Insertion.Bottom("sAdministradores-List",row);
	}
	row+="</table>";
	document.getElementById("sUnidadesCarta-List").innerHTML=row;
}


function QuitarUnidadCarta(indice){
	var vValores =  StringToVector3(document.forms[0].sUnidadesCarta.value,",");
	vValores.vBorrar(indice);
	document.forms[0].sUnidadesCarta.value=VectorToString2(vValores,",");

	var vValores =  StringToVector3(document.forms[0].NombresUnidadesCarta.value,",");
	vValores.vBorrar(indice);
	document.forms[0].NombresUnidadesCarta.value=VectorToString2(vValores,",");
	cargarListaUnidadesSeleccionadasCartas();
}

function agregarUnidad( nombre, codigo){
	if (npick == 'UCartas'){

		var vValores2 =  StringToVector3(document.forms[0].sUnidadesCarta.value,",");
		if (vValores2.vIsMember($.trim(codigo))){
			alert (nombre + "  ya existe en la lista de Unidades Seleccionadas");
			return false;
		}

		document.forms[0].sUnidadesCarta.value += "," +codigo;
		document.forms[0].NombresUnidadesCarta.value +=","+ nombre ;
		cargarListaUnidadesSeleccionadasCartas();   

	}else if(npick=="UPASE"){
		var vValores3 =  StringToVector3(document.getElementById("sUnidadesPase").value,",");
		if (vValores3.vIsMember($.trim(codigo))){
			alert (nombre + "  ya existe en la lista de Unidades Seleccionadas");
			return false;
		}
		document.getElementById("sUnidadesPase").value += "," + codigo;
		document.getElementById("NombresUnidades").value += "," + nombre;
		cargarUnidadesDarPase();

	}else if(npick=="UPASE2"){
		var vValores3 =  StringToVector3(document.getElementById("sUnidadesPase2").value,",");
		if (vValores3.vIsMember($.trim(codigo))){
			alert (nombre + "  ya existe en la lista de Unidades Seleccionadas");
			return false;
		}
		document.getElementById("sUnidadesPase2").value += "," + codigo;
		document.getElementById("NombresUnidades2").value += "," + nombre;
		cargarUnidadesDarPase2();

	}else if(npick=="UPASE3"){
		var vValores3 =  StringToVector3(document.getElementById("sUnidadesInformes").value,",");
		if (vValores3.vIsMember($.trim(codigo))){
			alert (nombre + "  ya existe en la lista de Unidades Seleccionadas");
			return false;
		}
		document.getElementById("sUnidadesInformes").value += "," + codigo;
		document.getElementById("NombresUnidadesInformes").value += "," + nombre;
		cargarUnidadesDarPase3();
	}else{
		document.forms[0].sUnidadSuperiorVis.value = nombre ;
		document.forms[0].sUnidadSuperior.value = codigo ;
		//document.forms[0].sCodVisUnidad.value = codigo ;
	}
	$('#NamePickerUnidadULTRA').dialog( "close" );

}

function perteneceMiembro(miembro) {
	var vValores2 = StringToVector3(document.forms[0].nbMiembros.value,",");
	return vValores2.vIsMember($.trim(miembro));
}

function cargarUnidadesDarPase(){
	vValores =  StringToVector3(document.getElementById("NombresUnidades").value,",");
	var manejaUnidades = document.forms[0].ManejaUnidades.value == "1";
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (document.getElementById("Edicion").value == 1 && manejaUnidades){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarUnidadPase("+ i+ ")\" style='cursor:pointer'></td>";
		}else{
			row+="<td class=\"tdSeleccion\" align='right'></td>";
		}	

		row+="</tr>";

	}
	row+="</table>"

		$("#sUnidadesPase-List").html(row)
}

function QuitarUnidadPase(indice){
	var vValores =  StringToVector3(document.getElementById("NombresUnidades").value,",");
	vValores.vBorrar(indice);
	document.getElementById("NombresUnidades").value=VectorToString2(vValores,",");

	vValores =  StringToVector3(document.getElementById("sUnidadesPase").value,",");
	vValores.vBorrar(indice);
	document.getElementById("sUnidadesPase").value=VectorToString2(vValores,",");

	cargarUnidadesDarPase();
}

function cargarUnidadesDarPase2(){
	vValores =  StringToVector3(document.getElementById("NombresUnidades2").value,",");
	var manejaUnidades = document.forms[0].ManejaUnidades.value == "1";
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (document.getElementById("Edicion").value == 1 && manejaUnidades){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarUnidadPase2("+ i+ ")\" style='cursor:pointer'></td>";
		}else{
			row+="<td class=\"tdSeleccion\" align='right'></td>";
		}		

		row+="</tr>";

	}
	row+="</table>"
		$("#sUnidadesPase2-List").html(row);
}

function cargarUnidadesDarPase3(){
	vValores =  StringToVector3(document.getElementById("NombresUnidadesInformes").value,",");
	var manejaUnidades = document.forms[0].ManejaUnidades.value == "1";
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (document.getElementById("Edicion").value == 1 && manejaUnidades){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarUnidadPase3("+ i+ ")\" style='cursor:pointer'></td>";
		}else{
			row+="<td class=\"tdSeleccion\" align='right'></td>";
		}		

		row+="</tr>";

	}
	row+="</table>"
		$("#sUnidadesPase3-List").html(row);
}

function QuitarUnidadPase2(indice){
	var vValores =  StringToVector3(document.getElementById("NombresUnidades2").value,",");
	vValores.vBorrar(indice);
	document.getElementById("NombresUnidades2").value=VectorToString2(vValores,",");

	vValores =  StringToVector3(document.getElementById("sUnidadesPase2").value,",");
	vValores.vBorrar(indice);
	document.getElementById("sUnidadesPase2").value=VectorToString2(vValores,",");

	cargarUnidadesDarPase2();
}

function QuitarUnidadPase3(indice){
	var vValores =  StringToVector3(document.getElementById("NombresUnidadesInformes").value,",");
	vValores.vBorrar(indice);
	document.getElementById("NombresUnidadesInformes").value=VectorToString2(vValores,",");

	vValores =  StringToVector3(document.getElementById("sUnidadesInformes").value,",");
	vValores.vBorrar(indice);
	document.getElementById("sUnidadesInformes").value=VectorToString2(vValores,",");

	cargarUnidadesDarPase3();
}

//Agrega un integrante a la unidad como miembro publico
function agregar(datoAgregar){
	if (npick == 'U'){
		var vValores =  StringToVector3(document.forms[0].nbMiembrosPub.value,",");
		if (vValores.vIsMember(datoAgregar)){
			alert (datoAgregar + " ya existe en la lista de miembros de la Unidad");
			return false;
		}
		document.forms[0].nbMiembrosPub.value+= "," + datoAgregar;
		cargarMiembrosUnidad();
		vValores =  document.forms[0].nbMiembrosPub.value;
		vValores = vValores.split(",");
		$('#NPMU').autocomplete("option", { source: vValores });
		$('#NamePickerULTRA').dialog( "close" );
	}
	else if (npick =='MU'){
		var vValores2 =  StringToVector3(document.forms[0].nbJefeUnid.value,",");

		if (vValores2.vIsMember($.trim(datoAgregar))){
			alert (datoAgregar + " ya existe en la lista de Receptores de Notificaciones");
			return false;
		}

		document.forms[0].nbJefeUnid.value+= "," + datoAgregar;
		cargarReceptoresNotificaciones();
		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" );
	}	
	else if (npick == 'MExp'){

		var vValores2 =  StringToVector3(document.forms[0].nbMiembrosExp.value,",");

		if (vValores2.vIsMember($.trim(datoAgregar))){
			alert (datoAgregar + " ya existe en la lista de Miembros Expedientes");
			return false;
		}

		document.forms[0].nbMiembrosExp.value+= "," + datoAgregar;
		cargarMiembrosExp();
		cargarRoles();

	}
	else if (npick == 'MRes'){

		var vValores2 =  StringToVector3(document.forms[0].nbMiembrosResol.value,",");

		if (vValores2.vIsMember($.trim(datoAgregar))){
			alert (datoAgregar + " ya existe en la lista de Miembros Resoluciones");
			return false;
		}

		document.forms[0].nbMiembrosResol.value+= "," + datoAgregar;
		cargarMiembrosResol();
		cargarRolesResoluciones();
		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" );

	}
	else if (npick == 'MResSup'){

		document.forms[0].sSupervisorResol.value = $.trim(datoAgregar);
		// Si no pertenece a los miembros con acceso al modulo
		//Se agrega
		var vValores2 =  StringToVector3(document.forms[0].nbMiembrosResol.value,",");

		if (!vValores2.vIsMember($.trim(datoAgregar))){
			document.forms[0].nbMiembrosResol.value+= "," + $.trim(datoAgregar);
			cargarMiembrosResol();
			cargarRolesResoluciones();
		}


		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" );

	}	
	else if (npick =='MPublicDocs'){

		var vValores2 =  StringToVector3(document.forms[0].nbMiembrosPDD.value,",");

		if (vValores2.vIsMember($.trim(datoAgregar))){
			alert (datoAgregar + " ya existe en la lista de Miembros con Acceso");
			return false;
		}

		document.forms[0].nbMiembrosPDD.value+= "," + datoAgregar;
		cargarMiembrosPDD();
		cargarRolesPDD();
		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" );

	}

	else if (npick == 'MCartas'){

		var vValores2 =  StringToVector3(document.forms[0].nbMiembrosCartas.value,",");

		if (vValores2.vIsMember($.trim(datoAgregar))){
			alert (datoAgregar + " ya existe en la lista de Miembros con Acceso");
			return false;
		}

		document.forms[0].nbMiembrosCartas.value+= "," + datoAgregar;
		cargarMiembrosCartas();
		cargarRolesCS();
		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" );  

	}
	else if (npick == 'MContratos'){

		var vValores2 =  StringToVector3(document.forms[0].nbMiembrosContratos.value,",");

		if (vValores2.vIsMember($.trim(datoAgregar))){
			alert (datoAgregar + " ya existe en la lista de Miembros con Acceso");
			return false;
		}

		document.forms[0].nbMiembrosContratos.value+= "," + datoAgregar;
		cargarMiembrosContratos();
		cargarRolesContratos();
		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" );  

	}

//////////////////////////CAMBIO RECIENTE//////////////////////////////////////
	else if (npick == 'MPlantillas'){
		var vValores =  StringToVector3(document.forms[0].nbMiembrosPlantillas.value,",");
		if (vValores.vIsMember(datoAgregar)){
			alert (datoAgregar + " el usuario ya puede usar dicha plantilla");
			return false;
		}
		document.forms[0].nbMiembrosPlantillas.value+= "," + datoAgregar;
		cargarMiembrosPlantillas();
		vValores =  document.forms[0].nbMiembrosPlantillas.value;
		vValores = vValores.split(",");
		$('#NPMU').autocomplete("option", { source: vValores });
		$('#NamePickerULTRAMiembrosUnidad').dialog( "close" ); 
	}
}

function cargarMiembrosPlantillas(){
	var vValores =  StringToVector3(document.forms[0].nbMiembrosPlantillas.value,",");
	var manejaUnidades = document.forms[0].ManejaUnidades.value == "1";
	
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		
		row+= "<tr>";
		
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		
		if (document.getElementById("Edicion").value == 1 && manejaUnidades){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembrosPlantillas("+ i+ ")\" style='cursor:pointer'></td>";
			
		}else{
			row+="<td class=\"tdSeleccion\" align='right'></td>";
			
		}	
		row+="</tr>";
		
	}
	row+="</table>";
	
	document.getElementById("nbPlantillas-List").innerHTML=row;
}

function QuitarMiembrosPlantillas(indice){
	var vValores =  StringToVector3(document.forms[0].nbMiembrosPlantillas.value,",");
	vValores.vBorrar(indice);
	document.forms[0].nbMiembrosPlantillas.value=VectorToString2(vValores,",");
	cargarMiembrosPlantillas();
}
//////////////////////////CAMBIO RECIENTE//////////////////////////////////////


function cargarReceptoresNotificaciones(){
	vValores =  StringToVector3(document.forms[0].nbJefeUnid.value,",");
	var manejaUnidades = document.forms[0].ManejaUnidades.value == "1";
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (document.getElementById("Edicion").value == 1 && manejaUnidades){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarReceptorNotificaciones("+ i+ ")\" style='cursor:pointer'></td>";
		}else{
			row+="<td class=\"tdSeleccion\" align='right'></td>";
		}	
		row+="</tr>";
	}
	row+="</table>";
	document.getElementById("nbJefeUnid-List").innerHTML=row;
}

function cargarMiembrosUnidad(){
	var vValores =  StringToVector3(document.forms[0].nbMiembrosPub.value,",");
	var manejaUnidades = document.forms[0].ManejaUnidades.value == "1";
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if (document.getElementById("Edicion").value == 1 && manejaUnidades){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroUnidad("+ i+ ")\" style='cursor:pointer'></td>";
		}else{
			row+="<td class=\"tdSeleccion\" align='right'></td>";
		}	
		row+="</tr>";
	}
	row+="</table>";
	document.getElementById("nbMiembrosPub-List").innerHTML=row;
}

function QuitarMiembroUnidad(indice){
	var vValores =  StringToVector3(document.forms[0].nbMiembrosPub.value,",");
	var obj = vValores.vObjeto(indice);

	vValores.vBorrar(indice);
	document.forms[0].nbMiembrosPub.value=VectorToString2(vValores,",");
	vValores =  document.forms[0].nbMiembrosPub.value;
	vValores = vValores.split(",");
	$('#NPMU').autocomplete("option", { source: vValores });

	//Tengo que eliminar el integrante de todos lados

	//Elimino de receptor de notificaciones

	var valores=document.forms[0].nbJefeUnid.value;
	var resNotificaciones=StringToVector3(valores,",");

	var  indiceAux=resNotificaciones.vIndice($.trim(obj)); 	

	if (indiceAux!=-1){
		QuitarReceptorNotificaciones(indiceAux);
	}
	//Fin de eliminar de recpetor de notificaciones

	//Elimino de expedientes
	var campoModulos = document.forms[0].Modulos.value;
	var resol = campoModulos.split(";").indexOf("Expedientes");
	if(resol!=-1){
		valores=document.forms[0].nbMiembrosExp.value;
		var mExpedientes=StringToVector3(valores,",");

		indiceAux=mExpedientes.vIndice($.trim(obj)); 	

		if (indiceAux!=-1){
			QuitarMiembroExpediente(indiceAux);

		}
	}
	//Fin de eliminar de expedientes

	//Eliminar miembro en resoluciones
	var campoModulos = document.forms[0].Modulos.value;
	var resol = campoModulos.split(";").indexOf("Resoluciones");
		if(resol!=-1){

			valores=document.forms[0].nbMiembrosResol.value;
			var mResoluciones=StringToVector3(valores,",");

			indiceAux=mResoluciones.vIndice($.trim(obj)); 	
	
			if (indiceAux!=-1){
				QuitarMiembroResoluciones(indiceAux);

			}
	// Elimino al supervisor si se lo ha eliminado de los miembros con acceso
			if ($.trim(obj) == $.trim(document.forms[0].sSupervisorResol.value)){

				document.forms[0].sSupervisorResol.value="";
			} 
		}
	//Fin de eliminar miembro en resoluciones

	//Elimino en Publicación de documentos
	var campoModulos = document.forms[0].Modulos.value;
	var resol = campoModulos.split(";").indexOf("Publicación de Documentos");
	if(resol!=-1){
		valores=document.forms[0].nbMiembrosPDD.value;
		var mPDD=StringToVector3(valores,",");

		indiceAux=mPDD.vIndice($.trim(obj)); 	

		if (indiceAux!=-1){
			QuitarMiembroPDD(indiceAux);

		}
	}
	//Fin de elimino en pub documentos
	//Elimino de cartas
	valores=document.forms[0].nbMiembrosCartas.value;
	var mCartas=StringToVector3(valores,",");

	indiceAux=mCartas.vIndice($.trim(obj)); 	

	if (indiceAux!=-1){
		QuitarMiembroCartas(indiceAux);

	}

	//Fin elimino de cartas
	//Elimino de contratos
	valores=document.forms[0].nbMiembrosContratos.value;
	var mContratos=StringToVector3(valores,",");

	indiceAux=mContratos.vIndice($.trim(obj)); 	

	if (indiceAux!=-1){
		QuitarMiembroContrato(indiceAux);

	}
	//Fin elimino de contratos
	cargarMiembrosUnidad();

}

function QuitarReceptorNotificaciones(indice){
	var vValores =  StringToVector3(document.forms[0].nbJefeUnid.value,",");
	vValores.vBorrar(indice);
	document.forms[0].nbJefeUnid.value=VectorToString2(vValores,",");
	cargarReceptoresNotificaciones();
}

function selectAll(idFila){
	var row = document.getElementById(idFila);
	for(var i=0;i< row.cells.length;i++){

		var cellVal=row.cells[i];
		for (var bxs=cellVal.getElementsByTagName("input"), j=bxs.length; j--; )
			if (bxs[j].type=="checkbox"){
				bxs[j].checked = true;
			}
	}
}

//Nueva funcion para deschequear tds los roles de expediente
function unselectAll(idFila){
	var row = document.getElementById(idFila);
	for(var i=0;i< row.cells.length;i++){
		var cellVal=row.cells[i];
		for (var bxs=cellVal.getElementsByTagName("input"), j=bxs.length; j--; )
			if (bxs[j].type=="checkbox")
				bxs[j].checked = false;
	}
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

/////////////////////////////////////////////////////////////////////////////
function changecss(theClass,element,value) {
	var cssRules;

	var added = false;
	for (var S = 0; S < document.styleSheets.length; S++){
		if (document.styleSheets[S]['rules']) {
			cssRules = 'rules';
		} else if (document.styleSheets[S]['cssRules']) {
			cssRules = 'cssRules';
		} else {
			//no rules found... browser unknown
		}
		for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
			if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
				if(document.styleSheets[S][cssRules][R].style[element]){
					document.styleSheets[S][cssRules][R].style[element] = value;
					added=true;
					break;
				}
			}
		}
		if(!added){
			if(document.styleSheets[S].insertRule){
				document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
			} else if (document.styleSheets[S].addRule) {
				document.styleSheets[S].addRule(theClass,element+': '+value+';');
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////77

var tab;
var tabselect='InfoGral';
var dlg0, dlg1;

function abreSeccion(idSeccion) {
//	alert(idSeccion);
}

//Generico
var modo;
var frm;

//Funcion para el manejo de los separadores en los campos roles
function cambioSeparador(str, divOrigen, divDestino){
	var strAux="";
	var end;

	for(var  beg=0 ; beg < str.length ; beg = end+divOrigen.length)
	{
		if(-1 == (end = str.indexOf(divOrigen,beg))) end = str.length+1;
		var entry = str.substring(beg,end-1)+divDestino;
		if(entry!="")		
			strAux+=entry; 
	}
	return strAux.substring(0,strAux.length-1);
}

function DirABS(){ 
	var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)));
}

//accions del menu
//Guardar
function Salvar(nuevo){
	continuar= validar(document.forms[0].sUnidad,"No completo el campo nombre de la Unidad.");
	if (nuevo) 
		continuar=continuar && validar(document.forms[0].nbJefeUnid,"No completo el campo nombre Receptor de notificaciones.")
		else if (document.forms[0].nbMiembrosPub.value!="")
			continuar=continuar && validar(document.forms[0].nbJefeUnid,"No completo el campo nombre Receptor de notificaciones.")

			if (document.forms[0].ValidarUnidad.value!="")
				continuar=continuar && validar(document.forms[0].sCodVisUnidad,"No completo el campo código de la Unidad.");
	if (document.forms[0].sUnidadSuperior.value == document.forms[0].sUnidad.value){
		alert("La Unidad superior no puede ser igual a la unidad que Ud. esta generando.");
	}else{

		if (continuar){ 	
			var vista=document.forms[0].vistaOrigen.value;
			var cmpReturn=document.forms[0].$$Return;
			/*var unid =document.all("unid").value;
		cmpReturn.value = "[" + DirABS() + "0/" + unid + "?openDocument]";*/
			if (document.forms[0].ModExpedientes.value=="1"){
				guardarRoles()
			}	
			if (document.forms[0].Cartas.value!=""){
				guardarRolesCS();
			}
			if (document.forms[0].ModResoluciones.value=="1"){
				guardarRolesResoluciones();
			}
			if (document.forms[0].Contratos.value=="1") {
				guardarRolesContratos();
			}
			if (vista!=""){
				cmpReturn.value = "[" + DirABS() + vista +"/XPLACEUNIDX?openDocument]"; //DIEGO: PARA CUANDO EL DOCUMENTO ES NUEVO
			}else{
				cmpReturn.value = "[" + DirABS() + "/0" +"/XPLACEUNIDX?openDocument]"; //DIEGO: PARA CUANDO EL DOCUMENTO ES NUEVO
			}
			if (document.forms[0].ModPublicDocumentos.value=="1"){
				guardarRolesPDD();
			}
			document.forms[0].submit();
		}
	}
}

//Salir
function Salir(){
	url=document.forms[0].salir.value;
	url=url.substring(1,url.length-1);
	location.replace(url);
}

//Salvar y Salir
//Este boton solo se puede poner en el formulario fVisConfiguracion
//por tener la validación inclída.
function salvarysalir(nuevo){
	continuar= validar(document.forms[0].sUnidad,"No completo el campo nombre de la Unidad.");
	if (nuevo){
		continuar=continuar && validar(document.forms[0].nbJefeUnid,"No completo el campo nombre Receptor de notificaciones")
	}
	if (document.forms[0].ValidarUnidad.value!="")
		continuar=continuar && validar(document.forms[0].sCodVisUnidad,"No completo el campo código de la Unidad.");

	if (document.forms[0].sUnidadSuperior.value == document.forms[0].sUnidad.value){
		alert("La Unidad superior no puede ser igual a la unidad que Ud. esta generando.");
	}
	else{
		if (continuar) 
		{ 
			guardarRoles()
			if (document.forms[0].Cartas.value!=""){
				guardarRolesCS()
			}
			if (document.forms[0].ModResoluciones.value=="1"){
				guardarRolesResoluciones()
			}
			if (document.forms[0].Contratos.value=="1") {
				guardarRolesContratos();
			}
			if (document.forms[0].ModPublicDocumentos.value=="1"){
				guardarRolesPDD();
			}
			document.forms[0].submit();
		}
	}
}

//Editar
function Editar(){
	document.forms[0].Editar.click()
} 

function CambiarNombre(){

	//$('#dialog').dialog('open');
	$("#dialog").dialog("open");
}
function CambiarNombreJS(){

	var nombre = document.getElementById("NombreNuevo").value;
	if (trim(nombre)==""){
		alert("Debe ingresar el nuevo nombre de la Unidad");
		document.getElementById("NombreNuevo").focus();
	}else{
		window.location = DirABS()+"/ModificarNombre?OpenAgent&id="+document.getElementById("idunidad").value+"&nombre="+nombre
	}
}
//Nueva funcion para chequear tds los roles de expediente

//Dado una campo checkbox que representa la lista de las personas que tienen (checked)o no (unchecked)determinado rol,
//retorna un vector con los nombres de las personas que tienen dicho rol.
function crearVectorDeRol(checkboxRol, miembros){
	var vectorRol = new Vector(0);
	if (checkboxRol){
		if (checkboxRol.length){
			for (i=0;i<checkboxRol.length;i++){
				if (checkboxRol[i].checked && miembros.vIsMember(checkboxRol[i].value)){
					vectorRol.vAgregar(checkboxRol[i].value);
				}
			}
		}else{
			if (checkboxRol.checked && miembros.vIsMember(checkboxRol.value)){
				vectorRol.vAgregar(checkboxRol.value);
			}
		}
	}
	return vectorRol;
}

//Cargo los roles de las cartas de servicio
function cargarRolesCS(){
	var html="";
	var i;
	valores=document.forms[0].nbMiembrosCartas.value;
	var miembros=StringToVector3(valores,',')

	valores=document.forms[0].RolCreadorCS.value;
	var creadores=StringToVector3(valores,",")

	valores=document.forms[0].RolReceptorCS.value;
	var receptores=StringToVector3(valores,",")

	valores=document.forms[0].RolEditorCS.value;
	var editores=StringToVector3(valores,",")

	valores=document.forms[0].RolFirmanteCS.value;
	var firmantes=StringToVector3(valores,",")

	valores=document.forms[0].RolPaseCS.value;
	var pases=StringToVector3(valores,",");

	valores=document.forms[0].RolArchivarCS.value;
	var archivadores=StringToVector3(valores,",");

	for(i=0;i<miembros.vArray.length;i++){
		html=html+"<tr class=\"tipoletranegra\" id=\"CS" +miembros.vArray[i] + "\"><td align=\"left\" style=\"width:200\">"+miembros.vArray[i]+"</td>";
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"creadorCS",creadores,document.forms[0].ManejaRoles.value=="1");			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"receptorCS",receptores,document.forms[0].ManejaRoles.value=="1");			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"editorCS",editores,document.forms[0].ManejaRoles.value=="1");			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"firmanteCS",firmantes,document.forms[0].ManejaRoles.value=="1");			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"paseCS",pases,document.forms[0].ManejaRoles.value=="1");	
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"archivarCS",archivadores,document.forms[0].ManejaRoles.value=="1");	

		//Agregue esto
		var a = miembros.vArray[i];
		var edit =document.getElementById("Edicion").value;
		if ( edit == 1) {
			html=html +"<td align='center' style='width:60'><a href ='javascript:selectAll(\"CS" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/check.gif\"></a></td>";
			html=html +"<td align='center' style='width:80'><a href ='javascript:selectAll(\"CS" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/remove.gif\"></a></td>";
		}



		html=html+"<td>&nbsp;</td></tr>"	
	}

	html=" <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" >"+html+"</table>";
	DIV= document.getElementById("selRolesCarta");
	DIV.innerHTML=html;	
}

function guardarRolesCS(){
	var frm=document.forms[0];
	var valores=document.forms[0].nbMiembrosPub.value;
	var miembros=StringToVector3(valores,',');

	if (miembros.vLength>0){		
		var creadores = crearVectorDeRol(frm.creadorCS, miembros);
		var receptores = crearVectorDeRol(frm.receptorCS, miembros);
		var editores = crearVectorDeRol(frm.editorCS, miembros);
		var firmantes = crearVectorDeRol(frm.firmanteCS, miembros);
		var pases = crearVectorDeRol(frm.paseCS, miembros);
		var archivadores = crearVectorDeRol(frm.archivarCS, miembros);

		frm.RolCreadorCS.value= VectorToString2(creadores,",");
		frm.RolReceptorCS.value= VectorToString2(receptores,",");
		frm.RolEditorCS.value= VectorToString2(editores,",");
		frm.RolFirmanteCS.value= VectorToString2(firmantes,",");
		frm.RolPaseCS.value= VectorToString2(pases,",");
		frm.RolArchivarCS.value= VectorToString2(archivadores,","); 
	}
}

//**************************************************************************
//CONTRATOS
//Agregado MARTIN PEREYRA

//Cargo los roles de los Contratos
function cargarRolesContratos(){
	var html="";
	var i;
	valores=document.forms[0].nbMiembrosContratos.value;
	var miembros=StringToVector3(valores,',')

	valores=document.forms[0].RolCreadorCont.value;
	var creadores=StringToVector3(valores,",")

	valores=document.forms[0].RolLectorCont.value;
	var lectores=StringToVector3(valores,",")

	valores=document.forms[0].RolGerenteCont.value;
	var gerentes=StringToVector3(valores,",")

	for(i=0;i<miembros.vArray.length;i++){
		html=html+"<tr class=\"tipoletranegra\"  id=\"Contratos" +miembros.vArray[i] + "\"><td align=\"left\" style=\"width:200\">"+miembros.vArray[i]+"</td>";
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"creadorCont",creadores,"75",document.forms[0].ManejaRoles.value=="1");			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"lectorCont",lectores,"75",document.forms[0].ManejaRoles.value=="1");			
		html=html + crearCeldaHtmlDeRol(miembros.vArray[i],"gerenteCont",gerentes,"75",document.forms[0].ManejaRoles.value=="1");			

		//Agregue esto
		var a =miembros.vArray[i];
		var edit =document.getElementById("Edicion").value;
		if ( edit == 1) {
			html=html +"<td align='center' style='width:85'><a href ='javascript:selectAll(\"Contratos" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/check.gif\"></a></td>";
			html=html +"<td align='center' style='width:105'><a href ='javascript:selectAll(\"Contratos" +a + "\");' ><img  border='0'  src=\""+DirABS()+"/images/icons/remove.gif\"></a></td>";
		}


		html=html+"<td>&nbsp;</td></tr>"	
	}

	html=" <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" >"+html+"</table>";
	DIV= document.getElementById("selRolesContratos");

	DIV.innerHTML=html;	
}

//guardar Roles de Contratos
function guardarRolesContratos(){
	var frm=document.forms[0];
	var valores=document.forms[0].nbMiembrosPub.value;
	var miembros=StringToVector3(valores,',');

	if (miembros.vLength>0){		
		var creadores = crearVectorDeRol(frm.creadorCont, miembros);
		var lectores = crearVectorDeRol(frm.lectorCont, miembros);
		var gerentes = crearVectorDeRol(frm.gerenteCont, miembros);


		frm.RolCreadorCont.value= VectorToString2(creadores,",");
		frm.RolLectorCont.value= VectorToString2(lectores,",");
		frm.RolGerenteCont.value= VectorToString2(gerentes,",");
	}
}

//cargar miembros Contratos
function cargarMiembrosContratos(){
	if (document.forms[0].Contratos.value == "1"){

		vValores =  StringToVector3(document.forms[0].nbMiembrosContratos.value,",");
		var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
		for (i = 0; i < vValores.vArray.length; i++){
			row+= "<tr>";
			row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
			if (document.getElementById("Edicion").value == 1){
				row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroContrato("+ i+ ")\" style='cursor:pointer'></td>";
			}		

			row+="</tr>";

		}
		row+="</table>"
			document.getElementById("nbMiembrosContratos-List").innerHTML=row;
	}
}

function QuitarMiembroContrato(indice){

	var vValores =  StringToVector3(document.forms[0].nbMiembrosContratos.value,",");
	var obj = vValores.vObjeto(indice);
	vValores.vBorrar(indice);
	document.forms[0].nbMiembrosContratos.value=VectorToString2(vValores,",");
	//Roles contratos
	//Rol creador
	var valores=document.forms[0].RolCreadorCont.value;
	var creadores=StringToVector3(valores,",");

	indiceAux=creadores.vIndice(obj); 	

	if (indiceAux!=-1){
		creadores.vBorrar(indiceAux);
		document.forms[0].RolCreadorCont.value=VectorToString2(creadores,",");
	}
	//Fin rol creador
	//Rol leector
	valores=document.forms[0].RolLectorCont.value;
	var lectores=StringToVector3(valores,",")

	indiceAux=lectores.vIndice(obj); 	

	if (indiceAux!=-1){
		lectores.vBorrar(indiceAux);
		document.forms[0].RolLectorCont.value=VectorToString2(lectores,",");
	}
	//Fin rol leector
	//Rol gerente cont
	valores=document.forms[0].RolGerenteCont.value;
	var gerentes=StringToVector3(valores,",");


	indiceAux=gerentes.vIndice(obj); 	

	if (indiceAux!=-1){
		gerentes.vBorrar(indiceAux);
		document.forms[0].RolGerenteCont.value=VectorToString2(gerentes,",");
	}
	//Fin rol gerente cont
	//Fin roles contratos
	cargarMiembrosContratos();
	cargarRolesContratos();

}

//**************************************************************************

function cargarJefes(){
	var tbody= document.getElementById('nbJefeUnid-List')
	while(tbody.rows.length>0){
		tbody.deleteRow(tbody.rows[1])
	}
	var miembros=StringToVector3(document.forms[0].nbJefeUnid.value,',')
	for (var i=0; i<miembros.vLength;i++){
		var row = "<tr>";
		row+="<td class=\"tdSeleccion\">"+miembros.vArray[i]+"</td>";
		if (document.forms[0].sModo.value=="1"){
			row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\"images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'nbMiembrosExp','"+miembros.vArray[i]+"',true)\" style=\"cursor:hand;\"></td>";
		}else{
			row+="<td class=\"tdSeleccion\">&nbsp;</td>";
		}
		row+="</tr>";
		//new Insertion.Bottom('nbJefeUnid-List', row);
		$('#nbJefeUnid-List').append(row);
	}

}

function QuitarMiembroCartas(indice){

	var vValores =  StringToVector3(document.forms[0].nbMiembrosCartas.value,",");
	var obj = vValores.vObjeto(indice);
	vValores.vBorrar(indice);
	document.forms[0].nbMiembrosCartas.value=VectorToString2(vValores,",");

	//Roles Cartas
	//Rol creador

	valores=document.forms[0].RolCreadorCS.value;
	var creadores=StringToVector3(valores,",");

	var indiceAux=creadores.vIndice(obj); 	

	if (indiceAux!=-1){
		creadores.vBorrar(indiceAux);
		document.forms[0].RolCreadorCS.value=VectorToString2(creadores,",");
	}	
	//Fin rol creador
	//Rol Receptor
	valores=document.forms[0].RolReceptorCS.value;
	var receptores=StringToVector3(valores,",");

	indiceAux=receptores.vIndice(obj); 	

	if (indiceAux!=-1){
		receptores.vBorrar(indiceAux);
		document.forms[0].RolReceptorCS.value=VectorToString2(receptores,",");
	}	
	//Fin rol receptor
	//Rol editor
	valores=document.forms[0].RolEditorCS.value;
	var editores=StringToVector3(valores,",");

	indiceAux=editores.vIndice(obj); 	

	if (indiceAux!=-1){
		editores.vBorrar(indiceAux);
		document.forms[0].RolEditorCS.value=VectorToString2(editores,",");
	}	
	//Fin rol editor
	//Rol Firmante
	valores=document.forms[0].RolFirmanteCS.value;
	var firmantes=StringToVector3(valores,",");

	indiceAux=firmantes.vIndice(obj); 	

	if (indiceAux!=-1){
		firmantes.vBorrar(indiceAux);
		document.forms[0].RolFirmanteCS.value=VectorToString2(firmantes,",");
	}	
	//Fin rol firmante
	//Rol pase
	valores=document.forms[0].RolPaseCS.value;
	var pases=StringToVector3(valores,",");

	indiceAux=pases.vIndice(obj); 	

	if (indiceAux!=-1){
		pases.vBorrar(indiceAux);
		document.forms[0].RolPaseCS.value=VectorToString2(pases,",");
	}	
	//Fin rol pase
	//Rol Archivar
	valores=document.forms[0].RolArchivarCS.value;
	var archivadores=StringToVector3(valores,",");

	indiceAux=archivadores.vIndice(obj); 	

	if (indiceAux!=-1){
		archivadores.vBorrar(indiceAux);
		document.forms[0].RolArchivarCS.value=VectorToString2(archivadores,",");
	}	
	//Fin rol archivar
	//Fin roles cartas
	cargarMiembrosCartas();
	cargarRolesCS();	
}

function cargarMiembrosCartas(){
	if (document.forms[0].Cartas.value){
		vValores =  StringToVector3(document.forms[0].nbMiembrosCartas.value,",");
		var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	
		for (i = 0; i < vValores.vArray.length; i++){
			row+= "<tr>";
			row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
			if (document.getElementById("Edicion").value == 1){
				row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarMiembroCartas("+ i+ ")\" style='cursor:pointer'></td>";
			}		
			row+="</tr>";
		}
		row+="</table>";
		document.getElementById("nbMiembrosCartas-List").innerHTML=row;		
	}
}

//***********************************************************************************************
//CONTRATOS
//Agregado MARTIN PEREYRA


//***********************************************************************************************

function ActualizarMiembros(){
	var miembrosUnidad = StringToVector3(document.forms[0].nbMiembrosPub.value,",")
	var miembrosCartas = StringToVector3(document.forms[0].nbMiembrosCartas.value,",")
	var miembrosExp =StringToVector3(document.forms[0].nbMiembrosExp.value,",")
	var miembrosResol = StringToVector3(document.forms[0].nbMiembrosResol.value,",")
	var jefes = StringToVector3(document.forms[0].nbJefeUnid.value,",")

	var borrar = new Vector(0)
	for (var i=0;i<miembrosCartas.vLength;i++){
		if (!miembrosUnidad.vIsMember(miembrosCartas.vArray[i])){
			borrar.vAgregar(i)
		}
	}
	for (i=0;i<borrar.vLength;i++){
		miembrosCartas.vBorrar(borrar.vArray[i])
	}
	document.forms[0].nbMiembrosCartas.value=VectorToString2(miembrosCartas,",")

	borrar = new Vector(0)

	for (i=0;i<miembrosExp.vLength;i++){
		if (!miembrosUnidad.vIsMember(miembrosExp.vArray[i])){
			borrar.vAgregar(i)
		}
	}
	for (i=0;i<borrar.vLength;i++){
		miembrosExp.vBorrar(borrar.vArray[i])
	}

	document.forms[0].nbMiembrosExp.value=VectorToString2(miembrosExp,",")

	borrar = new Vector(0)

	for (i=0;i<miembrosResol.vLength;i++){
		if (!miembrosUnidad.vIsMember(miembrosResol.vArray[i])){
			borrar.vAgregar(i)
		}
	}
	for (i=0;i<borrar.vLength;i++){
		miembrosResol.vBorrar(borrar.vArray[i])
	}
	document.forms[0].nbMiembrosResol.value=VectorToString2(miembrosResol,",")

	borrar = new Vector(0)

	for (var i=0;i<jefes.vLength;i++){
		if (!miembrosUnidad.vIsMember(jefes.vArray[i])){
			borrar.vAgregar(i)
		}
	}
	for (i=0;i<borrar.vLength;i++){
		jefes.vBorrar(borrar.vArray[i])
	}
	document.forms[0].nbJefeUnid.value=VectorToString2(jefes,",")

	cargarMiembrosResol();
	cargarRolesResoluciones();
	cargarMiembrosExp();
	cargarRoles();
	cargarMiembrosCartas();
	cargoRolesCS();
	supervisor = document.forms[0].sSupervisorResol.value
	if(!miembrosUnidad.vIsMember(supervisor)){
		document.forms[0].sSupervisorResol.value=""
			document.forms[0].sSupervisorResolBorrado.value=supervisor
	}
	cargarJefes();
	cargarRolesPDD();
}

function showIFrame(){
	var DivRef = document.getElementById('caja');
	var IfrRef = document.getElementById('DivShim');
	IfrRef.style.width = DivRef.offsetWidth;
	IfrRef.style.height = DivRef.offsetHeight;
	IfrRef.style.top =  DivRef.style.top;
	IfrRef.style.left = DivRef.style.left;
	IfrRef.style.zIndex = 200;
	IfrRef.style.display = "block";
} 

function crearCeldaHtmlDeRol(nombrePersona,rol,vectorPermisos,ancho,manejaRoles){
	if (ancho=="" || typeof(ancho)=="undefined"){
		ancho="50"
	}
	//alert(ancho);
	var html = "<td align=\"center\" style=\"width:" + ancho + "\"><input type=\"checkbox\" name=\"" +rol+ "\" value=\""+nombrePersona+"\" title=\"" +rol +": " + nombrePersona+ "\"";	
	if (vectorPermisos.vIsMember(nombrePersona)){
		html=html+"checked";
	}
	if (document.forms[0].sModo.value=="0" || !manejaRoles){
		html=html+" disabled=\"true\" ";
	}
	html=html+"></td>";
	return html;
}

function NombreComun (strName){
	return strName.substring(0,strName.indexOf("/"))
}