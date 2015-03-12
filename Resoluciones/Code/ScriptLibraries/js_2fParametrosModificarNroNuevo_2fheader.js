var frm;
var cantPuntos;
var nSelAntes;
var nNuevo;

function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+frm.cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=pathname.toUpperCase();
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5));
	top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
}

function GuardoNro(nro){
	nSelAntes=frm.nropuntonuevo[nro-1].selectedIndex+1;
}

function CambioNro(nro){
	nNuevo=frm.nropuntonuevo[nro-1].selectedIndex+1;
	for( var k=0; k<frm.nropuntonuevo.length; k++) {
		if(k!=nro-1){
			if (frm.nropuntonuevo[k].selectedIndex==nNuevo-1){
				frm.nropuntonuevo[k].selectedIndex=nSelAntes-1;
			}
		}
	}
}

function aceptar(){
	//document.getElementById('btnAceptar').style.visibility = "hidden";
	//document.getElementById('btnCancelar').style.visibility = "hidden";
	var str="";
	for(var k=0; k<frm.nropuntonuevo.length; k++){
		num = frm.nropuntonuevo[k].options[frm.nropuntonuevo[k].selectedIndex].text;
		num2 = parseInt(num);
		str += num2 + ";";
	}
	var vValores = new Vector();
	var repetidos = false;
	//Verifico que no haya numeros repetidos
	for(var k=0; k<frm.nropuntonuevo.length; k++){
		num = frm.nropuntonuevo[k].selectedIndex;
		if (!vValores.vIsMember(num) && repetidos==false){
			vValores.vAgregar(num);
		} else {
			repetidos = true;
		}
	}

	//Le quito el último ;
	str = str.substring(0,str.length - 1);
	frm.punto.value= str;
	//Si no hay nros repetidos guardo.
	if (repetidos==false){
		document.getElementById('btnAceptar').style.visibility = "hidden";
		document.getElementById('btnCancelar').style.visibility = "hidden";
		document.forms[0].submit();
	} else {
		alert("No se permite tener números de asuntos repetidos");
	}
}

function cancelar(){
	document.getElementById('btnAceptar').style.visibility = "hidden";
	document.getElementById('btnCancelar').style.visibility = "hidden";
	
	if (document.forms[0].frameorigen.value != ""){
		location.href = document.forms[0].Protocolo.value+'://'+document.forms[0].frameorigen.value
	}else{
		window.history.back();
	}
}