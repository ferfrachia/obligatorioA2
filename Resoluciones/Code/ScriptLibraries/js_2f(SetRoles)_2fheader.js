var frm;
var Nombres;
var usuariosRoles;
function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 
//Salir
function Salir(){
	url=DirABS();
	location.href = url+'/inicio?OpenFrameSet';
}

function salvarysalir(){
	document.forms[0].salir.value=DirABS()+"/inicio?OpenFrameSet"
	frm.submit();
}


function cargarRoles(){
	var vRoles = stringToVector(document.forms[0].ccRoles.value);
	var contadores = new Array();

	html = "<tr><td class=\"tituloTotales\">&nbsp;</td>";
	htmlTotales = "<table  border=\"0\" cellpadding=\"3\" cellspacing=\"0\"><tr><td class=\"tituloTotales\">&nbsp;</td>"
	for(var j=0;j<vRoles.vLength;j++){
		contadores[j]=0;
		rol = vRoles.vArray[j].substring(vRoles.vArray[j].indexOf("[")+1,vRoles.vArray[j].indexOf("]"))
		html = html+"<td class=\"tituloTotales\" align=\"center\">"+rol+"</td>"
	}
	html = html+"<td class=\"tituloTotales\">Todos </td>"; //<td class=\"tituloTotales\">&nbsp;</td>"yyyy

//new Insertion.Bottom("ListaUsuarios", html);	
$("#ListaUsuarios").append(html);
	var DIVRoles = document.getElementById("RolesUsuarios");
	if (DIVRoles){
		for (var i=0;i<Nombres.vLength;i++){
		
			html="<tr id=\""+Nombres.vArray[i]+"\"><td class=\"tipoletranegra\">"+Nombres.vArray[i]+"</td>";
			for(var k=0;k<vRoles.vLength;k++){
				html=html+"<td align=\"center\" width=\"100\"><input type=\"checkbox\" name=\""+vRoles.vArray[k]+i+"\" value=\""+Nombres.vArray[i]+"-"+vRoles.vArray[k]+"\"";
				if (usuarioRoles.vIsMember(Nombres.vArray[i]+"-"+vRoles.vArray[k])){
					contadores[k]=contadores[k]+1;
					html=html+" checked onclick=\"verificarRol(this)\"></td>";
				}else{
					html=html+" onclick=\"verificarRol(this)\"></td>";
				} 
				//var htmlAll = "<td><a href='javascript:selectAll(\""+Nombres.vArray[i]+"\")'><img src='"+DirABS()+"//images/icons/check.gif'></a>&nbsp;&nbsp;<a href='javascript:unselectAll(\""+Nombres.vArray[i]+"\")'><img src='"+DirABS()+"//images/icons/remove.gif'></a></td>";
				var htmlAll = "<td><img src='"+DirABS()+"//images/icons/check.gif' onClick=\"selectAll('"+Nombres.vArray[i]+"')\">&nbsp;&nbsp;<img src='"+DirABS()+"//images/icons/remove.gif' onClick=\"unselectAll('"+Nombres.vArray[i]+"')\">"//<a href='javascript:unselectAll(\""+Nombres.vArray[i]+"\")'><img src='"+DirABS()+"//images/icons/remove.gif'></a></td>";
				//htmlAll = htmlAll +  "<td><a href='javascript:unselectAll(\""+Nombres.vArray[i]+"\")'><img src='"+DirABS()+"//images/icons/remove.gif'></a></td>";
			}
			html=html+htmlAll+ "</tr>";
			//new Insertion.Bottom("ListaUsuarios", html);	
			$("#ListaUsuarios").append(html);	
		}
		
		//htmlTotales="<tr><td class=\"tituloTotales\">Totales</td>"
		//var tr = document.createElement('tr')
		//var td = document.createElement('td')
		//var b = document.createElement('b')
		//	tfoot = document.getElementById('totales');
		 
		//var tdChk = document.createElement('td');
		//var tdDlt = document.createElement('td');		
	//	tdChk.src =  DirABS() + "//images/icons/check.gif"
		//tdDlt.src =  DirABS() + "//images/icons/remove.gif"
		//tdChk.href = 
		//tdDlt.href = 
		var ctd= "</td>";
		var ctr="</tr>";
		var td= "<td";
		var tr="<tr";
		var untd="";
		var untr="";		
		
		untd= td+" class='tituloTotales' align='center'> Totales: "+ctd;
		untr = tr+">"+untd;
	//	td.innerText=" "
	//	td.className="totales"
	//	tr.appendChild(td)
	//	tfoot.appendChild(tr)
	//	tr = document.createElement('tr')
	//	td = document.createElement('td')
	//	b.innerText = "Totales: "
		//td.innerText="Totales: "
	//	td.appendChild(b)
	//	td.className="tituloTotales"
	//	tr.appendChild(td);
		
	for (j=0;j<contadores.length;j++){
		//alert(contadores[j]);
			untd=td+" id='"+"Tot"+vRoles.vArray[j].replace("[","").replace("]","")+"' class='tituloTotales'	align='center' value='"+contadores[j]+"'>" + contadores[j] + ctd;
			untr=untr+untd;
//			untd= untd+contadores[j] + ctd;
//			td = document.createElement('td');
//			td.className="tituloTotales"
//			td.align="center"
//			td.innerText=contadores[j]
//			td.id="Tot"+vRoles.vArray[j];
//			var id ="#Tot"+vRoles.vArray[j];
			//$(id).html(contadores[j]);
//			tr.appendChild(td)
//alert($(id).html());
//			alert($(id).html());
//			tr.appendChild(tdChk)
//			tr.appendChild(tdDlt)
		}
		untr= untr+td+">"+ctd+ctr;
		//divTotales = document.getElementById('Totales')
		//divTotales.innerHTML=htmlTotales+"</tr></table>";	
		//htmlTotales="<tr id=\"totales\"><td colspan=\"6\">&nbsp;</td></tr>"+htmlTotales+"</tr>"
		$("#totales").html(untr);
		
		//tfoot.appendChild(tr)
		//tfoot.innerHTML=htmlTotales;
	}	
}


