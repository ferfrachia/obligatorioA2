function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function abrirIngresoMigracion(){
var pathname=location.pathname;  
	var path =pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));  
	window.open(DirABS()+'xsp_Migracion.xsp','Migracion','status=yes,resizable=yes,menubar=yes,scrollbars=yes,left=1,top=0,width=785,height=650');
	
 }
function abrirDoc(univid){

	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	if (document.forms[0].Anonimo.value=="0")
		top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
	else
		top.location.href = pathname + "Resolucion Publicada?OpenForm&id=" + univid + "&";	
}

var grid, grid2;
var filtro;
var filtro2;

//Función que inicializa la bandeja de sesiones
function cargarBandejaResoluciones(){
	actualizarAltos();
	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaResoluciones').style.overflow = "hidden";
	document.getElementById('BandejaResoluciones').style.width = "0";
	document.getElementById('BandejaResoluciones').style.heigth = "0";
	
	var path = DirABS();
	
	var strXml = DirABS()+"/ResolucionesxTemaNew?OpenView&count=5000";
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaResoluciones');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Tema,Nº "+colSesTitulo+",Fecha "+colSesTitulo+",Nº Res,Referencia",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
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
	//filtro[0] = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaResoluciones').style.overflow = "hidden";
	document.getElementById('BandejaResoluciones').style.width = "100%";
	document.getElementById('BandejaResoluciones').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaResolucionesWrap').style.width = calcularAncho() - 18 +"px";
}


function cargarBandejaDecreto(){

	actualizarAltos();
	var frm = document.forms[0];
	if(grid2 != null){
		grid2.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaDecreto').style.overflow = "hidden";
	document.getElementById('BandejaDecreto').style.width = "0";
	document.getElementById('BandejaDecreto').style.heigth = "0";
	
	var path = DirABS();
	
	var strXml = DirABS()+"/DecretosxTema?OpenView&count=5000";

	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid2 = new dhtmlXGridObject('BandejaDecreto');
	mygrid2.attachEvent("onXLE", cargarCantidadDocs2);
	mygrid2.setImagePath("/codebase/imgs/");
	mygrid2.setHeader("Tema,Nº "+colSesTitulo+",Fecha "+colSesTitulo+",Nº Res,Referencia",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);

	mygrid2.setInitWidths("150,150,150,150,*");
	mygrid2.setColTypes("ro,ro,ro,ro,ro");
	mygrid2.setColAlign("left,left,left,left,left");
	mygrid2.setSkin("light");
	mygrid2.enableAlterCss("even", "uneven");
	mygrid2.enableRowsHover(true,'grid_hover');
	grid2 = mygrid2;
	mygrid2.setColSorting("str,str,str,str,str");
	mygrid2.enableSmartRendering(true,20);
	//mygrid2.enableAutoHeight(true);
	mygrid2.enableAutoWidth(true);
	mygrid2.init();
	mygrid2.loadXML(strXml);
	filtro2 = 0;
	document.getElementById("fil1").src = document.getElementById("title_filtro").value;
	mygrid2.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaDecreto').style.overflow = "hidden";
	document.getElementById('BandejaDecreto').style.width = "100%";
	document.getElementById('BandejaDecreto').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('CabezalBandejaDecretoWrap').style.width = calcularAncho() - 18 +"px";
}


window.onresize = resize;
function resize()
{
	document.getElementById('BandejaResoluciones').style.height = "100%";
	document.getElementById('BandejaDecreto').style.height = "100%";
	if(grid != null){
		grid.setSizes();
	}
	//if(grid2!=null){
	//	grid2.setSizes();
	//}
	document.getElementById('BandejaResoluciones').style.width = "50%";
	document.getElementById('BandejaDecreto').style.width = "50%";
	actualizarAltos();
	if(navigator.appName == "Netscape"){
		document.getElementById('CabezalBandejaResolucionesWrap').style.width = calcularAncho() - 18 +"px";
		document.getElementById('CabezalBandejaDecretoWrap').style.width = calcularAncho() - 18 +"px";
	}
	//Este else lo agergue porque el complemento de skype impedia que la bandeja se autoajustara al ancho de la ventana. En el caso que sea necesario descomentar.
	//else
	//	document.getElementById('CabezalBandejaResolucionesWrap').style.width = calcularAncho() - 20 +"px";
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
	ALTO = altoVentana - altoARestar;
	var muestroDecreto = document.getElementsByName("mostrarDecreto")[0].value;
	if (muestroDecreto=="Si")
		ALTO_MAXIMIZADA = ALTO/2 - 25;
	else
		ALTO_MAXIMIZADA = ALTO - 20;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
		
	if (muestroDecreto=="Si"){
		document.getElementById('CabezalBandejaResolucionesWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
		document.getElementById('CabezalBandejaDecretoWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	} else {
		document.getElementById('CabezalBandejaResolucionesWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}
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
	var grid3;
	if(i==0){
		grid3=grid;
	}else{
		grid3=grid2;
	}
	
	if(navigator.appName == "Netscape"){
		estiloAttachHeader = "height:22px;margin:0px;padding:0px;";
	}else{
		estiloAttachHeader = "height:25px;margin:0px;padding:0px;";
	}
	//Si no se esta mostrando el filtro
	if(filtro == 0){
		grid3.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		grid3.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		//Quito un cabezal para actualizar y que aparezca el filtro
		grid3.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		//cargarBandejaDecreto();
		if(i==0){
			cargarBandejaResoluciones();
		}else{
			cargarBandejaDecreto();
		}
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
	//document.getElementById("cantDoc01").innerHTML = "(" + this.getRowsNum()+ ")";
}

function cargarCantidadDocs2(){
	document.getElementById("cantDoc1").innerHTML = "(" + this.getRowsNum()+ ")";
}
