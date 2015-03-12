var frm;
var tab;
var tabselect='repartido'; //'proyecto';
var anexoSeleccionado;
var mydata;
var obj;
var CambioNR;

function tabs(tab)
{
tabselect=tab;
	if (tab=='proyecto')	{
		document.all('proyecto').style.display='block';
		MisTabs.setSelectedItems([1]);
		//JSFX.fadeIn('Proyecto_IMG');	
	}else{
		document.all('proyecto').style.display='none';
		//JSFX.fadeOut('Proyecto_IMG');

		}
	if (tab=='resolucion')	{
		document.all('resolucion').style.display='block';
		MisTabs.setSelectedItems([2]);
		//JSFX.fadeIn('Resolucion_IMG');		
	}else{
		document.all('resolucion').style.display='none'; 
		//JSFX.fadeOut('Resolucion_IMG');		
		}
	if (tab=='repartido')	{
		MisTabs.setSelectedItems([0]);
		document.all('repartido').style.display='block';		
	}else{
		document.all('repartido').style.display='none';		
		}
}

function ValidarCampos()
{
if(validarNroResol()){
	if (validar(frm.sAsunto,"Debe ingresar una referencia para el asunto"))
	{	
		try{
			if(document.all.ecsTexto.DOM.body.innerHTML=="<P>&nbsp;</P>")
			{	
				alert('Debe ingresar el proyecto de resolución');
				return false;
			}							
			document.forms[0].PRD.value ="1";
			return true;	
		}catch(exception){
			if(document.all.sTexto.value=="<P>&nbsp;</P>")
			{	
				alert('Debe ingresar el proyecto de resolución');
				return false;
			}							
			document.forms[0].PRD.value ="1";
			return true;		
		}		
		
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
	var div;
	div=document.getElementById("barraMenu");
	if (div)
		div.style.visibility="hidden";
	div=document.getElementById("Archivo");
	if (div)
		div.style.visibility="hidden";
	div=document.getElementById("Acciones");
	if (div)
		div.style.visibility="hidden";
	div=document.getElementById("Salir");
	if (div)
		div.style.visibility="hidden";
	div=document.getElementById("SalirBandejas");

	if (div)
		div.style.visibility="hidden";
}

function Salir(id,accion){
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
					if(document.forms[0].esextra.value != "1")
			
					document.forms[0].sAccion.value = "acc_crear_asunto";
					else
					document.forms[0].sAccion.value = "acc_crear_asunto_extra";
				}
				else  //no tengo que llamar niguna acción
				{
				document.forms[0].sAccion.value = "acc_abrir_asunto";
				};
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
function validarFirmaAccion(){
	/*if (document.forms[0].ErrorFirma){
		if (document.forms[0].ErrorFirma.value!=""){
			alert("No se pudo validar la Firma");
			return false; // No se valido la firma
		}else{
			return true; // Las firmas son validas
		}
	}else{
		return true; // No hay firmas que validar
	}*/
	return true;

}
function AgregarASesion(id)
{
	if (!validarFirmaAccion()){
		return;
	}
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+'/FParametrosAgregarSesion?Openform&ID='+id+',unidad='+document.forms[0].sUnidad.value+',frameorigen='+document.forms[0].cvRetorno.value+',vistaorigen=FBandejaPendientes';
}		

function ModificarNro(id)
{
	if (!validarFirmaAccion()){
		return;
	}
	OcultarMenu();
	var pathDB = DirABS();
	var nrosesion = document.forms[0].ccnNroSesion.value;
	var nropunto = document.forms[0].ccnNroPunto.value;
	window.location.href = pathDB+'/FParametrosModificarNro?Openform&ID='+id+",NroSesion="+nrosesion+",NroPunto="+nropunto+',frameorigen='+document.forms[0].cvRetorno.value+',vistaorigen=FBandejaPendientes';
}


function Salvar(id){
	var pathDB = DirABS();
	if (ValidarCampos()) 
	{ 	
		OcultarMenu();
		document.forms[0].sTema.value = dojo.widget.byId("sTemaDojo").getValue();
		if (document.forms[0].cvDocNuevo.value == "1")
		{
			if(document.forms[0].esextra.value != "1")
			
				document.forms[0].sAccion.value = "acc_crear_asunto";
			
			else
				document.forms[0].sAccion.value = "acc_crear_asunto_extra";
		}
		else
		{
			document.forms[0].sAccion.value = "acc_abrir_asunto";
		};
		var accion = document.forms[0].sAccion.value;
		var frame= document.forms[0].cvRetorno.value;
		document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",frameorigen="+frame+",vistaorigen=FBandejaPendientes,usr="+document.forms[0].sUsuario.value+"]"
						document.forms[0].SalvarFormulas.click();
	}
}

function Editar(id){
	OcultarMenu();
	var pathDB=DirABS();
	window.location=pathDB + "/ControllerResoluciones?openAgent&Accion=acc_ctrl_editar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
}	

function CrearExpediente(id){
//NO SE USA
//	var pathDB=DirABS();
//	window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_crear_expediente" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
}	

function ModificarEstado(estado,id){
	if (!validarFirmaAccion()){
		return;
	}
	var pathDB = DirABS();
	switch (estado)
	{
		case 'APROBAR':
			if (validarAprobar()){
				OcultarMenu();
				window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_aprobar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
			}
			break;
		case 'FIRMAR_APROBAR':
			OcultarMenu();
			window.location=pathDB + "/FParametrosFirmaryAprobar?openform&id=" +id;
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
	}
}

function Imprimir(id,tipo){
//Recibe el id del doc a imprimir y qué se imprime (resolucion o proyecto)
	var pathDB = DirABS();
	window.open(pathDB+'/FPuntoImp?OpenForm&ID='+id+',Tipo='+tipo,'Impresión','status=yes,resizable=yes,menubar=yes,scrollbars=yes,left=1,top=0,width=685,height=550');
}	

function FirmarResolucion(id)
{
		if (!validarFirmaAccion()){
			return;
		}
		OcultarMenu();
		var pathDB = DirABS();
		window.location=pathDB + "/FParametrosFirma?openform&IDDoc=" +id+",urlorigen="+document.forms[0].cvRetorno.value;
}

function PublicarResolucion(id){
	if (!validarFirmaAccion()){
		return;
	}
	OcultarMenu();
	var pathDB=DirABS();
	window.location=pathDB + "/FParametrosPublicar?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;	
}
function validarAprobar(){
var texto=document.forms[0].HayTextoRes.value;
if (texto=='' ){
	alert('Debe ingresar la Resolución');
	return false;
}


return true;
}


function OpenCaratula(id){
var pathDB=DirABS();
	window.open(pathDB + "/openCaratula?openAgent&nroExp=" +id);
}

function validaAttachs(){
	if (frm.NroAttachs.value=="0" )
		return false;	
	return true;
}

function validarNroResol(){
  return true;
}

function VerExpediente(strID){
	 window.open(DirABS()+ "/FVerExp?openForm&ID=" + strID,'Expediente','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=1,TOP=1,width=740,height=480') ;	
}
function VerHistorial(unid){

	window.open(DirABS()+"/Historial?OpenForm&idDoc="+unid+"&estado="+document.forms[0].ccEstado.value,'Historial','menubar=no,status=no,resizable=yes,scrollbars=yes,LEFT=1,TOP=1,width=440,height=200') ;
}
	
function selNroResol(boton){
	/*var x=findPosX(boton);
	var y=findPosY(boton);
	window.open(DirABS()+"/SelNroResol?OpenForm&nroses="+document.forms[0].sNroSesion.value,'NroResol','menubar=no,status=no,resizable=no,scrollbars=no,LEFT='+x+',TOP='+y+',width=300,height=80') ;*/
	document.forms[0].ccnNroRes.value=document.forms[0].nrosugerido.value
}

function findPosX (obj) 
	{	
		var curleft = 0;
		if (obj.offsetParent)
		{
			while (obj.offsetParent)
			{
				curleft += obj.offsetLeft
				obj = obj.offsetParent;
			}
		}
		else if (obj.x)
			curleft += obj.x;
		
		return curleft;
	}

	function findPosY (obj)
	{
		var curtop = 0;
		if (obj.offsetParent)
		{
			while (obj.offsetParent)
			{
				curtop += obj.offsetTop
				obj = obj.offsetParent;
			}
		}
		else if (obj.y)
			curtop += obj.y;
			
		return curtop;
	}
function FirmaryEnviaraRevision(id){
	if (!validarFirmaAccion()){
		return;
	}
var pathDB = DirABS();
	var texto=document.forms[0].HayTextoPry.value;
	if (texto!=''){
		if (confirm("¿Esta seguro que desea continuar con la operación Firmar y Enviar a Revisión?")){
			OcultarMenu();
			window.location=pathDB + "/ParametrosPasaraRevision?openForm&id=" + id ;	
		}
	}else{
		alert('Debe ingresar Texto en el proyecto de resolución');
	}
		
}
function EnviaraRevision(id){
	if (!validarFirmaAccion()){
		return;
	}
	var pathDB = DirABS();
	var texto=document.forms[0].HayTextoPry.value;
	if (texto!=''){
		if (confirm("¿Esta seguro que desea continuar con la operación Enviar a Revisión?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_enviar_a_revisar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
	}else{
		alert('Debe ingresar Texto en el proyecto de resolución');
	}
}
function PasaraBorrador(id){
	
var pathDB = DirABS();
	if (confirm("¿Esta seguro que desea continuar con la operación Pasar a Borrador?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_pasar_a_borrador_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
}
function Anular(id){
	
var pathDB = DirABS();
	if (confirm("¿Esta seguro que desea continuar con la operación Anular Asunto?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_anular_pto" + ",Id=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
}
function Autorizar(id){
	if (!validarFirmaAccion()){
		return;
	}
var pathDB = DirABS();
	if (confirm("¿Esta seguro que desea continuar con la operación Autorizar?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_autorizar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;				
	}
}
function FirmaryAutorizar(id){
	if (!validarFirmaAccion()){
		return;
	}
var pathDB = DirABS();
	if (confirm("¿Esta seguro que desea continuar con la operación Firmar y Autorizar?")){
			OcultarMenu();
			window.location=pathDB + "/ParametrosAutorizar?openForm&id=" + id;	
	}
}
function QuitarAutorizar(id){
var pathDB = DirABS();
	if (confirm("¿Esta seguro que desea continuar con la operación Quitar Autorización?")){
			OcultarMenu();
			window.location=pathDB + "/(ControllerResoluciones)?openAgent&Accion=acc_quitar_autorizar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value+",usr="+document.forms[0].sUsuario.value;	
		}
}

function seleccionTema(boton){
	NamePicker.init( {
	  prompt: '<p>Seleccione el tema del asunto</p>',
	  addressbook: "",
	  viewname: '(SelUAj)',
	  campoOrigen:'sTemas',
	  erase_field:"sTemas",
	  column: 1,
	  empty: true
	})
	NamePicker.open(boton, 'sTema', 'singleenlazada', 'Seleccione el tema');
}
function cargarAnexos(){
	var nombres = StringToVector3(document.forms[0].NombresAnexos.value,";");
	var tamanos = StringToVector3(document.forms[0].TamanoAnexos.value,";");
	var fechas = StringToVector3(document.forms[0].FechasAnexos.value,";");
	mydata = new Array();
	for (var i=0;i<nombres.vLength;i++){
		mydata[i]=[nombres.vArray[i],tamanos.vArray[i],fechas.vArray[i]]
	}
	obj = new Active.Controls.Grid;
	obj.setId("grid1");
	obj.setColumnTemplate(new Active.Templates.Image, 0);
	var row = new Active.Templates.Row; 
	row.setEvent("ondblclick", function(){this.action("dobleClick")}); 
	obj.setTemplate("row", row);
   	obj.setAction("dobleClick", abrirAnexo); 
   	obj.setRowProperty("count",nombres.vLength);
	obj.setColumnProperty("count", 3);
	obj.setDataProperty("text", function(i, j){return mydata[i][j]}); 
	obj.setDataProperty("image", function(i, j){return mydata[i][3]});
	obj.setColumnProperty("texts" , ["Nombre de archivo", "Tamaño", "Fecha anexado"]);
	obj.setColumnHeaderHeight("20px");
	obj.setRowHeaderWidth("0px");
	var message = function(){anexoSeleccionado=mydata[this.getSelectionProperty("index")][0];}
	obj.setAction("selectionChanged", message);
	document.write(obj);
}
function abrirAnexo(){
if (anexoSeleccionado=="")
		alert('Debe seleccionar un anexo');
	else{
		window.open(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+location.pathname+"/$file/"+anexoSeleccionado);
	}
}
function BorrarAnexo(){

	if (anexoSeleccionado=="")
		alert('Debe seleccionar un anexo');
	else{
		if (document.all("%%Detach").type=="checkbox"){
			document.all("%%Detach").click();
			mydata= [["", "", "", ""]];
			obj.setRowCount=1;
			obj.refresh();
		}
		else{
		
			//NO ANDA PORQUE EL TAMAÑO DE LOS CHECK SIGUE SIENDO EL MESMO MIENTRAS EL ARRAY SE ACHICA
			var flagBorrado=false;
			var myData2 = new Array(mydata.length-1);
			for (var i=0;i< document.all("%%Detach").length;i++){					
							
				if (document.all("%%Detach")[i].value==anexoSeleccionado){
					document.all("%%Detach")[i].click();				
							
				}
				
				/*else{				
					if (flagBorrado==true){
						myData2[i-1] = myData[i];						
					}	
					else{
						myData2[i] = myData[i];
						
					}	
					
				}
				*/
			
			}		

			for (var i=0;i<mydata.length;i++){
				if (mydata[i][0]==anexoSeleccionado)
					flagBorrado=true;	

				else if (flagBorrado==true){
						myData2[i-1] = mydata[i];						
				}	
				else{
					myData2[i] = mydata[i];
				}	
			}	
			mydata = myData2;


			obj.setRowProperty("count", mydata.length);			
			obj.refresh();
			anexoSeleccionado="";
		}
	}	
}
function Notificar(id){
	var pathname=location.pathname;  
window.location=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+document.forms[0].baseNotif.value+"/Memo?OpenForm&id="+id

}
// Valida las firmas de Creadores
function validarFirmas(usuarios,Firmantes,Fechas){
for (var i =0;i<usuarios.vLength;i++){
		usuario = usuarios.vArray[i];
		txtFecha= Fechas.vArray[i];
		if (Firmantes.vIsMember(usuarios.vArray[i])){
		 	// Aca tenemo que imprimir la firma
			document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
		} else{
			// No se pudo validar la firma del creador
			document.forms[0].ErrorFirma.value="1";
			document.write('<tr> <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+usuario+' . Consulte con el Administrador del sistema. </td></tr>');
		}
	}
}


