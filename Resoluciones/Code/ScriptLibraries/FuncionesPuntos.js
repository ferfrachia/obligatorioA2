var frm;

function Autorizar(id){
	if (!validarFirmaAccion()){
		return;
	}
var pathDB = DirABS();
	if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Autorizar?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_autorizar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;				
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
 *         la pÃ¡gina del documento que invoco referenciada por el id.
 */
function insertarImagen(nombreCampo, unid){
	/*
	 * obtengo DirABS y le agrego el formulario de carga de la imagen le agrego
	 * los parametros de la llamada correspondientes al nombre del campo y
	 * universal Id respectivamente. obtengo el patametro location y la paso
	 * como param tambien para volver a la pagina
	 * 
	 */ 
	
	var serverBase = document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+ document.getElementById("pathPortalNew").value;
	var url = serverBase + "/CargaImg?OpenForm&id="+unid
		+"&campo="+nombreCampo
			+"&docserver="+document.getElementById("sServerNew").value
				+"&docbase="+document.getElementById("sBaseNew").value
					+"&tipoDoc=asunto&pathBack="+location;	
	document.getElementById("pathimagenes").value = url;

	document.getElementById("imagen").value = "[" + url + "]";
	document.getElementById("banderaImagen").value = "si";
	// var path = DirABS();

	
	 // document.forms[0].submit();
	document.forms[0].SalvarFormulas.click();
	}

function Salir(id,accion){
	var pathDB = DirABS();
	if (document.forms[0].sModo.value == "1") // estÃ¡ en edicion
	{
		if (confirm('Â¿Desea guardar el documento antes de salir?'))
		{
			if (ValidarCampos()) 
			{ 		
				OcultarMenu();
				if (document.forms[0].cvDocNuevo.value == 1)
				{
					if(document.forms[0].esextra.value != "1")

						document.forms[0].sAccion.value = "acc_crear_asunto";
					else
						document.forms[0].sAccion.value = "acc_crear_asunto_extra";
				}
				else  // no tengo que llamar niguna acciÃ³n
				{
					document.forms[0].sAccion.value = "acc_abrir_asunto";
				}
				document.forms[0].Retorno.value ="["+pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion+"]";
				document.forms[0].SalvarFormulas.click();
			}
		}
		else
		{
			OcultarMenu();		
			if (document.forms[0].esNuevo.value=="1"){
				window.location.href = pathDB
			}else{	
				window.location.href = pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion;
			}
		}
	}
	else
	{
		OcultarMenu();
		window.location.href = pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion;
	}
}

function SalirInicio(id,accion){
	var pathDB = DirABS();
	if (document.forms[0].sModo.value == "1") // estÃ¡ en edicion
	{
		if (confirm('Â¿Desea guardar el documento antes de salir?'))
		{
			if (ValidarCampos()) 
			{ 		
				OcultarMenu();
				if (document.forms[0].cvDocNuevo.value == 1)
				{
					if(document.forms[0].esextra.value != "1")
						
						document.forms[0].sAccion.value = "acc_crear_asunto";
					else
						document.forms[0].sAccion.value = "acc_crear_asunto_extra";
				}
				else  // no tengo que llamar niguna acciÃ³n
				{
					document.forms[0].sAccion.value = "acc_abrir_asunto";
				}
				if (document.forms[0].cvRetorno.value != ""){
					document.forms[0].Retorno.value ="["+document.forms[0].Protocolo.value+'://'+document.forms[0].cvRetorno.value+"]";
				}else{
					document.forms[0].Retorno.value ="["+pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion+"]";
				}
				document.forms[0].SalvarFormulas.click();
			}
		}
		else
		{
			OcultarMenu();	
			if (document.forms[0].cvRetorno.value != ""){
				window.location.href =document.forms[0].Protocolo.value+'://'+document.forms[0].cvRetorno.value;
			}else{
				window.location.href =pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion;
			}
		}
	}
	else
	{
		OcultarMenu();
		if (document.forms[0].cvRetorno.value != ""){
			window.location.href =document.forms[0].Protocolo.value+'://'+document.forms[0].cvRetorno.value;
		}else{
			window.location.href =pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion;
		}
	}
}

function ValidarCampos()
{
if(validarNroResol()){
	if (validar(frm.sAsunto,"Debe ingresar una referencia para el asunto"))
	{	
			var texto = tinyMCE.get("sTexto").getContent();
			texto = texto.replace(/&nbsp;/gi, "");
			if(texto=="")
			{	
				alert('Debe ingresar el proyecto de resoluciÃ³n');
				return false;
			}							
			document.forms[0].PRD.value ="1";
			return true;								
	}
	return false;
}
return false;
}

function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function OcultarMenu(){
	document.getElementById('barraMenu').style.display = "none";
}

function Salvar(id){
	var pathDB = DirABS();
	if (ValidarCampos()) 
	{ 	
		OcultarMenu();
		// document.forms[0].sTema.value =
		// dojo.widget.byId("sTemaDojo").getValue();
		if (document.getElementById('cvDocNuevo').value == "1")
		{
			if(document.forms[0].esextra.value != "1")
				
				document.forms[0].sAccion.value = "acc_crear_asunto";
			
			else
				
				document.forms[0].sAccion.value = "acc_crear_asunto_extra";
		}
		else
		{
			
			document.forms[0].sAccion.value = "acc_abrir_asunto";
			var tny= tinyMCE.get("rComentarios");
			if(tny!=null){
				var texto = tinyMCE.get("rComentarios").getContent();
				texto = texto.replace(/&nbsp;/gi, "");
				// if(document.getElementById("rComentarios").value=="" |
				// document.getElementById("rComentarios").value==""){
				if(texto==""){
					document.forms[0].TieneComentarios.value="0";
				}else {
					document.forms[0].TieneComentarios.value="1";
				}
			}else{
				document.forms[0].TieneComentarios.value="0";
			}
		};
		var accion = document.forms[0].sAccion.value;
		var frame= document.forms[0].cvRetorno.value;
		
		
		
		document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value+"]"
		// alert(document.forms[0].Retorno.value);
//		alert(document.forms[0].Retorno.value);
//		alert(document.forms[0].sAccion.value );
		document.forms[0].SalvarFormulas.click();
	}
}
function validarNroResol(){
  return true;
}

function Editar(id){
	if (document.getElementsByName("UsuarioFirmaResol")[0].value!=""){
		if (confirm("En caso de continuar editando se eliminarÃ¡ la firma, Â¿Desea continuar?")){
			OcultarMenu();
			var pathDB=DirABS();
			window.location=pathDB + "/ControllerResoluciones?openAgent&Accion=acc_ctrl_editar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;				
		}
	} else {
		OcultarMenu();
		var pathDB=DirABS();
		window.location=pathDB + "/ControllerResoluciones?openAgent&Accion=acc_ctrl_editar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;
		
	}
	
	//ESTE ES EL CODIGO QUE ESTABA
	/*OcultarMenu();
	var pathDB=DirABS();
	window.location=pathDB + "/ControllerResoluciones?openAgent&Accion=acc_ctrl_editar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;
	*/	
}	

function EditarMigrado(id){
	var pathDB=DirABS();
	window.open(pathDB + "/xsp_Migracion.xsp?action=editDocument&documentId="+ id,id,'status=yes,resizable=yes,menubar=yes,scrollbars=yes,left=1,top=0,width=785,height=650');	

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

for (var i=0;i< document.getElementsByName("%%Detach").length;i++){
	if (document.getElementsByName("%%Detach")[i].value==anexoSeleccionado){
		document.getElementsByName("%%Detach")[i].checked = true;	
	}							
}

var g = new OS3Grid ();
g.set_headers ('Nombre de archivo', 'TamaÃ±o', 'Fecha de anexado');
var i = 0;

if(cant == 0){

try{

document.getElementsById("%%Detach").checked = true;	

}catch(e){

for (var i=0;i< document.getElementsByName("%%Detach").length;i++){
		
if (document.getElementsByName("%%Detach")[i].value==anexoSeleccionado){
		document.getElementsByName("%%Detach")[i].checked = true;	
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

function AgregarASesion(id)
{	
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+'/FParametrosAgregarSesion?Openform&ID='+id+',unidad='+document.forms[0].sUnidad.value+',frameorigen='+document.forms[0].cvRetorno.value+',vistaorigen=FBandejaPendientes';
}	

function AgregarASesionEnEjecucion(id){	
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+'/ParametrosAgregarSesionEnEjecucion?Openform&ID='+id+',unidad='+document.forms[0].sUnidad.value+',frameorigen='+document.forms[0].cvRetorno.value+',vistaorigen=FBandejaPendientes';
}

function CambiarReferencia(id)
{	
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+'/ParametrosCambiarReferencia?Openform&ID='+id;
}	

function none(){
}
function ModificarEstado(estado,id){	
	var pathDB = DirABS();
	switch (estado){
	case 'APROBAR':
		if (validarAprobar()){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_aprobar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
		break;
	case 'FIRMAR_APROBAR':
		if (validarAprobar()){
			$("#DialogoFirma").dialog("open");
		}
		break;
	case 'FIRMAR_RESOLUCION':
		
		if (validarAprobar()){
			document.dialogFirmaApplet.sAccion.value="acc_firmar_resolucion"
			$("#DialogoFirma").dialog("open");
		}
		break;
	case 'APLAZAR':
		OcultarMenu();
		window.location=pathDB + "/FParametrosAplazarPto?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;
		break;
	case 'RETIRAR':
		OcultarMenu();
		window.location=pathDB + "/FParametrosRetirarPto?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;		
		break;
	case 'RETIRAR_PREVIO':
		OcultarMenu();
		window.location=pathDB + "/FParametrosRetirarPtoPrevio?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;		
		break;
	case 'QUITAR_RETIRAR':
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_retirar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		break;
	case 'QUITAR_RETIRAR_PREVIO':
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_retirar_asunto_previo_sesion" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		break;
	case 'QUITAR_APLAZAR':
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_aplazar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		break;
	case 'QUITAR_APROBAR':
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_aprobar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		break;
	case 'BORRAR':
		OcultarMenu();
		window.location=pathDB + "/FParametrosBorrarAsunto?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;		
		break;
	case 'QUITAR_SESION':
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_de_sesion" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		break;
	case 'PUBLICAR_PTO':
		OcultarMenu();
		window.location=pathDB + "/FParametrosPublicarAsunto?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;		
		break;
	case 'CANCELAR_PUBLICACION':
		OcultarMenu();
		window.location=pathDB + "/FParametrosCancelarPublicar?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;		
		break;
	case 'TRATAR':
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_tratar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;
		break;
	case "QUITAR_TRATAR":
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_tratar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;
		break;	
	}
}

function validarAprobar(){
var texto=document.forms[0].HayTextoRes.value;
if (texto=='' ){
	alert('Debe ingresar el texto de la ResoluciÃ³n');
	return false;
}


return true;
}

function Anular(id){
	
var pathDB = DirABS();
	if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Anular Asunto?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_anular_pto" + ",Id=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
}

function Notificar(id){

	var pathname=location.pathname;  
	var texto =$("#Objetivo").find(".ObjetivoC font p").text(); 
	// var aux =
	// document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+document.forms[0].baseNotif.value+"/Memo?OpenForm&id="+id;
	var aux = document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+document.forms[0].baseNotif.value+"/crearNotificacionEnBorrador?OpenAgent&id="+id;
	aux+="&nroRes="+document.forms[0].ccnNroRes.value;
	window.location=aux;

}

function Imprimir(id,tipo){
// Recibe el id del doc a imprimir y quÃ© se imprime (resolucion o proyecto)
	var pathDB = DirABS();
	if (tipo=="Resolucion"){
		window.open(pathDB+'/FResImp?OpenForm&ID='+id+',Tipo='+tipo,'ImpresiÃ³n','status=yes,resizable=yes,menubar=yes,scrollbars=yes,left=1,top=0,width=685,height=550');
	}else if(tipo == "Proyecto"){
		window.open(pathDB+'/FPuntoImp?OpenForm&ID='+id+',Tipo='+tipo,'ImpresiÃ³n','status=yes,resizable=yes,menubar=yes,scrollbars=yes,left=1,top=0,width=685,height=550');
	}else if(tipo == "ProyectoResolucion"){
		window.open(pathDB+'/FPuntoResImp?OpenForm&ID='+id+',Tipo='+tipo,'ImpresiÃ³n','status=yes,resizable=yes,menubar=yes,scrollbars=yes,left=1,top=0,width=685,height=550');
	} else if(tipo=="ResolucionPDF"){
		if(document.getElementById("usaRepositorio").value=="Si" && document.getElementById("sEstadoSesion").value=="Finalizada"){
			urlRepo = document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+document.getElementById("pathRepoPdf").value+"/pdfResolucion/"+document.getElementById("ccnNroRes").value.replace("/","-")+ "/$File/"+document.getElementById("ccnNroRes").value.replace("/","-")+".pdf"
			window.open(urlRepo,'PDFResolucion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		}else window.open(pathDB + 'ImpResolucionPDF?openagent&uniddoc='+id,'PDFActa','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
	}	
}	

// Valida las firmas de Creadores

function validarFirmas(usuarios,Firmantes,Fechas,titulos){
	
	if (usuarios.vArray[0]!=null){
		firmas = usuarios.vArray[0].split(", ");
		var vecFirmas = stringToVector("Firmas");
	} else {
		firmas = usuarios;
	}

	if (Firmantes.vArray[0]!=null){
		validos = Firmantes.vArray[0].split(", ");
	} else {
		validos = Firmantes;
	}
	
	if (Fechas.vArray[0]!=null) {
		fecha = Fechas.vArray[0].split(", ");
	} else {
		fecha = Fechas
	}

for (var i =0;i<firmas.length;i++){
		
		txtFecha= Fechas.vArray[i];
		try{
		titulo = titulos.vArray[i];
		votsT = titulos.vArray[i].split(",");
		}catch(e){titulo=undefined;votsT=undefined;}
		
		vots=firmas;
	
		votsf = fecha;
		
		//Consulto si cada firma pertenece al vector de firmas validas
		if (jQuery.inArray( firmas[i], validos)!=-1){
		 	if(votsT!=undefined ){
				document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por '+votsT[i]+ ' ' +vots[i]+ ' el  ' + votsf[i] + '. </td></tr>');
			}else{
				document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por '+vots[i]+ ' el  ' + votsf[i] + '. </td></tr>');
			}		
			
		} else{
			// No se pudo validar la firma del creador
			document.forms[0].ErrorFirma.value="1";
			
			if(votsT!=undefined ){
				document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+votsT[i]+ ' ' +vots[i]+ ' . Consulte con el Administrador del sistema. </td></tr>');
			}else{
				document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario ' +vots[i]+ ' . Consulte con el Administrador del sistema. </td></tr>');
			}		
		}
	}
}

// Envia el Formulario a Revision del supervisor
function EnviaraRevision(id){
	if (!validarFirmaAccion()){
		return;
	}
	var pathDB = DirABS();
	var texto=document.forms[0].HayTextoPry.value;
	if (texto!=''){
		if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Enviar a RevisiÃ³n?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_enviar_a_revisar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
	}else{
		alert('Debe ingresar Texto en el proyecto de resoluciÃ³n');
	}
}

// Firma y Envia a Revision un asunto
function FirmaryEnviaraRevision(id){
	if (!validarFirmaAccion()){
		return;
	}
	var pathDB = DirABS();
	var texto=document.forms[0].HayTextoPry.value;
	if (texto!=''){
		// if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Firmar
		// y Enviar a RevisiÃ³n?")){
			// OcultarMenu();
			// window.location=pathDB + "/ParametrosPasaraRevision?openForm&id="
			// + id ;
		// }
		$( "#DialogoFirmaRevision" ).dialog( "open" );
	}else{
		alert('Debe ingresar Texto en el proyecto de resoluciÃ³n');
	}
}

// Pasa el Asunto a Borrador
function PasaraBorrador(id){
	
var pathDB = DirABS();
	if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Pasar a Borrador?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_pasar_a_borrador_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
}

function validarFirmaAccion(){
	/*
	 * if (document.forms[0].ErrorFirma){ if
	 * (document.forms[0].ErrorFirma.value!=""){ alert("No se pudo validar la
	 * Firma"); return false; // No se valido la firma }else{ return true; //
	 * Las firmas son validas } }else{ return true; // No hay firmas que validar }
	 */
	return true;

}

function FirmaryAutorizar(id){
	if (!validarFirmaAccion()){
		return;
	}
// var pathDB = DirABS();
// if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Firmar y
// Autorizar?")){
// OcultarMenu();
// window.location=pathDB + "/ParametrosAutorizar?openForm&id=" + id;
// }
	$( "#DialogoAutorizarFirma" ).dialog( "open" );
}

// Quita la autorizaciÃ³n de un asunto
function QuitarAutorizar(id){
var pathDB = DirABS();
	/*if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Quitar AutorizaciÃ³n?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_autorizar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}*/
$( "#dialog-form" ).dialog( "open" );
}
function llamarQuitarAutorizar(id){
	var pathDB = DirABS();
	if (confirm("Â¿Esta seguro que desea continuar con la operaciÃ³n Quitar AutorizaciÃ³n?")){
		OcultarMenu();
		window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_autorizar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value+",razon="+document.getElementById("razon").value;	
	}
}
function ocultarApplet(subform){
	if (subform=="AccFirmarApplet"){
		// document.forms['dojoFirmaApplet'].style.display="none";
		$( "#DialogoFirma" ).dialog("close");
		document.applets["applet"].style.display="none";
		document.getElementById("textoConfirmarFirma").style.display="block";
	}
	if (subform=="AccAutorizarFirmarApplet"){
		// document.forms['dojoFirmaApplet'].style.display="none";
		$( "#DialogoAutorizarFirma" ).dialog("close");
		document.applets["appletAutorizar"].style.display="none";
		document.getElementById("textoConfirmarAutorizarFirma").style.display="block";
	}
	if (subform=="AccFirmarRevisionApplet"){
		// document.forms['dojoFirmaApplet'].style.display="none";
		$( "#DialogoFirmaRevision" ).dialog("close");
		document.applets["appletRevision"].style.display="none";
		document.getElementById("textoConfirmarFirmaRevision").style.display="block";
	}
}

function appletFirmarJava(valor,subform){
	if (subform=="AccFirmarApplet"){
		document.forms['dialogFirmaApplet'].sFirma.value=valor;
		if (document.forms['dialogFirmaApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dialogFirmaApplet'].submit();
		}
	}
	if (subform=="AccAutorizarFirmarApplet"){
		document.forms['dialogAutorizarFirmaApplet'].sFirma.value=valor;
		if (document.forms['dialogAutorizarFirmaApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dialogAutorizarFirmaApplet'].submit();
		}
	}
	if (subform=="AccFirmarRevisionApplet"){
		document.forms['dialogFirmaRevisionApplet'].sFirma.value=valor;
		if (document.forms['dialogFirmaRevisionApplet'].sFirma.value=='NO'){
			alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
		}else{
			document.forms['dialogFirmaRevisionApplet'].submit();
		}
	}
}

function clickBtnBuscarExp(){
	$("#divTablaResultados").html("");
	$("#query").val("");
	$("#dialog_busqueda_exp").dialog("open");
}

function clickBtnAbrirExp(){
	if(document.forms[0].ccNroExp.value!=""){
		window.open(DirABS() +"/(OpenDoc)?OpenAgent&nro="+ document.forms[0].ccNroExp.value);
	}else{
		alert("No completÃ³ el campo expediente.");
		document.getElementById('ccNroExp').focus();
	}
}

function clickBtnValidarExp(){
	if(document.getElementById('ccNroExp').value != ""){
		url = "/"+document.getElementById("baseWS").value+"/ConsultaExisteExpediente?openAgent&id="+document.getElementById('ccNroExp').value;
		$("#dialog_pausa").dialog("open");
		$.ajax({
			url: url,
		  	dataType: "json",
		  	success: function(data, textStatus, jqXHR) {
		  		$("#dialog_pausa").dialog("close");
				if (data.error != "0"){
					alert("No se econtrÃ³ el expediente con nÃºmero " +document.getElementById('ccNroExp').value)
				}else{
					alert("El numero de expediente es vÃ¡lido");
				}
		  	}
		});		
	}else{
		alert("No completÃ³ el campo expediente.");
		document.getElementById('ccNroExp').focus();
	}
}


/**
 * @author Ismael Olivet
 * @param idAsunto
 *            corresponde al universalId del documento Asunto
 * @return si ocurre algun error despliega un mensaje, de lo contrario a una de
 *         operaciÃ³n exitosa
 */
function votarAsunto(idAsunto){
	var pathDB = DirABS();
	
	if(document.getElementById("sTextoResolucion").value!= "" ){
		if (confirm("Â¿Esta seguro que desea votar para la aprobaciÃ³n?")){
			OcultarMenu();
			
				window.location=pathDB + "/(ControllerResoluciones)?" +
						"openAgent&Accion=acc_votar_asunto" + ",ID=" + 
						idAsunto+",urlorigen="+document.forms[0].cvRetorno.value+
						",usr="+document.forms[0].sUsuario.value;				
		}
	}else{
		alert("Es necesario una resoluciÃ³n para poder votar.");
	}
		
}
/**
 * @author Ismael Olivet
 * @param usu
 *            corresponde con los datos del campo de usuariosvotantes
 * @param usufechas
 *            corresponde con los datos del campo de usuariosvotantesfechas
 * @param votos
 *            corresponde con el minimo de votos necesarios para aprobacion
 * @return genera una tabla con los usuarios que votaron y las fechas
 */
function generarTablaMuestra(usu, usufechas,votos,texto){
	// *si no contienen nada salgo de la funcion para no generar errores
	if(usufechas.vArray== "") return;
	
	// var u = new Vector(document.forms[0].votantes.value);
	var mivecu= StringToVector2(usu.vArray[0],",");
	var mivecuf = StringToVector2(usufechas.vArray[0],",");
	var name = "";
	document.write("<table>");
	for(i=0; i<mivecu.vLength; i++){
		// alert(mivecu.vArray[i]);
		name=  mivecu.vArray[i];
		name= name.split("/")[0];
		document.write('<tr > <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_tick_blue.gif?OpenImageResource"> </td> <td class="TextoNegritaLeft"> '+name+' '+texto+' '+mivecuf.vArray[i]+'</td><td>  </td></tr>');
	}
	// -controlar si la cantidad de votos es mayor o igual a la necesaria decir
	// aprobada por votos y si estado aprobada y menor que la cantidad de votos
	// necesarios.. manualmente.
	document.write("</table>")
	
}

/**
 * esta funcion es invocada desde los rti, en lectura para poder dibujar la img
 * en el campo.
 * 
 * @param nombre
 *            refiere al nombre de la imagen con la ext.
 * @return retorna el tag img con el relative path a la imagen que hace
 *         referencia
 */
function dibujarImg(nombre){
	// document.write("<img src='../"+
	// document.getElementById("universalidd")+"/$FILE/" + nombre+"' alt=''
	// />");
		return "<img src='../"+ document.getElementById("UNID").value+"/$FILE/" + nombre+"' alt='' />";
	}

function CambiarExtra(id){
	var pathDB = DirABS();
	window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_cambiar_pto_a_extra" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;
}

function cambiarEtiquetasTabs(tab, tabName){
//		alert(tab +"   "+ tabName);
//		alert(document.getElementById("tabs-1")== undefined);
		aux =tab;
        if(tab == 1){//es la pestaÃ±a de proyecto
        	if(document.getElementById("tabs-1")== undefined){
        		aux = aux-1;
        	}
        }else if(tab==2){
        	if(document.getElementById("tabs-1")== undefined){
        		aux = aux-1;
        	}
        	if(document.getElementById("tabs-2")== undefined){
        		aux = aux-1;
        	}
        }
//		alert(aux + tabName);
		var tabs = $("#tabs").tabs();
        $('#tabs ul:first li:eq('+aux+') a').text(tabName);
       
}

function GoToElement(domId){
	eval($(domId)).goTo();
}
function ProtegerDatos(unid){
	if (confirm("Â¿Esta seguro que desea Marcar/Desmarcar la protecciÃ³n de datos?")){
		OcultarMenu();
		window.location=DirABS() + "/(ControllerResoluciones)?openAgent&Accion=acc_proteccion_de_datos" + ",Id=" + unid+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
	}
}
/*
 * function salirPublico(){
 * 
 * var pathDB = DirABS(); window.location.href = pathDB+'/Publico'; }
 */