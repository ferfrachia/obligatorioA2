var frm;
var pathDB;
var nro; 
var usuario; 
var anexoSeleccionado;
var myData;
var obj;
var mouseoverfirma=1;
var dlg0, dlg1;
var dlgAsignar,dlgParaFirmar,dlgPase,dlgMarcarExp,dlgAviso,dlgAviso2,dlgNotificacion, dialogApplet;
//Manejo de estilo en tabs
var tab;
var colorant;
var tabselect='general';

function OverIE(){
	if (mouseoverfirma==1)
		document.selection.empty();  
}

function OverMO(){
	if (mouseoverfirma==1)
		document.getSelection().removeAllRanges();
}

/*******Funciones utilizadas por las operaciones de los archivos anexos*******/
function abrirAnexo(){
	if (anexoSeleccionado==""){
		alert('Debe seleccionar un anexo');
	}else{
		if(document.forms[0].impresionAnexo.value=="1"){
			if (anexoSeleccionado.toUpperCase().indexOf(".DOC")!=-1){
				if(confirm("¿Desea imprimir el archivo: " +anexoSeleccionado+" ?")){
					window.open(DirABS()+"/VerAttachment?OpenForm&nroExp="+document.forms[0].ccNroExp.value+"&nroAct="+document.forms[0].ccnNroAct.value+"&unid="+document.forms[0].unid.value+"&archivo="+anexoSeleccionado,'Anexo','status=no,resizable=no,scrollbars=no,LEFT=100,TOP=10,width=1,height=1');
				}else{
				}
			}else{
				if (anexoSeleccionado.toUpperCase().indexOf(".PDF")!=-1){
					window.open(DirABS()+ "/OpenPdf?OpenAgent&ID=" + document.forms[0].unid.value + "&Attach=" + anexoSeleccionado);
				}else{
					window.open(location.pathname+"/$file/"+anexoSeleccionado);
				}
			}
		}else{
			window.open(+location.pathname+"/$file/"+anexoSeleccionado);
		}
	}
}

function imprimirAnexo(){
	var strAux="";
	if (anexoSeleccionado=="")
		alert('Debe seleccionar un anexo');
	else if (anexoSeleccionado.indexOf(".doc")==-1){
		window.open(location.pathname+"/$file/"+anexoSeleccionado);
	}else{
		while (anexoSeleccionado.indexOf("&")>0){
			strAux =anexoSeleccionado;
			pos = strAux.indexOf("&")
			anexoSeleccionado=strAux.substring(0,pos)+"%26"+strAux.substring(pos+1,strAux.length)
		}
		window.open(document.forms[0].URLANEXO.value + anexoSeleccionado);
	}	
}

function BorrarAnexo(){
	if (anexoSeleccionado==""){
		alert('Debe seleccionar un anexo');	
	}else{
		var a = new Array();
		a = myData;
		a.splice(num, 1);
		cant -=1;
		//Cargo en el nro de attachs para cuando se controla
		//en el validarCampos que haya anexos o texto, si edita uno con anexo solo
		// y lo quita aca resto para que no pueda guardar sin anexo y texto
		frm.NroAttachs.value = cant;
		var attachs = document.getElementsByName("%%Detach");
		
		for (var i=0;i< attachs.length;i++){
			if (attachs[i].value==anexoSeleccionado){
				attachs[i].checked = true;	
			}							
		}
		var g = new OS3Grid ();
		g.set_headers ('Nombre de archivo', 'Tamaño', 'Fecha de anexado');
		var i = 0;
		if(cant == 0){
			try{
				for (var j=0;j<attachs.length;j++){
					attachs[j].checked = true;
				}
					
			}catch(e){
				for (var i=0;i< attachs.length;i++){
					if (attachs[i].value==anexoSeleccionado){
						attachs[i].checked = true;	
					}							
				}
			}	
			var div = document.getElementById('a');
			var p = document.getElementById('p');
			p.innerHTML= "Archivos Anexados" + " " + "(" + cant +")";
			div.style.display = "none";
		}else{
			for(i=0; i< cant ; i++){
				g.add_row (a[i][0], a[i][1], a[i][2]);
			}
			g.set_cell_click ( cell_clicked );
			g.set_highlight ( true );
			g.render ( 'a' );
			var p = document.getElementById('p');
			p.innerHTML= "Archivos Anexados" + " " + "(" + cant +")";
		}	
	}
}

