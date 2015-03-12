function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}

function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
}

/*function crearPunto(){
	var pathname=location.pathname;
	var urlorigen = location.hostname+"/"+'<Computed Value>'+'<Computed Value>';
	pathname='<Computed Value>'+'://'+location.hostname+":"+'<Computed Value>'+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/FPunto?Openform&urlorigen='+urlorigen+"&unidad=";
}*/

var grid;

//Función que inicializa la bandeja de sesiones
function cargarBandejaPuntosPendientes(){
	if(	document.getElementById("agregarEnBloque").value=="Si") cargarBandejaPuntosPendientesConChk();
	else cargarBandejaPuntosPendientesSinChk();
/*
	actualizarAltos();
	
	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaPuntosPendientes').style.overflow = "hidden";
	document.getElementById('BandejaPuntosPendientes').style.width = "0";
	document.getElementById('BandejaPuntosPendientes').style.heigth = "0";
	
	var path = DirABS();
	var strXml= DirABS()+"/PuntosPendientesSINUNIDADXMLNew?OpenView&count=5000";
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaPuntosPendientes');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==3){return false;}else{return true}});
	mygrid.setHeader("Número Exp,Referencia,Fecha, &nbsp; ",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("300,300,*,50");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid = mygrid;
	mygrid.setColSorting("str,str,str,na");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaPuntosPendientes').style.overflow = "hidden";
	document.getElementById('BandejaPuntosPendientes').style.width = "100%";
	document.getElementById('BandejaPuntosPendientes').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaPuntosPendientesWrap').style.width = calcularAncho() - 18 +"px";
		*/
}
function cargarBandejaPuntosPendientesConChk(){
	actualizarAltos();
	
	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaPuntosPendientes').style.overflow = "hidden";
	document.getElementById('BandejaPuntosPendientes').style.width = "0";
	document.getElementById('BandejaPuntosPendientes').style.heigth = "0";
	
	var path = DirABS();
	var strXml= DirABS()+"/PuntosPendientesSINUNIDADXMLNewEnBloque?OpenView&count=5000";
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaPuntosPendientes');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==4){return false;}else{return true}});
	mygrid.setHeader("&nbsp,Número Exp,Referencia,Fecha,&nbsp;",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("25,300,300,*,50");
	mygrid.setColTypes("ch,ro,ro,ro,ro");
	mygrid.setColAlign("center,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid = mygrid;
	Grid = grid;
	mygrid.setColSorting("na,str,str,str,na");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaPuntosPendientes').style.overflow = "hidden";
	document.getElementById('BandejaPuntosPendientes').style.width = "100%";
	document.getElementById('BandejaPuntosPendientes').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaPuntosPendientesWrap').style.width = calcularAncho() - 18 +"px";
}

function cargarBandejaPuntosPendientesSinChk(){
	actualizarAltos();
	
	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaPuntosPendientes').style.overflow = "hidden";
	document.getElementById('BandejaPuntosPendientes').style.width = "0";
	document.getElementById('BandejaPuntosPendientes').style.heigth = "0";
	
	var path = DirABS();
	var strXml= DirABS()+"/PuntosPendientesSINUNIDADXMLNew?OpenView&count=5000";
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaPuntosPendientes');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==3){return false;}else{return true}});
	mygrid.setHeader("Número Exp,Referencia,Fecha,&nbsp;",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("300,300,*,50");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid = mygrid;
	mygrid.setColSorting("str,str,str,na");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaPuntosPendientes').style.overflow = "hidden";
	document.getElementById('BandejaPuntosPendientes').style.width = "100%";
	document.getElementById('BandejaPuntosPendientes').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaPuntosPendientesWrap').style.width = calcularAncho() - 18 +"px";
}
window.onresize = resize;
function resize()
{
	document.getElementById('BandejaPuntosPendientes').style.height = "100%";
	if(grid != null){
		grid.setSizes();
	}
	document.getElementById('BandejaPuntosPendientes').style.width = "100%";
	actualizarAltos();
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaPuntosPendientesWrap').style.width = calcularAncho() - 18 +"px";
	//Este else lo agergue porque el complemento de skype impedia que la bandeja se autoajustara al ancho de la ventana. En el caso que sea necesario descomentar.
	//else
	//	document.getElementById('CabezalBandejaFechasSesionesWrap').style.width = calcularAncho() - 20 +"px";
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
  	return myWidth-10;
}

function actualizarAltos(){
	var altoVentana = calcularAlto();
	//alert(altoVentana);
	ALTO = altoVentana - altoARestar;
	ALTO_MAXIMIZADA = ALTO - 20;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	document.getElementById('CabezalBandejaPuntosPendientesWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
}

//Función que desplega el menú a la hora de clickear una fila
function rowSelection(idTabla){
	var e = window.event;
	var tabla = this;
	if(tabla!= null){
		var ind = tabla.getSelectedCellIndex();
		if(document.getElementById("agregarEnBloque").value=="Si" && ind ==0)return;
		//Verifico que la fila seleccionada no sea la primera, en ese caso no se desplega menú porque allí estan las imágenes
		var selectedId=tabla.getSelectedRowId();
		var unid =  tabla.getUserData(selectedId, "id");
		abrirDoc(unid);		    	
	}
}
/*esta funcion es para obtener los asuntos chequeados para incluirlos en la sesion.*/
function agregarASesion(){
	$("#dialogoSeseccionarSesEnDesa").dialog("open");
}
function obtenerAsuntosParaSesion(){
		var cantFilas = grid.getRowsNum();
	var marcada;
	var idFila;
	var marcados = "";
	//Recorro las filas de la grilla para verificar cuales estan seleccionadas
	for(i = 0; i<cantFilas;i++){
		marcada = grid.cellByIndex(i, 0).getValue();
		idFila = grid.getRowId(i);
		//Pregunto si la fila está seleccionada
		if (marcada == 1){
			unid = grid.getUserData(idFila, "noteId");
			marcados += unid + ";";
			grid.cellByIndex(i, 0).setValue("0");
		}
	}
	//Si no hay ninguna válida seleccionada despliego error
	if (marcados==''){
		alert('Debe seleccionar los Asuntos a agregar.');
		return "";
	}else return marcados
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
		if(document.getElementById("agregarEnBloque").value="Si"){
			grid.attachHeader(",#text_filter,#text_filter,#text_filter, ",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		grid.attachHeader(",#text_filter,#text_filter,#text_filter, ",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);		
		}else{
			grid.attachHeader("#text_filter,#text_filter,#text_filter, ",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grid.attachHeader("#text_filter,#text_filter,#text_filter, ",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}
		//Quito un cabezal para actualizar y que aparezca el filtro
		grid.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		cargarBandejaPuntosPendientes();
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}