function verificarRol(campo){
		var scampo = campo.value;
		scampo = "Tot"+scampo.substring(scampo.indexOf("[")+1,scampo.indexOf("]"));
		var rcant = document.getElementById(scampo).innerHTML;
		scampo="#"+scampo;
	if (campo.checked){
		
		$(scampo).html(parseInt(rcant.toString())+1);
		
		// Tengo que ver si lo agrego a los que se van a agregar o no
		// Primero tengo que verificar que no este entre los que se van a borrar
		var vEliminarRol = stringToVector(document.forms[0].EliminarRol.value)
		if (vEliminarRol.vIsMember(campo.value)){
			vEliminarRol.vBorrar(vIndice(campo.value));
			document.forms[0].EliminarRol.value=VectorToString(vEliminarRol)
		}
		
		if(usuarioRoles.vIsMember(campo.value)){
			//No tengo que hacer nada porque es un rol que ya se agrego
		}else{

			var vAgregarRol = stringToVector(document.forms[0].AgregarRol.value)
			if (vAgregarRol.vIsMember(campo.value)){
				// No tengo que hacer nada
			} else {
				vAgregarRol.vAgregar(campo.value)
				document.forms[0].AgregarRol.value=VectorToString(vAgregarRol);
				//alert(VectorToString(vAgregarRol));
			}
		
		}
		
		/*	var valores = StringToVector3(campo.value,"-");
		alert(valores.vArray[1]);
		var div = document.getElementById("Tot"+valores.vArray[1]);
		var nro = div.innerText;
		nro = new Number(nro);
		nro = nro +1;
		div.innerText=nro;*/
		
	}else{
	
		$(scampo).html(parseInt(rcant.toString())-1);
		// Tengo que verificar si se borra o no el rol
		var vEliminarRol = stringToVector(document.forms[0].EliminarRol.value);
		var vAgregarRol = stringToVector(document.forms[0].AgregarRol.value);
		if (vAgregarRol.vIsMember(campo.value)){
			vAgregarRol.vBorrar(vAgregarRol.vIndice(campo.value));
			document.forms[0].AgregarRol.value=VectorToString(vAgregarRol)
		}
		if (usuarioRoles.vIsMember(campo.value)){
			// ACA TENGO QUE AGREGARLO PA BORRAR
			vEliminarRol.vAgregar(campo.value)
			document.forms[0].EliminarRol.value=VectorToString(vEliminarRol)
		}else{
			// NO TENGO QUE HACER NADA 
		}

		/*valores = StringToVector3(campo.value,"-");
		var div = document.getElementById("Tot"+valores.vArray[1]);
		var nro = div.innerText
		nro = new Number(nro);
		nro = nro -1
		div.innerText=nro
		*/
	}


}
function seleccionMiembros(boton){
NamePicker.init( {
  prompt: '<p>Seleccione la persona que desea agregar</p>',
  addressbook: '/names.nsf',
  viewname: '($VIMPeople)',
  viewname2: 'People',
  Organizacion: document.forms[0].Organizacion.value,
  option1:'Por Nombre',
  option2:'Por Apellido',
  column: 1,
  roles_field: 'ccRoles',
  empty: true,
  idtotales: 'totales'
	
})
NamePicker.open(boton, 'ListaUsuarios', 'conroles', 'Seleccione  los Miembros');
}

