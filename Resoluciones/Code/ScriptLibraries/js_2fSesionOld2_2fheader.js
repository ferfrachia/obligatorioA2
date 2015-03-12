var frm;


function DirABS(){ 
var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}


function agregarMiembroBoton(datoAgregar){
	
	//if (npick=="VOTANTES"){
		var vValores =  StringToVector3(document.forms[0].sVotantes.value,",");
		datoAgregar = datoAgregar.split("/")[0];
		if (vValores.vIsMember(datoAgregar)){
			 alert (datoAgregar + " ya existe en la lista de votantes");
			 return false;
		}
		
		document.forms[0].sVotantes.value+= "," + datoAgregar;
		cargarVotantes();
	//}
}
function cargarVotantes(){
var vValores =  StringToVector3(document.getElementById("sVotantes").value,",");
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	

	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		if(document.forms[0].sModo.value=="1" & document.forms[0].ccEstado.value=="En Desarrollo"){
			row+="<td class=\"tdSeleccion\" align='right'><img alt=\"Remover de Votantes\" src=\""+ DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarVotantes("+ i+ ")\"></td>";	
		}		
		row+="</tr>";

		//new Insertion.Bottom("sAdministradores-List",row);
	}
	row+="</table>"
	//alert(document.getElementById("sVotantes-List"));
	document.getElementById("sVotantes-List").innerHTML=row;
}
function QuitarVotantes(indice){
	var vValores =  StringToVector3(document.forms[0].sVotantes.value,",");
	vValores.vBorrar(indice)
	document.forms[0].sVotantes.value=VectorToString2(vValores,",");
	cargarVotantes();

}

function cambiarTipo(uid){

		$('#dialog-confirm').dialog('open');


}
//Validacion de campos
function ValidarCampos()
{
	if (!validar(frm.fSesion,"Debe ingresar la Fecha"))
		return false;
	if (!tieneHoraInicio())
		return false;
	if(!validarHoras("hInicio", "inicio"))
		return false;
	if(!validarHoras("hFin", "finalización"))
		return false;
	return true;
}

function tieneHoraInicio(){
	if(document.getElementById("hInicio").value==""){
		alert("Debe ingresar la hora de inicio de "+document.getElementsByName('sPreSesion')[0].value+" "+document.getElementsByName('sSes')[0].value);
		return false;
	}else{
		return true;
	}
}

function validarHoras(idCampo, string) {
	//string es "inicio" o "finalizacion"
	campo = document.getElementById(idCampo);
	horario = campo.value;
	if(horario=="")
		return true;
	hora = horario.substring(0,2);
	minuto = horario.substring(3,5);
	horaInt = parseInt(hora,10);
	minutoInt = parseInt(minuto,10);
	if(horaInt == "NaN" || minutoInt == "NaN" ||
	   minutoInt < 0 || minutoInt > 59 || horaInt < 0 || horaInt > 23) {
		alert("La hora de "+string+" es incorrecta");
		campo.focus();
		return false;
	}
	return true;
}