function validarAnexos(){
	var campo;
	var error = true;
	var extensiones =stringToVector(document.forms[0].Extensiones.value)
	campo = document.getElementById("File1");
	if (campo){
		if (campo.value!=""){
			var texto =campo.value;
			var pos=texto.lastIndexOf("\\");
			var archivo = 	texto.substring(pos+1,texto.length);
			if (archivo.indexOf("%")>=0){
				alert("El nombre de los anexos no puede contener '%' ")
				return false;
			}
			pos=archivo.lastIndexOf(".");
			if(pos>=0){
				var extension = archivo.substring(pos+1,archivo.length).toUpperCase();
				var existe=false;
				if (extensiones.vIsMember(extension)){
					existe=true;
				}
				if (existe==false){
					alert("La extensión del archivo "+archivo+" No esta permitida")
					return false;
				}
			}else{
				alert("La extensión del Anexo "+archivo+" es incorrecta")
				return false
			}
		}
	}
	campo = document.getElementById("File2");
	if (campo){
		if (campo.value!=""){
			var texto =campo.value;
			var pos=texto.lastIndexOf("\\");
			var archivo = 	texto.substring(pos+1,texto.length);
			if (archivo.indexOf("%")>=0){
				alert("El nombre de los anexos no puede contener '%' ")
				return false;
			}
			pos=archivo.lastIndexOf(".");
			if(pos>=0){
				var extension = archivo.substring(pos+1,archivo.length).toUpperCase();
				var existe=false;
				if (extensiones.vIsMember(extension)){
					existe=true;
				}

				if (existe==false){
					alert("La extensión del archivo "+archivo+" No esta permitida")
					return false;
				}

			}else{
				alert("La extensión del Anexo "+archivo+" es incorrecta")
				return false
			}
		}
	}
	campo = document.getElementById("File3");
	if (campo){
		if (campo.value!=""){
			var texto =campo.value;
			var pos=texto.lastIndexOf("\\");
			var archivo = 	texto.substring(pos+1,texto.length);
			if (archivo.indexOf("%")>=0){
				alert("El nombre de los anexos no puede contener '%' ")
				return false;
			}
			pos=archivo.lastIndexOf(".");
			if(pos>=0){
				var extension = archivo.substring(pos+1,archivo.length).toUpperCase();
				var existe=false;
				if (extensiones.vIsMember(extension)){
					existe=true;
				}

				if (existe==false){
					alert("La extensión del archivo "+archivo+" No esta permitida")
					return false;
				}

			}else{
				alert("La extensión del Anexo "+archivo+" es incorrecta")
				return false
			}
		}
	}
	campo = document.getElementById("File4");
	if (campo){
		if (campo.value!=""){
			var texto =campo.value;
			var pos=texto.lastIndexOf("\\");
			var archivo = 	texto.substring(pos+1,texto.length);
			if (archivo.indexOf("%")>=0){
				alert("El nombre de los anexos no puede contener '%' ")
				return false;
			}
			pos=archivo.lastIndexOf(".");
			if(pos>=0){
				var extension = archivo.substring(pos+1,archivo.length).toUpperCase();
				var existe=false;
				if (extensiones.vIsMember(extension)){
					existe=true;
				}

				if (existe==false){
					alert("La extensión del archivo "+archivo+" No esta permitida")
					return false;
				}

			}else{
				alert("La extensión del Anexo "+archivo+" es incorrecta")
				return false
			}
		}
	}
	return error;
}

/*******Fin Funciones utilizadas por las operaciones de los archivos anexos*******/

/******************************Advertencias***************************************/

function ConfirmarOperacion(op){
	if (confirm('Desea continuar con la operación ' + op + '?'))	
		return true;
	else
		return false;
}

function OcultarMenu(){
	document.getElementById('barraMenu').style.display = "none";
}

function ValidarFirmanteEditar(){
	//var resPor 	=	document.all("sReservadoPorDisp").value;
	var resPor = document.getElementById("sReservadoPorDisp").value;
	//var userActual = 	document.all("sUsuarioActual").value;
	var userActual = document.getElementById("sUsuarioActual").value;
	//var esFirmante = 	document.all("sFlagRolFirmante").value=="1";
	var esFirmante = document.getElementById("sFlagRolFirmante").value;
	
	if (userActual.toUpperCase().indexOf(resPor.toUpperCase()) != -1 ){
		return true;
	}else{
		if (resPor.toUpperCase()=="" ){
			return true;
		}else{ 
			if (esFirmante){
				if (confirm("La actuación que va a editar, esta reservada por el usuario " + resPor + ". ¿Desea continuar?"))
					return true;
				else
					return false;
			} else
				return true;
		}
	}
}

function ValidarActFirmada(){
	if (confirm("ATENCIÓN: La firma de la actuación a editar se perderá. ¿Desea continuar con la edición?"))	
		return true;
	else
		return false;
}	

/***************************** Fin Advertencias **********************************/

/********************************Validaciones*************************************/

