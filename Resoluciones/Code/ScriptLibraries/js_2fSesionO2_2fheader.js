var frm;

function DirABS(){ 
var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}
function cambiarTipo(uid){

		$('#dialog-confirm').dialog('open');


}
//Validacion de campos
function ValidarCampos()
{
	if (!validar(frm.fSesion,"Debe ingresar la Fecha"))
		return false;
	if(!validarHoras("hInicio", "inicio"))
		return false;
	if(!validarHoras("hFin", "finalización"))
		return false;
	return true;
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
		window.open(pathDB+'/ImpresionActa?OpenForm&id='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
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

	if (confirm("¿Esta seguro que desea continuar con la operación Numerar Asuntos en Bloque?")){
		
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
 * @param nombreCampo
 *            campo al cual se le insertara la imagen
 * @param unid
 *            universal Id del documento del campo.
 * @return antes de ir a la pagina de carga GUARDA EL DOCUMENTO Y SETEA EL
 *         $$Return para quue al finalizar la carga, direcccionar nuevamante a
 *         la página del documento que invoco referenciada por el id.
 */
function insertarImagen(nombreCampo, unid){
	/*
	 * obtengo DirABS y le agrego el formulario de carga de la imagen le agrego
	 * los parametros de la llamada correspondientes al nombre del campo y
	 * universal Id respectivamente. obtengo el patametro location y la paso
	 * como param tambien para volver a la pagina
	 * 
	 */ 
	var url = DirABS()+"/CargaImg?OpenForm&id="+unid+"&campo="+nombreCampo+"&tipoDoc=asunto&pathBack="+location;	

	document.getElementById("pathimagenes").value = url;

	document.getElementById("imagen").value = "[" + url + "]";
	document.getElementById("banderaImagen").value = "si";
	
	document.forms[0].SalvarFormulas.click();
	}