// Firma
//---------------------------------------------------------------------------

function QuitarMarcas(dbOrg){
var nro=document.getElementById("sNumeroFormulario").value;
OcultarMenu();
//	$("#dialog_pausa").dialog( "open");
var url=document.forms[0].Protocolo.value+"://" + window.location.hostname+":"+document.forms[0].Puerto.value + "/" + dbOrg + "/FParametrosQuitarMarcaCom?OpenForm&ID=" + nro ;
window.location=url;
}

function Marcarr(docid) {
	//OcultarMenu();
	
	var pathDB = DirABS();
	window.location=pathDB+'/FParametrosMarcarForm?OpenForm&ID='+docid;

	//window.open(location.href + "&printDocument", "PrintDocument", "status=0,toolbar=0,location=0,menubar=1,directories=0,rezisable=0,width=760");
}

function camposAFirmar() {
	var camposOcultos = document.getElementById("camposOcultosDiv").innerHTML;
	var inputNames = "";
	
	// agrego los inputs
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type != "hidden" && inputs[i].name != "") {
			if (camposOcultos.indexOf(inputs[i].outerHTML) < 0) {
				if (inputs[i].type != "radio" || inputNames.indexOf(inputs[i].name + ",") == -1) {
					inputNames = inputNames + inputs[i].name;
					inputNames = inputNames + ",";
				}
			}
		}
	}
	
	// agrego los textarea
	inputs = document.getElementsByTagName("textarea");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].name != "") {
			if (camposOcultos.indexOf(inputs[i].outerHTML) < 0) {
				inputNames = inputNames + inputs[i].name;
				inputNames = inputNames + ",";
			}
		}
	}
	
	// agrego los select
	inputs = document.getElementsByTagName("select");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].name != "") {
			if (camposOcultos.indexOf(inputs[i].outerHTML) < 0) {
				inputNames = inputNames + inputs[i].name;
				inputNames = inputNames + ",";
			}
		}
	}
	
	document.getElementById("sCamposAFirmar").value = inputNames.substring(0, inputNames.length - 1);
///	alert(document.getElementById("sCamposAFirmar").value);
}


// Funciones auxiliares
//---------------------------------------------------------------------------

// Dirección Absoluta de la base
function DirABS(){
var pathname=location.pathname;  
	return(document.getElementById("Protocolo").value+'://' + location.hostname+":"+document.getElementById("Puerto").value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)));
}

function marcarCampo(id, colorFondoOriginal, colorFondo, count) {
	var campo = document.getElementById(id);
	if (count <= 4) {
		if ((count%2) == 1) {
			campo.style.backgroundColor = colorFondo;
		} else {
			campo.style.backgroundColor = colorFondoOriginal;
		}
		count = count+1;
		setTimeout("marcarCampo('"+id+"', '"+colorFondoOriginal+"', '"+colorFondo+"', "+count+")",200);
	}
}

function setearValorFecha(campo, valor) {
	var c = dijit.byId(campo);
	if (c != null && typeof(c) != "undefined") {
		c.setValue(valor);
	}
}

function OcultarMenu(){
	var div;
	div = document.getElementById("barraMenu");
	if (div)
		div.style.display = "none";
	div = document.getElementById("Archivo");
	if (div)
		div.style.display = "none";
	div = document.getElementById("Acciones");
	if (div)
		div.style.display = "none";
	div = document.getElementById("Salir");
	if (div)
		div.style.display = "none";
	div = document.getElementById("SalirBandejas");

	if (div)
		div.style.display = "none";
}

function validar() {
	if (!ValidacionParticular())
		return false;

	if (document.forms[0] && document.forms[0].fireEvent) {
		// funciona en IE
		return document.forms[0].fireEvent("onsubmit");

	} else {
		// para Mozilla, Opera y otros
		return document.forms[0].onsubmit();

	}
}