function ValidarCampos(){
	var texto = tinyMCE.get("sTexto").getContent();
	texto = texto.replace(/&nbsp;/gi, "");
	var campo = document.getElementById("File1");
	var campo2 = document.getElementById("File2");
	var campo3 = document.getElementById("File3");
	var campo4 = document.getElementById("File4");
	var cantidad = frm.NroAttachs.value;
	if((texto=="" || texto=="<p> </p>" || (texto.indexOf("html")!=-1)) && (campo.value=="")  && (campo2.value=="")
			&& (campo3.value=="")&& (campo4.value=="") && cantidad==0){		
		alert ("Debe ingresar el texto de su actuación o anexar algún archivo");
		return false;
	}else{ 

		if(texto.toUpperCase().indexOf("<DIV ID=TABLAFIRMA")>-1 || texto.toUpperCase().indexOf("<DIV ID=TABLAFIRMA")>-1){
			alert ("Se ha copiando la firma electrónica en el texto de la presente actuación. Debe borrarla para poder guardarla ");
			return false;		
		}
	}				
	if (validarAnexos()){
		return true;
	}else{ 
		return false;
	}
}

function validaAttachs(){
	var attachs = document.getElementsByName("%%Detach");
	var checked = true;
	if (frm.NroAttachs.value=="0" && 
			document.getElementById("File1").value=="" && 
			document.getElementById("File2").value=="" && 
			document.getElementById("File3").value=="" && 
			document.getElementById("File4").value==""){
		return true;
	
	}else 
		if (frm.NroAttachs.value!="0"){
			for (var j=0;j<attachs.length;j++){
				if(attachs[j].type=="checkbox"){
					if (attachs[j].checked)
						checked = checked & true;
				}
			}
			return checked;
		}else{
			todos=0;
			for (var i=0;i<attachs.length;i++){				
				if (attachs[i].checked)
					todos++;
			}
			if (todos == attachs.length){
				return true;
			}
		}
		
	return false;
}

/****************************** Fin Validaciones ***********************************/

/**************************** Funciones auxiliares *********************************/

function DirABS(){ 
	var pathname=location.pathname;

	return("../")  
}

function ConfiarUnidadCertificadors(){
	// CAPICOM constants 
	var CAPICOM_STORE_OPEN_READ_ONLY = 0;
	var CAPICOM_CURRENT_USER_STORE = 2;
	var CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
	var CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME=1;
	var CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
	var CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
	var CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
	var CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;
	var CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 0x00000080;
	var CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
	var CAPICOM_INFO_SUBJECT_SIMPLE_NAME = 0;
	var CAPICOM_ENCODE_BASE64 = 0;
	var CAPICOM_E_CANCELLED = -2138568446;
	var CERT_KEY_SPEC_PROP_ID = 6;
	var CAPICOM_VERIFY_SIGNATURE_ONLY = 0;
	var CAPICOM_VERIFY_SIGNATURE_AND_CERTIFICATE = 1;
	var CAPICOM_CHECK_NONE=0;
	var CAPICOM_CHECK_TRUSTED_ROOT=1;
	var CAPICOM_CHECK_TIME_VALIDITY=2;
	var CAPICOM_CHECK_SIGNATURE_VALIDITY=4;
	var CAPICOM_CHECK_ONLINE_REVOCATION_STATUS=8;
	var CAPICOM_CHECK_OFFLINE_REVOCATION_STATUS=16;
	var CAPICOM_CHECK_COMPLETE_CHAIN=32;
	var txtNombre="BBA7CAC48C77418BECA34948FB8E1345E9CEE9E5";

	var MyStore = new ActiveXObject("CAPICOM.Store");
	var FilteredCertificates = new ActiveXObject("CAPICOM.Certificates");

	// Se abre el store de certificados personales
	try{
		MyStore.Open(CAPICOM_CURRENT_USER_STORE, "Root", CAPICOM_STORE_OPEN_READ_ONLY);
	}
	catch (e){
		if (e.number != CAPICOM_E_CANCELLED){
			alert("An error occurred while opening your personal certificate store, aborting");			
		}
		return false;
	}
	var FilteredCertificates = MyStore.Certificates.Find(CAPICOM_CERTIFICATE_FIND_SHA1_HASH ,txtNombre);
	if (FilteredCertificates.Count==0){
		//No tiene certificado, lo instalalo
		document.all.Enroll.InstallPKCS7("MIIDJgYJKoZIhvcNAQcCoIIDFzCCAxMCAQExADALBgkqhkiG9w0BBwGgggL7MIIC9zCCAd+gAwIBAgIUE4eVuwXBGpEdj8+k4JMQUVqaZjEwDQYJKoZIhvcNAQEEBQAwIzEMMAoGA1UEChMDQU5QMRMwEQYDVQQDEwpFeHBlZGllbnRlMB4XDTAzMTExODIwMDQ1OVoXDTMzMTExOTA0NTkwMFowIzEMMAoGA1UEChMDQU5QMRMwEQYDVQQDEwpFeHBlZGllbnRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyMyO314nmroiXmkvaBuI2u/sZIJM8Rjz5a+cZCHq7DCIR0i0fCInHQgXjViC7woE0+gy5gMRNuGgQstIibmjP0UKW9+5AJUK1UEGKPJasfxLNY/9G/4jx8cX7Csw5tsxLlvTvAZBdeDLTBnCdHx5njgzTFbi/6joAvPvpxHa9FaeIE1hV9mWXXD/5WdxUmsufBMbf/fydA7yfJMKbjaLgryivE/icY+p+brMjr1Nt5qcEX6p5rsRoPJHWQr2JY//bInT45qTzpNXXR2aUTZUsxFBsZwKu6UD7HaU/j8tvYbiYh/8KMUfEAd2YAZ7+sOR4KxFVCM1iLjGrYb1LEIooQIDAQABoyMwITAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQQFAAOCAQEAKV83ohFv5uD9befcj7KPeneMu2hWiOH2d11Gtg05O3kfIoaftTPKc6NNtuvT1Bdj37IaIggAQpa1BWWaFFFhzShFoeMOwikzw0p32Z8rMLhhe+snJuCG8K28umkFRbNuXOn8MVg3Z8SKE9db7FK9CTNDSBCPULiCYH4VKdvAgUIJjZikzPzuCDN/pLgBDZrWdZHZEDFxzRjV6+/dXOGpJtsNuQfDc0Nby4T1eCEfulkdmRRsiWTYILQZcJLePgZN3QxkWGdRFJJVeDk/5AApsgQBkfH8X4Nukm1fHwfSnqqFmrWTgc+V2muE6DOGg9+o2otkESQ3AYr9DPHAKbhdYzEA");				
		return true;
	}			
	return false;
}

