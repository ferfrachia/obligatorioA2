var npick="";
var primero=0;

function actualizarCampos(){
	ocultarFilas();
	mostrarFilas();
}

function agregarUnidad(nombre,codigo){
	if (npick == "UACTUAL"){
      	document.getElementById("sUniActual").value =codigo;
      	document.getElementById("sUniActualVis").value =nombre;
    }
    else{
      	document.getElementById("sUniCreadora").value =codigo;
      	document.getElementById("sUniCreadoraVis").value =nombre;
    }
    $('#NamePickerUnidadULTRA').dialog('close');
}
function agregarValor(nombre){
     document.getElementById("sUsuarioFirmante").value = nombre;
     $('#NamePickerJQ').dialog('close');
}
function ocultarFilas(){
	$("#documento1").hide();
	$("#documento2").hide();
	$("#fila3").hide();
	$("#fila4").hide();				
	$("#fila5").hide();
	$("#fila6").hide();
	$("#fila7").hide();
	$("#fila8").hide();
	$("#fila9").hide();
	$("#fila10").hide();
	$("#fila11").hide();
	$("#fila12").hide();
	$('#filaTipoLegal').hide();
	$('#filaEstadoSes').hide();
	$('#filaNroActa').hide();
	$('#filaNroExp').hide();
	$('#filaEstadoAs').hide();
	$("#filaNroSesion").hide();
	
	
	
	

	ocultarCamposContratos();
}

function ocultarCamposContratos() {
	$("#contratosFila1").hide();
	$("#contratosFila2").hide();
	$("#contratosFila3").hide();
}

function mostrarCamposContratos() {
	$("#contratosFila1").show();
	$("#contratosFila2").show();
	$("#contratosFila3").show();
}

function mostrarBusquedaContratos() {
	ocultarFilas();
	mostrarCamposContratos();
	$("#fila1").show();
}



function mostrarTodasFilas() {
	$("#fila3").show();
	$("#fila4").show();				
	$("#fila5").show();
	$("#fila6").show();
	$("#fila7").show();
	$("#fila8").show();
	$("#fila9").show();
	$("#fila10").show();
	$("#fila11").show();
	$("#fila12").show();
	$("#documento1").show();
	$("#documento2").show();
	mostrarCamposContratos();
}

function seleccionarUniActual(boton){
	NamePicker.init( {
	  prompt: '<p>Seleccione la unidad </p>',
	  addressbook: "/"+document.forms[0].sPathOrgan.value,
	  viewname: '(BusquedaNroPorUnidad)',
	  column: 1,
	   column_codigo: 2,
	   empty: true
	})
	NamePicker.open(boton, 'sUniActual', 'single_con_codigo', 'Seleccione  la Unidad');
}


function seleccionUnidadCreadora(boton){
	NamePicker.init( {
	  prompt: '<p>Seleccione la unidad </p>',
	  addressbook: "/"+document.forms[0].sPathOrgan.value,
	  viewname: '(BusquedaNroPorUnidad)',
	  column: 1,
	   column_codigo: 2,
	   empty: true
	})
	NamePicker.open(boton, 'sUniCreadora', 'single_con_codigo', 'Seleccione  la Unidad');
}