function Salir(id,accion){
	//window.location.href = 'http://'+document.forms[0].cvRetorno.value;
	var pathDB = DirABS();
	if (document.forms[0].sModo.value == "1") //está en edicion
	{
		if (confirm('¿Desea guardar el documento antes de salir?'))
		{
			if (ValidarCampos()) 
			{ 
				OcultarMenu();		
				if (document.forms[0].cvDocNuevo.value == 1)
				{
					document.forms[0].sAccion.value = "acc_crear_sesion";

				}
				else  //no tengo que llamar niguna acción
				{
				document.forms[0].sAccion.value = "acc_abrir_sesion";
				}
					
					var accion = document.forms[0].sAccion.value;
					var frame= document.forms[0].cvRetorno.value;
					document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",frameorigen="+frame+",vistaorigen=VSesiones"+",usr="+document.forms[0].sUsuario.value+"]"
					document.forms[0].submit();				
				}
		}
		else
		{
		OcultarMenu();
		window.location.href = pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FSesion,accion='+accion;
		}
	}
	else
	{
	OcultarMenu();
	window.location.href = pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FSesion,accion='+accion;
	}
}
// Nuevo salir para cuando la sesion ni se guardo y el usuario desea salir
function SalirSinGuardar(){
		
		var pathDB = DirABS();

		window.location.href = pathDB+ "/inicio?OpenFrameset"

}
function SalirInicio(id,accion){

	//window.location.href = 'http://'+document.forms[0].cvRetorno.value;
	var pathDB = DirABS();
	if (document.forms[0].sModo.value == "1") //está en edicion
	{
		if (confirm('¿Desea guardar el documento antes de salir?'))
		{
			if (ValidarCampos()) 
			{ 
				OcultarMenu();		
				if (document.forms[0].cvDocNuevo.value == 1)
				{
					document.forms[0].sAccion.value = "acc_crear_sesion";
				}
				else  //no tengo que llamar niguna acción
				{
					document.forms[0].sAccion.value = "acc_abrir_sesion";
				}
				
				

				var accion = document.forms[0].sAccion.value;
				var frame= document.forms[0].cvRetorno.value;
				document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",frameorigen="+frame+",vistaorigen=VSesiones"+",usr="+document.forms[0].sUsuario.value+"]"
				document.forms[0].submit();				
			}
		}
		else
		{
			OcultarMenu();
			if (document.forms[0].cvRetorno.value != ""){
			
				window.location.href =document.forms[0].Protocolo.value+'://'+document.forms[0].cvRetorno.value;
			}else{
			
				window.location.href =pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FSesion,accion='+accion;
			}
		}
	}
	else
	{
		OcultarMenu();
		//	if (document.forms[0].cvRetorno.value != ""){
		//	window.location.href =document.forms[0].Protocolo.value+'://'+document.forms[0].cvRetorno.value;
		//	}else{
			window.location.href =pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FSesion,accion='+accion;
		//	}	
	}
}			

function GenerarActa(id){
	var accion = "acc_generarActa";
	//GENERAR ACTA!
	if (confirm("Al generar el acta se borrarán las firmas existentes de la misma. ¿Esta seguro que desea continuar con la operación 'Generar acta'?")){
		window.location.href = DirABS()+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",usr="+document.forms[0].sUsuario.value
	}
	
}

function FirmarPasaraFinalizar(id){
	//OcultarMenu();
	//var pathDB = DirABS();
	//window.location.href = pathDB+"/ParametrosEnviaraFinalizar?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value;
	$("#DialogoFirmaEnviarFin").dialog("open");
}

function Salvar(id){
	var pathDB = DirABS();
	if (ValidarCampos()) 
	{ 		
		OcultarMenu();
		//if (document.forms[0].cvDocNuevo.value == 1)
		if(document.getElementById("cvDocNuevo").value==1)
		{
			document.forms[0].sAccion.value = "acc_crear_sesion";
		}
		else  //no tengo que llamar niguna acción
		{
			document.forms[0].sAccion.value = "acc_abrir_sesion";
		}

			var accion = document.forms[0].sAccion.value;
			var frame= document.forms[0].cvRetorno.value;
			//document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",frameorigen="+frame+",vistaorigen=VSesiones"+",usr="+document.forms[0].sUsuario.value+"]"
			document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value+"]"
			document.forms[0].SalvarFormulas.click();
	}
}

function OcultarMenu(){
	document.getElementById('barraMenu').style.display = "none";
}

function abrirAnexo(){
	if (anexoSeleccionado=="")
		alert('Debe seleccionar un anexo');
	else{
		window.open(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+location.pathname+"/$file/"+anexoSeleccionado);
	}
}



function borrarAnexo(){

	if (anexoSeleccionado=="")
		alert('Debe seleccionar un anexo');
	else{
	var a = new Array();
	a = myData;
	a.splice(num, 1);
	cant -=1;
	
for (var i=0;i< document.all("%%Detach").length;i++){
	if (document.all("%%Detach")[i].value==anexoSeleccionado){
		document.all("%%Detach")[i].checked = true;	
	}							
}
	
var g = new OS3Grid ();
g.set_headers ('Nombre de archivo', 'Tamaño', 'Fecha de anexado');
var i = 0;

if(cant == 0){

try{

document.all("%%Detach").checked = true;	

}catch(e){

for (var i=0;i< document.all("%%Detach").length;i++){
		
if (document.all("%%Detach")[i].value==anexoSeleccionado){
		document.all("%%Detach")[i].checked = true;	
	}							
}
}	
var div = document.getElementById('a');
var p = document.getElementById('p');
p.innerHTML= "Archivos Anexados" + " " + "(" + cant +")";
var abrir = document.getElementById('abrir');
abrir.style.display="none";
var cerrar = document.getElementById('cerrar');
cerrar.style.display="none";
div.style.display = "none";
}else{
for(i=0; i< cant ; i++){
g.add_row (a[i][0], a[i][1], a[i][2]);}
g.set_cell_click ( cell_clicked );
g.set_highlight ( true );
g.render ( 'a' );
var p = document.getElementById('p');
p.innerHTML= "Archivos Anexados" + " " + "(" + cant +")";
}	
}
}