function nombreUnidad(codigo){
	var myUnidadJson = eval('(' +document.forms[0].jsonUnidades.value+ ')');
	for(var i=0; i< myUnidadJson.unidades.length;i++){
		if (myUnidadJson.unidades[i].Codigo==codigo)
			return(myUnidadJson.unidades[i].Nombre);
	}
	return("No se encontro unidad con codigo"+ codigo);

}

function CargarComboActuaciones(){
	var combo = document.forms[0].ActuacionNro
	var UniActs = document.forms[0].UnidadActuaciones
	var vUniActs = StringToVector3(UniActs.value,";");
	for (var i=0;i<vUniActs.vLength;i++){
		combo.options[combo.options.length]=new Option((i+1)+".- "+nombreUnidad(vUniActs.vArray[i]),(i+1))
	}
}

function abrirDocInf(nompdf){
	window.open(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+location.pathname+"/$file/"+nompdf);
}

function abrirDoc(id,tipoDoc,unidad){
	var url = urlPortal+"/abrirDocumento?OpenAgent&id="+id+"&tipoDoc=DOCUMENTOS&unidad="+unidad+"&defDoc="+tipoDoc+"&actionHide=1";;
	//window.location.replace(url);
	//window.open(url);
	window.open(url,'Documento','menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=790,height=590') ;
}

/************************** Fin Funciones auxiliares *******************************/

/******************* Funciones utilizadas por las acciones *************************/

function Editar(){
	//var userActual = document.all("sUsuarioActual").value;
	var userActual = document.getElementById("sUsuarioActual").value;
	pos = userActual.indexOf("/");
	userActual = userActual.substring(3,pos);
	//var firmada = 	document.all("Firmantes").value;
	var firmada = document.getElementById("Firmantes").value;
	
	if (firmada != ""){
		if (ValidarFirmanteEditar()){
			if (ValidarActFirmada()){
				OcultarMenu();
				$("#dialog_pausa").dialog( "open");
				window.location=DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_actuacion_edit" + ",ID=" + document.forms[0].ccNroExp.value;	
			}
		}
	}else{
		if (ValidarFirmanteEditar()){
			OcultarMenu();
			$("#dialog_pausa").dialog( "open");
			window.location=DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_actuacion_edit" + ",ID=" + document.forms[0].ccNroExp.value;	
		}		
	}
}

function Salir(){
	if (ConfirmarOperacion('Salir'))	{
		OcultarMenu();
		window.location=DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_actuacion_salir" + ",ID=" + document.forms[0].ccNroExp.value;	
	}
}

function GuardarLiberar(){
	if (ValidarCampos()){ 
		OcultarMenu();	
		$("#dialog_pausa").dialog( "open");
		document.forms[0].sAccion.value="acc_liberar_g";	
		document.forms[0].SalvarFormulas.click();
	}
}

