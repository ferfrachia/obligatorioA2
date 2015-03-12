var gridSelected;
//Arreglo para identificar si estan activados los filtros
var filtros = new Array(9);
//Arreglo para almacenar cada grilla
var grids = new Array(9);
//Arreglo para identificar cuales grillas estan maximizadas
var maximizadas = new Array(9);
//Coordenadas del mouse
var tempX = 0;
var tempY = 0;

var ocultarMenu = 0;
var ocultarResoluciones = 0;
var IE = document.all?true:false
// If NS -- that is, !IE -- then set up for mouse capture
if (!IE) document.captureEvents(Event.MOUSEMOVE)

// Set-up to use getMouseXY function onMouseMove
document.onmousemove = getMouseXY;

//Función que inicializa las bandejas {recibe como parámetro si es la primera vez que se carga}
function bandejasInit(primera){
	//activa el scroll para IE
	document.body.scroll="";
	if(primera){
		//Inicializa arreglos
		for(i = 0;i<9;i++){
			filtros[i] = 0;
			maximizadas[i] = 0;
		}
		actualizarAltos();
		//Pregunta si se desea cargar una tab en especial {Esto es para cuando el usuario indica "ir a ..."}
		if(paramTab=="tabPrincipal"){
			setCookIGDoc("IGDocBandejaNuevaExp", "0", "CookieBandeja");
		}else if(paramTab=="tabNotificados"){
			setCookIGDoc("IGDocBandejaNuevaExp", "3", "CookieBandeja");
		}else if(paramTab=="tabMarcados"){
			setCookIGDoc("IGDocBandejaNuevaExp", "4", "CookieBandeja");
		}else if(paramTab=="tabParaFirmar"){
			setCookIGDoc("IGDocBandejaNuevaExp", "1", "CookieBandeja");
		}else if(paramTab=="tabReservados"){
			setCookIGDoc("IGDocBandejaNuevaExp", "2", "CookieBandeja");
		}else if(paramTab=="tabCopiaExp"){
			setCookIGDoc("IGDocBandejaNuevaExp", "5", "CookieBandeja");
		}
	}
	
	//Carga de una cookie el indice del tab a cargar
	var cookValue = getCook("IGDocBandejaNuevaExp");
	if(cookValue != "0" && cookValue != "1" && cookValue != "2" && cookValue != "3" && cookValue != "4" && cookValue != "5"){
		cookValue = "0";
	}
	//En el caso que la copia este deshabilitada y la cookie era la de la bandeja de copia, inicializo en la bandeja de trabajo.
	if ((deshabilitadaCopia != 0) && (cookValue == "5")){
		cookValue = "0";
	}
	var $tabs = $('#tabs').tabs();
	$tabs.tabs( "option", "active", parseInt(cookValue)); 
	if(cookValue == "0"){
		cargarExp();
	//Debido a diferencias enre MZ e IE en el caso que sea mozilla o no sea la primera vez que cargo la pantalla
	}else if((navigator.appName == "Netscape")||!primera){
		switch(cookValue){
			case "1":
				cargarBandejaParaFirmar();
				break;
			case "2":
				cargarBandejaReservados();
				break;
			case "3":
				cargarBandejaNotificados();
				break;
			case "4":
				cargarMarcados();
				break;
			case "5":
				cargarCopiaExpediente();
				break;
		}
	}
	
	if(primera){
		//En el caso que el usuario indique que quiere abrir las bandejas en una bandeja maximizada, se procesa lo indicado.
		if(paramBandejaMax=="BandejaEntrada$max"){
			maximizarBandeja("CabezalBandejaEntradaWrap",1);
		}else if(paramBandejaMax=="BandejaTrabajo$max"){
			maximizarBandeja("CabezalBandejaTrabajoWrap",0);
		}else if(paramBandejaMax=="BandejaSalida$max"){
			maximizarBandeja("CabezalBandejaSalidaWrap",2);
		}
	}
	
	if(navigator.appName == "Netscape")
		document.getElementById('tabs').style.width = calcularAncho()-45 +"px";
}

