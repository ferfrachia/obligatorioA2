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
function cargarBandejaAgregarEnBloque(){
	actualizarAltos();

	var frm = document.forms[0];
	if(grid != null){
		grid.destructor();
	}
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaAgregarEnBloque').style.overflow = "hidden";
	document.getElementById('BandejaAgregarEnBloque').style.width = "0";
	document.getElementById('BandejaAgregarEnBloque').style.heigth = "0";
	
	var path = DirABS();
	unidad="";
	if(document.getElementById("usaEstructura").value=="1")	{
		unidad = document.getElementById("cUnidades").value;
		}
	
	var strXml = DirABS()+"/AgregarEnBloque?OpenAgent&estado=Pendiente&unidad="+unidad;
	//alert(strXml);
	//var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=3000";
	var mygrid = new dhtmlXGridObject('BandejaAgregarEnBloque');
	mygrid.attachEvent("onXLE", cargarCantidadDocs);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==4){return false;}else{return true}});
	mygrid.setHeader(" ,Número Exp,Fecha, Referencia, &nbsp; ",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("50,300,300,*,50");
	mygrid.setColTypes("ch,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
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
	document.getElementById('BandejaAgregarEnBloque').style.overflow = "hidden";
	document.getElementById('BandejaAgregarEnBloque').style.width = "100%";
	document.getElementById('BandejaAgregarEnBloque').style.heigth = "100%";
	if(navigator.appName == "Netscape")
		document.getElementById('BandejaAgregarEnBloqueWrap').style.width = calcularAncho() - 18 +"px";
}

window.onresize = resize;
function resize()
{
	document.getElementById('BandejaAgregarEnBloque').style.height = "100%";
	if(grid != null){
		grid.setSizes();
	}
	document.getElementById('BandejaAgregarEnBloque').style.width = "100%";
	actualizarAltos();
	if(navigator.appName == "Netscape")
		document.getElementById('BandejaAgregarEnBloqueWrap').style.width = calcularAncho() - 18 +"px";
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
	ALTO = altoVentana - altoARestar;
	ALTO_MAXIMIZADA = ALTO - 20;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	document.getElementById('BandejaAgregarEnBloqueWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
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
		grid.attachHeader(",#text_filter,#text_filter,#text_filter, ",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		grid.attachHeader(",#text_filter,#text_filter,#text_filter, ",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		//Quito un cabezal para actualizar y que aparezca el filtro
		grid.detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtro = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		cargarBandejaAgregarEnBloque();
	}
}

function cargarCantidadDocs(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}

//Función que elimina las marcas seleccionadas
function agregarASesion(){
	//var usuarioActual = document.getElementById("sUsuario").value;
	var primera = true;
	//var dbPath=document.forms[0].sPathDbOrg.value;
	var cantFilas = Grid.getRowsNum();
	var marcada;
	var idFila;
	var marcados = "";
	//Recorro las filas de la grilla para verificar cuales estan seleccionadas
	for(i = 0; i<cantFilas;i++){
		marcada = Grid.cellByIndex(i, 0).getValue();
		idFila = Grid.getRowId(i);
		//Pregunto si la fila está seleccionada
		if (marcada == 1){
			unid = Grid.getUserData(idFila, "id");
			marcados += ","+ unid;
			Grid.cellByIndex(i, 0).setValue("0");
		}
	}
	//Si no hay ninguna válida seleccionada despliego error
	if (marcados==''){
		alert('Debe seleccionar los Asuntos a agregar.');
		return;
	}
	alert(marcados);
	//Si hay alguna a eliminar pregunto y redirecciono
	//var url=document.forms[0].Protocolo.value+'://' + window.location.hostname +":"+document.forms[0].Puerto.value+"/"+ document.forms[0].sPathDbOrg.value + '/MarcasController?OpenAgent&User='+ usuarioActual +',Accion=acc_eliminar_marcas,lista=' + marcas + ']';
	//if (confirm('Desea eliminar las marcas seleccionadas ?'))
	//	window.location.replace(url);
}