function consultas(){
	window.location = DirABS()+"/Consultas?OpenForm"
}
function tomararMiembroyAgregar(){
	agregarMiembroBoton(document.getElementById("addMiembro").value);
}
function agregarMiembroBoton(persona){
	//persona = document.getElementById("addMiembro").value;
	
	if(persona != ""){
		if (!Nombres.vIsMember(persona)){
			vRoles = stringToVector(document.forms[0].ccRoles.value);
			Nombres = StringToVector2(document.forms[0].Nombres.value,"; ");
			Nombres.vAgregar(persona);
			document.forms[0].Nombres.value = VectorToString2(Nombres,"; ");
			i=Nombres.vLength - 1;
			html="<tr id=\""+Nombres.vArray[i]+"\"><td class=\"tipoletranegra\">"+Nombres.vArray[i]+"</td>"
			for(var k=0;k<vRoles.vLength;k++){
				html=html+"<td align=\"center\" width=\"100\"><input type=\"checkbox\" name=\""+vRoles.vArray[k]+i+"\" value=\""+Nombres.vArray[i]+"-"+vRoles.vArray[k]+"\""
				html=html+" onclick=\"verificarRol(this)\"></td>"
				var htmlAll = "<td><img src='"+DirABS()+"//images/icons/check.gif' onClick=\"selectAll('"+Nombres.vArray[i]+"')\">&nbsp;&nbsp;<img src='"+DirABS()+"//images/icons/remove.gif' onClick=\"unselectAll('"+Nombres.vArray[i]+"')\">";
			
			}
			html=html+htmlAll+"</tr>"
			//new Insertion.Bottom("ListaUsuarios", html);	
			
			$("#ListaUsuarios").append(html);
			//document.getElementById("ListaUsuarios").innerText = "";
			//document.getElementById("totales").innerText = "";
			//cargarRoles();
		}else{
			alert("Ese usuario ya fue ingresado");
		}
	}else{
		alert("Debe ingresar un nombre de usuario");
	}
}

function selectAll(idFila){
	var row = document.getElementById(idFila);
	for(var i=0;i< row.cells.length;i++){
		var valorCol=row.cells[i];
		for (var chk=valorCol.getElementsByTagName("input"), j=chk.length; j--; )
			if (chk[j].type=="checkbox" & chk[j].checked!=true){
				chk[j].checked = true;
				verificarRol(chk[j]);
			}
	}
}

function unselectAll(idFila){
	var row = document.getElementById(idFila);
	for(var i=0;i< row.cells.length;i++){
		var valorCol=row.cells[i];
		for (var chk=valorCol.getElementsByTagName("input"), j=chk.length; j--; )
			if (chk[j].type=="checkbox" & chk[j].checked!=false){
				chk[j].checked = false;
				verificarRol(chk[j]);
			}
	}
}