// Acciones
//---------------------------------------------------------------------------
//Accion enviar email
function EnviarAviso(){
	$("#dialogEnviarAviso").dialog("open");
}
function Imprimir() {
	window.open(location.href + "&printDocument", "PrintDocument", "status=0,toolbar=0,location=0,menubar=1,directories=0,rezisable=0,width=760");
}

function BusquedaAvanzada() {
	var codigo = document.getElementById("codigo").value;
	window.open(DirABS() + "/FBusquedaAvanzada?OpenForm&newWindow&codigo="+codigo, "BusquedaAvanzada", "status=0,toolbar=0,location=0,menubar=1,directories=0,rezisable=0,width=760");
}

function Salir() {
     var origenPortalPublico= document.forms[0].origen.value;
	var visibilidad = document.forms[0].sVisibilidad.value;
	var usuario = document.forms[0].sUsuario.value;
	
	if (origenPortalPublico=="PP") {window.close();}
	else if (usuario == "Anonymous" && visibilidad == "Externo") {
		location.href = document.forms[0].sAccesoAnonimo.value;
	} else {
		var pathPortal = document.getElementById("sPathPortal").value;
		location.href = "/" + pathPortal + "/Bandejas?OpenForm&tipoDoc=Formularios";
	} 
}

function GuardarySalir() {
	if (validar()) {
		OcultarMenu();
		document.forms[0].sAccion.value = "acc_guardar_salir_form";
		camposAFirmar();
		document.forms[0].submit();
	}
}

function Guardar() {

	if (validar()) {
		OcultarMenu();
		document.forms[0].sAccion.value = "acc_guardar_form";
		camposAFirmar();
		document.forms[0].submit();
	}
}


function Editar(docid){
	OcultarMenu();
	//Borro el campo que indica la acción para asegurarme que no tenga nada guardado
	document.forms[0].sAccion.value = "";
	var pathDB = DirABS();
	var usuario = document.getElementById("sUsuario").value;
	window.location=pathDB + "/FormController2.0?openAgent&ID=" + docid + ",Accion=acc_editar_form,usuario=" + usuario;
}

function Enviar(docid){
if (validar()) {
	if (confirm("¿Esta seguro que desea enviar el Formulario?")) {
		
		// chequeo captcha si es necesario
		if (document.getElementById("captcha") && validateCaptcha) {
			if (validateCaptcha() != "True") {
				alert("El código ingresado es incorrecto, inténtelo nuevamente.");
				document.getElementById("captcha").focus();
				marcarCampo("captcha", document.getElementById("captcha").style.backgroundColor, "#999999", 1);
				return false;
			}
		}
		if (document.getElementById("mxIdProximaUnidad").value == "@idCualquiera") {
		
			document.forms['dojoPaseApplet'].sAccion.value = "acc_enviar_form";
			//dijit.byId("dialogPase").show(); 
			$("#dialogPaseApplet").dialog({
				width:540
			});
		} else {
			document.forms[0].btnEnviar.style.display="none"//Oculto el boton enviar cuando se hace click
			//la unidad se determina por temas o está fija en la configuración
			OcultarMenu();
			camposAFirmar();
			var pathDB=DirABS();
			var codigo = document.forms[0].codigo.value;
			document.forms[0].sAccion.value = "acc_enviar_form";
			document.forms[0].sUnidad.value = "";
			document.forms[0].submit();
		}
	}
}
}

function CrearExpedienteForm(){
	$('#dialogInterExpForm').dialog("open");
}

function CrearFormularioForm() {
	$('#dialogInterFormForm').dialog("open");
}

function Devolver(docid){
	$('#dialogDevolver').dialog({
				width:540
		});
}

function Reenviar(docid){	
	cargarDatosPase();
	document.forms['dojoPaseApplet'].sAccion.value="acc_reenviar_form";
	dijit.byId("dialogPaseApplet").show();
}

