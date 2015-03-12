var idFilaR1="";
var idFilaR2="";
var idFilaR3="";

var idFilaA1="";
var idFilaA2="";
var idFilaA3="";

var idFilaP1="";
var idFilaP2="";
var idFilaP3="";
var idFilaP4="";
var idFilaP5="";
var idFilaP6="";

function delRow(TipoTabla,indice){
	
	
	if (TipoTabla =="Razones"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (indice=="1"&& idFilaR1==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="2"&& idFilaR2==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}else if (indice=="3"&& idFilaR3==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		
		var razon="[name='Razones_"+indice+"']";
		var valoresR=$(razon).val();
		var vValores =  StringToVector3(valoresR,",");
		
		if (!vValores.vIsMember(Campo)){
			 alert (Campo + " no existe en la tabla.");
			 return;
		}
		var index;
		var indInt;	
		if (indice=="1"){
			$("#"+idFilaR1).remove();
			index=idFilaR1.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="2"){
			$("#"+idFilaR2).remove();
			index=idFilaR2.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="3"){
			$("#"+idFilaR3).remove();
			index=idFilaR3.substring(2);
			indInt=parseInt(index);
		}
		
		vValores =  StringToVector3(valoresR,",");
		vValores.vBorrar(indInt);
		
		if (indice=="1"){
			document.forms[0].Razones_1.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesDevolucion.value=document.forms[0].Razones_1.value;
			idFilaR1="";
		}
		else if (indice=="2"){
			document.forms[0].Razones_2.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesFinalizacion.value=document.forms[0].Razones_2.value;
			idFilaR2="";
		}
		else if (indice=="3"){
			document.forms[0].Razones_3.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesArchivado.value=document.forms[0].Razones_3.value;
			idFilaR3="";
		}
		cargarTabla(TipoTabla,indice);
		document.getElementById("Campo"+TipoTabla+indice).value="";
		
	}//Tabla Razones
	else if (TipoTabla =="Avisos"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (indice=="1"&& idFilaA1==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="2"&& idFilaA2==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="3"&& idFilaA3==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		
		var aviso="[name='Avisos_"+indice+"']";
		var valoresR=$(aviso).val();
		var vValores =  StringToVector3(valoresR,",");
		
		if (!vValores.vIsMember(Campo)){
			 alert (Campo + " no existe en la tabla.");
			 return;
		}
		var index;
		var indInt;	
		if (indice=="1"){
			$("#"+idFilaA1).remove();
			index=idFilaA1.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="2"){
			$("#"+idFilaA2).remove();
			index=idFilaA2.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="3"){
			$("#"+idFilaA3).remove();
			index=idFilaA3.substring(2);
			indInt=parseInt(index);
		}
		
		vValores =  StringToVector3(valoresR,",");
		vValores.vBorrar(indInt);
		
		if (indice=="1"){
			document.forms[0].Avisos_1.value=VectorToString2(vValores,",");
			document.forms[0].sCamposAvisosMail.value=document.forms[0].Avisos_1.value;
			idFilaA1="";
		}
		else if (indice=="2"){
			document.forms[0].Avisos_2.value=VectorToString2(vValores,",");
			document.forms[0].sCamposAvisosTelefono.value=document.forms[0].Avisos_2.value;
			idFilaA2="";
		}
		else if (indice=="3"){
			document.forms[0].Avisos_3.value=VectorToString2(vValores,",");
			document.forms[0].sCamposAvisosCelular.value=document.forms[0].Avisos_3.value;
			idFilaA3="";
		}
		cargarTabla(TipoTabla,indice);
		document.getElementById("Campo"+TipoTabla+indice).value="";
		
	}//Tabla Avisos
	else if (TipoTabla =="Presentacion"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (indice=="1"&& idFilaP1==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="2"&& idFilaP2==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="3"&& idFilaP3==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="4"&& idFilaP4==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="5"&& idFilaP5==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		else if (indice=="6"&& idFilaP6==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
		 	 return;
		}
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		
		var presentacion="[name='Presentacion_"+indice+"']";
		var valoresR=$(presentacion).val();
		var vValores =  StringToVector3(valoresR,",");
		
		if (!vValores.vIsMember(Campo)){
			 alert (Campo + " no existe en la tabla.");
			 return;
		}
		var index;
		var indInt;	
		if (indice=="1"){
			$("#"+idFilaP1).remove();
			index=idFilaP1.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="2"){
			$("#"+idFilaP2).remove();
			index=idFilaP2.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="3"){
			$("#"+idFilaP3).remove();
			index=idFilaP3.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="4"){
			$("#"+idFilaP4).remove();
			index=idFilaP4.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="5"){
			$("#"+idFilaP5).remove();
			index=idFilaP5.substring(2);
			indInt=parseInt(index);
		}
		else if (indice=="6"){
			$("#"+idFilaP6).remove();
			index=idFilaP6.substring(2);
			indInt=parseInt(index);
		}
		
		vValores =  StringToVector3(valoresR,",");
		vValores.vBorrar(indInt);
		
		if (indice=="1"){
			document.forms[0].Presentacion_1.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesColumna.value=document.forms[0].Presentacion_1.value;
			idFilaP1="";
		}
		else if (indice=="2"){
			document.forms[0].Presentacion_2.value=VectorToString2(vValores,",");
			document.forms[0].sNombreColumnas.value=document.forms[0].Presentacion_2.value;
			idFilaP2="";
		}
		else if (indice=="3"){
			document.forms[0].Presentacion_3.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesColumnaE.value=document.forms[0].Presentacion_3.value;
			idFilaP3="";
		}
		else if (indice=="4"){
			document.forms[0].Presentacion_4.value=VectorToString2(vValores,",");
			document.forms[0].sNombreColumnasE.value=document.forms[0].Presentacion_4.value;
			idFilaP4="";
		}
		else if (indice=="5"){
			document.forms[0].Presentacion_5.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesColumnaS.value=document.forms[0].Presentacion_5.value;
			idFilaP5="";
		}
		else if (indice=="6"){
			document.forms[0].Presentacion_6.value=VectorToString2(vValores,",");
			document.forms[0].sNombreColumnasS.value=document.forms[0].Presentacion_6.value;
			idFilaP6="";
		}
		
		cargarTabla(TipoTabla,indice);
		document.getElementById("Campo"+TipoTabla+indice).value="";
	}
	   
         
}
function modRow(TipoTabla,indice){
	
	
	if (TipoTabla =="Razones"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (indice=="1"&& idFilaR1==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="2"&& idFilaR2==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}else if (indice=="3"&& idFilaR3==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		
		var razon="[name='Razones_"+indice+"']";
		var valoresR=$(razon).val();
		var vValores =  StringToVector3(valoresR,",");
		var cells;
		var index;
		
		if (indice=="1"){
			cells =$("#"+idFilaR1).find('td');
			index = idFilaR1.substring(2);
		}
		else if (indice=="2"){
			cells =$("#"+idFilaR2).find('td');
			index = idFilaR2.substring(2);
		}
		else if (indice=="3"){
			cells =$("#"+idFilaR3).find('td');
			index = idFilaR3.substring(2);
		}
		
		cells[0].innerHTML=document.getElementById("Campo"+TipoTabla+indice).value ;
	
	
		
		var indInt = parseInt(index);
		vValores =  StringToVector3(valoresR,",");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Campo"+TipoTabla+indice).value,indInt);
		
		if (indice=="1"){
			document.forms[0].Razones_1.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesDevolucion.value=document.forms[0].Razones_1.value;
			idFilaR1="";
		}
		else if (indice=="2"){
			document.forms[0].Razones_2.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesFinalizacion.value=document.forms[0].Razones_2.value;
			idFilaR2="";
		}
		else if (indice=="3"){
			document.forms[0].Razones_3.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesArchivado.value=document.forms[0].Razones_3.value;
			idFilaR3="";
		}
		
		document.getElementById("Campo"+TipoTabla+indice).value="";
		
	}//Razones
	else if (TipoTabla =="Avisos"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (indice=="1"&& idFilaA1==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="2"&& idFilaA2==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}else if (indice=="3"&& idFilaA3==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		
		var aviso="[name='Avisos_"+indice+"']";
		var valoresR=$(aviso).val();
		var vValores =  StringToVector3(valoresR,",");
		var cells;
		var index;
		
		if (indice=="1"){
			cells =$("#"+idFilaA1).find('td');
			index = idFilaA1.substring(2);
		}
		else if (indice=="2"){
			cells =$("#"+idFilaA2).find('td');
			index = idFilaA2.substring(2);
		}
		else if (indice=="3"){
			cells =$("#"+idFilaA3).find('td');
			index = idFilaA3.substring(2);
		}
		
		cells[0].innerHTML=document.getElementById("Campo"+TipoTabla+indice).value ;
	
	
		
		var indInt = parseInt(index);
		vValores =  StringToVector3(valoresR,",");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Campo"+TipoTabla+indice).value,indInt);
		if (indice=="1"){
			document.forms[0].Avisos_1.value=VectorToString2(vValores,",");
			document.forms[0].sCamposAvisosMail.value=document.forms[0].Avisos_1.value;
			idFilaA1="";
		}
		else if (indice=="2"){
			document.forms[0].Avisos_2.value=VectorToString2(vValores,",");
			document.forms[0].sCamposAvisosTelefono.value=document.forms[0].Avisos_2.value;
			idFilaA2="";
		}
		else if (indice=="3"){
			document.forms[0].Avisos_3.value=VectorToString2(vValores,",");
			document.forms[0].sCamposAvisosCelular.value=document.forms[0].Avisos_3.value;
			idFilaA3="";
		}
		
		document.getElementById("Campo"+TipoTabla+indice).value="";
	}//Avisos
	else if (TipoTabla =="Presentacion"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (indice=="1"&& idFilaP1==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="2"&& idFilaP2==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="3"&& idFilaP3==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="4"&& idFilaP4==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="5"&& idFilaP5==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		else if (indice=="6"&& idFilaP6==""){
			 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
		 	 return;
		}
		
		
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		
		var presentacion="[name='Presentacion_"+indice+"']";
		var valoresR=$(presentacion).val();
		var vValores =  StringToVector3(valoresR,",");
		var cells;
		var index;
		
		if (indice=="1"){
			cells =$("#"+idFilaP1).find('td');
			index = idFilaP1.substring(2);
		}
		else if (indice=="2"){
			cells =$("#"+idFilaP2).find('td');
			index = idFilaP2.substring(2);
		}
		else if (indice=="3"){
			cells =$("#"+idFilaP3).find('td');
			index = idFilaP3.substring(2);
		}
		else if (indice=="4"){
			cells =$("#"+idFilaP4).find('td');
			index = idFilaP4.substring(2);
		}
		else if (indice=="5"){
			cells =$("#"+idFilaP5).find('td');
			index = idFilaP5.substring(2);
		}
		else if (indice=="6"){
			cells =$("#"+idFilaP6).find('td');
			index = idFilaP6.substring(2);
		}
		
		cells[0].innerHTML=document.getElementById("Campo"+TipoTabla+indice).value ;
	
	
		
		var indInt = parseInt(index);
		vValores =  StringToVector3(valoresR,",");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Campo"+TipoTabla+indice).value,indInt);
		
		if (indice=="1"){
			document.forms[0].Presentacion_1.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesColumna.value=document.forms[0].Presentacion_1.value;
			idFilaP1="";
		}
		else if (indice=="2"){
			document.forms[0].Presentacion_2.value=VectorToString2(vValores,",");
			document.forms[0].sNombreColumnas.value=document.forms[0].Presentacion_2.value;
			idFilaP2="";
		}
		else if (indice=="3"){
			document.forms[0].Presentacion_3.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesColumnaE.value=document.forms[0].Presentacion_3.value;
			idFilaP3="";
		}
		else if (indice=="4"){
			document.forms[0].Presentacion_4.value=VectorToString2(vValores,",");
			document.forms[0].sNombreColumnasE.value=document.forms[0].Presentacion_4.value;
			idFilaP4="";
		}
		else if (indice=="5"){
			document.forms[0].Presentacion_5.value=VectorToString2(vValores,",");
			document.forms[0].sRazonesColumnaS.value=document.forms[0].Presentacion_5.value;
			idFilaP5="";
		}
		else if (indice=="6"){
			document.forms[0].Presentacion_6.value=VectorToString2(vValores,",");
			document.forms[0].sNombreColumnasS.value=document.forms[0].Presentacion_6.value;
			idFilaP6="";
		}
		document.getElementById("Campo"+TipoTabla+indice).value="";
		
	}
           
 }     		
          
function appRow(TipoTabla,indice){
    
	var html ="";
 
	if (TipoTabla=="Razones"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		var idR="";
		if (indice=="1"){
			idR="RU";	
			if (document.forms[0].Razones_1.value == ""){
	          	document.forms[0].Razones_1.value = Campo; 
	        }
	        else{
	          	document.forms[0].Razones_1.value += ","+ Campo; 
	        }
			document.forms[0].sRazonesDevolucion.value=document.forms[0].Razones_1.value;
		}
		else if (indice=="2"){
			idR="RD";	
			if (document.forms[0].Razones_2.value == ""){
	          	document.forms[0].Razones_2.value = Campo; 
	        }
	        else{
	          	document.forms[0].Razones_2.value += ","+ Campo; 
	        }
			document.forms[0].sRazonesFinalizacion.value=document.forms[0].Razones_2.value;
		}
		else if (indice=="3"){
			idR="RT";	
			if (document.forms[0].Razones_3.value == ""){
	          	document.forms[0].Razones_3.value = Campo; 
	        }
	        else{
	          	document.forms[0].Razones_3.value += ","+ Campo; 
	        }
			document.forms[0].sRazonesArchivado.value=document.forms[0].Razones_3.value;
		}
		
		var razon="[name='Razones_"+indice+"']";
		var valoresR=$(razon).val();
		var vValores =  StringToVector3(valoresR,",");
		
		var estilo ="filaBlanca";
		  
	    var ide = vValores.vArray.length -1;
	
        idR =idR + ide.toString();
         
 		html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
 		      
        html+="<td width='6%'>"+Campo;
		html+="</td></tr>";
		if (indice=="1"){
				idFilaR1="";
				$( "#Razones1tbody" ).append(html);
		}
		else if (indice=="2"){
				idFilaR2="";
				$( "#Razones2tbody" ).append(html);
		}
		else if (indice=="3"){
				idFilaR3="";
				$( "#Razones3tbody" ).append(html);
		}
    
    	
    	document.getElementById("Campo"+TipoTabla+indice).value="";
    	
    		
		
		
		
	}//Razones
	else if (TipoTabla=="Avisos"){
	   
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		var idR="";
		if (indice=="1"){
			idR="AU";	
			if (document.forms[0].Avisos_1.value == ""){
	          	document.forms[0].Avisos_1.value = Campo; 
	        }
	        else{
	          	document.forms[0].Avisos_1.value += ","+ Campo; 
	        }
			document.forms[0].sCamposAvisosMail.value=document.forms[0].Avisos_1.value;
		}
		else if (indice=="2"){
			idR="AD";	
			if (document.forms[0].Avisos_2.value == ""){
	          	document.forms[0].Avisos_2.value = Campo; 
	        }
	        else{
	          	document.forms[0].Avisos_2.value += ","+ Campo; 
	        }
			document.forms[0].sCamposAvisosTelefono.value=document.forms[0].Avisos_2.value;
		}
		else if (indice=="3"){
			idR="AT";	
			if (document.forms[0].Avisos_3.value == ""){
	          	document.forms[0].Avisos_3.value = Campo; 
	        }
	        else{
	          	document.forms[0].Avisos_3.value += ","+ Campo; 
	        }
			document.forms[0].sCamposAvisosCelular.value=document.forms[0].Avisos_3.value;
		}
		
		var aviso="[name='Avisos_"+indice+"']";
		var valoresR=$(aviso).val();
		var vValores =  StringToVector3(valoresR,",");
		
		var estilo ="filaBlanca";
		  
	    var ide = vValores.vArray.length -1;
	
        idR =idR + ide.toString();
         
 		html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
 		      
        html+="<td width='6%'>"+Campo;
		html+="</td></tr>";
	
		if (indice=="1"){
				idFilaA1="";
				$( "#Avisos1tbody" ).append(html);
				
				
		}
		else if (indice=="2"){
				idFilaA2="";
				$( "#Avisos2tbody" ).append(html);
		}
		else if (indice=="3"){
				idFilaA3="";
				$( "#Avisos3tbody" ).append(html);
		}
    
    	
    	document.getElementById("Campo"+TipoTabla+indice).value="";
    	
	}
	else if (TipoTabla=="Presentacion"){
		
		var Campo = document.getElementById("Campo"+TipoTabla+indice).value;
		
		if (Campo==""){
			alert("Debe ingresar un valor para agregar.");
			return;
			
		}
		var idR="";
		if (indice=="1"){
			idR="PU";	
			if (document.forms[0].Presentacion_1.value == ""){
	          	document.forms[0].Presentacion_1.value = Campo; 
	        }
	        else{
	          	document.forms[0].Presentacion_1.value += ","+ Campo; 
	        }
			document.forms[0].sRazonesColumna.value=document.forms[0].Presentacion_1.value;
		}
		else if (indice=="2"){
			idR="PD";	
			if (document.forms[0].Presentacion_2.value == ""){
	          	document.forms[0].Presentacion_2.value = Campo; 
	        }
	        else{
	          	document.forms[0].Presentacion_2.value += ","+ Campo; 
	        }
			document.forms[0].sNombreColumnas.value=document.forms[0].Presentacion_2.value;
			
		}
		else if (indice=="3"){
			idR="PT";	
			if (document.forms[0].Presentacion_3.value == ""){
	          	document.forms[0].Presentacion_3.value = Campo; 
	        }
	        else{
	          	document.forms[0].Presentacion_3.value += ","+ Campo; 
	        }
			document.forms[0].sRazonesColumnaE.value=document.forms[0].Presentacion_3.value;
		}
		else if (indice=="4"){
			idR="PC";	
			if (document.forms[0].Presentacion_4.value == ""){
	          	document.forms[0].Presentacion_4.value = Campo; 
	        }
	        else{
	          	document.forms[0].Presentacion_4.value += ","+ Campo; 
	        }
			document.forms[0].sNombreColumnasE.value=document.forms[0].Presentacion_4.value;
		}else if (indice=="5"){
			//deberia ser PC por p cinco, pero sino repito
			idR="PZ";	
			if (document.forms[0].Presentacion_5.value == ""){
	          	document.forms[0].Presentacion_5.value = Campo; 
	        }
	        else{
	          	document.forms[0].Presentacion_5.value += ","+ Campo; 
	        }
			document.forms[0].sRazonesColumnaS.value=document.forms[0].Presentacion_5.value;
		}else if (indice=="6"){
			idR="PS";	
			if (document.forms[0].Presentacion_6.value == ""){
	          	document.forms[0].Presentacion_6.value = Campo; 
	        }
	        else{
	          	document.forms[0].Presentacion_6.value += ","+ Campo; 
	        }
			document.forms[0].sNombreColumnasS.value=document.forms[0].Presentacion_6.value;
		}
		
		var presentacion="[name='Presentacion_"+indice+"']";
		var valoresR=$(presentacion).val();
		var vValores =  StringToVector3(valoresR,",");
		
		var estilo ="filaBlanca";
		  
	    var ide = vValores.vArray.length -1;
	
        idR =idR + ide.toString();
         
 		html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
 		      
        html+="<td width='6%'>"+Campo;
		html+="</td></tr>";
	
		if (indice=="1"){
				idFilaP1="";
				$( "#Presentacion1tbody" ).append(html);
		}
		else if (indice=="2"){
				idFilaP2="";
				$( "#Presentacion2tbody" ).append(html);
		}
		else if (indice=="3"){
				idFilaP3="";
				$( "#Presentacion3tbody" ).append(html);
		}
		else if (indice=="4"){
			idFilaP4="";
			$( "#Presentacion4tbody" ).append(html);
		}
		else if (indice=="5"){
			idFilaP5="";
			$( "#Presentacion5tbody" ).append(html);
		}
		else if (indice=="6"){
			idFilaP6="";
			$( "#Presentacion6tbody" ).append(html);
		}
    	
    	document.getElementById("Campo"+TipoTabla+indice).value="";
	}
        
} 
function camposSeleccionados(row)
{
	
     	 cells = row.getElementsByTagName('td');
         idFilaO=row.id;
         idFila=idFilaO.substring(0,2);
       
         var cell0 = $(row).find("td:eq(0)");
     
    	 var aux=cell0.html();
    	 aux= aux.replace(/\&amp;/g,'&');
    	 aux= aux.replace(/\&lt;/g,'<');
    	 aux= aux.replace(/\&gt;/g,'>');
    	 aux= aux.replace(/\&quot;/g,'"');
         
         if (idFila=="RU"){
        	 idFilaR1=idFilaO;
        	 document.getElementById("CampoRazones1").value=aux; 
        	 
         }else if (idFila=="RD"){
        	 idFilaR2=idFilaO;
        	 document.getElementById("CampoRazones2").value=aux;
        	
         }else if (idFila=="RT"){
        	 idFilaR3=idFilaO;
        	 document.getElementById("CampoRazones3").value=aux;
        	
        	 
         }else if (idFila=="AU"){
        	 idFilaA1=idFilaO;
        	 document.getElementById("CampoAvisos1").value=aux;
         }
         else if (idFila=="AD"){
        	 idFilaA2=idFilaO;
        	 document.getElementById("CampoAvisos2").value=aux;
         }
         else if (idFila=="AT"){
        	 idFilaA3=idFilaO;
        	 document.getElementById("CampoAvisos3").value=aux;
         }
         else if (idFila=="PU"){
        	 idFilaP1=idFilaO;
        	 document.getElementById("CampoPresentacion1").value=aux;
         }
         else if (idFila=="PD"){
        	 idFilaP2=idFilaO;
        	 document.getElementById("CampoPresentacion2").value=aux;
         }
         else if (idFila=="PT"){
        	 idFilaP3=idFilaO;
        	 document.getElementById("CampoPresentacion3").value=aux;
         }
         else if (idFila=="PC"){
        	 idFilaP4=idFilaO;
        	 document.getElementById("CampoPresentacion4").value=aux;
         }
         else if (idFila=="PZ"){
        	 idFilaP5=idFilaO;
        	 document.getElementById("CampoPresentacion5").value=aux;
         }
         else if (idFila=="PS"){
        	 idFilaP6=idFilaO;
        	 document.getElementById("CampoPresentacion6").value=aux;
         }
}
function cargarTabla(TipoTabla,indice)
{  
	if (TipoTabla=="Razones"){
	
		var razon="[name='Razones_"+indice+"']";
		var valoresR=$(razon).val();

		
		if (valoresR !=""){
		
			var idRaux="";
			
			if (indice=="1"){
    				idRaux="RU";
    				document.forms[0].sRazonesDevolucion.value=document.forms[0].Razones_1.value;
			}
			else if (indice=="2"){
					idRaux="RD";
					document.forms[0].sRazonesFinalizacion.value=document.forms[0].Razones_2.value;
			}
			else if (indice=="3"){
					idRaux="RT";
					document.forms[0].sRazonesArchivado.value=document.forms[0].Razones_3.value;
			}
			
			var vValores =  StringToVector3(valoresR,",");
			var html="";
			var idR="";
		
			var estilo ="filaBlanca";
			for(i=0;i<vValores.vArray.length;i++){
	     		
   		   
   		      idR =idRaux+ i.toString();
   		      if (document.getElementById("Edicion").value==1){
   		    	  html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
   		      }
   		      else{
   		    	html+="<tr id="+idR+" class=\""+estilo+"\" >";
   		      }
   		      html+="<td width='6%'>"+vValores.vArray[i] ;
			  html+="</td></tr>";
         
            }
			
			if (indice=="1"){
				 $("#Razones1tabla > tbody").html(html);
			}
			else if (indice=="2"){
				 $("#Razones2tabla > tbody").html(html);
			}
			else if (indice=="3"){
				 $("#Razones3tabla > tbody").html(html);
			}
			
		}
		
	}//Razones
	else if (TipoTabla=="Avisos"){
	
		var aviso="[name='Avisos_"+indice+"']";
		var valoresR=$(aviso).val();

		
		if (valoresR !=""){
		
			var idRaux="";
			
			if (indice=="1"){
    				idRaux="AU";
    				document.forms[0].sCamposAvisosMail.value=document.forms[0].Avisos_1.value;
			}
			else if (indice=="2"){
					idRaux="AD";
					document.forms[0].sCamposAvisosTelefono.value=document.forms[0].Avisos_2.value;
			}
			else if (indice=="3"){
					idRaux="AT";
					document.forms[0].sCamposAvisosCelular.value=document.forms[0].Avisos_3.value;
			}
			
			var vValores =  StringToVector3(valoresR,",");
			var html="";
			var idR="";
		
			var estilo ="filaBlanca";
			for(i=0;i<vValores.vArray.length;i++){
	     		
   		   
   		      idR =idRaux+ i.toString();
   		      if (document.getElementById("Edicion").value==1){
   		    	  html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
   		      }
   		      else{
   		    	html+="<tr id="+idR+" class=\""+estilo+"\" >";
   		      }
   		      html+="<td width='6%'>"+vValores.vArray[i] ;
			  html+="</td></tr>";
         
            }
		
			if (indice=="1"){
				 $("#Avisos1tabla > tbody").html(html);
			
			}
			else if (indice=="2"){
				 $("#Avisos2tabla > tbody").html(html);
			}
			else if (indice=="3"){
				 $("#Avisos3tabla > tbody").html(html);
			}
			
		}
		
	}//Avisos
	else if (TipoTabla=="Presentacion"){
		
		
		var presentacion="[name='Presentacion_"+indice+"']";
		var valoresR=$(presentacion).val();

		
		if (valoresR !=""){
		
			var idRaux="";
			
			if (indice=="1"){
    				idRaux="PU";
    				document.forms[0].sRazonesColumna.value=document.forms[0].Presentacion_1.value;
    				
			}
			else if (indice=="2"){
					idRaux="PD";
					document.forms[0].sNombreColumnas.value=document.forms[0].Presentacion_2.value;
			}
			else if (indice=="3"){
					idRaux="PT";
					document.forms[0].sRazonesColumnaE.value=document.forms[0].Presentacion_3.value;
			}
			else if (indice=="4"){
					idRaux="PC";
					document.forms[0].sNombreColumnasE.value=document.forms[0].Presentacion_4.value;
			}
			else if (indice=="5"){
					idRaux="PZ";
					document.forms[0].sRazonesColumnaS.value=document.forms[0].Presentacion_5.value;
			}
			else if (indice=="6"){
					idRaux="PS";
					document.forms[0].sNombreColumnasS.value=document.forms[0].Presentacion_6.value;
			}
			
			var vValores =  StringToVector3(valoresR,",");
			var html="";
			var idR="";
		
			var estilo ="filaBlanca";
			for(i=0;i<vValores.vArray.length;i++){
	     		
   		   
   		      idR =idRaux+ i.toString();
   		      if (document.getElementById("Edicion").value==1){
   		    	  html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
   		      }
   		      else{
   		    	html+="<tr id="+idR+" class=\""+estilo+"\" >";
   		      }
   		      html+="<td width='6%'>"+vValores.vArray[i] ;
			  html+="</td></tr>";
         
            }
		
			if (indice=="1"){
				 $("#Presentacion1tabla > tbody").html(html);
			
			}
			else if (indice=="2"){
				 $("#Presentacion2tabla > tbody").html(html);
			}
			else if (indice=="3"){
				 $("#Presentacion3tabla > tbody").html(html);
			}
			else if (indice=="4"){
				 $("#Presentacion4tabla > tbody").html(html);
			
			}
			else if (indice=="5"){
				 $("#Presentacion5tabla > tbody").html(html);
			}
			else if (indice=="6"){
				 $("#Presentacion6tabla > tbody").html(html);
			}
		}
		
	}

	
}