function mostrarFilas() {
	var estructura = document.forms[0].sEstructura.value;
	var sNro = document.forms[0].sNro;
	var subTipo = document.forms[0].subTipo;
	var sTipo = document.getElementById("sTipo");
	var tipo = document.getElementById("sTipo").options[sTipo.selectedIndex].text;
	document.getElementById("num").innerHTML="Número";
	//SI SON RESOLUCIONES CON DOCUMENTO ASUNTO, NO DEBEN OCULTARSE LOS 
	if(sNro.value != ""){
		$("#fila1").hide();
		$("#fila8").hide();
		
	}else{
		$("#num0").show();
		
		$("#fila0").show();
		$("#fila1").show();
		$("#fila2").show();
		$("#fila8").show();
		$("#documento1").show();
		$("#documento2").show();
		if (tipo=="Todos") {
	
			subTipo.options.length=0;
			$("#fila0").hide();
			$("#fila1").show();
			$("#fila4").show();
			$("#fila5").show();
			$("#documento1").hide();
			$("#documento2").hide();
		}else if (tipo =="Expediente"){
			subTipo.options.length=0;
			var migrados = document.getElementById("migrados").value.split(", ");
			for (var j=0;j<migrados.length;j++){
				var subTipo_j = migrados[j].split("|");
				newoption = new Option(subTipo_j[0], subTipo_j[1]);
				subTipo.options[j] = newoption;
			}
			
			$("#filaTipoLegal").show();
			$("#fila9").show();
			$("#fila10").show();
			$("#fila6").show();
			if (document.forms[0].subTipo.selectedIndex==0){
				$("#fila3").show();
				$("#fila4").show();
				
				$("#fila12").show();
				
				document.getElementById("tituloUnidad").innerHTML="Unidad";
				setEstadosCaratulas();	
			}else{	
				$("#fila6").show();		
				$("#fila7").show();
				$("#fila11").show();
				$("#fila3").show();
				document.getElementById("tituloUnidad").innerHTML="Unidad Actual o Destino";
				setEstadosActuaciones();
			}
		}else if (tipo =="Comunicaciones"){
			var tiposCom = StringToVector3(document.forms[0].TiposComunicaciones.value,";");
			subTipo.options.length=0;
			newoption = new Option("", "");
			subTipo.options[0] = newoption;
			for (var i = 1; i <= tiposCom.vLength; i++) {
				var valor = tiposCom.vArray[i-1].split("##");
				newoption = new Option(valor[0], valor[1]);
				subTipo.options[i] = newoption;
			}
			$("#fila3").show();
			$("#fila4").show();
			$("#fila5").show();
			$("#fila7").show();
			$("#fila11").show();
		}else if (tipo =="Formularios"){
			var tiposForm = StringToVector3(document.forms[0].TiposFormularios.value,";");
			document.forms[0].subTipo.options.length=0;
			newoption = new Option("", "");
			document.forms[0].subTipo.options[0] = newoption;	
			for (var i = 1; i <= tiposForm.vLength; i++) {
				var valor = tiposForm.vArray[i-1].split("##");
				newoption = new Option(valor[0], valor[1]);
				document.forms[0].subTipo.options[i] = newoption;
			}
			setEstadosFormularios();
			$("#documento1").show();
			$("#documento2").show();
			$("#fila3").show();
			$("#fila4").show();
			$("#fila5").show();
			$("#fila6").show();
		} else if (tipo =="Documentos"){
			var tiposDoc = StringToVector3(document.forms[0].TiposDocumentos.value,";");
			subTipo.options.length=0;
			newoption = new Option("", "");
			subTipo.options[0] = newoption;
			for (var i = 1; i <= tiposDoc.vLength; i++) {
				var valor = tiposDoc.vArray[i-1].split("##");
				newoption = new Option(valor[0], valor[1]);
				subTipo.options[i] = newoption;
			}
			
			$("#fila3").show();
			$("#fila4").show();
			$("#fila6").show();
			document.getElementById("tituloUnidad").innerHTML="Unidad";
			setEstadosDocumentos();	
		}else if (tipo=="Resoluciones") {
			
			
			document.getElementById("textoFecha").innerText="Fecha de Sesión entre";
			$("#fila0").hide();
			$("#filaNroSesion").show();
			$("#fila7").hide();
			$("#fila11").hide();
			
			subTipo.options.length=0;
			var valor = "Sesion";
			newoption = new Option(valor, "FSesion");
			subTipo.options[0] = newoption;
			newoption = new Option("Asunto","FPunto");
			subTipo.options[1] = newoption;		
			
			if (document.forms[0].sNro.value==""){
				$("#fila1").show();
				
				if (document.forms[0].subTipo.selectedIndex==1){
				//ASUNTO
					$("#fila9").show();
					$("#fila10").show();
					if(estructura=="Si"){
						$("#fila6").show();
					}
					$('#filaNroExp').show();
					$("#filaNroActa").hide();
					$('#filaEstadoAs').show();
					
					document.getElementById("tituloUnidad").innerText="Unidad";
				}else{	
				//SESION
					$("#fila4").show();
					
					//$("#fila7").show();
					//$("#fila11").show();
					$("#filaEstadoSes").show();
					$("#filaNroActa").show();
					if(estructura=="Si"){
						$("#fila6").show();
					}
					$("#fila1").show();
					$("#fila8").show();
	
					document.getElementById("tituloUnidad").innerText="Unidad Actual o Destino";
					
				}
			}
		}else if (tipo=="Eventos") {
			$("#documento1").hide();
			$("#documento2").hide();
			$("#fila0").hide();
		}
	}
}

