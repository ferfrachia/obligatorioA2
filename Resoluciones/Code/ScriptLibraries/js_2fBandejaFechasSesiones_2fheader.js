function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}


function abrirDoc(nro){
var pathname=location.pathname; 
usuario = document.forms[0].Anonimo.value;
pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
urlorden = document.forms[0].URLOrden.value;

if(usuario != "1"){
	top.location.href = pathname+ urlorden + nro;
}else{
	if (urlorden!="")
		window.open(pathname+ urlorden + nro);
}
}



var grid;

//Función que inicializa la bandeja de sesiones
function cargarBandejaFechasSesiones(){
	actualizarAltos();

	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaFechasSesiones').style.overflow = "hidden";
	document.getElementById('BandejaFechasSesiones').style.width = "0";
	document.getElementById('BandejaFechasSesiones').style.heigth = "0";
	
	var path = DirABS();
	
	var strXml = DirABS()+"/FechasSesionNew?OpenView&count=5000";
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaFechasSesiones');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.attachEvent("onRowSelect", rowSelection);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Fecha,Numero",null,[estiloHeader,estiloHeader]);
	mygrid.setInitWidths("400,*");
	mygrid.setColTypes("ro,ro");
	mygrid.setColAlign("left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid = mygrid;
	mygrid.setColSorting("str,str");
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	//mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaFechasSesiones').style.overflow = "hidden";
	document.getElementById('BandejaFechasSesiones').style.width = "100%";
	document.getElementById('BandejaFechasSesiones').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaFechasSesionesWrap').style.width = calcularAncho() - 18 +"px";
}

window.onresize = resize;
function resize()
{
	document.getElementById('BandejaFechasSesiones').style.height = "100%";
	if(grid != null){
		grid.setSizes();
	}
	document.getElementById('BandejaFechasSesiones').style.width = "100%";
	actualizarAltos();
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaFechasSesionesWrap').style.width = calcularAncho() - 18 +"px";
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
  	return myWidth;
}

function actualizarAltos(){
	var altoVentana = calcularAlto();
	//alert(altoVentana);
	ALTO = altoVentana - 30;
	ALTO_MAXIMIZADA = ALTO - 20;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	document.getElementById('CabezalBandejaFechasSesionesWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
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
		grid.attachHeader("#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader]);
		grid.attachHeader("#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader]);
		//Quito un cabezal para actualizar y que aparezca el filtro
		grid.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		cargarBandejaFechasSesiones();
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}