//Funcion que carga las bandejas de Entrada, Trabajo y Salida
function cargarExp(){
	//Comienzo a cargar la bandeja de salida	
	if(grids[2] != null){
		grids[2].destructor();
	}	
	//Cargo unidad y año	
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	//Estilo del cabezal
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";	
	//Oculto el contenedor de la tabla para que luego esta se ajuste a cualquier tamaño
	document.getElementById('BandejaSalida').style.overflow = "hidden";


	var strXml = urlBandejaSalida + "&RestrictToCategory=EXP_" + unidad+anio+"&Count=5000";			


	var mygridS = new dhtmlXGridObject('BandejaSalida');
	//Cargo evento al seleccionar una fila
	mygridS.attachEvent("onRowSelect", rowSelection);	

	mygridS.attachEvent("onXLE", cargarCantidadSalida);


	
	mygridS.setImagePath("/codebase/imgs/");
	//Cargo el cabezal
	mygridS.setHeader("&nbsp;,Número,Fecha,Unidad,Asunto",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	//Cargo los anchos de las columnas
	mygridS.setInitWidths("70,80,70,150,*");
	//Cargo los tipos de las columnas
	mygridS.setColTypes("ro,ro,ro,ro,ro");
	//Cargo alineación de las columnas
	mygridS.setColAlign("left,left,left,left,left");
	//Cargo el estilo de la grilla
	mygridS.setSkin("light");
	mygridS.enableAlterCss("even", "uneven");
	mygridS.enableRowsHover(true,'grid_hover');
	//Seteo que se ajuste la altura automáticamente
	//mygridS.enableAutoHeight(true);
	mygridS.enableSmartRendering(true,20);
	//Inicializo la grilla

	mygridS.init();

	//Seteo los criterios de ordenamiento de las columnas
	mygridS.setColSorting("na,str,str,str,str");
	//Cargo el xml con los datos requeridos
	mygridS.loadXML(strXml);
	
	//Guardo la grilla en el arreglo
	grids[2] = mygridS;
	//Seteo que no se muestra el filtro
	filtros[2] = 0;
	//Seteo la imagen del filtro
	document.getElementById("fil2").src = document.getElementById("title_filtro").value;
	//Ajusto nuevamente el alto y ancho del div que contiene a la grilla
	document.getElementById('BandejaSalida').style.width = "100%";
	document.getElementById('BandejaSalida').style.heigth = "100%";

	//Se puede decir que el procedimiento es análogo para el resto de las grillas

	//Cargo la bandeja de entrada
	if(grids[1] != null){
		grids[1].destructor();
	}
	
	document.getElementById('BandejaEntrada').style.overflow = "hidden";

	
	var strXml = urlBandejaEntrada + "&RestrictToCategory=EXP_" + unidad+anio+"&Count=5000";	
	var mygridE = new dhtmlXGridObject('BandejaEntrada');
	
	mygridE.attachEvent("onRowSelect", rowSelection);
	mygridE.attachEvent("onXLE", cargarCantidadEntrada);
	
	mygridE.setImagePath("/codebase/imgs/");
	mygridE.setHeader("&nbsp;,Número,Fecha,Unidad,Asunto",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygridE.setInitWidths("70,80,70,150,*");
	mygridE.setColTypes("ro,ro,ro,ro,ro");
	mygridE.setColAlign("left,left,left,left,left");
	mygridE.setSkin("light");
	mygridE.enableAlterCss("even", "uneven");
	mygridE.enableRowsHover(true,'grid_hover');
	//mygridE.enableAutoHeight(true);	
	mygridE.enableSmartRendering(true,20);
	mygridE.init();
	mygridE.setColSorting("na,str,str,str,str");
	mygridE.loadXML(strXml);
	grids[1] = mygridE;
	filtros[1] = 0;
	document.getElementById("fil1").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaEntrada').style.width = "100%";
	document.getElementById('BandejaEntrada').style.heigth = "100%";
	
	//Se inicializa la bandeja de trabajo
	if(grids[0] != null){
		grids[0].destructor();
	}
	
	document.getElementById('BandejaTrabajo').style.overflow = "hidden";


	var strXml = urlBandejaTrabajo + "&RestrictToCategory=EXP_" + unidad+anio+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaTrabajo');
	
	mygrid.attachEvent("onRowSelect", rowSelection);
	mygrid.attachEvent("onXLE", cargarCantidadTrabajo);
	//Saca el tooltip por defecto que tiene dhtmlgrid solo en la primer celda
	 mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==0){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Fecha,Asunto,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,70,*,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[0] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableAutoWidth(true);
	mygrid.setSizes();
	mygrid.enableSmartRendering(true,20);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[0] = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaTrabajo').style.overflow = "hidden";
	document.getElementById('BandejaTrabajo').style.width = "100%";
	document.getElementById('BandejaTrabajo').style.heigth =$(window).width();

}

//Función que inicializa la bandeja de expedientes a firmar
function cargarBandejaParaFirmar(){
	if(grids[3] != null){
		grids[3].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaParaFirmar').style.overflow = "hidden";

	var strXml = urlBandejaParaFirmar+ "&RestrictToCategory=EXP_"+unidad+usuario+anio+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaParaFirmar');
	
	mygrid.attachEvent("onXLE", cargarCantidadParaFirmar);
	//Saca el tooltip por defecto que tiene dhtmlgrid solo en la primer celda
	 mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==0){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Fecha,Asunto,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,70,*,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[3] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[3] = 0;
	document.getElementById("fil3").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaParaFirmar').style.overflow = "hidden";
	document.getElementById('BandejaParaFirmar').style.width = "100%";
	document.getElementById('BandejaParaFirmar').style.heigth = "100%";
}

//Función que inicializa la bandeja de Expedientes reservados para el usuario
function cargarBandejaReservados(){
	if(grids[4] != null){
		grids[4].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	document.getElementById('BandejaReservados').style.overflow = "hidden";

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	var strXml = urlBandejaReservados+ "&RestrictToCategory=EXP_" +unidad+usuario+anio+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaReservados');
	
	mygrid.attachEvent("onXLE", cargarCantidadReservados);
	//Saca el tooltip por defecto que tiene dhtmlgrid solo en la primer celda
	 mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==0){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Fecha,Asunto,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,70,*,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[4] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[4] = 0;
	document.getElementById("fil4").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaReservados').style.overflow = "hidden";
	document.getElementById('BandejaReservados').style.width = "100%";
	document.getElementById('BandejaReservados').style.heigth = "100%";
}

//Función que inicializa las bandejas de Entrada de Notificados y de Acusados
function cargarBandejaNotificados(){
	if(grids[5] != null){
		grids[5].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	document.getElementById('BandejaEntradaNotificados').style.overflow = "hidden";

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	var strXml = urlBandejaNotificados+ "&RestrictToCategory=EXP_" +unidad+anio+"&Count=5000";
	
	//Inicializo la Bandeja de entrada Notificados
	var mygrid = new dhtmlXGridObject('BandejaEntradaNotificados');
	
	mygrid.attachEvent("onXLE", cargarCantidadEntradaNotificados);

	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Fecha,Asunto,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,70,*,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[5] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.setSizes();
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[5] = 0;
	document.getElementById("fil5").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaEntradaNotificados').style.width = "100%";
	document.getElementById('BandejaEntradaNotificados').style.heigth = "100%";
	mygrid.attachEvent("onRowSelect", rowSelection);
	
	//Inicializo la Bandeja de Notificados Acusados
	if(grids[6] != null){
		grids[6].destructor();
	}
	document.getElementById('BandejaNotificados').style.overflow = "hidden";
	document.getElementById('BandejaNotificados').style.width = "0";
	document.getElementById('BandejaNotificados').style.heigth = "0";
	strXml = urlBandejaNotificadosAcusaron+ "&RestrictToCategory=EXP_" +unidad+anio+"&Count=5000";
	mygrid = new dhtmlXGridObject('BandejaNotificados');
	
	mygrid.attachEvent("onXLE", cargarCantidadNotificados);
	//Saca el tooltip por defecto que tiene dhtmlgrid solo en la primer celda
	 mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==0){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Fecha,Asunto,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,70,*,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[6] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.setSizes();
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[6] = 0;
	document.getElementById("fil6").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaNotificados').style.width = "100%";
	document.getElementById('BandejaNotificados').style.heigth = "100%";
	mygrid.attachEvent("onRowSelect", rowSelection);
}	

//Inicializa la bandejas de copias de expedientes
function cargarCopiaExpediente(){
	if(grids[8] != null){
		grids[8].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].text;
	var unidad2 = "EXP_" + document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	document.getElementById('BandejaCopiaExp').style.overflow = "hidden";

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	var strXml = urlBandejaCopiaExpediente + "&RestrictToCategory="+ unidad2+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaCopiaExp');
	
	mygrid.attachEvent("onXLE", cargarCantidadCopia);
	//Saca el tooltip por defecto que tiene dhtmlgrid solo en la primer celda
	 mygrid.attachEvent("onMouseOver", function(id,ind){if(ind==0){return false;}else{return true}});
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Fecha,Asunto,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,70,*,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[8] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[8] = 0;
	document.getElementById("fil8").src = document.getElementById("title_filtro").value;	
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaCopiaExp').style.width = "100%";
	document.getElementById('BandejaCopiaExp').style.heigth = "100%";
}

//Inicializa la bandejas de marcados
function cargarMarcados(){
	if(grids[7] != null){
		grids[7].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value;
	var strXml = urlBandejaMarcados;
	document.getElementById('BandejaMarcasExp').style.overflow = "hidden";

	var estiloHeader = "height:0px;margin:0px;font-size:0px;padding:0px;display:none;";
	var mygrid;
	mygrid = new dhtmlXGridObject('BandejaMarcasExp');
	
	mygrid.attachEvent("onXLE", cargarCantidadMarcados);
	
	mygrid.enableMultiline(true);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader(",,,,,,,",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	if(navigator.appName == "Netscape"){
		mygrid.setInitWidths("38,100,30,100,150,*,25,200");		
	}else{
		mygrid.setInitWidths("45,100,30,100,150,*,25,200");
	}		
	mygrid.setColTypes("ch,ro,cp,ro,ro,ro,img,ro");
	mygrid.setColAlign("center,left,left,left,left,left,center,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[7] = mygrid;
	mygrid.setColSorting("na,str,str,str,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	mygrid.enableEditEvents(false,false,false);
	filtros[7] = 0;
	document.getElementById("fil7").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaMarcasExp').style.width = "100%";
	document.getElementById('BandejaMarcasExp').style.heigth = "100%";
}

//Función que muestra y oculta los filtros
function mostrarFiltro(i){
	//Seteo el estilo de los filtros
	var estiloAttachHeader;
	if(navigator.appName == "Netscape"){
		estiloAttachHeader = "height:18px;margin:0px;padding:0px;";
	}else{
		estiloAttachHeader = "height:25px;margin:0px;padding:0px;";
	}
	//Si no se esta mostrando el filtro
	if(filtros[i] == 0){
		//Diferencio el unico caso particular que es en la grilla de marcas
		if(i==7){
			estiloAttachHeader = estiloAttachHeader + "text-align:left;";
			grids[i].attachHeader("#master_checkbox,#text_filter,,#text_filter,#text_filter,#text_filter,,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grids[i].attachHeader("#master_checkbox,#text_filter,,#text_filter,#text_filter,#text_filter,,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}else{
			grids[i].attachHeader("#rspan,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grids[i].attachHeader("#rspan,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}
		//Quito un cabezal para actualizar y que aparezca el filtro
		grids[i].detachHeader(1);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtros[i] = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		grids[i].filterByAll();
		grids[i].filterBy(2,"");
		grids[i].filterBy(3,"");
		grids[i].filterBy(4,"");
		grids[i].filterBy(5,"");
		grids[i].detachHeader(1);
		filtros[i]=0;
		//Seteo el ícono de filtro desactivado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro").value;
	}
}

//funcion que se encarga de cargar el contenido de las bandejas a la hora de seleccionar una tab
function cargarContenidoTab(event, ui){
	//Seteo el cookie de la tab seleccionada
	setCookIGDoc("IGDocBandejaNuevaExp", ui.newPanel.index()-1, "CookieBandeja");
	
	//Cargo la tab seleccionada
	switch(ui.newPanel.index()-1){
		case 0:
			//alert("#tabs-1");
			cargarExp();
			break;
		case 1:
			//alert("#tabs-2");
			cargarBandejaParaFirmar();
			break;
		case 2:
			//alert("#tabs-3");
			cargarBandejaReservados();
			break;
		case 3:
			//alert("#tabs-4");
			cargarBandejaNotificados();
			break;
		case 4:
			//alert("#tabs-5");
			cargarMarcados();
			break;
		case 5:
			//alert("#tabs-6");
			cargarCopiaExpediente();
			break;
	}		
}

function irACaratula(nro){
	var fecha = new Date();
	var valor = fecha.getTime();
	var url=DirABS()+"abrirDocumento?OpenAgent&tipoDoc=Expediente&id="+nro
	if (document.forms[0].nuevaVentana.value=="1"){
		if (confirm("¿Desea abrir la Carátula en una nueva ventana?")){
			window.open(url,valor,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
		}else{
				window.location.replace(url);
		}
	}else{
				window.location.replace(url);
	}	
}

function irACaratulaCopia(nro, nroCopia){
	var fecha = new Date();
	var valor = fecha.getTime();
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value;
	var protocolo = document.forms[0].Protocolo.value;
	var puerto = document.forms[0].Puerto.value;
	var hostCopia = document.forms[0].sHostCopia.value;
	var baseCopia = document.forms[0].sPathCopia.value;
	var url= DirABS() +"/FVerExpediente?ReadForm&oficina=EXP_" + unidad + "&id=" +nro + "&copia=" + nroCopia  //+"&usr="+usuario
	if (document.forms[0].nuevaVentana.value=="1"){
		if (confirm("¿Desea abrir la Copia de Expediente en una nueva ventana?")){
			window.open(url,valor,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
		}else{
			window.location.replace(url);
		}
	}else{
		window.location.replace(url);
	}	
}

function imprimirCopia(nro, nroCopia){
	var fecha = new Date();
	var valor = fecha.getTime();

	var baseCopia = document.forms[0].sPathCopia.value;
	
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value;
	
	var url="/"+ baseCopia+"/FPrintExpXml?ReadForm&nroCopia=" + nroCopia + "&ID=" +nro;  //+"&usr="+usuario
	window.open(url,valor,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
	//window.location.replace(url);
}

function irAActuacion(nro,act){
	var fecha = new Date();
	var valor = fecha.getTime();
	var url=DirABS()+"/abrirDocumento?OpenAgent&tipoDoc=Expediente&id="+nro +"&actuacion="+act
	if (document.forms[0].nuevaVentana.value=="1"){
		if (confirm("¿Desea abrir la Actuación en una nueva ventana?")){
			window.open(url,valor,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
		}else{
			window.location.replace(url);
		}
	}else{
			window.location.replace(url);
	}
	
}

function abrirCaratula(nroExp){
	//flagOcultar="0";
	//esconderMenu();
	var fecha = new Date();
	var valor = fecha.getTime();
	var url = DirABS()+"/abrirDocumento?OpenAgent&tipoDoc=Expediente&id="+nroExp;
	if (document.forms[0].nuevaVentana.value=="1"){
		if (confirm("¿Desea abrir la Carátula en una nueva ventana?")){
			window.open(url,valor,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
		}else{
			window.location.replace(url);
		}	
	} else{
			window.location.replace(url);
	}
}


function verExpediente(nroExp,act){
	flagOcultar="0";
	//esconderMenu();
	window.open(DirABS()+"/verDocumento?OpenAgent&tipoDoc=Expediente&id="+nroExp,"Ver_Expediente",'menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=1,TOP=1,width=740,height=480');
}

function imprimirExpediente(nroExp,base){
	window.open(document.getElementById('Protocolo').value+'://'+location.hostname+":"+document.getElementById('Puerto').value+"/"+base+"/FPrintExp?openForm&ID=" + nroExp,'Impresion','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=790,height=590') ;	
}

//Función que elimina las marcas seleccionadas
function quitarMarcas(){
	var usuarioActual = document.getElementById("sUsuario").value;
	var primera = true;
	var dbPath=document.forms[0].sPathDbOrg.value;
	var cantFilas = grids[7].getRowsNum();
	var marcada;
	var idFila;
	var marcas = "";
	//Recorro las filas de la grilla para verificar cuales estan seleccionadas
	for(i = 0; i<cantFilas;i++){
		marcada = grids[7].cellByIndex(i, 0).getValue();
		idFila = grids[7].getRowId(i);
		//Pregunto si la fila está seleccionada
		if (marcada == 1){
			var duenio = grids[7].getUserData(idFila, "duenio");
			var nomMarca = grids[7].getUserData(idFila, "nomMarca");
			//Verifico que quien desea eliminar las marcas sea el dueño de las mismas
			if(usuarioActual != duenio){
				alert('La siguiente marca pertenece al usuario ' + duenio + '\n' + nomMarca);
			}else{
				if (primera){
					marcas= "" + marcas +  idFila;
					primera=false;
				}else{
					marcas= "" + marcas + ";" + idFila;
				}
			}
			//Luego de procesada la desmarco
			grids[7].cellByIndex(i, 0).setValue("0");
		}
	}
	//Si no hay ninguna válida seleccionada despliego error
	if (marcas==''){
		alert('Debe seleccionar las marcas que va a eliminar.');
		return;
	}

	//Si hay alguna a eliminar pregunto y redirecciono
	var url=document.forms[0].Protocolo.value+'://' + window.location.hostname +":"+document.forms[0].Puerto.value+"/"+ document.forms[0].sPathDbOrg.value + '/MarcasController?OpenAgent&User='+ usuarioActual +',Accion=acc_eliminar_marcas,lista=' + marcas + ']';
	if (confirm('Desea eliminar las marcas seleccionadas ?'))
		window.location.replace(url);
}

//Función para compartir las marcas seleccionadas {Análoga a quitar marcas}
function CompartirMarcas(){
	var usuarioActual = document.getElementById("sUsuario").value;
	var dbPath=document.forms[0].sPathDbOrg.value;
	var cantFilas = grids[7].getRowsNum();
	var marcada;
	var idFila;
	var primera = true;
	var marcas = "";
	for(i = 0; i<cantFilas;i++){
		marcada = grids[7].cellByIndex(i, 0).getValue();
		idFila = grids[7].getRowId(i);
		if (marcada == 1){
			var duenio = grids[7].getUserData(idFila, "duenio");
			var nomMarca = grids[7].getUserData(idFila, "nomMarca");
			if(usuarioActual != duenio){
				alert('La siguiente marca pertenece al usuario ' + duenio + '\n' + nomMarca);
			}else{
				if (primera){
					marcas= "" + marcas +  idFila;
					primera=false;
				}else{
					marcas= "" + marcas + ";" + idFila;
				}
			}
			grids[7].cellByIndex(i, 0).setValue("0");
		}
	}
	if (marcas==''){
		alert('Debe seleccionar las marcas que va a compartir.');
		return;
	}

	var url="/"+ dbPath + '/FParametrosExportMarcas?openForm&MarcasId=' + marcas;
	window.location.replace(url);
}

function irAMarcas(){
var url = "/"+document.forms[0].sPathDbOrg.value+"/fTiposMarca?OpenForm"
top.location.replace(url);
}
function irAMarca(unid){
	var url = "/"+document.forms[0].sPathDbOrg.value+"/0/"+unid+"?OpenDocument"
	window.location.replace(url)
}

function verArbolAgregacion(nroExp,y,x){
	flagOcultar="0";
	esconderMenu();
	//****************************************************************************************
	getCargarArbol(nroExp,y,x);
	
}



//Función que minimiza las bandejas
function minimizarBandeja(idBandeja,num){
	var display = document.getElementById(idBandeja).style.display;
	if((display == "")||(display == "block")){
		document.getElementById(idBandeja).style.display = "none";
		document.getElementById("min"+num).src = document.getElementById("title_minimize_on").value;
		if(num=="0"){
			document.getElementById("CabezalBandejaEntradaWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
		}else if(((num=="1")&&(document.getElementById("CabezalBandejaSalidaWrap").style.display=="none"))||((num=="2")&&(document.getElementById("CabezalBandejaEntradaWrap").style.display=="none"))){
			//Cuando minimizo la bandeja de entrada o de salida y la otra esta minimizada debo agrandar la bandeja de trabajo
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
		}else if(num=="5"){
			//Cuando minimizo la bandeja de Notificados Acusados debo agrandar la bandeja de entrada de Notificados
			document.getElementById("CabezalBandejaNotificadosWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
		}else if(num=="6"){
			//Cuando minimizo la vandeja de Entrada de Notificados debo agrandar la bandeja de Notificados Acusados
			document.getElementById("CabezalBandejaEntradaNotificadosWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
		}
	}else{
		document.getElementById(idBandeja).style.display = "block";
		document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
		if(num=="0"){
			document.getElementById("CabezalBandejaEntradaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
		}else if((num==1)||(num==2)){
			//Al restaurar la bandeja de entrada o de salida debo volver el alto original a la bandeja de trabajo
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
		}else if(num=="5"){
			//Al restaurar la bandeja de Notificados Acusados debo volver el alto original a la bandeja de Entrada de Notificados
			document.getElementById("CabezalBandejaNotificadosWrap").style.height = "" + (ALTO_ACUSADOS) + "px";
		}else if(num=="6"){
			//Al restaurar la bandeja de Entrada de Notificados debo volver el alto original a la bandeja de Notificados Acusados
			document.getElementById("CabezalBandejaEntradaNotificadosWrap").style.height = "" + (ALTO_NOTIFICADOS) + "px";
		}
	}
	resize();
}	

//Función para maximizar las bandejas
function maximizarBandeja(idBandeja,num){
	if(idBandeja == "CabezalBandejaTrabajoWrap"){
		if(maximizadas[0] == 0){
			document.getElementById("CabezalBandejaEntrada").style.display = "none";
			document.getElementById("CabezalBandejaSalida").style.display = "none";
			document.getElementById("CabezalBandejaEntradaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("min"+num).style.display = "none";
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[0] = 1;
		}else{
			document.getElementById("CabezalBandejaEntrada").style.display = "block";
			document.getElementById("CabezalBandejaSalida").style.display = "block";
			if((document.getElementById("CabezalBandejaSalidaWrap").style.display == "none")&&(document.getElementById("CabezalBandejaEntradaWrap").style.display == "none")){
				document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
			}else{
				document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			}
			//document.getElementById("CabezalBandejaTrabajoWrap").style.margin_bottom = "5px";
			document.getElementById("min"+num).style.display = "inline-block";
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			maximizadas[0] = 0;
		}
	}else if(idBandeja == "CabezalBandejaEntradaWrap"){
		if(maximizadas[1] == 0){
			document.getElementById("CabezalBandejaTrabajo").style.display = "none";
			document.getElementById("CabezalBandejaSalida").style.display = "none";
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("CabezalBandejaEntrada").style.width = "100%";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[1] = 1;
			document.getElementById("min"+num).style.display = "none";
			document.getElementById('BandejaEntrada').style.width = "100%";
			grids[1].sortRows(0);
		}else{
			document.getElementById("CabezalBandejaTrabajo").style.display = "block";
			document.getElementById("CabezalBandejaSalida").style.display = "block";
			if(document.getElementById("CabezalBandejaTrabajoWrap").style.display == "none"){
				document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA-ALTO_CABEZAL) + "px";
			}else{
				document.getElementById(idBandeja).style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			}
			document.getElementById("CabezalBandejaEntrada").style.width = "49%";
			document.getElementById('BandejaEntrada').style.width = "100%";
			maximizadas[1] = 0;
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			document.getElementById("min"+num).style.display = "inline-block";
			grids[1].sortRows(0);
		}
	}else if(idBandeja == "CabezalBandejaSalidaWrap"){
		if(maximizadas[2] == 0){
			document.getElementById("CabezalBandejaTrabajo").style.display = "none";
			document.getElementById("CabezalBandejaEntrada").style.display = "none";
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("CabezalBandejaSalida").style.width = "100%";
			document.getElementById("BandejaSalida").style.width = "100%";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[2] = 1;
			document.getElementById("min"+num).style.display = "none";
			grids[2].sortRows(0);
		}else{
			document.getElementById("CabezalBandejaTrabajo").style.display = "block";
			document.getElementById("CabezalBandejaEntrada").style.display = "block";
			if(document.getElementById("CabezalBandejaTrabajoWrap").style.display == "none"){
				document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA-ALTO_CABEZAL) + "px";
			}else{
				document.getElementById(idBandeja).style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			}
			document.getElementById("CabezalBandejaSalida").style.width = "49%";
			document.getElementById("BandejaSalida").style.width = "100%";
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			maximizadas[2] = 0;
			document.getElementById("min"+num).style.display = "inline-block";
			grids[2].sortRows(0);
		}
	}else if(idBandeja == "CabezalBandejaEntradaNotificadosWrap"){
		if(maximizadas[5] == 0){
			document.getElementById("CabezalBandejaNotificados").style.display = "none";
			document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById("CabezalBandejaNotificadosWrap").style.height = "" + (ALTO_ACUSADOS) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("CabezalBandejaEntradaNotificados").style.width = "100%";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[5] = 1;
			document.getElementById("min"+num).style.display = "none";
		}else{
			document.getElementById("CabezalBandejaNotificados").style.display = "block";
			if(document.getElementById("CabezalBandejaNotificadosWrap").style.display=="none"){
				document.getElementById(idBandeja).style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
			}else{
				document.getElementById(idBandeja).style.height = "" + (ALTO_NOTIFICADOS) + "px";
			}
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			maximizadas[5] = 0;
			document.getElementById("min"+num).style.display = "inline-block";
		}
	}else if(idBandeja == "CabezalBandejaNotificadosWrap"){
		if(maximizadas[6] == 0){
			document.getElementById("CabezalBandejaEntradaNotificados").style.display = "none";
			document.getElementById("CabezalBandejaEntradaNotificadosWrap").style.height = "" + (ALTO_NOTIFICADOS) + "px";
			document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("CabezalBandejaNotificados").style.width = "100%";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[6] = 1;
			document.getElementById("min"+num).style.display = "none";
			grids[6].enableAutoWidth(true);
		}else{
			document.getElementById("CabezalBandejaEntradaNotificados").style.display = "block";
			if(document.getElementById("CabezalBandejaEntradaNotificadosWrap").style.display=="none"){
				document.getElementById(idBandeja).style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
			}else{
				document.getElementById(idBandeja).style.height = "" + (ALTO_ACUSADOS) + "px";
			}
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			maximizadas[6] = 0;
			document.getElementById("min"+num).style.display = "inline-block";
			grids[6].enableAutoWidth(true);
		}
	}
	resize();
}

//Función que actualiza las coordenadas del mouse {Para saber donde desplegar el menú}
function getMouseXY(e) {
  if (IE) { // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft
    tempY = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  }  
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}  
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  return true
}

//Función que al hacer click fuera del menú lo oculta
document.onclick = function (e) {
 e = e || event;
 var target = e.target || e.srcElement;
 var elemento = document.getElementById('contextZone_A');
 if (elemento == target) {
   // El click se ha producido dentro del elemento, no se hace nada.
 }else{
 // Se ha clicado fuera del elemento, se oculta
 elemento.style.display = 'none';
 } 
}

//Función que oculta el menó en el evento onMouseOut
function doSomething(e) {
	e = e || event;
	var target = e.relatedTarget || e.toElement;
	var elemento = document.getElementById('contextZone_A');
	do {
		if (elemento == target) {
			// El click se ha producido dentro del elemento, no se hace nada.
			return;
		}
		if(target)
			target = target.parentNode;
	} while (target)
 // Se ha clicado fuera del elemento, se realiza una acción.
 	elemento.style.display = 'none';
}

//Función que reajusta las tablas a la hora de hacer un resize de la ventana

function resize()
{
	document.getElementById('BandejaTrabajo').style.height ="100%";
	document.getElementById('BandejaEntrada').style.height = "100%";
	document.getElementById('BandejaEntradaNotificados').style.height = "100%";
	document.getElementById('BandejaNotificados').style.height = "100%";
	document.getElementById('BandejaSalida').style.height = "100%";
	if(deshabilitadaCopia == 0){
		document.getElementById('BandejaCopiaExp').style.height = "100%";
	}
	document.getElementById('BandejaParaFirmar').style.height = "100%";
	document.getElementById('BandejaReservados').style.height = "100%";
	document.getElementById('BandejaMarcasExp').style.height = "100%";

	for(i = 0;i<9;i++){
			if(grids[i] !==undefined){
				grids[i].setSizes();
			}
	}
	$("#CabezalBandejaEntrada").css("width","49%");
	$("#CabezalBandejaSalida").css("width","49%");
	$("#CabezalBandejaEntradaWrap").css("width","100%");
	$("#CabezalBandejaSalidaWrap").css("width","100%");
	$("#CabezalBandejaEntradaWrap2").css("width","100%");
	$("#CabezalBandejaSalidaWrap2").css("width","100%");
	$("#tabs-1").css("width","100%");
	$("#CabezalBandejaTrabajoWrap").css("width","100%");
	$("#CabezalBandejaTrabajoWrap2").css("width","100%");
	$("#BandejaTrabajo").css("width","100%");

	$(".gridbox").css("width","100%");
	$(".gridbox").css("height","100%");


	document.getElementById('BandejaEntradaNotificados').style.width = "100%";
	document.getElementById('BandejaNotificados').style.width = "100%";

	if(deshabilitadaCopia == 0){
		document.getElementById('BandejaCopiaExp').style.width = "100%";
	}
	document.getElementById('BandejaParaFirmar').style.width = "100%";
	document.getElementById('BandejaReservados').style.width = "100%";
	document.getElementById('BandejaMarcasExp').style.width = "100%";
	actualizarAltos();
		//ie y firefox renderizan los tamaños de forma diferente
	if (navigator.appName=="Netscape"){
		document.getElementById('tabs').style.width = calcularAncho()-45 +"px";
	}else{
		document.getElementById('tabs').style.width = calcularAncho()-25 +"px";
	}	

		


}

//Función que desplega el menú a la hora de clickear una fila
function rowSelection(idTabla){
	var e = window.event;
	var tabla = this;
	if(tabla!= null){
		var ind = tabla.getSelectedCellIndex();
		//Verifico que la fila seleccionada no sea la primera, en ese caso no se desplega menú porque allí estan las imágenes
		if(ind != 0){
			var selectedId=tabla.getSelectedRowId();
		    	var unidActuacion =  tabla.getRowAttribute(selectedId,"unidActuacion");
			var clave =  tabla.getRowAttribute(selectedId,"clave");
			var nroCopia =  tabla.getRowAttribute(selectedId,"NroCopia");
			var pathBase = tabla.getRowAttribute(selectedId,"base");
			if(tabla == grids[0] || tabla == grids[3] || tabla == grids[4] || tabla == grids[5] || tabla == grids[6]){
				document.getElementById("caratula").style.display = "block";
				document.getElementById("actuacion").style.display = "block";
				document.getElementById("barra").style.display = "block";
				document.getElementById("verExpediente").style.display = "block"; 
				document.getElementById("imprimirExpediente").style.display = "block"; 
				document.getElementById("copia").style.display = "none"; 
				document.getElementById("imprimirCopia").style.display = "none";
			}else if(tabla == grids[1] || tabla == grids[2]){
				document.getElementById("caratula").style.display = "block";
				document.getElementById("actuacion").style.display = "none";
				document.getElementById("barra").style.display = "none";
				document.getElementById("verExpediente").style.display = "none"; 
				document.getElementById("imprimirExpediente").style.display = "none";
				document.getElementById("copia").style.display = "none"; 
				document.getElementById("imprimirCopia").style.display = "none";
			}else if(tabla == grids[8]){
				document.getElementById("caratula").style.display = "none";
				document.getElementById("actuacion").style.display = "none";
				document.getElementById("barra").style.display = "block";
				document.getElementById("verExpediente").style.display = "none"; 
				document.getElementById("imprimirExpediente").style.display = "none";
				document.getElementById("copia").style.display = "block";
				document.getElementById("imprimirCopia").style.display = "block";
			}
					
			//Seteo la posición del menú en donde se realizó el click y actualizo las acciones dependiendo de la fila seleccionada.
			var divHeight = 88;
			if(tabla == grids[1] || tabla == grids[2])
				divHeight = 27;
			if(tabla == grids[8])
				divHeight = 54;
			if(tempY + divHeight > calcularAlto()){
			      alto=tempY-divHeight;
				$("#contextZone_A").css({ top: alto });
			}else{
                    alto=tempY-10;
				$("#contextZone_A").css({ top: alto });
			}
			
			if(tempX + 150 > calcularAncho()){
				izq=tempX-150;
				$("#contextZone_A").css({ left: izq });
			}else{
				izq=tempX-10;
				$("#contextZone_A").css({ left: izq });
			}
			document.getElementById("contextZone_A").style.display = "block";
			document.getElementById("caratula").href = "javascript:abrirCaratula(\""+clave+"\")";
			document.getElementById("verExpediente").href = "javascript:verExpediente(\""+clave+"\",\""+unidActuacion+"\")";
			document.getElementById("imprimirExpediente").href = "javascript:imprimirExpediente(\""+clave+"\",\""+pathBase+"\")";
			document.getElementById("actuacion").href = "javascript:irAActuacion(\"" +clave+"\",\""+unidActuacion+"\")";
			document.getElementById("copia").href = "javascript:irACaratulaCopia(\"" +clave+"\",\""+nroCopia+"\")";
			document.getElementById("imprimirCopia").href = "javascript:imprimirCopia(\"" +clave+"\",\""+nroCopia+"\")";
		}
	}
}

//Función que desplega el menú con las resoluciones
function resoluciones(resoluciones){
	if(resoluciones != null){		
		//Seteo la posición del menú en donde se realizó el hover y actualizo las acciones dependiendo de la fila.
		var divHeight = 88;
		if(tempY + divHeight > calcularAlto()){
			alto = tempY-divHeight;
			$("#contextZone_B").css({ top: alto });
		}else{
			alto = tempY-10;
			$("#contextZone_B").css({ top: alto });
		}
		document.getElementById("contextZone_B").style.left = tempX-5;
		
		$("#divResoluciones").html(resoluciones);
		document.getElementById("contextZone_B").style.display = "block";
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

//Función encargada de actualizar los altos de las grillas al hacer un resize de la ventana
function actualizarAltos(){
	var altoVentana = calcularAlto();
	ALTO = altoVentana - 135;
	if(ALTO<0)
		ALTO = 0;
	ALTO_TRABAJO = (ALTO - 2*ALTO_CABEZAL)*(parseInt(document.getElementById("BandejasExp_Alto_Rel_Trabajo").value)/100);
	if(ALTO_TRABAJO<0)
		ALTO_TRABAJO = 0;
	ALTO_ENTRADA_SALIDA = (ALTO - 2*ALTO_CABEZAL)*(1-(parseInt(document.getElementById("BandejasExp_Alto_Rel_Trabajo").value)/100));
	if(ALTO_ENTRADA_SALIDA<0)
		ALTO_ENTRADA_SALIDA = 0;
	ALTO_MAXIMIZADA = ALTO - ALTO_CABEZAL;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	ALTO_NOTIFICADOS = (ALTO - 2*ALTO_CABEZAL)*(parseInt(document.getElementById("BandejasExp_Alto_Rel_Notif").value)/100);
	if(ALTO_NOTIFICADOS<0)
		ALTO_NOTIFICADOS = 0;
	ALTO_ACUSADOS = (ALTO - 2*ALTO_CABEZAL)*(1-(parseInt(document.getElementById("BandejasExp_Alto_Rel_Notif").value)/100));
	if(ALTO_ACUSADOS<0)
		ALTO_ACUSADOS = 0;
	
	if(maximizadas[0]==1){
		document.getElementById('CabezalBandejaTrabajoWrap').style.height = ""+ ALTO_MAXIMIZADA + "px";
	}else if(document.getElementById("CabezalBandejaSalidaWrap").style.display=="none"&&document.getElementById("CabezalBandejaEntradaWrap").style.display=="none"){
		document.getElementById('CabezalBandejaTrabajoWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaTrabajoWrap').style.height = ""+ALTO_TRABAJO+"px";
	}
	if(maximizadas[1]==1){
		document.getElementById('CabezalBandejaEntradaWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}else if(document.getElementById("CabezalBandejaTrabajoWrap").style.display=="none"){
		document.getElementById('CabezalBandejaEntradaWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaEntradaWrap').style.height = ""+ALTO_ENTRADA_SALIDA+"px";
	}
	if(maximizadas[2]==1){
		document.getElementById('CabezalBandejaSalidaWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}else if(document.getElementById("CabezalBandejaTrabajoWrap").style.display=="none"){
		document.getElementById('CabezalBandejaSalidaWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaSalidaWrap').style.height = ""+ALTO_ENTRADA_SALIDA+"px";
	}
	
	if(maximizadas[5]==1){
		document.getElementById('CabezalBandejaEntradaNotificadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}else if(document.getElementById("CabezalBandejaNotificadosWrap").style.display=="none"){
		document.getElementById('CabezalBandejaEntradaNotificadosWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaEntradaNotificadosWrap').style.height = ""+ALTO_NOTIFICADOS+"px";
	}
	if(maximizadas[6]==1){
		document.getElementById('CabezalBandejaNotificadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}else if(document.getElementById("CabezalBandejaEntradaNotificadosWrap").style.display=="none"){
		document.getElementById('CabezalBandejaNotificadosWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaNotificadosWrap').style.height = ""+ALTO_ACUSADOS+"px";
	}
	
	if(deshabilitadaCopia == 0){
		document.getElementById('CabezalBandejaCopiaExpWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}
	document.getElementById('CabezalBandejaParaFirmarWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaReservadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaMarcasExpWrap').style.height = ""+ALTO_MAXIMIZADA+"px";	
}

//Función encargada de ocultar el menú contextual
function ocultarMenuEvent(){
	if(ocultarMenu=="1"){
   		document.getElementById("contextZone_A").style.display = "none";
	}
}

function ocultarResolucionesEvent(){
	if(ocultarResoluciones=="1"){
   		document.getElementById("contextZone_B").style.display = "none";
	}
}

function cargarCantidadTrabajo(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadEntrada(){
	document.getElementById("cantDoc1").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadSalida(){
	document.getElementById("cantDoc2").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadParaFirmar(){
	document.getElementById("cantDoc3").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadReservados(){
	document.getElementById("cantDoc4").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadEntradaNotificados(){
	document.getElementById("cantDoc5").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadNotificados(){
	document.getElementById("cantDoc6").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadMarcados(){
	document.getElementById("cantDoc7").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadCopia(){
	document.getElementById("cantDoc8").innerHTML = "(" + this.getRowsNum()+ ")";
}
