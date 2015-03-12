var frm;
var tab;
var tabselect='repartido'; //'proyecto';

var CambioNR;

function tabs(tab)
{
tabselect=tab;
	if (tab=='proyecto')	{
		document.all('proyecto').style.display='block';
		//JSFX.fadeIn('Proyecto_IMG');	
	}else{
		document.all('proyecto').style.display='none';
		//JSFX.fadeOut('Proyecto_IMG');

		}
	if (tab=='resolucion')	{
		document.all('resolucion').style.display='block';
		//JSFX.fadeIn('Resolucion_IMG');		
	}else{
		document.all('resolucion').style.display='none'; 
		//JSFX.fadeOut('Resolucion_IMG');		
		}
	if (tab=='repartido')	{
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
		if(document.all.ecsTexto1.DOM.body.innerHTML=="<P>&nbsp;</P>")
		{	
			alert('Debe ingresar el proyecto de resolución');
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
pathname=pathname.toUpperCase();
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5)))  
} 

function OcultarMenu(){
	menuBar.style.visibility = "hidden";
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
		window.location.href = pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion;
		}
	}
	else
	{
	OcultarMenu();
	window.location.href = pathDB+'/PostOperacionRD?Openagent&IdDoc='+id+',tipoDoc=FPunto,accion='+accion;
	}
}

function AgregarASesion(id)
{
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+'/FParametrosAgregarSesion?Openform&ID='+id+',frameorigen='+document.forms[0].cvRetorno.value+',vistaorigen=FBandejaPendientes';
}		

function ModificarNro(id)
{
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
		document.forms[0].Retorno.value = "["+pathDB+"/ControllerRD?OpenAgent&Id="+id+",Accion="+accion+",frameorigen="+frame+",vistaorigen=FBandejaPendientes]"
		document.forms[0].SalvarFormulas.click();
	}
}

function Editar(id){
	OcultarMenu();
	var pathDB=DirABS();
	window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_ctrl_editar_pto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
}	

function CrearExpediente(id){
//NO SE USA
//	var pathDB=DirABS();
//	window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_crear_expediente" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
}	

function ModificarEstado(estado,id){
	
	var pathDB = DirABS();
	switch (estado)
	{
		case 'APROBAR':
			if (validarAprobar()){
				OcultarMenu();
				window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_aprobar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
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
				window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_quitar_retirar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
			break;
		case 'QUITAR_RETIRAR_PREVIO':
				OcultarMenu();
				window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_quitar_retirar_asunto_previo_sesion" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
			break;
		case 'QUITAR_APLAZAR':
				OcultarMenu();
				window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_quitar_aplazar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
			break;
		case 'QUITAR_APROBAR':
				OcultarMenu();
				window.location=pathDB + "/ControllerRD?openAgent&Accion=acc_quitar_aprobar_asunto" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
			break;
		case 'BORRAR':
				OcultarMenu();
				window.location=pathDB + "/ControllerRD?openAgent&Accion=BORRAR_PUNTO" + ",ID=" + id+",urlorigen="+document.forms[0].cvRetorno.value;;	
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
		OcultarMenu();
		var pathDB = DirABS();
		window.location=pathDB + "/FParametrosFirma?openform&IDDoc=" +id+",urlorigen="+document.forms[0].cvRetorno.value;
}

function PublicarResolucion(id){
	OcultarMenu();
	var pathDB=DirABS();
	window.location=pathDB + "/FParametrosPublicar?openform&ID=" +id+",urlorigen="+document.forms[0].cvRetorno.value;	
}
function validarAprobar(){
var texto=document.forms[0].HayTextoRes.value;
if (texto=='' & !validaAttachs()){
	alert('Debe ingresar la Resolución o al menos un Anexo.');
	return false;
}
var nroRes=document.forms[0].ccnNroRes.value;
if (nroRes==''){
	alert('Debe ingresar el Número de Resolución.');
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
var NroActual=frm.ccnNroRes.value;
var str= new String(frm.NrosResol.value);

var vAux;
vAux = StringToVector2(str,", ");

if (frm.ccnNroRes.value!=CambioNR){
for( var i=0; i<vAux.vLength; i++)

	{
	if(NroActual==vAux.vArray[i]){
					alert("Este número de resolución, "+NroActual+" ,ya fue ingresado!!!");
					return false;
					}
	
	}

  }  
  return true;
    
}

function VerExpediente(strID){
	 window.open(DirABS()+ "/FVerExp?openForm&ID=" + strID,'Expediente','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=1,TOP=1,width=740,height=480') ;	
}