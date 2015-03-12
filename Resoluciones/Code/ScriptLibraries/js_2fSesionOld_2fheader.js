var frm;
var tab;
var tabselect='general';
var mydata;
var obj;
var anexoSeleccionado;

function tabs(tab)
{
tabselect=tab;
	var roles=document.forms[0].roles.value;
		if (tab=='general')	{
			document.all('general').style.display='block';
			if(document.forms[0].Salvado.value!="1"){
				MisTabs.setSelectedItems([1]);
			}else{
				MisTabs.setSelectedItems([0]);			
			}
		}else{
			document.all('general').style.display='none';
		}
		
		if (tab=='orden')	{
			MisTabs.setSelectedItems([0]);
			document.all('orden').style.display='block';
		}else{
			document.all('orden').style.display='none'; 
		}
		if (tab=='acta')	{
			document.all('Acta').style.display='block';
			MisTabs.setSelectedItems([2]);
		}else{
			document.all('Acta').style.display='none'; 
		}
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
					document.forms[0].submit();				}
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
			document.forms[0].Retorno.value = "["+pathDB+"/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",frameorigen="+frame+",vistaorigen=VSesiones"+",usr="+document.forms[0].sUsuario.value+"]"
//			document.forms[0].submit();
			document.forms[0].SalvarFormulas.click();
	}
}

function Editar(id){
	// Edito el doc
	OcultarMenu();
	var pathDB = DirABS();
	var dir;
	var accion = "acc_editar_sesion"
	dir=document.forms[0].Protocolo.value+'://'+window.location.hostname+":"+document.forms[0].Puerto.value;
	window.location=pathDB + "/ControllerResoluciones?OpenAgent&Id="+id+",Accion="+accion+",usr="+document.forms[0].sUsuario.value
}

function AgregarExpedientes(id)
{
	OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+'/FParametrosAgregarExp?Openform&ID='+id+',urlorigen='+document.forms[0].cvRetorno.value;
}		
function CrearAsunto(id){
	var pathDB = DirABS();
	window.location.href = pathDB+'/Punto?Openform&ID='+id+',urlorigen='+document.forms[0].cvRetorno.value+",nrosesion="+document.forms[0].sNroSesion.value;
}
function PublicarSesion(id)
{
	OcultarMenu();
	var pathDB = DirABS();
	
	window.location.href = pathDB+'/FParametrosPublicarSes?Openform&ID='+id+',urlorigen='+document.forms[0].cvRetorno.value;
}	


function Imprimir(id){
	var pathDB = DirABS();
	window.open(pathDB+'/FSesionImp?OpenForm&ID='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');

}	

function ImprimirOrden(id){
	var pathDB = DirABS();
	window.open(pathDB+'/FPrint?OpenForm&ID='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
}

function ImprimirActa(id){
	var pathDB = DirABS();
	if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
	}
	else {
		window.open(pathDB+'/ImpresionActa?OpenForm&id='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
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

//Función utilizada desde la vista embebida
function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+pathname+'?Opendocument&urlorigen='+document.forms[0].cvRetorno.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen
}

function Acta(){
	OcultarMenu();
	var pathDB = DirABS();
	var pathname=location.pathname; 
	nro=document.forms[0].sNroSesion.value;
	window.location.href = pathDB+'/CrearActa?OpenAgent&urlorigen='+pathname+","+'NROSES='+nro;
}

function restringir(id){
	var pathDB = DirABS();
	accion = "ResSesion";
	window.location.href = pathDB+"/(ControllerResoluciones)?OpenAgent&Id="+ id + ",accion=" + accion +",usr="+document.forms[0].sUsuario.value;
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

function FirmarPasaraFinalizar(id){
	if (document.forms[0].ActaRequeridaEFinalizar.value=="Si"){
		if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
		return;
		}
	}
		OcultarMenu();
	var pathDB = DirABS();
	window.location.href = pathDB+"/ParametrosEnviaraFinalizar?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value;
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
		OcultarMenu();
		var pathDB = DirABS();
		window.location.href = pathDB+"/ParametrosFirmaSesion?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value;
	}
}
function validarFirmas(usuarios,Firmantes,Fechas){
for (var i =0;i<usuarios.vLength;i++){
		usuario = usuarios.vArray[i];
		txtFecha= Fechas.vArray[i];
		if (Firmantes.vIsMember(usuarios.vArray[i])){
		 	// Aca tenemo que imprimir la firma
			document.write('<tr> <td class="TablaIconoChico" > <img src="'+DirABS()+'icon_valid.gif?OpenImageResource"> </td> <td class="TextoFirmaOK">Firmado electronicamente por ' +usuario+ ' el  ' + txtFecha + '. </td></tr>');
		} else{
			// No se pudo validar la firma del creador
			document.write('<tr> <td class="TablaActIconoChico" > <img src="'+DirABS()+'icon_warn.gif?OpenImageResource"> </td> <td class="TextoFirmaSinValidar">No se pudo validar la firma del Usuario '+usuario+' . Consulte con el Administrador del sistema. </td></tr>');
		}
	}
}
function FirmaryFinalizarSesion(id){
	if(document.forms[0].TextoActa.value=="<P>&nbsp;</P>" || document.forms[0].TextoActa.value==""){
		alert('Debe ingresar el Acta de la sesión');
	}
	else {
		OcultarMenu();
		var pathDB = DirABS();
		window.location.href = pathDB+"/ParametrosFirmaFinalizarSes?OpenForm&id="+id+"&nroses="+document.forms[0].sNroSesion.value+",urlorigen="+document.forms[0].cvRetorno.value;
	}
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