function abrirDoc(nro,univid){
	var pathname=location.pathname; 
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/SesionMobileOrden?readform&sesion='+nro+"&ID="+univid
}

function Editar(id){
	// Edito el doc
	OcultarMenu();
	var pathDB = DirABS();
	var dir;
	var accion = "acc_editar_sesion"
	dir=document.forms[0].Protocolo.value+'://'+window.location.hostname+":"+document.forms[0].Puerto.value;
	window.location=pathDB + "/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value
}

function Renumerar(id){
	OcultarMenu();
	var pathDB = DirABS();
	var nrosesion = document.forms[0].sNroSesion.value;
	window.location.href = pathDB+'/ParametrosModNroNuevo?Openform&ID='+id+",NroSesion="+nrosesion+',frameorigen='+document.forms[0].cvRetorno.value+',vistaorigen=FBandejaPendientes';
}

function PasaraDesarrollo(id){
	OcultarMenu();
	var pathDB = DirABS();
	accion = "acc_pasar_a_desarrollo";
	window.location.href = pathDB+"/(ControllerResoluciones)?OpenAgent&Id="+ id + ",accion=" + accion +",usr="+document.forms[0].sUsuario.value;
}

function PasaraEjecucion(id){
	OcultarMenu();
	var pathDB = DirABS();
	accion = "acc_pasar_a_ejecucion";
	window.location.href = pathDB+"/(ControllerResoluciones)?OpenAgent&Id="+ id + ",accion=" + accion +",usr="+document.forms[0].sUsuario.value;
}

function AprobarEnBloque(id){
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+"/ParametrosAprobarBloque?OpenForm&nrosesion="+document.forms[0].sNroSesion.value+"&id="+id;
}

function MoverAsuntos(id){
	var pathDB = DirABS();
	window.location.href = pathDB+"/ParametrosMoverAsuntos?OpenForm&nrosesion="+document.forms[0].sNroSesion.value+"&id="+id;
}

function PasaraFinalizar(id){
if (document.forms[0].ActaRequeridaEFinalizar.value=="Si"){
		if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
		return;
		}
	}
if (confirm("¿Esta seguro que desea continuar con la operación enviar a Finalizar?")){
	OcultarMenu();
	accion = "acc_enviar_a_finalizar";
	window.location.href = DirABS()+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",usr="+document.forms[0].sUsuario.value
}
}

function Firmar(id){
	if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
	}
	else {
		$("#DialogoFirmaSesion").dialog("open");
		//OcultarMenu();
		//var pathDB = DirABS();
		//window.location.href = pathDB+"/ParametrosFirmaSesion?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value;
	}
}

function validarFirmas(usuarios,Firmantes,Fechas,Titulos){
for (var i =0;i<usuarios.vLength;i++){
		usuario = usuarios.vArray[i];
		txtFecha= Fechas.vArray[i];
		titulo = Titulos[i];
		if (Firmantes.vIsMember(usuarios.vArray[i])){
		 	// Aca tenemo que imprimir la firma
			if(titulo!=undefined){
				document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por '+titulo+ ' ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
			}else{
				document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por '+usuario+ ' el  ' + txtFecha + '. </td></tr>');
			}	
		} else{
			// No se pudo validar la firma del creador
			if(titulo!=undefined){
				document.write('<tr> <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+titulo+ ' '+usuario+' . Consulte con el Administrador del sistema. </td></tr>');
			}else{
				document.write('<tr> <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+usuario+' . Consulte con el Administrador del sistema. </td></tr>');
			}
		}
	}
}
function FirmaryFinalizarSesion(id){
	if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
	}
	else {
		OcultarMenu();
		//$("#DialogoFirmaFinalizar").dialog("open");
		var pathDB = DirABS();
		window.location.href = pathDB+"/ParametrosFirmaFinalizarSes?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value+",urlorigen="+document.forms[0].cvRetorno.value;
	}
}

function FinalizarSesion(id){
	if (document.forms[0].PtosEnSesion.value!="0"){
		alert("No es posible Finalizar dado que hay Asuntos pendientes");
	}else{
		if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
				alert('Debe ingresar el Acta de la sesión');
		}else{
			OcultarMenu();
			var pathDB = DirABS();
			window.location.href = pathDB+"/FParametrosFinalizarSes?Openform&ID="+id+",urlorigen="+document.forms[0].cvRetorno.value+",nroSesion="+document.forms[0].sNroSesion.value;
		}
	}
}