function Recibir(docid){	
	OcultarMenu();
	var pathDB=DirABS();
	var usuario = document.getElementById("sUsuario").value;
	window.location= pathDB + "/FormController2.0?openAgent&ID="+docid+",Accion=acc_recibir_form,usuario="+usuario;
}

function RecibirEditar(docid){
	document.forms[0].sAccion.value = "";
	OcultarMenu();
	var pathDB=DirABS();
	
	var usuario = document.getElementById("sUsuario").value;
	window.location= pathDB + "/FormController2.0?openAgent&ID="+docid+",Accion=acc_recibir_editar_form,usuario="+usuario;
}
function Reservar(docid){	
	OcultarMenu();
	var pathDB=DirABS();
	var usuario = document.getElementById("sUsuario").value;
	window.location= pathDB + "/FormController2.0?openAgent&ID="+docid+",Accion=acc_reservar_form,usuario="+usuario;
}

function Liberar(docid){	
	OcultarMenu();
	var pathDB=DirABS();
	var usuario = document.getElementById("sUsuario").value;
	window.location= pathDB + "/FormController2.0?openAgent&ID="+docid+",Accion=acc_liberar_form,usuario="+usuario;	
}

function DarPase(docid){
	if (document.getElementById("mxIdProximaUnidad").value == "@idCualquiera") {
		document.forms['dojoPaseApplet'].sAccion.value="acc_dar_pase_form";
		$("#dialogPaseApplet").dialog({
				width:540
		});
	} else if (document.getElementById("mxIdProximaUnidad").value == "@idGrupo") {
		document.forms['dojoPaseApplet'].sAccion.value="acc_dar_pase_form";
		$("#dialogPaseApplet").dialog({
				width:540
		});
	}else{
		//la unidad se determina por temas o está fija en la configuración
		OcultarMenu();
		camposAFirmar();
		var pathDB=DirABS();
		var usuario = document.getElementById("sUsuario").value;
		window.location= pathDB + "/FormController2.0?openAgent&ID=" + docid + ",Accion=acc_dar_pase_form,usuario=" + usuario;
	}
}



function Firmar(docid){	
	
		$('#dialogFirmarApplet').dialog({
				width:540
		});
	
}

function FirmaryDarPase(docid){
	if (document.getElementById("mxIdProximaUnidad").value == "@idCualquiera") {

		document.forms[dojoFyP].sAccion.value="acc_firmar_dar_pase_form";
		$("#"+subFFyP).dialog({
				width:540
		});
	}else if (document.getElementById("mxIdProximaUnidad").value == "@idGrupo") {
	
		document.forms['dojoPaseApplet'].sAccion.value="acc_firmar_dar_pase_form";
				$("#"+subFF).dialog({
				width:540
		});
	}else{
		//la unidad se determina por temas o está fija en la configuración
		//document.forms['dojoFirma'].sAccion.value="acc_firmar_dar_pase_form";
		//dijit.byId('dialogFirmar').show();
		document.forms[dojoFF].sAccion.value="acc_firmar_dar_pase_form";
		$("#"+subFF).dialog({
				width:540
		});
	}
}


function Asignar(docid){	
	$("#dialogAsignar").dialog({
				width:540
		});
}

function ParaFirmar(docid){	
	$("#dialogParaFirmar").dialog({
				width:540
		});
}

function Finalizar(docid){
	$("#dialogFinalizar").dialog({
				width:540
		});
}

function Desfinalizar(docid){	
	OcultarMenu();
	var pathDB=DirABS();
	var usuario = document.getElementById("sUsuario").value;
	window.location= pathDB + "/FormController2.0?openAgent&ID="+docid+",Accion=acc_desfinalizar_form,usuario="+usuario;
}

function Archivar(docid){	
	$("#dialogArchivar").dialog({
				width:540
		});
}