function SalirInicio(){
	tipoDoc = document.getElementById("tipoDocParam").value;
	if(tipoDoc == "Resoluciones"){
		location.replace(document.forms[0].sPathResol.value);
	}else{
		location.replace('/'+document.forms[0].sPathDbPortal.value);
	}
}

function SalirBandejas(){
	tipoDoc = document.getElementById("tipoDocParam").value;
	if(tipoDoc == "Resoluciones"){
		location.replace(document.forms[0].sPathResol.value);
	}else{
		location.replace('/'+document.forms[0].sPathDbPortal.value+"/Bandejas?OpenForm&tipoDoc="+document.forms[0].sTipo.options[document.forms[0].sTipo.selectedIndex].text);
	}
}

function borrarSeleccion(campo){
	document.getElementById(campo).value="";
	document.getElementById(campo+"Vis").value="";
}

function skm_LockScreen(){
	var lock = document.getElementById('skm_LockPane'); 
	if (lock) 
		lock.className = 'LockOn'; 
}

function Buscar(){
	
	skm_LockScreen();	window.scrollTo(0,0);	document.forms[0].Accion.value="SEARCH";	SalvoCamposDinamicos();
	document.onkeypress = KeyPressed;	function KeyPressed(e){ 				return ((window.event) ? event.keyCode : e.keyCode) != 13; 	}	
}	
function BuscarS(){
	window.scrollTo(0,0);
	document.forms[0].Accion.value="SEARCH";
	SalvoCamposDinamicos();
	document.forms[0].submit();	
}


function SalvoCamposDinamicos(){
	var tipo = document.forms[0].sTipo[document.forms[0].sTipo.selectedIndex].text;
	document.forms[0].queryDocumentos.value="";
	document.forms[0].queryFormularios.value="";
	primero=0;
		 
	$("#camposEtiquetas td.BusquedaValor input").each(function (){
		if (tipo == "Formularios"){
			if (primero == 0) {
			   	if ($(this).val()!=""){ 
			   		document.forms[0].queryFormularios.value = "[" + $(this).attr("name") +"]=" +$(this).val();
			   		primero=1;
			   	}	
			}else{
				if ($(this).val()!="")
					document.forms[0].queryFormularios.value += " and [" + $(this).attr("name") +"]=" +$(this).val();
		  	} 
		}else{
		 	if (primero == 0) {
		 		if ($(this).val()!=""){
		 			primero=1;
		 			document.forms[0].queryDocumentos.value ="[" + $(this).attr("name") +"]=" +$(this).val();
		 		}	
		 	}else{
		 		if ($(this).val()!="")
		 			document.forms[0].queryDocumentos.value += " and ["+ $(this).attr("name") +"]=" +$(this).val();
	 		}
		}
	}); 
}
function Salvar(){
	SalvoCamposDinamicos();   
	window.open(DirABS() + "/fParBusquedaLSN?OpenForm",'Nombre','status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=450');
}

function DirABS(){ 
	var pathname=location.pathname;  
	return(pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)));
}

function setEstadosCaratulas(){
	document.forms[0].sEstadoVis.options.length=0;
	newoption = new Option("", "");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("En Generación", "En Generación");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("En Tránsito", "En Tránsito");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("En Unidad", "En Unidad");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Agregado", "Agregado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Archivado", "Archivado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
}

function setEstadosComunicaciones(){
	document.forms[0].sEstadoVis.options.length=0;
	newoption = new Option("", "");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Reservado", "Reservado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Borrador", "Borrador");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Firmar", "Para Firmar");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Firmado", "Firmado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Enviar", "Para Enviar");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Enviado", "Enviado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Archivado", "Archivado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Recibido", "Recibido");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
}

function setEstadosActuaciones(){
	document.forms[0].sEstadoVis.options.length=0;
	newoption = new Option("", "");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Actuar", "15");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Reservado", "20");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Firmar", "25");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Firmado", "25");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;	
	newoption = new Option("Para dar pase", "30");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;		
	newoption = new Option("Cursado", "35");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;		
	newoption = new Option("Anulado", "40");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;			
	newoption = new Option("Archivado", "45");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;				
	newoption = new Option("Agregado", "50");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;					
}

