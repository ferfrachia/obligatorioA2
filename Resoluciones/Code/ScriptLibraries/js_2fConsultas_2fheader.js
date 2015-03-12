function DirABS(){ 
	var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function seleccionUsuario(boton){
	NamePicker.init( {
		prompt: '<p>Seleccione la persona que desea agregar</p>',
  		addressbook: '/names.nsf',
  		viewname: '($VIMPeople)',
 		viewname2: 'People',
  		Organizacion: document.forms[0].Organizacion.value,
  		option1:'Por Nombre',
  		option2:'Por Apellido',
  		column: 1,
  		empty: true
	})
	var frm = document.getElementById("frameUsuario");
	frm.src=''
	NamePicker.open(boton, 'UserConsulta', 'single', 'Seleccione el Usuario por el que desea Consultar');
}
function agregarMiembroBoton(user){
	document.getElementById("UserConsulta").value=user
	
}
function consultarUsuario(){
	if (document.forms[0].UserConsulta.value==""){
		alert('Debe Seleccionar un Usuario para Consultar sus Roles');
	}else{
		var frm = document.getElementById("frameUsuario");
		frm.src=DirABS() + "/ConsultarRolesUsuario?OpenAgent&usr="+document.forms[0].UserConsulta.value
	}
}

function seleccionRol(){
	var frm = document.forms[0];
	var indice = document.forms[0].RolesUsuarios.selectedIndex
	var rol =frm.RolesUsuarios.options[indice].value;
	if (rol == "-"){
		alert("Debe Seleccionar el Rol que desea consultar");
	}else{
		frm = document.getElementById("frameRoles");
		frm.src=DirABS() + "ConsultarxRoles?OpenAgent&rol="+rol
	}
}

function Salir(){
	window.location = DirABS()+"/(SetRoles)?OpenForm"
}