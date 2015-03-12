function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 


function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href = pathname+'0/'+univid+"?OpenDocument";
}

var grid;
var filtro;

//Función que inicializa la bandeja de sesiones
function cargarBandejaNotificaciones(){
	actualizarAltos();

	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaNotificaciones').style.overflow = "hidden";
	document.getElementById('BandejaNotificaciones').style.width = "0";
	document.getElementById('BandejaNotificaciones').style.heigth = "0";
	
	var path = DirABS();
	
	var strXml = DirABS()+"/Notificaciones Por Numero?OpenView&count=5000";
	var mygrid = new dhtmlXGridObject('BandejaNotificaciones');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Nº Comunicación,Nº Resolución,Fecha Comunicación,Tipo,Destinatarios",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("150,150,150,150,*");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid = mygrid;
	mygrid.setColSorting("str,str,str,str,str");
	mygrid.enableSmartRendering(true,20);
	//mygrid.enableAutoHeight(true);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaNotificaciones').style.overflow = "hidden";
	document.getElementById('BandejaNotificaciones').style.width = "100%";
	document.getElementById('BandejaNotificaciones').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaNotificacionesWrap').style.width = calcularAncho() - 18 +"px";
}

window.onresize = resize;
function resize()
{
	document.getElementById('BandejaNotificaciones').style.height = "100%";
	if(grid != null){
		grid.setSizes();
	}
	document.getElementById('BandejaNotificaciones').style.width = "100%";
	actualizarAltos();
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaNotificacionesWrap').style.width = calcularAncho() - 18 +"px";
	//Este else lo agergue porque el complemento de skype impedia que la bandeja se autoajustara al ancho de la ventana. En el caso que sea necesario descomentar.
	//else
	//	document.getElementById('CabezalBandejaNotificacionesWrap').style.width = calcularAncho() - 20 +"px";
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
	var altoVentana = calcularAlto();
	//alert(altoVentana);
	ALTO = altoVentana - 30;
	ALTO_MAXIMIZADA = ALTO - 20;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	document.getElementById('CabezalBandejaNotificacionesWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
}

//Función que desplega el menú a la hora de clickear una fila
function rowSelection(idTabla){
	var e = window.event;
	var tabla = this;
	if(tabla!= null){
		var ind = tabla.getSelectedCellIndex();
		//Verifico que la fila seleccionada no sea la primera, en ese caso no se desplega menú porque allí estan las imágenes
		var selectedId=tabla.getSelectedRowId();
		var unid =  tabla.getUserData(selectedId, "id");
		abrirDoc(unid);		    	
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
		grid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		grid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		//Quito un cabezal para actualizar y que aparezca el filtro
		grid.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		cargarBandejaNotificaciones();
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}
