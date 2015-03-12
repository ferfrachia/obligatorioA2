var tabselect='cargos';
var frm;
var t1;
var t2;

function DirABS(){ 
	var pathname=location.pathname;  
	pathname=pathname.toUpperCase();
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5)))  
}

function Guardar(){
//Acá realizo las validaciones.
	return true;
}

function Salir(){	
	//url=DirABS();
	//location.href = url+"/inicio?OpenFrameSet";
	location.href = document.getElementById("sPathConfPage").value;
}

function OcultarMenu(){
	var div;
	div=document.getElementById("barraMenu");
	if (div)
		div.style.display="none";
	div=document.getElementById("Archivo");
	if (div)
		div.style.display="none";
	div=document.getElementById("Acciones");
	if (div)
		div.style.display="none";
	div=document.getElementById("Salir");
	if (div)
		div.style.display="none";
	div=document.getElementById("SalirBandejas");
	if (div)
		div.style.display="none";
}

//Salvar
function salvar(){
	document.forms[0].salir.value = 0;
	if (Guardar()) {
		document.forms[0].submit();
	}
}

//Salvar y Salir
function salvarysalir(){
	document.forms[0].salir.value = 1;
	if (Guardar()) {
		document.forms[0].submit();
	}
}

function procesar(){
	var path = document.forms[0].sPathDbConf.value
	var protocolo = document.forms[0].Protocolo.value;
	var puerto = document.forms[0].Puerto.value;
	if (document.forms[0].Procesar.value!=""){
		var xmlhttp = new XMLHttpRequest();
		//location.href.substring(0,(location.href.toUpperCase().lastIndexOf('.NSF')+5))
		var url = protocolo+"://"+location.hostname+":"+puerto+"/"+path+"/ProcesarSolicitud?OpenAgent";
		xmlhttp.open("GET", url, true);
		xmlhttp.send('');
	}
}

function seleccionMiembros(boton){
	NamePicker.init({
	  prompt: '<p>Seleccione la persona</p>',
	  addressbook: '/names.nsf',
	  viewname: 'People',
	  viewname2: 'People',
	  Organizacion: document.forms[0].Organizacion.value,
	  column: 1,
	  empty: true
	})
	vCampos = new Vector(0);
	for(i=1;i<=document.forms[0].CountCamposVis.value;i++){
		vCampos.vAgregar("IUsuariosVisPub_" + i);
	}
	NamePicker.open2(boton, vCampos.vArray, 'table_sin_organ', 'Seleccione  los Miembros','IUsuariosVisAgr','IUsuariosVisPub-List');
//NamePicker.open(boton, 'IUsuariosVisPub', 'table_sin_organ', 'Seleccione  los Miembros');
}

function seleccionarUnidades(boton){
	NamePicker.init({
	  prompt: '<p>Seleccione la unidad</p>',
	  addressbook: '/'+document.forms[0].sPathDbOrgan.value,
	  viewname: '(BusquedaPorUnidad)',
	  column: 1,
	  empty: true
	})
	vCampos = new Vector(0);
	for(i=1; i<=document.forms[0].CountCamposVis.value; i++){
		vCampos.vAgregar("IUsuariosVisPub_" + i);
	}
	NamePicker.open2(boton, vCampos.vArray, 'table_unidad_multiple', 'Seleccione  las Unidades','IUsuariosVisAgr','IUsuariosVisPub-List');
}

function tabs2(tabParam) {
	tabselect = tabParam;
	if (tabParam=='temas')	{
		document.all('temas').style.display='block';
		MisTabs.setSelectedItems([0]);
	}else{
		document.all('temas').style.display='none';
	}	
	if (tabParam=='administracion'){
		document.all('administracion').style.display='block';
		MisTabs.setSelectedItems([1]);
	}else{
		document.all('administracion').style.display='none';
	}
	if (tabParam=='busqueda'){
		document.all('busqueda').style.display='block';
		MisTabs.setSelectedItems([2]);
	}else{
		document.all('busqueda').style.display='none';
	}
	if (tabParam=='diseño'){
		document.all('diseño').style.display='block';
		MisTabs.setSelectedItems([3]);
	}else{
		document.all('diseño').style.display='none';
	}
	if (tabParam=='parametros'){
		document.all('parametros').style.display='block';
		MisTabs.setSelectedItems([4]);
	}else{
		document.all('parametros').style.display='none';
	}

	if (tabParam=='interoperabilidad'){
		document.all('interoperabilidad').style.display='block';
		MisTabs.setSelectedItems([5]);
	}else{
		document.all('interoperabilidad').style.display='none';
	}

	if (tabParam=='numeracion'){
		document.all('numeracion').style.display='block';
		MisTabs.setSelectedItems([6]);
	}else{
		document.all('numeracion').style.display='none';
	}
	if(tabParam='PreGeneradoActa'){
		alert("HOLA");
	}
}