function Guardar(){
	if (ValidarCampos()){ 	
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		document.forms[0].sAccion.value="acc_actuacion_guardar";
		document.forms[0].SalvarFormulas.click();
//		document.forms[0].submit();
	}
}

function AutoGuardar(){
	OcultarMenu();
	window.scrollTo(0,0);
	if (document.forms[0].corrector.value=="1"){
		eWebEditPro.save();
	}
	document.forms[0].sAccion.value="acc_carat_edit_act";			
	document.forms[0].SalvarFormulas.click();
	CPW_showWindow(1);
}


function Reservar()
{
	if (ConfirmarOperacion('Reservar'))	{
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		window.location = DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_reservar" + ",ID=" + document.forms[0].ccNroExp.value;	
	}
}


function Liberar(){
	if (ConfirmarOperacion('Liberar'))	{
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		window.location = DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_liberar" + ",ID=" + document.forms[0].ccNroExp.value;	
	}
}

function validarTextoEnActuacion(){
	var textoAct = document.getElementById("sTexto").value;
	var anexos = document.getElementById("attachAnexos").value;
	if(textoAct=="" && anexos==0){		
		alert ("Debe editar el texto de la actuación o anexar archivos para poder firmarla.");
		return false;
	}else{
		return true;
	}
}

function Firmar(id){
	if(validarTextoEnActuacion()){
		if(document.getElementById("firmaApplet").value=="1"){
			$("#dialogApplet").dialog( "open");
		}else{
			$("#dialog0").dialog( "open");
		}
	}
}

function Firmar2(id){
	OcultarMenu();
	$("#dialog_pausa").dialog( "open");
	window.location = DirABS()+"FParametrosFirma?openform&act=" +id ;	

}

function FirmarPasar(id){
	if(validarTextoEnActuacion()){
		if (document.forms[0].ErrorFirma.value!="1"){
			if (document.forms[0].sTipoRuta.value!="Predefinida"){
				cargarDatosPase();
				document.forms['jqueryPase'].sAccion.value="acc_firmarPasar"
				$("#dialogPase").dialog( "open");
			}else{
				cargarUnidadesRuta();
				$("#dialogPaseRuta").dialog("open");
			}
			if (document.forms[0].PaqueteAviso.value=="1"){
				$("#dialogAviso").dialog( "open");
			}
		}else{
			alert("No se pudo validar la firma. Consulte con el Administrador");
		}
	}
}

function DarPase(){
	if (document.forms[0].ErrorFirma.value!="1"){
		if (document.forms[0].sTipoRuta.value!="Predefinida"){
			cargarDatosPase();
			document.forms['jqueryPase'].sAccion.value="acc_pase"
				$("#dialogPase").dialog( "open");
		}else{
			document.forms['dojoPaseRuta'].sAccion.value="acc_rutear"
			cargarUnidadesRuta();
			$("#dialogPaseRuta").dialog( "open");
		}
		if (document.forms[0].PaqueteAviso.value=="1"){
			$("#dialogAviso").dialog( "open");
		}
	}else{
		alert("No se pudo validar la firma. Consulte con el Administrador");
	}
}

function Asignar()
{
	$('#dialogAsignar').dialog('open');
}

function ParaFirmar()
{
	/*if (ConfirmarOperacion('Para Firmar'))	{
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		window.location=pathDB + "/Controller?openAgent&User=" + usuario + ",Accion=FParametrosParaFirmar" + ",ID=" + nro;	//acc_para_firmar
	}*/
	$("#dialogParaFirmar").dialog( "open");
}
function EnviarPase()
{
	if (ConfirmarOperacion('Enviar a Pase'))	{
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		window.location= DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_enviar_pase" + ",ID=" + document.forms[0].ccNroExp.value;	
	}
}

function DevolverExpediente(){
	if (ConfirmarOperacion('Devolver'))	{
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		window.location= DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=FParametrosDevolver" + ",ID=" + document.forms[0].ccNroExp.value;	
	}
}

function Archivar(){
	if (ConfirmarOperacion('Archivar'))	{
		OcultarMenu();
		$("#dialog_pausa").dialog( "open");
		window.location=DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=acc_archivar" + ",ID=" + document.forms[0].ccNroExp.value;	
	}
}

function addlectoresConfidencial(){
	OcultarMenu();
	$("#dialog_pausa").dialog( "open");
	window.location=DirABS()+"Controller?openAgent&User=" + usuario + ",Accion=FParametrosAddLectConfidencial" + ",ID=" + document.forms[0].ccNroExp.value;

}