function AgregarACarpeta(docId,texto) {	
if (confirm("¿Esta seguro que desea "+texto+"le este formulario a la Carpeta Electronica del cliente?")) 
	{
		OcultarMenu();
	      var pathDB=DirABS();
	      var usuario = document.getElementById("sUsuario").value;
	      window.location= pathDB + "/CarpetaElectronicaController?openAgent&ID="+docId+",Accion=acc_Carpeta_Electronica,usuario="+usuario;
	}
}

function GuardarNuevo() {
if (validar()) {
	if (confirm("¿Esta seguro que desea guardar el Formulario?")) {

		// chequeo captcha si es necesario
		if (document.getElementById("captcha") && validateCaptcha) {
			if (validateCaptcha() != "True") {
				alert("El código ingresado es incorrecto, inténtelo nuevamente.");
				document.getElementById("captcha").focus();
				marcarCampo("captcha", document.getElementById("captcha").style.backgroundColor, "#999999", 1);
				return false;
			}
		}

		if (document.forms[0].sReservaInicio.value == "Si"){
			OcultarMenu();
			camposAFirmar();
			var codigo = document.forms[0].codigo.value;
			document.forms[0].sAccion.value = "acc_guardar_nuevo_form";
			document.forms[0].submit();
		}else{
			OcultarMenu();
			camposAFirmar();
			var codigo = document.forms[0].codigo.value;
			document.forms[0].sAccion.value = "acc_guardar_nuevo_en_unidad_form";
			document.forms[0].submit();
		}

	}
}

}



function VisualizarRecorrido(docid) {
	var pathDB = DirABS();
	window.open(pathDB + "/VisualizarRecorridoForm?OpenForm&FormUNID=" + docid);
}

function ReenviarUnidadSuperior(docid) {
	OcultarMenu();
	var pathDB = DirABS();
	var usuario = document.getElementById("sUsuario").value;
	window.location= pathDB + "/FormController2.0?openAgent&ID=" + docid + ",Accion=acc_reenviar_superior_form,usuario=" + usuario;
}


function Informacion(docid){
	var fechasRecepcion = document.getElementById("FechasRecepcion").value.split(", ")
	var fechasEnvio = document.getElementById("FechasEnvio").value.split(", ")
	var secciones = document.getElementById("recorridoSeccionesVis").value.split(",")
	var descripcionSecciones = document.getElementById("descripcionSeccionesCalculado").value.split(",")
	var unidades = document.getElementById("sUnidadSeccion").value.split(";")
	var fechaRecepcion = ""
	var fechaEnvio = ""
	var html = ""

	
	html = html + "<table width='100%' id='tablaInformacionRecorrido' style='font-size: 82.5%;'  align='center'>"
	html = html + "<tr style='border-bottom: solid 1px #DDDDDD;'>"
	html = html + "<th width='5%' style='text-align: center; border-bottom: solid 1px #DDDDDD;'><b>#</b></th>"
	html = html + "<th width='30%' style='text-align: center; border-bottom: solid 1px #DDDDDD;'><b>Seccion</b></th>"
	html = html + "<th width='30%' style='text-align: center; border-bottom: solid 1px #DDDDDD;'><b>Unidad</b></th>"
	html = html + "<th width='15%' style='text-align: center; border-bottom: solid 1px #DDDDDD;'><b>Fecha de Recepción</b></th>"
	html = html + "<th width='15%' style='text-align: center; border-bottom: solid 1px #DDDDDD;'><b>Fecha de Salida</b></th>"
	html = html + "</tr>"
	for (i = 0; i < secciones.length; i++){
		var resta = secciones[i] -1;
		html = html + "<tr>"
		html = html + "<td width='5%' align='center'>"+ secciones[i] +"</td>"
		if  ( (( typeof(descripcionSecciones[secciones[i] -1 ]) === "undefined") || (descripcionSecciones[secciones[i] -1 ]) == "") ){
			html = html + "<td width='30%' align='center'>"+ "- " +"</td>"
		}else{		
			html = html + "<td width='30%' align='center'>"+ descripcionSecciones[secciones[i] -1] +"</td>"
		}
		html = html + "<td width='30%' align='center'>"+ unidades[i] +"</td>"
		
		if (fechasRecepcion[i] != null && fechasRecepcion[i].split(" ")[1] != undefined) {
			html = html + "<td width='15%' align='center'>"+ fechasRecepcion[i].split(" ")[1] +"</td>"
		}else{
			html = html + "<td width='15%' align='center'> -- </td>"
		}
		
		if (fechasEnvio[i] != undefined && fechasEnvio[i].split(" ")[1] != undefined) {
			html = html + "<td  width='15%' align='center'>"+ fechasEnvio[i].split(" ")[1] +"</td>"
		}else{
			html = html + "<td  width='15%' align='center'> -- </td>"
		}
		html = html + "</tr>"
	}
	html = html + "</table>"
	document.getElementById("dialogInformacionRecorrido").innerHTML = html
	var accion = document.getElementById("menuAccion");
	if (accion != null)
		accion.click();
	
	$( "#dialogInformacionRecorrido" ).dialog( "open" );
}


