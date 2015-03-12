
// Estas funciones se utilizan en la pestaña de diseño de configuración IGDOC

// ID de la fila seleccionada para modificar o quitar
var idFilaDiseno="";

function delRowDiseno(){
// Funcion que elimina una fila de la tabla	
	  
        var Clave = document.getElementById("ClaveD").value;
        var URL =  document.getElementById("NuevaImagen").value;
        
		
		if (idFilaDiseno ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (Clave =="" || URL == ""){
				alert("Debe completar todos los campos");
				return;
		}
		
		
		var valoresC=$("[name='sClave']").val();
		var valoresU=$("[name='sUrl']").val();
	
		
		var vValores =  StringToVector3(valoresC,"; ");
		if (!vValores.vIsMember(Clave)){
			 alert (Clave + " no existe en la tabla");
			 return;
		}

		var vValores =  StringToVector3(valoresU,"; ");
		if (!vValores.vIsMember(URL)){
			 alert (URL + " no existe en la tabla");
			 return;
		}
		
		
		
		$("#"+idFilaDiseno).remove();
		var indice = idFilaDiseno.substring(1);
		var indInt = parseInt(indice);
	  
	    vValores =  StringToVector3(valoresC,"; ");
		vValores.vBorrar(indInt);
		document.forms[0].sClave.value=VectorToString2(vValores,"; ");
		
		vValores =  StringToVector3(valoresU,"; ");
		vValores.vBorrar(indInt);
		document.forms[0].sUrl.value=VectorToString2(vValores,"; ");
		
		idFilaDiseno="";
		cargarTablaDiseno();
	
        document.getElementById("ClaveD").value="";
        document.getElementById('NuevaImagen').value="";
    	//document.getElementById('NuevaImagen').disabled = true;
    	
    	idFilaDiseno="";
    	
}
function modRowDiseno(){
//Funcion que modifica una fila de la tabla	
	   var Clave = document.getElementById("ClaveD").value;
	  
       var URL =  document.getElementById("NuevaImagen").value;
      
		
	
		if (idFilaDiseno ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (Clave=="" || URL=="" ){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClave']").val();
		var valoresU=$("[name='sUrl']").val();
	
		var cells =$("#"+idFilaDiseno).find('td');
           
        
        cells[0].innerHTML=Clave;
        cells[1].innerHTML=URL;
        
           
        var indice = idFilaDiseno.substring(1);
		var indInt = parseInt(indice);
	  
	    vValores =  StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(Clave,indInt);
		document.forms[0].sClave.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresU,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(URL,indInt);
		document.forms[0].sUrl.value=VectorToString2(vValores,";");
		
		
		document.getElementById("ClaveD").value="";
	    document.getElementById('NuevaImagen').value="";
	    //document.getElementById('NuevaImagen').disabled = true;
	      
           
        idFilaDiseno="";
           
           
 }     		
          
function appRowDiseno(){
    
// funcion que agrega una nueva fila  ala tabla	 
		var Clave = document.getElementById("ClaveD").value;
		var URL = document.getElementById("NuevaImagen").value;;
        
		var html ="";
		
		if (Clave =="" || URL ==""){
				alert("Debe completar todos los campos");
				return;
		}
          	//sTipo.options[sTipo.selectedIndex].text=="Todos")
        if (document.forms[0].sClave.value == ""){
          	document.forms[0].sClave.value = Clave;
          }
        else
        {
         
          $("[name='sClave']").val($("[name='sClave']").val()+ ";"+ Clave);
             
         }
         if (document.forms[0].sUrl.value  == ""){
          	document.forms[0].sUrl.value = URL; 
          }
         else
          {
          	document.forms[0].sUrl.value += ";"+ URL; 
          }
		

           var valoresC=$("[name='sClave']").val();
		
		
	       var vValores =  StringToVector3(valoresC,';');
		
		
 	       var estilo ="filaBlanca";
		  
		   var ide = vValores.vArray.length -1;
		
           var idR ="D"+ ide.toString();
             
     	   html+="<tr id="+idR+" ondblclick='camposSeleccionadosDiseno(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
     		      
           html+="<td width='3%'>"+Clave;
		   html+="</td><td width='40%'>"+URL+"</td></tr>";
         
           $( "#userstbodyDiseno" ).append(html);
           
           document.getElementById("ClaveD").value="";
           document.getElementById('NuevaImagen').value="";
       	   //document.getElementById('NuevaImagen').disabled = true;
       
       	   idFilaDiseno="";
        		
			
           
} 
function camposSeleccionadosDiseno(row)
{// completa los campos con los valores de la fila seleccionada
	
	 var cell0 = $(row).find("td:eq(0)");
 	 var cell1=$(row).find("td:eq(1)");
 	 //document.getElementById('NuevaImagen').disabled = false;
     idFilaDiseno=row.id;
     document.getElementById("ClaveD").value= cell0.html();  
   	 var aux=cell1.html();
   	 aux= aux.replace(/\&amp;/g,'&');
   	 aux= aux.replace(/\&lt;/g,'<');
   	 aux= aux.replace(/\&gt;/g,'>');
   	 aux= aux.replace(/\&quot;/g,'"');
   	 
     document.getElementById("NuevaImagen").value= aux; 
     
}

function cargarTablaDiseno()
{// Carga la tabla 
	var valoresC=$("[name='sClave']").val();
	
	var valoresU=$("[name='sUrl']").val();
	
    var estilo ="filaBlanca";		

	  if (valoresC  !="") {
		  var claves = StringToVector3(valoresC,';');
		  var urls = StringToVector3(valoresU,';');
		  var html="";
 
	
 		for(i=0;i<claves.vArray.length;i++){
 		
 		     
 		      var idR ="D"+ i.toString();
 		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosDiseno(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
              html+="<td width='5%'>"+claves.vArray[i] ;
		      html+="</td><td width='20%'>"+ urls.vArray[i]+"</td></tr>";
       	 
            }
        
         
        $("#usersDiseno > tbody").html(html);
		
	}	 	

}
//Estas funciones se utilizan en la pestaña configuracion de IGDOC

//ID de la fila seleccionada para modificar o quitar
var idFilaConf="";

function delRowEC(){
//Funcion que elimina una fila de la tabla	
	  
     var Clave = document.getElementById("ClaveEC").value;
     var Urls = document.getElementById("URLEC").value;
     var Certificado =  document.getElementById("EC").value;
     
		
		if (idFilaConf ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (Clave =="" || Certificado == "" || Urls == ""){
				alert("Debe completar todos los campos");
				return;
		}
		
		
		var valoresC=$("[name='ClaveCertificadoCA']").val();
		var valoresURL=$("[name='URLCertificadoCA']").val();
		var valoresU=$("[name='CertificadoCA']").val();
	
		
		var vValores =  StringToVector3(valoresC,"; ");
		if (!vValores.vIsMember(Clave)){
			 alert (Clave + " no existe en la tabla");
			 return;
		}
		
		var vValores =  StringToVector3(valoresURL,"; ");
		if (!vValores.vIsMember(Urls)){
			 alert (Urls + " no existe en la tabla");
			 return;
		}

		var vValores =  StringToVector3(valoresU,"; ");
		if (!vValores.vIsMember(Certificado)){
			 alert (Certificado + " no existe en la tabla");
			 return;
		}
		
		
		
		$("#"+idFilaConf).remove();
		var indice = idFilaConf.substring(1);
		var indInt = parseInt(indice);
	  
	    vValores =  StringToVector3(valoresC,"; ");
		vValores.vBorrar(indInt);
		document.forms[0].ClaveCertificadoCA.value=VectorToString2(vValores,"; ");
		
		vValores =  StringToVector3(valoresURL,"; ");
		vValores.vBorrar(indInt);
		document.forms[0].URLCertificadoCA.value=VectorToString2(vValores,"; ");
		
		vValores =  StringToVector3(valoresU,"; ");
		vValores.vBorrar(indInt);
		document.forms[0].CertificadoCA.value=VectorToString2(vValores,"; ");
		
		idFilaConf="";
		cargarTablaEC();
	
		document.getElementById("ClaveEC").value="";
		document.getElementById("URLEC").value="";
		document.getElementById('EC').value="";
 	
 	
		idFilaConf="";
 	
}
function modRowEC(){
//Funcion que modifica una fila de la tabla	
	var Clave = document.getElementById("ClaveEC").value;
	var Urls = document.getElementById("URLEC").value;  
    var Certificado = document.getElementById("EC").value;
   
		
	
		if (idFilaConf ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (Clave=="" || Certificado=="" || Urls=="" ){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='ClaveCertificadoCA']").val();
		var valoresURL=$("[name='URLCertificadoCA']").val();
		var valoresU=$("[name='CertificadoCA']").val();
		
		var cells =$("#"+idFilaConf).find('td');
        
     
		cells[0].innerHTML=Clave;
		cells[1].innerHTML=Urls;
		cells[2].innerHTML=Certificado;
     
        
     	var indice = idFilaConf.substring(1);
		var indInt = parseInt(indice);
	  
	    vValores =  StringToVector3(valoresC,"; ");
	   
		vValores.vBorrar(indInt);
		vValores.vInsert(Clave,indInt);
		document.forms[0].ClaveCertificadoCA.value=VectorToString2(vValores,"; ");
		
		vValores =  StringToVector3(valoresURL,"; ");
		   
		vValores.vBorrar(indInt);
		vValores.vInsert(Urls,indInt);
		document.forms[0].URLCertificadoCA.value=VectorToString2(vValores,"; ");
		
		vValores =  StringToVector3(valoresU,"; ");
		
		vValores.vBorrar(indInt);
		vValores.vInsert(Certificado,indInt);
		document.forms[0].CertificadoCA.value=VectorToString2(vValores,"; ");
		
		
		document.getElementById("ClaveEC").value="";
		document.getElementById("URLEC").value="";
	    document.getElementById('EC').value="";
	   
	    idFilaConf="";
        
        
}     		
       
function appRowEC(){
 
//funcion que agrega una nueva fila  ala tabla	 
		var Clave = document.getElementById("ClaveEC").value;
		var Urls = document.getElementById("URLEC").value;
		var Certificado = document.getElementById("EC").value;
     
		var html ="";
		
		if (Clave =="" || Certificado =="" || Urls ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valC=$("[name='ClaveCertificadoCA']").val();
		var vValC =  StringToVector3(valC,"; ");
		if (vValC.vIsMember(Clave)){
			 alert (Clave + " ya existe en la tabla");
			 return;
		}

		if (document.forms[0].ClaveCertificadoCA.value == ""){
				document.forms[0].ClaveCertificadoCA.value = Clave;
		}
		else
		{
				$("[name='ClaveCertificadoCA']").val($("[name='ClaveCertificadoCA']").val()+ "; "+ Clave);
          
		}
		if (document.forms[0].CertificadoCA.value  == ""){
				document.forms[0].CertificadoCA.value = Certificado; 
		}
		else
       	{
				document.forms[0].CertificadoCA.value += "; "+ Certificado; 
       	}
		
		if (document.forms[0].URLCertificadoCA.value  == ""){
			document.forms[0].URLCertificadoCA.value = Urls; 
		}
		else
		{
			document.forms[0].URLCertificadoCA.value += "; "+ Urls; 
		}
		

        var valoresU=$("[name='CertificadoCA']").val();
		
		
	    var vValores =  StringToVector3(valoresU,'; ');
		
		
	    var estilo ="filaBlanca";
		  
		var ide = vValores.vArray.length -1;
		
		var idR ="C"+ ide.toString();
          
		html+="<tr id="+idR+" ondblclick='camposSeleccionadosEC(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
  		      
		html+="<td width='3%'>"+Clave+"</td>";
		html+="<td width='40%'>"+Urls+"</td>";
		html+="<td width='40%'>"+Certificado+"</td></tr>";
      
        $( "#userstbodyEntidadCertificadora" ).append(html);
        
        document.getElementById("ClaveEC").value="";
        document.getElementById("URLEC").value="";
        document.getElementById('EC').value="";
    	 
    
    	idFilaConf="";
     		
			
        
} 
function camposSeleccionadosEC(row)
{// completa los campos con los valores de la fila seleccionada
	
	 var cell0 = $(row).find("td:eq(0)");
	 var cell1=$(row).find("td:eq(1)");
	 var cell2=$(row).find("td:eq(2)");
	
	 idFilaConf=row.id;
	
	 document.getElementById("ClaveEC").value= cell0.html();  
	 var aux=cell2.html();
	 aux= aux.replace(/\&amp;/g,'&');
	 aux= aux.replace(/\&lt;/g,'<');
	 aux= aux.replace(/\&gt;/g,'>');
	 aux= aux.replace(/\&quot;/g,'"');
	 
	 document.getElementById("EC").value= aux; 
	 
	 aux=cell1.html();
	 aux= aux.replace(/\&amp;/g,'&');
	 aux= aux.replace(/\&lt;/g,'<');
	 aux= aux.replace(/\&gt;/g,'>');
	 aux= aux.replace(/\&quot;/g,'"');
	 
	 document.getElementById("URLEC").value= aux; 
  
}

function cargarTablaEC()
{// Carga la tabla 
	var valoresC=$("[name='ClaveCertificadoCA']").val();
	
	var valoresURL=$("[name='URLCertificadoCA']").val();
	
	var valoresU=$("[name='CertificadoCA']").val();
	
	var estilo ="filaBlanca";		

	  if (valoresU  !="") {
		  var claves = StringToVector3(valoresC,'; ');
		  var urls = StringToVector3(valoresURL,'; ');
		  var certs = StringToVector3(valoresU,'; ');
		  var html="";

	
		for(i=0;i<certs.vArray.length;i++){
		
		     
		      var idR ="C"+ i.toString();
		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosEC(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
		      html+="<td width='5%'>"+ claves.vArray[i] ;
		      html+="<td width='5%'>"+ urls.vArray[i] ;
		      html+="</td><td width='20%'>"+certs.vArray[i]+"</td></tr>";
    	 
         }
     
      
     $("#usersEntidadCertificadora > tbody").html(html);
		
	}	 	

}