function setEstadosCartas(){
	document.forms[0].sEstadoVis.options.length=0;
	newoption = new Option("", "");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Actuar", "Para Actuar");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Reservada Por", "Reservada Por");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Firmada", "Firmada");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Enviada", "Enviada");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;	
	newoption = new Option("Archivada", "Archivada");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;		
}

function setEstadosFormularios() {
	var sEstadoVis = document.forms[0].sEstadoVis;
	sEstadoVis.options.length=0;
	newoption = new Option("", "");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;
	newoption = new Option("En Unidad", "En Unidad");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;
	newoption = new Option("Reservado", "Reservado");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;
	newoption = new Option("En Tránsito", "En Tránsito");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;
	newoption = new Option("Finalizado", "Finalizado");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;	
	newoption = new Option("Archivado", "Archivado");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;
}


function setEstadosDocumentos(){
	var sEstadoVis = document.forms[0].sEstadoVis;
	sEstadoVis.options.length=0;
	newoption = new Option("", "");	
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Borrador", "Borrador");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Reservado", "Reservado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Revisar", "Para Revisar");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Para Publicar", "Para Publicar");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Publicado", "Publicado");
	document.forms[0].sEstadoVis.options[document.forms[0].sEstadoVis.options.length] = newoption;
	newoption = new Option("Archivado", "Archivado");
	sEstadoVis.options[sEstadoVis.options.length] = newoption;
}


var EstadosCaratulas;
var EstadosActuaciones;
var EstadosCartas;
var EstadosFormularios;
var EstadosDocumentos;
var storeEstado;
var storeActuaciones;
var Estados

EstadosFormularios = { identifier:'name',
	items:[
		{name:'', valor:'0'},
		{name:'En Unidad', valor:'En Unidad'},
		{name:'Reservado', valor:'Reservado'},
		{name:'En Tránsito', valor:'En Tránsito'},
		{name:'Finalizado', valor:'Finalizado'},
		{name:'Archivado', valor:'Archivado'}
	]
};
EstadosCaratulas = { identifier:'name',
	items:[
		{name:'', valor:'0'},
		{name:'En Generación', valor:'1'},
		{name:'En Tránsito', valor:'2'},
		{name:'En Unidad', valor:'3'},
		{name:'Agregado', valor:'4'},
		{name:'Archivado', valor:'5'}
	]
};
EstadosActuacion = {identifier:'name',
	items:[
		{name:'', valor:'1'},
		{name:'En Tránsito', valor:'10'},
		{name:'Para Actuar', valor:'15'},
		{name:'Reservado', valor:'20'},
		{name:'Para Firmar', valor:'25'},
		{name:'Firmado', valor:'25'},
		{name:'Para dar pase', valor:'30'},
		{name:'Cursado', valor:'35'},
		{name:'Anulado', valor:'40'},
		{name:'Archivado', valor:'45'},
		{name:'Agregado', valor:'50'}
	]
};

EstadosCartas = { identifier:'name',
	items:[
		{name:'', valor:'0'},
		{name:'Estoy', valor:'1'},
		{name:'Averiguando', valor:'2'},
		{name:'los', valor:'3'},
		{name:'estados', valor:'4'},
		{name:'de cartas', valor:'5'}
	]
};

EstadosDocumentos = { identifier:'name',
	item:[
		{name:'', valor:'0'},
		{name:'Borrador', valor:'1'},
		{name:'Reservado', valor:'21'},
		{name:'Para Revisar', valor:'3'},
		{name:'Para Publicar', valor:'4'},
		{name:'Publicado', valor:'5'},
		{name:'Archivado', valor:'7'}
	]
};
function Reporte(){
	location.replace("ReporteExpedientes?Openform");
}

function cargarComboCategoria() {
	
	var categoria = document.forms[0].sCategoria.value
	
	var url = "/"+document.forms[0].sPathRutas.value;
	url = url+"/SeleccionCategoria?ReadForm&categoria="+categoria;
	$.ajax({
          cache: false,
          url: url,
          async: false,
          contentType: "application/json; charset=iso-8859-1",
          success:  function(data) {
				var newoption = new Option("","");
					for (var i=1 ; i < data.infoTemas.length;i++) {

						var info = data.infoTemas[i-1].tipoRuta.split("##")[1];
						newoption = new Option(data.infoTemas[i-1].nombreTema,info);
						document.forms[0].sTemaExpVis.options[i] = newoption;
					      		
				}
			},
			error: function(){
				alert("No hay temas configurados para la categoría.");
                return false;
             }
	
	});
}