function ordenarTabla (columna) {
	$('#tablaInformacionRecorrido').sortTable({onCol: 2, keepRelationships: true, sortType: 'numeric'})
}

function exportarPDF() {
	window.open(location.href + "&imprimirpdf=true", "ExportarPDF", "status=0,toolbar=0,location=0,menubar=1,directories=0,rezisable=0,width=500,height=200");
}



var dialogFirmarApplet;

/*Funciones para firmar*/
function ocultarApplet(subform){
	if (subform=="AccFirmarApplet"){
		//document.forms['dojoFirmaApplet'].style.display="none";		
		$('#dialogFirmarApplet').dialog('close');
		document.applets["applet"].style.display="none";
		document.getElementById("textoConfirmarFirma").style.display="block";
	}else if(subform=="AccPaseApplet"){
		$('#dialogPaseApplet').dialog('close');
		document.getElementById("appletFirmaPase").style.display="none";
		document.getElementById("dialogoPase").style.display="block";

	}else if(subform=="AccPaseRutaApplet"){
		document.getElementById("appletPaseRuta").style.display="none";
		dlgPaseRuta.hide();
	}
}

function appletFirmarJava(valor,subform){
	if (subform=="AccFirmarApplet"){
		document.forms['dojoFirmaApplet'].sFirma.value=valor;
		if (document.forms['dojoFirmaApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			//alert(valor);
			document.forms['dojoFirmaApplet'].submit();
		}
	}else if(subform=="AccPaseApplet"){
		document.forms['dojoPaseApplet'].sFirma.value=valor;
		
		if (document.forms['dojoPaseApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dojoPaseApplet'].submit();
		}
	}
}
/*Fin funciones para firmar*/

//Ésta función se invoca desde el botón aceptar del diálogo de pedidos de informe, el cual está definido en el subForm 'DialogoPedidoInforme'
function AgregarInforme(strPedidosSeleccionados, strMotivos, strTipos){
OcultarMenu();
var pathDB=DirABS();
var usuario = document.getElementById("sUsuario").value;

var docid=document.getElementById("sIdFormulario").value;

document.forms["formPedidoInforme"].Unidades.value=strPedidosSeleccionados;
document.forms["formPedidoInforme"].Motivos.value=strMotivos;
document.forms["formPedidoInforme"].Tipos.value=strTipos;
document.forms["formPedidoInforme"].submit();

}

function QuitarInforme(strPedidosSeleccionados) {
	OcultarMenu();
	var pathDB = DirABS();
	var usuario = document.getElementById("sUsuario").value;
	var docid = document.getElementById("sIdFormulario").value;
	window.location = pathDB + "/FormController2.0?openAgent&ID=" + docid + ",Accion=acc_quitar_pedidoInforme_form,usuario=" + usuario + ",Pedidos=" + strPedidosSeleccionados;
}