function SalirBandejas(){
	var oficina = document.forms[0].sOficinaActual.value;
	if (ConfirmarOperacion('Salir a Bandejas'))	{
		OcultarMenu();
		//window.location=DirABS() + "/PostOperacion?openAgent&Accion=ir_bandejas" + ",nroExp=" + document.forms[0].ccNroExp.value + ",unidad=" + oficina ;	
		window.location.replace("/"+document.getElementById("sPathDbPortal").value+"/Bandejas?OpenForm&tipoDoc=Expediente")
	}
}

function SalirBandejasNotificaciones(){
	var oficina = document.forms[0].sOficinaActual.value;
	if (ConfirmarOperacion('Salir a Bandejas de Notificaciones'))	{
		OcultarMenu();	
		window.location.replace("/"+document.getElementById("sPathDbPortal").value+"/Bandejas?OpenForm&tipoDoc=Expediente&bandeja=tabNotificados")
	}
}

function SalirBandejaMarcados(){
	var oficina = document.forms[0].sOficinaActual.value;
	if (ConfirmarOperacion('Salir a Bandeja de Expedientes Marcados'))	{
		OcultarMenu();
		//window.location=DirABS() + "/PostOperacion?openAgent&Accion=ir_marcados" + ",nroExp=" + document.forms[0].ccNroExp.value + ",unidad=" + oficina ;	
		window.location.replace("/"+document.getElementById("sPathDbPortal").value+"/Bandejas?OpenForm&tipoDoc=Expediente&bandeja=tabMarcados")
	}
}

function BandejaMaximizada(widget,bandeja){
	var oficina = document.forms[0].sOficinaActual.value;
	if (ConfirmarOperacion('Salir a Bandejas'))	{
		OcultarMenu();	
		window.location.replace("/"+document.getElementById("sPathDbPortal").value+"/Bandejas?OpenForm&tipoDoc=Expediente&bandeja="+widget+"&estado="+bandeja+"$max")
	}
}

function SalirCaratula(){
	if (ConfirmarOperacion('Salir a Carátula'))	{
		OcultarMenu();
		window.location=DirABS()+"PostOperacion?openAgent&Accion=ir_caratula" + ",nroExp=" + document.forms[0].ccNroExp.value;	
	}
}
function SalirInicio(){
	if (ConfirmarOperacion('Salir a Inicio'))	{
		OcultarMenu();
		window.location= DirABS()+"PostOperacion?openAgent&Accion=ir_inicio" + ",nroExp=" + document.forms[0].ccNroExp.value;	
	}
}

function PantallaAnterior(){
	OcultarMenu();
	history.go(-1);
	//window.history.back();
}

function VerProcedimiento(){
	window.open(DirABS()+"VerProcedimiento?OpenForm",'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=560,height=360');
}

