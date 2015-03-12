function crearPunto(){
	var pathname=location.pathname;
	var urlorigen = location.hostname+"/"+ document.forms[0].cvBase.value + document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href = pathname+'/FPunto?Openform&urlorigen='+urlorigen+"&unidad="+document.forms[0].cUnidades.options[document.forms[0].cUnidades.selectedIndex].value;
}

function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
}

function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function cambiarUnidad(bandeja){
	var div=document.getElementById("iframe"+bandeja);
	var unidad;
	if (bandeja=="Borrador"){
		/*unidad=document.forms[0].cUnidades.options[document.forms[0].cUnidades.selectedIndex].value;*/
		cargarBandejaBorrador();
	}else{
		/*unidad=document.forms[0].cUnidadesAplazado.options[document.forms[0].cUnidadesAplazado.selectedIndex].value;*/
		cargarBandejaAplazados();
	}
	/*div.src=DirABS()+"/GenerarBandejaXML?OpenAgent&estado="+bandeja+"&unidad="+unidad;*/
}

var grid1, grid2;
var filtro = new Array(2);
function cargarBandejasAsuntos(){
	cargarBandejaBorrador();
	cargarBandejaAplazados();
}

//Función que inicializa la bandeja borrador
function cargarBandejaBorrador(){
	actualizarAltos();

	var frm = document.forms[0];
	if(grid1 != null){
		grid1.destructor();
	}
	var unidad = document.forms[0].cUnidades.options[document.forms[0].cUnidades.selectedIndex].value;
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaAsuntosBorrador').style.overflow = "hidden";
	document.getElementById('BandejaAsuntosBorrador').style.width = "0";
	document.getElementById('BandejaAsuntosBorrador').style.heigth = "0";
	
	var path = DirABS();
	
	var strXml = DirABS()+"/GenerarBandejaXMLNew?OpenAgent&estado=Borrador&unidad="+unidad;
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaAsuntosBorrador');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==4){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Número,Fecha,Referencia,Unidad, &nbsp; ",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("200,200,*,200,50");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid1 = mygrid;
	mygrid.setColSorting("str,str,str,str,na");
	mygrid.enableAutoHeight(true);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro[0] = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaAsuntosBorrador').style.overflow = "hidden";
	document.getElementById('BandejaAsuntosBorrador').style.width = "100%";
	document.getElementById('BandejaAsuntosBorrador').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaAsuntosBorradorWrap').style.width = calcularAncho() - 18 +"px";
}

//Función que inicializa la bandeja borrador
function cargarBandejaAplazados(){
	actualizarAltos();

	var frm = document.forms[0];
	if(grid2 != null){
		grid2.destructor();
	}
	var unidad = unidad=document.forms[0].cUnidadesAplazado.options[document.forms[0].cUnidadesAplazado.selectedIndex].value;
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaAsuntosAplazados').style.overflow = "hidden";
	document.getElementById('BandejaAsuntosAplazados').style.width = "0";
	document.getElementById('BandejaAsuntosAplazados').style.heigth = "0";
	
	var path = DirABS();
	
	var strXml = DirABS()+"/GenerarBandejaXMLNew?OpenAgent&estado=Aplazado&unidad="+unidad;
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaAsuntosAplazados');
	mygrid.attachEvent("onXLE", cargarCantidadDocs2);
	mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==4){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Número,Fecha,Referencia,Unidad, &nbsp; ",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("200,200,*,200,50");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grid2 = mygrid;
	mygrid.setColSorting("str,str,str,str,na");
	mygrid.enableAutoHeight(true);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtro[1] = 0;
	document.getElementById("fil1").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaAsuntosAplazados').style.overflow = "hidden";
	document.getElementById('BandejaAsuntosAplazados').style.width = "100%";
	document.getElementById('BandejaAsuntosAplazados').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaAsuntosAplazadosWrap').style.width = calcularAncho() - 18 +"px";
}

window.onresize = resize;
function resize()
{
	document.getElementById('BandejaAsuntosBorrador').style.width = "100%";
	document.getElementById('BandejaAsuntosAplazados').style.width = "100%";
	actualizarAltos();
	if(navigator.appName == "Netscape"){
		document.getElementById('CabezalBandejaAsuntosBorradorWrap').style.width = calcularAncho() - 18 +"px";
		document.getElementById('CabezalBandejaAsuntosAplazadosWrap').style.width = calcularAncho() - 18 +"px";
	}
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
	ALTO = altoVentana - 70;
	ALTO_MAXIMIZADA = ALTO/2 - 20;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	document.getElementById('CabezalBandejaAsuntosAplazadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaAsuntosBorradorWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
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
	var grid;
	if(i==0){
		grid=grid1;
	}else{
		grid=grid2;
	}
	if(navigator.appName == "Netscape"){
		estiloAttachHeader = "height:22px;margin:0px;padding:0px;";
	}else{
		estiloAttachHeader = "height:25px;margin:0px;padding:0px;";
	}
	//Si no se esta mostrando el filtro
	if(filtro[i] == 0){
		grid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		grid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		//Quito un cabezal para actualizar y que aparezca el filtro
		grid.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro[i] = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		if(i==0){
			cargarBandejaBorrador();
		}else{
			cargarBandejaAplazados();
		}
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}

function cargarCantidadDocs2(){
	document.getElementById("cantDoc1").innerHTML = "(" + this.getRowsNum()+ ")";
}