function PasaraFinalizar(id){
	if (document.forms[0].ActaRequeridaEFinalizar.value=="Si"){
		if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
		return;
		}
	}
	if (confirm("¿Esta seguro que desea continuar con la operación enviar a Finalizar?")){
		OcultarMenu();
		accion = "acc_enviar_a_finalizar";
		window.location.href = DirABS()+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",usr="+document.forms[0].sUsuario.value
	}
}

function FirmaryFinalizarSesion(id){
	if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
	}
	else {
		//$("#DialogoFirmaFinalizar").dialog("open");
		OcultarMenu();
		var pathDB = DirABS();
		window.location.href = pathDB+"/ParametrosFirmaFinalizarSes?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value+",urlorigen="+document.forms[0].cvRetorno.value;
	}
}

function Imprimir(id){
	var pathDB = DirABS();
	window.open(pathDB+'/FSesionImp?OpenForm&ID='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');

}	

function ImprimirOrden(id){
	var pathDB = DirABS();
	//window.open(pathDB+'/FPrint?OpenForm&ID='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
	window.open(pathDB+'xsp_impOrdenDia.xsp?action=openDocument&documentId='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
}

function ImprimirActa(id){
	var pathDB = DirABS();
	if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
	}
	else {
		enPdf = document.getElementById("sActaEnPdf").value == "Si";
		
		if(enPdf){
			window.open(pathDB + 'ImpActaPDF?openagent&uniddoc='+id,'PDFActa','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		}else{
//			window.open(pathDB+'xsp_ImpActa.xsp?action=openDocument&documentId='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
			window.open(pathDB+'/ImpresionActa?OpenForm&id='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		}
		//window.open(pathDB+'/ImpresionActa?OpenForm&id='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		//alert(pathDB+'ImpActaPDF?OpenAgent&uniddoc='+id,'PDF Acta'+'menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550'); //("http://desarrollo2.isaltda.com.uy/desaRROLLO/reSOLUCIONES.NSF/ImpActaPDF?openagent&uniddoc=1DF2EC42362F766583257BCD005E1D28"); 
		//window.open(pathDB + 'ImpActaPDF?openagent&uniddoc='+id,'PDFActa','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		//window.open(pathDB+'xsp_ImpActa.xsp?action=openDocument&documentId='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
	}
}
function ImprimirResoluciones(id){
	var pathDB = DirABS();
	window.open(pathDB+'/ImpresionResoluciones?OpenForm&ID='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
}
function NumerarResoluciones(id){
if (confirm("¿Esta seguro que desea continuar con la operación Numerar Resoluciones?")){
		OcultarMenu();
		accion = "acc_numerar_resol";
		window.location.href = DirABS()+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",usr="+document.forms[0].sUsuario.value
	}
}
function NumerarResolucionesEnBloque(id){

	if (confirm("¿Esta seguro que desea continuar con la operación Numerar Resoluciones en Bloque?")){
		
		OcultarMenu();
		var pathDB = DirABS();
		window.location.href = pathDB+"/ParametrosNumerarBloque?OpenForm&nrosesion="+document.forms[0].sNroSesion.value+"&id="+id;
	
	}

}
function PantallaAnterior(){

history.go(-1);

}

function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = document.forms[0].cvRetorno.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'?Opendocument&urlorigen='+urlorigen
}
/*function salirPublico(){

var pathDB = DirABS();
window.location.href = pathDB+'/Publico';

}*/

function ocultarApplet(subform){
	if (subform=="AccFirmarEnviarFinApplet"){
		//document.forms['dojoFirmaApplet'].style.display="none";		
		$( "#DialogoFirmaEnviarFin" ).dialog("close");
		document.applets["appletFirmaEnviarFin"].style.display="none";
		document.getElementById("textoConfirmarFirmaEnviarFin").style.display="block";
	}
	if (subform=="AccFirmarFinalizarApplet"){
		//document.forms['dojoFirmaApplet'].style.display="none";		
		$( "#DialogoFirmaFinalizar" ).dialog("close");
		document.applets["appletFirmaFinalizar"].style.display="none";
		document.getElementById("textoConfirmarFirmaFinalizar").style.display="block";
	}
	if (subform=="AccFirmarSesionApplet"){
		//document.forms['dojoFirmaApplet'].style.display="none";		
		$( "#DialogoFirmaSesion" ).dialog("close");
		document.applets["appletFirmaSesion"].style.display="none";
		document.getElementById("textoConfirmarFirmaSesion").style.display="block";
	}
}
function abrirAdjunto(archivo,unid){
	window.open(DirABS()+"/0/"+unid+"/$FILE/"+archivo);
}

function appletFirmarJava(valor,subform){
	if (subform=="AccFirmarEnviarFinApplet"){
		document.forms['dialogFirmaEnviarFinApplet'].sFirma.value=valor;
		if (document.forms['dialogFirmaEnviarFinApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dialogFirmaEnviarFinApplet'].submit();
		}
	}
	if (subform=="AccFirmarFinalizarApplet"){
		document.forms['dialogFirmaFinalizarApplet'].sFirma.value=valor;
		if (document.forms['dialogFirmaFinalizarApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dialogFirmaFinalizarApplet'].submit();
		}
	}
	if (subform=="AccFirmarSesionApplet"){
		document.forms['dialogFirmaSesionApplet'].sFirma.value=valor;
		if (document.forms['dialogFirmaSesionApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dialogFirmaSesionApplet'].submit();
		}
	}
}

/**
 * @author Ismael Olivet
 **/
function insertarImagen(nombreCampo, unid){
	/*
	 * obtengo Dir del servidor  y le agrego el formulario de carga de la imagen le agrego
	 * los parametros de la llamada correspondientes al nombre del campo y
	 * universal Id docserver y docbase. obtengo el patametro location y la paso
	 * como param tambien para volver a la pagina
	 * 
	 */ 
     var serverBase = document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+ document.getElementById("pathPortalNew").value;
	var url = serverBase + "/CargaImg?OpenForm&id="+unid
		+"&campo="+nombreCampo
			+"&docserver="+document.getElementById('sServerNew').value
				+"&docbase="+document.getElementById("sBaseNew").value
					+"&tipoDoc=asunto&pathBack="+location;	
	document.getElementById("pathimagenes").value = url;

	document.getElementById("imagen").value = "[" + url + "]";
	document.getElementById("banderaImagen").value = "si";
	
	document.forms[0].SalvarFormulas.click();
	}


//Funciones para GridVistasSesion -***********************************************************************************

var grid;
var filtro;

//Función que inicializa la bandeja de sesiones
function cargar(){
	if(document.getElementById("sEstado").value=="En Desarrollo" & document.getElementById("editMode").value=="1") return;
	actualizarAltos();


	var frm = document.forms[0];
	if(grid != null){

//		grid.destructor();
	}

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	if ((document.getElementById("vista").value =="PtosPorSesion2New")) {
		document.getElementById('VistaPtosPorSesion2New').style.overflow = "hidden";
		document.getElementById('VistaPtosPorSesion2New').style.width = "0";
		document.getElementById('VistaPtosPorSesion2New').style.heigth = "0";
	}
	else if ((document.getElementById("vista").value =="ResPorSesionNew") ){
		document.getElementById('ResPorSesionNew').style.overflow = "hidden";
		document.getElementById('ResPorSesionNew').style.width = "0";
		document.getElementById('ResPorSesionNew').style.heigth = "0";	
	
	}
	var path = DirABS();
	var strXml="";

	if (document.getElementById("vista").value =="PtosPorSesion2New") {
	
		strXml = DirABS()+"/PtosPorSesion2New?OpenView&count=5000&RestrictToCategory="+document.getElementById("nroSesion").value;
		var mygrid = new dhtmlXGridObject('VistaPtosPorSesion2New');
		mygrid.attachEvent("onXLE", cargarCantidadDocs);
		mygrid.setImagePath("/codebase/imgs/");
		mygrid.setHeader("Nº Asunto,Tema,Referencia,Estado,,",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
		mygrid.setInitWidths("80,180,*,90,60,60");
		mygrid.setColTypes("ro,ro,ro,ro,ro,ro");
		mygrid.setColAlign("left,left,left,left,left,left");
	
		mygrid.setSkin("light");
		mygrid.enableAlterCss("even", "uneven");
		mygrid.enableRowsHover(true,'grid_hover');
		grid = mygrid;
		mygrid.setColSorting("int,str,str,str,str,str");
		//mygrid.setColSorting("str,str,str");
		//mygrid.enableAutoHeight(true);
		mygrid.enableSmartRendering(true,20);
		mygrid.enableAutoWidth(true);
		
		mygrid.init();
		mygrid.loadXML(strXml);
		
		
		mygrid.attachEvent("onMouseOver",function(row,coll){
  			
			 if (coll == 5){
			  var cellObj = mygrid.cells(row,coll);
			  
  			   if (cellObj.getValue() ==""){
  			 
  			   			cellObj.setValue("<span title='Sin Adjunto'></span>");
  			   }
  			  }
		});	
		filtro = 0;
		
		document.getElementById("fil0").src = document.getElementById("title_filtro").value;
		mygrid.attachEvent("onRowSelect", rowSelection);
		document.getElementById('VistaPtosPorSesion2New').style.overflow = "hidden";
		document.getElementById('VistaPtosPorSesion2New').style.width = "100%";
		document.getElementById('VistaPtosPorSesion2New').style.heigth = "100%";	
		
		if(navigator.appName == "Netscape")
			document.getElementById('CabezalVistaPtosPorSesion2NewWrap').style.width = calcularAncho() - 48+"px";
		else {
			document.getElementById('CabezalVistaPtosPorSesion2NewWrap').style.width = calcularAncho() - 50 +"px";
    
   		 }
   		
	}
	else if (document.getElementById("vista").value =="ResPorSesionNew"  ){
	
		frm = document.forms[0];
		var usuario = frm.sUsuario.value.toLowerCase();

		if (usuario == "anonymous"){
			strXml = DirABS()+"/ResPorSesionPublicoNew?OpenView&count=5000&RestrictToCategory="+document.getElementById("nroSesion").value;
		} else {
			strXml = DirABS()+"/ResPorSesionNew?OpenView&count=5000&RestrictToCategory="+document.getElementById("nroSesion").value;
		}
		var mygrid = new dhtmlXGridObject('ResPorSesionNew');
		mygrid.attachEvent("onXLE", cargarCantidadDocs);
		mygrid.setImagePath("/codebase/imgs/");
		mygrid.setHeader("Nº Res,Nº Asunto,Tema,Referencia,Estado,,",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
		mygrid.setInitWidths("100,80,180,*,90,60,60");
		mygrid.setColTypes("ro,ro,ro,ro,ro,ro,ro");
		mygrid.setColAlign("left,left,left,left,left,left,left");
	
		mygrid.setSkin("light");
		mygrid.enableAlterCss("even", "uneven");
		mygrid.enableRowsHover(true,'grid_hover');
		grid = mygrid;
		mygrid.setColSorting("str,int,str,str,str,str,str");
		//mygrid.setColSorting("str,str,str");
		//mygrid.enableAutoHeight(true);
		mygrid.enableSmartRendering(true,20);
		mygrid.enableAutoWidth(true);
		mygrid.init();
		mygrid.loadXML(strXml);
		mygrid.attachEvent("onMouseOver",function(row,coll){
  			  if (coll == 6){
			  var cellObj = mygrid.cells(row,coll);
  			   if (cellObj.getValue() ==""){
  			 
  			   			cellObj.setValue("<span title='Sin Adjunto'></span>");
  			   }
  			  }
		});
		
		filtro = 0;
		document.getElementById("fil0").src = document.getElementById("title_filtro").value;
		mygrid.attachEvent("onRowSelect", rowSelection);
		document.getElementById('ResPorSesionNew').style.overflow = "hidden";
		document.getElementById('ResPorSesionNew').style.width = "100%";
		document.getElementById('ResPorSesionNew').style.heigth = "100%";

		if(navigator.appName == "Netscape")
				document.getElementById('CabezalResPorSesionNewWrap').style.width = calcularAncho() - 48+"px";
		else {
				document.getElementById('CabezalResPorSesionNewWrap').style.width = calcularAncho() - 50 +"px";
    
   		 }


	}

	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	
	resize();
}

function mifunk(){
	
	$(".menuComentario" ).button({text: false,icons: {primary: "ui-icon-comment"}});
}

function resize()
{
if(document.getElementById("editMode").value=="1" & document.getElementById("sEstado").value!="En Desarrollo") {

   		if (document.getElementById("vista").value =="PtosPorSesion2New" ) {	
		
		
			document.getElementById('VistaPtosPorSesion2New').style.height = "100%";
			if(grid != null){
				grid.setSizes();
			}
			document.getElementById('VistaPtosPorSesion2New').style.width = "100%";
		
		}
		else if (document.getElementById("vista").value =="ResPorSesionNew" ) {	
		
			document.getElementById("ResPorSesionNew").style.height = "100%";
			if(grid != null){
				grid.setSizes();
			}
			document.getElementById("ResPorSesionNew").style.width = "100%";	


		}
		actualizarAltos();

		if (document.getElementById("vista").value =="PtosPorSesion2New" ) {		
				
			if(navigator.appName == "Netscape")
				document.getElementById('CabezalVistaPtosPorSesion2NewWrap').style.width = calcularAncho() - 48 +"px";

  	  		else {
				document.getElementById('CabezalVistaPtosPorSesion2NewWrap').style.width = calcularAncho() - 50 +"px";
    
    			}
	    	}
 	   	else if (document.getElementById("vista").value =="ResPorSesionNew" ){
    		
			if(navigator.appName == "Netscape")
				document.getElementById('CabezalResPorSesionNewWrap').style.width = calcularAncho() - 48 +"px";

  	  		else {
				document.getElementById('CabezalResPorSesionNewWrap').style.width = calcularAncho() - 50 +"px";
    
    			}
    	
  	  	}
    	}
	//Este else lo agergue porque el complemento de skype impedia que la bandeja se autoajustara al ancho de la ventana. En el caso que sea necesario descomentar.
	//else
	//	document.getElementById('CabezalBandejaResolucionesWrap').style.width = calcularAncho() - 20 +"px";
}

//Función encargada de calcular el alto de la ventana
function calcularAlto() {
	myHeight = 0;
	if( typeof( window.innerHeight ) == 'number' ) {
		//Non-IE
    		myHeight = window.innerHeight;
  	} else if( document.documentElement && document.documentElement.clientHeight ) {
    		//IE 6+ in 'standards compliant mode'
    		myHeight = document.documentElement.clientHeight;
  	} else if( document.body && document.body.clientHeight ) {
    		//IE 4 compatible
    		myHeight = document.body.clientHeight;
  	}
  	return myHeight;
}

//Función encargada de calcular el ancho de la ventana
function calcularAncho() {
	myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
    		myWidth = window.innerWidth;
  	} else if( document.documentElement && document.documentElement.clientWidth ) {
    		//IE 6+ in 'standards compliant mode'
    		myWidth = document.documentElement.clientWidth;
  	} else if( document.body && document.body.clientWidth ) {
    		//IE 4 compatible
    		myWidth = document.body.clientWidth;
  	}
  	return myWidth;
}

function actualizarAltos(){
	if(document.getElementById("editMode").value=="1" & document.getElementById("sEstado").value!="En Desarrollo") {
		var altoVentana = calcularAlto();
		//alert(altoVentana);
		ALTO = altoVentana - 30;
		ALTO_MAXIMIZADA = ALTO - 230;
		if(ALTO_MAXIMIZADA<0)
			ALTO_MAXIMIZADA = 0;
		
		if ((document.getElementById("vista").value =="PtosPorSesion2New") ){	
					
			document.getElementById('CabezalVistaPtosPorSesion2NewWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
					
		}
		else if ((document.getElementById("vista").value =="ResPorSesionNew")  )	
				    document.getElementById('CabezalResPorSesionNewWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
		}
}

//Función que desplega el menú a la hora de clickear una fila
function rowSelection(idTabla){
	var e = window.event;
	var tabla = this;
	if(tabla!= null){
		var ind = tabla.getSelectedCellIndex();
		if (((ind != 4 && ind != 5) &&(document.getElementById("vista").value =="PtosPorSesion2New")) ||
((ind != 5 && ind != 6) &&(document.getElementById("vista").value =="ResPorSesionNew"))
){
			//Verifico que la fila seleccionada no sea la primera, en ese caso no se desplega menú porque allí estan las imágenes
			var selectedId=tabla.getSelectedRowId();
			var unid =  tabla.getUserData(selectedId, "id");
			abrirDoc(unid);
		}		    	
	}
}

//Función que muestra y oculta los filtros
function mostrarFiltro(i){
	//Seteo el estilo de los filtros
	var estiloAttachHeader;
	if(navigator.appName == "Netscape"){
		estiloAttachHeader = "height:22px;margin:0px;padding:0px;";
	}else{
		estiloAttachHeader = "height:25px;margin:0px;padding:0px;";
	}
	//Si no se esta mostrando el filtro
	if(filtro == 0){
		
		if (document.getElementById("vista").value =="PtosPorSesion2New"){ 
			grid.attachHeader("#numeric_filter,#text_filter,#text_filter,#text_filter,,",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grid.attachHeader("#numeric_filter,#text_filter,#text_filter,#text_filter,,",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}		
		else if (document.getElementById("vista").value =="ResPorSesionNew"){
				
			grid.attachHeader("#text_filter,#numeric_filter,#select_filter,#text_filter,#text_filter,,",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grid.attachHeader("#text_filter,#numeric_filter,#select_filter,#text_filter,#text_filter,,",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
				
		}

		//Quito un cabezal para actualizar y que aparezca el filtro
		grid.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro = 1;
		//Seteo el ícono de filtro activado

		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		cargar();
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
//---------------------
$(document).ready(function(){

	setTimeout(function(){

		if(document.getElementById("AttachOrdenDia").value=="Si"){

			  $(function() {

 	 			  $( ".menuAdjuntos" ).button({text: false,icons: {primary: "ui-icon-folder-open"}}).click(function() {
 	 			 // $( ".menuAdjuntos" ).click(function() {
       				  $(".menuAdjuntos").parent().next().hide();
   	     			  var menu = $( this ).parent().next().show().position({
   		     	  		 my: "left top",
          		 		 at: "right top",
          		  		of: this
	        			  });
     	   			//  alert("4");
	    	      $( document ).one( "click", function() {
   		       	  menu.hide();
	   	       });
	 	         //alert("5");
		          return false;
	 	       })
	  	     .parent()
   		       .buttonset()
	   	       .next()
	   	         .hide()
	 	           .menu();
	  });
	}
	
   
								estado= document.getElementById("sEstado").value;
								if(document.getElementById("rPermitirComentarios").value=="Si" & estado !="En Desarrollo" & estado!="Finalizada"){
	
//									if(document.getElementById("sEstado").value!="En Desarrollo" & document.getElementById("sEstado").value!="Finalizada" ){
										//setTimeout(function(){   $(".menuComentario" ).button({text: false,icons: {primary: "ui-icon-comment"}})  },200);
											$(".menuComentario" ).button({text: false,icons: {primary: "ui-icon-comment"}}).show();
			
//									}else{
		
//	 								$(".menuComentario" ).hide();

//									}
								}else{
					
									 $(".menuComentario" ).hide();
								}


  }
,200);

});
//------------

/*
	if(document.getElementById("AttachOrdenDia").value=="Si"){
	  $(function() {
    			$( ".menuAdjuntos" ).button({text: false,icons: {primary: "ui-icon-folder-open"}}).click(function() {
       			  $(".menuAdjuntos").parent().next().hide();
       			   var menu = $( this ).parent().next().show().position({
         			   my: "left top",
         			   at: "right top",
          		  of: this
          	});
          	$( document ).one( "click", function() {
          	  menu.hide();
         		});
         		return false;
       })
       .parent()
         .buttonset()
         .next()
           .hide()
           .menu();
 	});
}
*/
/*
alert( document.getElementsByName("pepito").length);
if(document.getElementById("rPermitirComentarios").value=="Si" & document.getElementById("sEstado").value!="En Desarrollo" & document.getElementById("sEstado").value!="Finalizada" ){

//	if(document.getElementById("sEstado").value!="En Desarrollo" & document.getElementById("sEstado").value!="Finalizada" ){
		$(".menuComentario").button({text: false,icons: {primary: "ui-icon-comment"}});
	
//	}else{
	
// 		$(".menuComentario" ).hide();

//		}
	}else{

		 $(".menuComentario" ).hide();
		 
	}

*/
}

function cargarComentariosAsunto(id){
	document.getElementById("idComentario").value=id;
	$('#dialogoComentario').dialog('open');
}

function dibujarImg(nombre){
//document.write("<img src='../"+ document.getElementById("universalidd")+"/$FILE/" + nombre+"' alt='' />");
	return "<img src='../"+ document.getElementById("UNID").value+"/$FILE/" + nombre+"' alt='' />";
}