function Imprimir(strID){
	window.open(DirABS()+"PrintActuacion?openform&act=" +strID,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=790,height=590') ;	
}

function verRecorrido(param) {
	var pathDB=DirABS();
	if (param!='si')
		window.open(pathDB + "FRecorrido?OpenForm&ID="+document.forms[0].ccNroExp.value,'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=750,height=380');
	else
		window.open(pathDB + "FRecorrido?OpenForm&ED=si&ID="+document.forms[0].ccNroExp.value,'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=750,height=380');
}

function ImprimirExpediente(strID){
	var pathDB=DirABS();
	window.open(pathDB+"FPrintExp?openForm&ID=" + strID,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=790,height=590') ;	
}

function ImprimirExpedientePDF(nroExp){
	var nroExp=document.forms[0].ccNroExp.value;
	var cantAct=document.forms[0].cantAct.value;
	var pathDB=DirABS();

	window.location=pathDB+"ImpresionPdf?openform&nroExp="+nroExp+"&cantAct="+cantAct;
}

function PrintRangoActuaciones(strID){
	var pathDB=DirABS();

	window.location=pathDB+"FParametrosPrintActsRango?openForm&ID=" + strID;	
}

function ImprimirRecorrido(strID){
	var pathDB=DirABS();

	window.open(pathDB+"FPrintRecorrido?openForm&ID=" + strID,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=790,height=590') ;	
}

function VerExpediente(strID){
	window.open(DirABS()+"FVerExp?openForm&ID=" + strID,'Expediente','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=1,TOP=1,width=740,height=480') ;	
}

function verNotificaciones(){
	var pathDB=DirABS();
	var nro=document.forms[0].ccNroExp.value;
	window.open(DirABS()+"FNotificaciones?OpenForm&ID=" + nro,'Notificaciones','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=550,height=380');
}

function MarcarExpediente(){
	$("#dialogMarcarExp").dialog( "open");
}

function GenerarDocumento(){
	$("#dlgGenerarDoc").dialog( "open");
}

function irActuacion(){
	var nro=document.forms[0].ccNroExp.value; 
	var pathDB=DirABS();
	OcultarMenu();
	var url=pathDB+"FParametrosIrActuacion?OpenForm&ID=" + nro ;
	window.location=url;
}

function navegarActuacion(){
	nro = document.forms[0].ccNroExp.value;
	var actuaciones = document.all("ActuacionNro");
	var NroAct=actuaciones[actuaciones.selectedIndex].value;
	if (confirm("¿Desea abrir la actuación en una nueva ventana?"))
		window.open(DirABS()+"vBusqActNroAct/" + NroAct + nro +"?OpenDocument","SEE",'location=yes,menubar=yes,toolbar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=600,height=480');	
	else
		window.location= DirABS()+"vBusqActNroAct/" + NroAct + nro +"?OpenDocument";
}


function QuitarMarcas(){
	$("#dialogQuitarMarcas").dialog("open");
}


//Funciones para la copia de expedientes
function CopiarExpediente(strID){
	window.location = "/"+ pathCopia + "/FParametrosCopiarExpediente?openForm&ID=" + strID;
}

function verCopiasExpediente() {
	var pathDB=DirABS();
	window.open(pathDB+"/FVerCopiasExpediente?OpenForm&ID="+frm.ccNroExp.value,'Recorrido','status=yes,resizable=yes,scrollbars=yes,LEFT=320,TOP=260,width=750,height=400');
}

/*********** FIRMA Y OCULTAMIENTO DE APPLETs **************/

function ocultarApplet(subform){
	if (subform=="AccFirmarApplet"){		
		$("#dialogApplet").dialog("close");
		document.applets["applet"].style.display="none";
		document.getElementById("textoConfirmarFirma").style.display="block";
	}else if(subform=="AccPaseApplet"){
		$("#dialogPase").dialog("close");
		document.getElementById("appletFirmaPase").style.display="none";
		document.getElementById("pasosContainer").style.display="block";
		document.getElementById("Paso1").style.display="block";
		document.getElementById("Paso2").style.display="none";
	}else if(subform=="AccPaseRutaApplet"){
		document.getElementById("appletPaseRuta").style.display="none";
		dlgPaseRuta.hide();
	}
}

function appletFirmarJava(valor,subform){
	if (subform=="AccFirmarApplet"){
		document.forms['jqueryFirmaApplet'].sFirma.value=valor;
		if (document.forms['jqueryFirmaApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['jqueryFirmaApplet'].submit();
		}
	}else if(subform=="AccPaseApplet"){
		document.forms['jqueryPase'].sFirma.value=valor;

		if (document.forms['jqueryPase'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['jqueryPase'].submit();
		}
	}else if(subform=="AccPaseRutaApplet"){
		document.forms['dojoPaseRuta'].sFirma.value=valor;

		if (document.forms['dojoPaseRuta'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dojoPaseRuta'].submit();
		}
	}
}
/*********** FIRMA Y OCULTAMIENTO DE APPLETs **************/

/***************** Funcion on onLoad **********************/

$(document).ready(function() {
	//Se setean las variables
	frm=window.document.forms[0];
	estado = frm.sSubEstado.value;
	pathCopia = frm.sPathCopia.value;

	anexoSeleccionado="";
	pathDB=DirABS();
	nro=document.forms[0].ccNroExp.value;
	try{
		usuario=document.forms[0].sUsuarioActual.value;
	}catch(e){}

	if (document.forms[0].sTiempoGuardado.value!="0")
		setTimeout("AutoGuardar()", document.forms[0].sTiempoGuardado.value * 60 * 1000 );
		
	if (document.forms[0].editmode.value!="1"){	
		var url = "/" + document.forms[0].sPathDbOrg.value + '/unidadesdojoBandejas?OpenView&Count=3000';
		$.ajax(url,{
			    contentType: "application/json",
				dataType: "text",
				async: false,
				success: function(data) {
					document.forms[0].jsonUnidades.value=data;
				}
		});
	};

	//**************** Postits *********************//
	if(document.getElementById("postitHabilitado").value == "1")
		(getArrays())? showUserTooltips():""
	//***********************************************//
		
	//************ Dialogos de acciones *************//
		/*Dialogo de procesando*/
	if($("#dialog_pausa").length>0){
		$("#dialog_pausa").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			height: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
		/*Dialogo de generar documento*/
	if($("#dlgGenerarDoc").length>0){
		$("#dlgGenerarDoc").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
				//$("").remove();
			}
		}).height("auto");
		/*Datepicker para la accion generar documento*/
		if($("#fVencimiento").length>0){
			$("#fVencimiento").datepicker({
				showOn: "button",
				buttonImage: document.getElementById("imgCalendar").value,
				buttonImageOnly: true,
				dateFormat: "dd/mm/yy"
			});
		}	
	}
		/**********************/
		/*Dialogo de la accion Firmar applet*/
	if($("#dialogApplet").length>0){
		$("#dialogApplet").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			height: 280,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
		/*Dialogo de la accion Firmar*/
	if($("#dialog0").length>0){
		$("#dialog0").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
		/*Dialogo de la accion asignar*/
	if($("#dialogAsignar").length>0){
		$("#dialogAsignar").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
	/*Dialogo de la accion marcar Exp*/
	if($("#dialogMarcarExp").length>0){
		$("#dialogMarcarExp").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
	/*Dialogo de la accion para firmar*/
	if($("#dialogParaFirmar").length>0){
		$("#dialogParaFirmar").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
	/*Dialogo de la accion aviso 2*/
	if($("#dialogAviso2").length>0){
		$("#dialogAviso2").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
	
		/**********************/
	/*Dialogo de la accion notificacion*/
	if($("#dialogNotificacion").length>0){
		$("#dialogNotificacion").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
	/*Dialogo de la accion pase applet*/
	if($("#dialogPase").length>0){
		$("#dialogPase").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:true,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/
	/*Dialogo de la accion firmar y dar pase ruta applet*/
	if($("#dialogPaseRuta").length>0){
		$("#dialogPaseRuta").dialog({
			bgiframe: true,
			autoOpen:false,
			resizable:false,
			draggable:false,
			width: 670,
			modal: true,
			open: function(event, ui) {
				$('a.ui-dialog-titlebar-close, a.ui-corner-all, a.ui-state-focus' ).remove();
			}
		}).height("auto");
	}
		/**********************/

	(function( $ ) {
	    $.widget( "custom.combobox", {
	    	options: {
	    		width:"auto"
	    	
	    	},
	      _create: function() {
	        this.wrapper = $( "<span>" )
	          .addClass( "custom-combobox" )
	          .insertAfter( this.element );
	        this.element.hide();
	        this._createAutocomplete();
	        this._createShowAllButton();
	      },
	      _createAutocomplete: function() {
	        var selected = this.element.children( ":selected" ),
	          value = selected.val() ? selected.text() : "";
	        this.input = $( "<input>" )
	          .appendTo( this.wrapper )
	          .val( value )
	          .attr( "title", "" )
	          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
	          .autocomplete({
	            delay: 0,
	            minLength: 0,
	            source: $.proxy( this, "_source" )
	          })
	          .tooltip({
	            tooltipClass: "ui-state-highlight"
	          }).width(this.options.width);
	        this._on( this.input, {
	          autocompleteselect: function( event, ui ) {
	            ui.item.option.selected = true;
	            this._trigger( "select", event, {
	              item: ui.item.option
	            });
	          },
	          autocompletechange: "_removeIfInvalid"
	        });
	      },
	      _createShowAllButton: function() {
	        var input = this.input,
	          wasOpen = false;
	        $( "<a>" )
	          .attr( "tabIndex", -1 )
	          .attr( "title", "Show All Items" )
	          .tooltip()
	          .appendTo( this.wrapper )
	          .button({
	            icons: {
	              primary: "ui-icon-triangle-1-s"
	            },
	            text: false
	          })
	          .removeClass( "ui-corner-all" )
	          .addClass( "custom-combobox-toggle ui-corner-right" )
	          .mousedown(function() {
	            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
	          })
	          .click(function() {
	            input.focus();
	            // Close if already visible
	            if ( wasOpen ) {
	              return;
	            }
	            // Pass empty string as value to search for, displaying all results
	            input.autocomplete( "search", "" );
	          });
	      },
	      _source: function( request, response ) {
	        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
	        response( this.element.children( "option" ).map(function() {
	          var text = $( this ).text();
	          if ( this.value && ( !request.term || matcher.test(text) ) )
	            return {
	              label: text,
	              value: text,
	              option: this
	            };
	        }) );
	      },
	      _removeIfInvalid: function( event, ui ) {
	        // Selected an item, nothing to do
	        if ( ui.item ) {
	          return;
	        }
	        // Search for a match (case-insensitive)
	        var value = this.input.val(),
	          valueLowerCase = value.toLowerCase(),
	          valid = false;
	        this.element.children( "option" ).each(function() {
	          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
	            this.selected = valid = true;
	            return false;
	          }
	        });
	        // Found a match, nothing to do
	        if ( valid ) {
	          return;
	        }
	        // Remove invalid value
	        this.input.val( "El valor ingresado no existe" )
	        this.element.val( "" );
	        this._delay(function() {
	        	this.input.val( "" )
	        }, 2500 );
	        this.input.data( "ui-autocomplete" ).term = "";
	      },
	      _destroy: function() {
	        this.wrapper.remove();
	        this.element.show();
	      }
	    });
	  })( jQuery );
	//***********************************************//
});

/***************** Fin Funcion on onLoad **********************/