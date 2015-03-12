// Estas funciones se usan en en el formulario fVisConfiguracion
// Son para manipular las tablas que se muestran en las pestañas de Interoperabilidad
// y Numeracion y Expedientes


var idFila="";
var idFilaNum="";

//Interoperabilidad
function delRow(){
//Elimina la fila seleccionada de la tabla 
	
	    var Clave = document.getElementById("Clave").value;
        var Servidor = document.getElementById("Servidor").value;
        var Host = document.getElementById("Host").value;
        var Ruta = document.getElementById("Ruta").value;
		
		if (idFila ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (Clave=="" ||  Servidor=="" || Host==""|| Ruta==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClave']").val();
		var valoresS=$("[name='sServidor']").val();
		var valoresH=$("[name='sHost']").val();
		var valoresP = $("[name='sRuta']").val();
		
		var vValores =  StringToVector3(valoresC,";");
		if (!vValores.vIsMember(Clave)){
			 alert (Clave + " no existe en la tabla");
			 return;
		}

		var vValores =  StringToVector3(valoresS,";");
		if (!vValores.vIsMember(Servidor)){
			 alert (Servidor + " no existe en la tabla");
			 return;
		}
		
		var vValores =  StringToVector3(valoresH,";");
		if (!vValores.vIsMember(Host)){
			 alert (Host + " no existe en la tabla");
			 return;
		}
		var vValores =  StringToVector3(valoresP,";");
		if (!vValores.vIsMember(Ruta)){
			 alert (Ruta + " no existe en la tabla");
			 return;
		}
		
		$("#"+idFila).remove();
		var indice = idFila.substring(1);
		var indInt = parseInt(indice);
	  
	    vValores =  StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		document.forms[0].sClave.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresS,";");
		vValores.vBorrar(indInt);
		document.forms[0].sServidor.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresH,";");
		vValores.vBorrar(indInt);
		document.forms[0].sHost.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresP,";");
		vValores.vBorrar(indInt);
		document.forms[0].sRuta.value=VectorToString2(vValores,";");

		
		idFila="";
		cargarTablaInteroperabilidad();
		document.getElementById("Clave").value="";
        document.getElementById("Servidor").value="";
        document.getElementById("Ruta").value="";
        document.getElementById("Host").value="";
}
function modRow(){
// Modifica la fila seleccionada de la tabla	
		
	    var Clave = document.getElementById("Clave").value;
        var Servidor = document.getElementById("Servidor").value;
        var Host = document.getElementById("Host").value;
        var Ruta = document.getElementById("Ruta").value;
         
		if (idFila ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (Clave =="" || Servidor =="" || Host ==""|| Ruta ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClave']").val();
		var valoresS=$("[name='sServidor']").val();
		var valoresH=$("[name='sHost']").val();
		var valoresP = $("[name='sRuta']").val();
	
	
		var cells =$("#"+idFila).find('td');
           
        
        cells[0].innerHTML= document.getElementById("Clave").value ;
        cells[1].innerHTML=document.getElementById("Servidor").value ;
        cells[2].innerHTML=document.getElementById("Host").value;
        cells[3].innerHTML= document.getElementById("Ruta").value;
           
        var indice = idFila.substring(1);
		var indInt = parseInt(indice);
	  
	    vValores =  StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Clave").value,indInt);

		document.forms[0].sClave.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresS,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Servidor").value,indInt);
		document.forms[0].sServidor.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresH,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Host").value,indInt);
		document.forms[0].sHost.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresP,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("Ruta").value,indInt);
		document.forms[0].sRuta.value=VectorToString2(vValores,";");
           
           
           
           
         document.getElementById("Clave").value="";
         document.getElementById("Servidor").value="";
         document.getElementById("Host").value="";
         document.getElementById("Ruta").value="";
         idFila="";
           
           
 }     		
          
function appRow(){
// agrega una nueva fila a la tabla    
 
        var Clave = document.getElementById("Clave").value;
        var Servidor = document.getElementById("Servidor").value;
        var Host = document.getElementById("Host").value;
        var Ruta = document.getElementById("Ruta").value;
		var html ="";
		
		if (Clave =="" || Servidor =="" || Host ==""|| Ruta==""){
				alert("Debe completar todos los campos");
				return;
		}
          	//sTipo.options[sTipo.selectedIndex].text=="Todos")
        if (  document.forms[0].sClave.value == ""){
          	document.forms[0].sClave.value = Clave;
          }
        else{
         
              $("[name='sClave']").val($("[name='sClave']").val()+ ";"+ Clave);
             
          }
        if (document.forms[0].sServidor.value == ""){
          	document.forms[0].sServidor.value = Servidor; 
          }
        else{
          	document.forms[0].sServidor.value += ";"+ Servidor; 
          }
		if (document.forms[0].sHost.value ==""){
			
		document.forms[0].sHost.value = Host;
		}
		else{
			
			document.forms[0].sHost.value += ";"+ Host;
		}
		if (document.forms[0].sRuta.value ==""){
		
		document.forms[0].sRuta.value = Ruta;        
		}
		else{
		document.forms[0].sRuta.value += ";"+ Ruta;     
		}

           var valoresC=$("[name='sClave']").val();
		
		
	       var vValores =  StringToVector3(valoresC,';');
		
		
 	       var estilo ="filaBlanca";
		  
		   var ide = vValores.vArray.length -1;
		
           var idR ="F"+ ide.toString();
             
     	   html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
     		      
           html+="<td width='7%'>"+Clave;
		   html+="</td><td width='10%'>"+Servidor+"</td><td width='8%'>" +Host+"</td><td width='15%'>"+Ruta+"</td></tr>";
         
           $( "#userstbody" ).append(html);
        		
			 
           document.getElementById("Clave").value="";
           document.getElementById("Servidor").value="";
           document.getElementById("Host").value="";
           document.getElementById("Ruta").value="";
           idFila="";
} 
function camposSeleccionados(row)
{// Guarda en idFila el id de la fila seleccionada para modificar o quitar
	// Guarda tambien los valores de los campos de la fila seleccionada
	
     	
     	   cells = row.getElementsByTagName('td');
           idFila=row.id;
           document.getElementById("Clave").value= cells[0].innerHTML;  
           document.getElementById("Servidor").value= cells[1].innerHTML;
           document.getElementById("Host").value= cells[2].innerHTML;
           document.getElementById("Ruta").value= cells[3].innerHTML;
     	
}

function cargarTablaInteroperabilidad()
{//Carga la tabla en la pestañan de Interoperabilidad
	    var valoresC=$("[name='sClave']").val();
		var valoresS=$("[name='sServidor']").val();
		var valoresH=$("[name='sHost']").val();
		var valoresP = $("[name='sRuta']").val();
        
 	    var estilo ="filaBlanca";		

		  if (valoresC !="") {
    		
			var claves = StringToVector3(valoresC,';');
     		var servers = StringToVector3(valoresS,';');
     		var hosts = StringToVector3(valoresH,';');
     		var rutas =  StringToVector3(valoresP,';');
			var html="";
     
    	
     		for(i=0;i<claves.vArray.length;i++){
     		
     		      
     		      var idR ="F"+ i.toString();
     		      html+="<tr id="+idR+" ondblclick='camposSeleccionados(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
                  html+="<td width='7%'>"+claves.vArray[i] ;
			      html+="</td><td width='10%'>"+ servers.vArray[i]+"</td><td width='8%'>" + hosts.vArray[i]+"</td><td width='15%'>"+rutas.vArray[i]+"</td></tr>";
           	 
                }
            
             
                 $("#users > tbody").html(html);
            

		}	 	

}
//Numeracion

function delRowNum(){
	//Elimina la fila seleccionada de la tabla 
	    var Clave = document.getElementById("ClaveNum").value;
         var Formato = document.getElementById("FormatoNum").value;
         
		
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (Clave=="" ||  Formato ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClaveNum']").val();
		var valoresF=$("[name='sFormato']").val();
	
		var vValores =  StringToVector3(valoresC,";");
		if (!vValores.vIsMember(Clave)){
			 alert (Clave + " no existe en la tabla");
			 return;
		}

		var vValores =  StringToVector3(valoresF,";");
		if (!vValores.vIsMember(Formato)){
			 alert (Formato + " no existe en la tabla");
			 return;
		}
		
	
		
		$("#"+idFilaNum).remove();
		
		var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	    
	    vValores =  StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		document.forms[0].sClaveNum.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresF,";");
		vValores.vBorrar(indInt);
		document.forms[0].sFormato.value=VectorToString2(vValores,";");
		
		idFilaNum="";
		cargarTablaNum();
		document.getElementById("ClaveNum").value="";
        document.getElementById("FormatoNum").value="";
         
}
function modRowNum(){
	// Modifica la fila seleccionada de la tabla	
	    var Clave = document.getElementById("ClaveNum").value;
        var Formato = document.getElementById("FormatoNum").value;
         
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (Clave =="" || Formato =="" ){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClaveNum']").val();
		var valoresF=$("[name='sFormato']").val();
		var cells =$("#"+idFilaNum).find('td');
           
        
        cells[0].innerHTML= document.getElementById("ClaveNum").value ;
        cells[1].innerHTML=document.getElementById("FormatoNum").value ;
        
           
        var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	
	    vValores = StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("ClaveNum").value,indInt);

		document.forms[0].sClaveNum.value=VectorToString2(vValores,";");
	
		vValores =  StringToVector3(valoresF,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("FormatoNum").value,indInt);
		document.forms[0].sFormato.value=VectorToString2(vValores,";");
		 
        document.getElementById("ClaveNum").value="";
        document.getElementById("FormatoNum").value="";
     
        idFilaNum="";
           
           
 }     		
          
function appRowNum(){
    
 // Agrega una nueva fila a la tabla
        var Clave = document.getElementById("ClaveNum").value;
        var Formato = document.getElementById("FormatoNum").value;
     	var html ="";
		
		if (Clave =="" || Formato =="" ){
				alert("Debe completar todos los campos");
				return;
		}
          	
         if (document.forms[0].sClaveNum.value == ""){
          	document.forms[0].sClaveNum.value = Clave;
          }
         else{
         
              $("[name='sClaveNum']").val($("[name='sClaveNum']").val()+ ";"+ Clave);
             
          }
         if (document.forms[0].sFormato.value == ""){
          	document.forms[0].sFormato.value = Formato; 
          }
         else{
          	document.forms[0].sFormato.value += ";"+ Formato; 
          }
	

          var valoresC=$("[name='sClaveNum']").val();
		
		
	      var vValores =  StringToVector3(valoresC,';');
		
		
 	      var estilo ="filaBlanca";
		  
		  var ide = vValores.vArray.length -1;
		
          var idR ="N"+ ide.toString();
             
          html+="<tr id="+idR+" ondblclick='camposSeleccionadosNum(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
     		      
          html+="<td width='7%'>"+Clave;
          html+="</td><td width='10%'>"+Formato+"</td></tr>";
         
          $( "#userstbodyNum" ).append(html);
        		
			 
           document.getElementById("ClaveNum").value="";
           document.getElementById("FormatoNum").value="";
           idFilaNum="";
         	 
}

function camposSeleccionadosNum(row)
{// Guarda el id de la fila seleccionada en idFilaNum
	// Tambien guarda los valores de los campos de la fila seleccionada
     	 var cell0 = $(row).find("td:eq(0)");
     	 var cell1=$(row).find("td:eq(1)");
     
         idFilaNum=row.id;
         document.getElementById("ClaveNum").value= cell0.html();  
       	 var aux=cell1.html();
       	 aux= aux.replace(/\&amp;/g,'&');
       	 aux= aux.replace(/\&lt;/g,'<');
       	 aux= aux.replace(/\&gt;/g,'>');
       	 aux= aux.replace(/\&quot;/g,'"');
       	 
         document.getElementById("FormatoNum").value= aux; 
     	
}

function cargarTablaNum()
{// Carga la tabla en la pestaña de numeración.
	    var valoresC=$("[name='sClaveNum']").val();
		
		var valoresF=$("[name='sFormato']").val();
		
        var estilo ="filaBlanca";		
	
		  if (valoresC  !="") {
			  var claves = StringToVector3(valoresC,';');
			  var formatos = StringToVector3(valoresF,';');
			  var html="";
     
    	
     		for(i=0;i<claves.vArray.length;i++){
     		
     		     
     		      var idR ="N"+ i.toString();
     		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosNum(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
                  html+="<td width='7%'>"+claves.vArray[i] ;
			      html+="</td><td width='10%'>"+ formatos.vArray[i]+"</td></tr>";
           	 
                }
            
             
            $("#usersNum > tbody").html(html);
			
		}	 	

}
//Numeracion

function delRowCampoIntegracion(){
	//Elimina la fila seleccionada de la tabla 
	    var Clave = document.getElementById("ClaveCampoIntegracion").value;
         var Formato = document.getElementById("FormatoCampoIntegracion").value;
         
		
		if (idFilaCampoIntegracion ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (Clave=="" ||  Formato ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClaveCampoExpInf']").val();
		var valoresF=$("[name='sClaveCampoInfInf']").val();
	
		var vValores =  StringToVector3(valoresC,";");
		if (!vValores.vIsMember(Clave)){
			 alert (Clave + " no existe en la tabla");
			 return;
		}

		var vValores =  StringToVector3(valoresF,";");
		if (!vValores.vIsMember(Formato)){
			 alert (Formato + " no existe en la tabla");
			 return;
		}
		
	
		
		$("#"+idFilaCampoIntegracion).remove();
		
		var indice = idFilaCampoIntegracion.substring(1);
		var indInt = parseInt(indice);
	    
	    vValores =  StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		document.forms[0].sClaveCampoExpInf.value=VectorToString2(vValores,";");
		
		vValores =  StringToVector3(valoresF,";");
		vValores.vBorrar(indInt);
		document.forms[0].sClaveCampoInfInf.value=VectorToString2(vValores,";");
		
		idFilaCampoIntegracion="";
		cargarTablaCampoIntegracion();
		document.getElementById("ClaveCampoIntegracion").value="";
        document.getElementById("FormatoCampoIntegracion").value="";
         
}
function modRowCampoIntegracion(){
	// Modifica la fila seleccionada de la tabla	
	    var Clave = document.getElementById("ClaveCampoIntegracion").value;
        var Formato = document.getElementById("FormatoCampoIntegracion").value;
         
		if (idFilaCampoIntegracion ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (Clave =="" || Formato =="" ){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sClaveCampoExpInf']").val();
		var valoresF=$("[name='sClaveCampoInfInf']").val();
		var cells =$("#"+idFilaCampoIntegracion).find('td');
           
        
        cells[0].innerHTML= document.getElementById("ClaveCampoIntegracion").value ;
        cells[1].innerHTML=document.getElementById("FormatoCampoIntegracion").value ;
        
           
        var indice = idFilaCampoIntegracion.substring(1);
		var indInt = parseInt(indice);
	
	    vValores = StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("ClaveCampoIntegracion").value,indInt);

		document.forms[0].sClaveCampoExpInf.value=VectorToString2(vValores,";");
	
		vValores =  StringToVector3(valoresF,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("FormatoCampoIntegracion").value,indInt);
		document.forms[0].sClaveCampoInfInf.value=VectorToString2(vValores,";");
		 
        document.getElementById("ClaveCampoIntegracion").value="";
        document.getElementById("FormatoCampoIntegracion").value="";
     
        idFilaCampoIntegracion="";
           
           
 }     		
          
function appRowCampoIntegracion(){
    
 // Agrega una nueva fila a la tabla
        var Clave = document.getElementById("ClaveCampoIntegracion").value;
        var Formato = document.getElementById("FormatoCampoIntegracion").value;
     	var html ="";
		
		if (Clave =="" || Formato =="" ){
				alert("Debe completar todos los campos");
				return;
		}
          	
         if (document.forms[0].sClaveCampoExpInf.value == ""){
          	document.forms[0].sClaveCampoExpInf.value = Clave;
          }
         else{
         
              $("[name='sClaveCampoExpInf']").val($("[name='sClaveCampoExpInf']").val()+ ";"+ Clave);
             
          }
         if (document.forms[0].sClaveCampoInfInf.value == ""){
          	document.forms[0].sClaveCampoInfInf.value = Formato; 
          }
         else{
          	document.forms[0].sClaveCampoInfInf.value += ";"+ Formato; 
          }
	

          var valoresC=$("[name='sClaveCampoExpInf']").val();
		
		
	      var vValores =  StringToVector3(valoresC,';');
		
		
 	      var estilo ="filaBlanca";
		  
		  var ide = vValores.vArray.length -1;
		
          var idR ="I"+ ide.toString();
             
          html+="<tr id="+idR+" ondblclick='camposSeleccionadosCampoIntegracion(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
     		      
          html+="<td width='7%'>"+Clave;
          html+="</td><td width='10%'>"+Formato+"</td></tr>";
         
          $( "#campostbodyIntegracion" ).append(html);
        		
			 
           document.getElementById("ClaveCampoIntegracion").value="";
           document.getElementById("FormatoCampoIntegracion").value="";
           idFilaCampoIntegracion="";
         	 
}

function camposSeleccionadosCampoIntegracion(row)
{// Guarda el id de la fila seleccionada en idFilaNum
	// Tambien guarda los valores de los campos de la fila seleccionada
     	 var cell0 = $(row).find("td:eq(0)");
     	 var cell1=$(row).find("td:eq(1)");
     
         idFilaCampoIntegracion=row.id;
         document.getElementById("ClaveCampoIntegracion").value= cell0.html();  
       	 var aux=cell1.html();
       	 aux= aux.replace(/\&amp;/g,'&');
       	 aux= aux.replace(/\&lt;/g,'<');
       	 aux= aux.replace(/\&gt;/g,'>');
       	 aux= aux.replace(/\&quot;/g,'"');
       	 
         document.getElementById("FormatoCampoIntegracion").value= aux; 
     	
}

function cargarTablaCampoIntegracion()
{// Carga la tabla en la pestaña de numeración.
	    var valoresC=$("[name='sClaveCampoExpInf']").val();
		
		var valoresF=$("[name='sClaveCampoInfInf']").val();
		
        var estilo ="filaBlanca";		
	
		  if (valoresC  !="") {
			  var claves = StringToVector3(valoresC,';');
			  var formatos = StringToVector3(valoresF,';');
			  var html="";
     
    	
     		for(i=0;i<claves.vArray.length;i++){
     		
     		     
     		      var idR ="I"+ i.toString();
     		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosCampoIntegracion(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
                  html+="<td width='7%'>"+claves.vArray[i] ;
			      html+="</td><td width='10%'>"+ formatos.vArray[i]+"</td></tr>";
           	 
                }
            
             
            $("#inter > tbody").html(html);
			
		}	 	

}

//Funciones agregadas para agregar, modificar nuevos tipos de documento en la configuracion general de expedientes
function appRowTipoDoc(){
	 // Agrega una nueva fila a la tabla
	        var tipoDoc = document.getElementById("TipoDoc").value;
	     	var html ="";
			
			if (tipoDoc ==""){
					alert("Debe ingresar un tipo de Documento");
					return;
			}
	          	
	         if (document.forms[0].sLegal.value == ""){
	          	document.forms[0].sLegal.value = tipoDoc;
	          }
	         else{
	        	 var aux5 = $("[name='sLegal']").val();
	              $("[name='sLegal']").val($("[name='sLegal']").val()+ ";"+ tipoDoc);
	        	 var aux6 = $("[name='sLegal']").val();
	          }
	         
	          var valoresTipoDocs =$("[name='sLegal']").val();
			
		      var vValores =  StringToVector3(valoresTipoDocs,';');
		      
	 	      var estilo ="filaBlanca";
			  
			  var ide = vValores.vArray.length -1;
			
	          var idR ="T"+ ide.toString();
	             
	          html+="<tr id="+idR+" ondblclick='camposSeleccionadosTipoDoc(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
	     		      
	          html+="<td width='10%'>"+tipoDoc+"</td></tr>";
	         
	          $( "#tiposDocstbody" ).append(html);
	        			 
	           document.getElementById("TipoDoc").value="";
	           idFilaNum="";
	         	 
}

function modRowTipoDoc(){
	// Modifica la fila seleccionada de la tabla	
	    var tipoDoc = document.getElementById("TipoDoc").value;
         
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (tipoDoc ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresTipoDoc=$("[name='sLegal']").val();
		var cells =$("#"+idFilaNum).find('td');
           
        cells[0].innerHTML= document.getElementById("TipoDoc").value ;
            
        var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	
	    vValores = StringToVector3(valoresTipoDoc,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("TipoDoc").value,indInt);

		document.forms[0].sLegal.value=VectorToString2(vValores,";");
	 
        document.getElementById("TipoDoc").value="";
     
        idFilaNum="";    
} 

function delRowTipoDoc(){
	//Elimina la fila seleccionada de la tabla 
	    var tipoDoc = document.getElementById("TipoDoc").value;
         
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (tipoDoc==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresTipoDoc=$("[name='sLegal']").val();
	
		var vValores =  StringToVector3(valoresTipoDoc,";");
		if (!vValores.vIsMember(tipoDoc)){
			 alert (tipoDoc + " no existe en la tabla");
			 return;
		}
		
		$("#"+idFilaNum).remove();
		
		var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	    
	    vValores =  StringToVector3(valoresTipoDoc,";");
		vValores.vBorrar(indInt);
		document.forms[0].sLegal.value=VectorToString2(vValores,";");
		
		idFilaNum="";
		cargarTablaTipoDoc();
		document.getElementById("TipoDoc").value="";    
}

function camposSeleccionadosTipoDoc(row)
{// Guarda el id de la fila seleccionada en idFilaNum
	// Tambien guarda los valores de los campos de la fila seleccionada
     	 var cell0 = $(row).find('td');
     
         idFilaNum=row.id;
         document.getElementById("TipoDoc").value= cell0.html();      	
}
function cargarTablaTipoDoc()
{// Carga la tabla en la pestaña de expediente.
	
	    var valoresTipoDoc=$("[name='sLegal']").val();
        var estilo ="filaBlanca";		
	
		  if (valoresTipoDoc  !="") {
			  var tiposDoc = StringToVector3(valoresTipoDoc,';');
			  var html="";
       	
     		for(i=0;i<tiposDoc.vArray.length;i++){
     		
     		      var idR ="T"+ i.toString();
     		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosTipoDoc(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
                  html+="<td width='7%'>"+tiposDoc.vArray[i]+"</td></tr>" ;
                }
            
             
            $("#tiposDocs > tbody").html(html);
			
		}	 	

}

//Fin de funciones agregadas para agregar, modificar y eliminar tipos de documentos

//Funciones agregadas para agregar, modificar nuevas justificaciones para tipoLegal Reservado
function appRowJustReservado(){
	 // Agrega una nueva fila a la tabla
	        var justRes = document.getElementById("JustificacionReservado").value;
	     	var html ="";
			
			if (justRes ==""){
					alert("Debe ingresar una justificación");
					return;
			}
	          	
	         if (document.forms[0].sJustificacionReservado.value == ""){
	          	document.forms[0].sJustificacionReservado.value = justRes;
	          }
	         else{
	        	 var aux5 = $("[name='sJustificacionReservado']").val();
	              $("[name='sJustificacionReservado']").val($("[name='sJustificacionReservado']").val()+ ";"+ justRes);
	        	 var aux6 = $("[name='sJustificacionReservado']").val();
	          }
	         
	          var valoresJustRes =$("[name='sJustificacionReservado']").val();
			
		      var vValores =  StringToVector3(valoresJustRes,';');
		      
	 	      var estilo ="filaBlanca";
			  
			  var ide = vValores.vArray.length -1;
			
	          var idR ="J"+ ide.toString();
	             
	          html+="<tr id="+idR+" ondblclick='camposSeleccionadosJustReservado(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
	     		      
	          html+="<td width='10%'>"+justRes+"</td></tr>";
	         
	          $( "#justificacionesReservadotbody" ).append(html);
	        			 
	           document.getElementById("JustificacionReservado").value="";
	           idFilaNum="";
	         	 
}

function modRowJustReservado(){
	// Modifica la fila seleccionada de la tabla	
	    var justRes = document.getElementById("JustificacionReservado").value;
         
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (justRes ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresJustRes=$("[name='sJustificacionReservado']").val();
		var cells =$("#"+idFilaNum).find('td');
           
        cells[0].innerHTML= document.getElementById("JustificacionReservado").value ;
            
        var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	
	    vValores = StringToVector3(valoresJustRes,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("JustificacionReservado").value,indInt);

		document.forms[0].sJustificacionReservado.value=VectorToString2(vValores,";");
	 
        document.getElementById("JustificacionReservado").value="";
     
        idFilaNum="";    
} 

function delRowJustReservado(){
	//Elimina la fila seleccionada de la tabla 
	    var justRes = document.getElementById("JustificacionReservado").value;
         
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (justRes==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresJustRes=$("[name='sJustificacionReservado']").val();
	
		var vValores =  StringToVector3(valoresJustRes,";");
		if (!vValores.vIsMember(justRes)){
			 alert (justRes + " no existe en la tabla");
			 return;
		}
		
		$("#"+idFilaNum).remove();
		
		var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	    
	    vValores =  StringToVector3(valoresJustRes,";");
		vValores.vBorrar(indInt);
		document.forms[0].sJustificacionReservado.value=VectorToString2(vValores,";");
		
		idFilaNum="";
		cargarTablaJustReservado();
		document.getElementById("JustificacionReservado").value="";    
}

function camposSeleccionadosJustReservado(row)
{// Guarda el id de la fila seleccionada en idFilaNum
	// Tambien guarda los valores de los campos de la fila seleccionada
     	 var cell0 = $(row).find('td');
     
         idFilaNum=row.id;
         document.getElementById("JustificacionReservado").value= cell0.html();      	
}
function cargarTablaJustReservado()
{// Carga la tabla en la pestaña de expediente.
	
	    var valoresJustRes=$("[name='sJustificacionReservado']").val();
        var estilo ="filaBlanca";		
	
		  if (valoresJustRes  !="") {
			  var justRes = StringToVector3(valoresJustRes,';');
			  var html="";
       	
     		for(i=0;i<justRes.vArray.length;i++){
     		
     		      var idR ="J"+ i.toString();
     		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosJustReservado(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
                  html+="<td width='7%'>"+justRes.vArray[i]+"</td></tr>" ;
                }
            
             
            $("#justificacionesReservado > tbody").html(html);
			
		}	 	

}


function delRowMsg(){
	//Elimina la fila seleccionada de la tabla 
	    var Mensaje = document.getElementById("ClaveMsg").value;

		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para eliminar.");
			 	 return;
		}
		
		if (Mensaje==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sMsgConfidencialidad']").val();
	
	
		var vValores =  StringToVector3(valoresC,";");
		if (!vValores.vIsMember(Mensaje)){
			 alert (Mensaje + " no existe en la tabla");
			 return;
		}


		$("#"+idFilaNum).remove();
		
		var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
	    
	    vValores =  StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		document.forms[0].sMsgConfidencialidad.value=VectorToString2(vValores,";");
		

		
		idFilaNum="";
		cargarTablaMsg();
		document.getElementById("ClaveMsg").value="";
   
         
}
function modRowMsg(){
	// Modifica la fila seleccionada de la tabla	
	    var Clave = document.getElementById("ClaveMsg").value;

         
		if (idFilaNum ==""){
				 alert ("No ha seleccionado ninguna fila de la tabla para modificar.");
			 	 return;
		}
		
		if (Clave ==""){
				alert("Debe completar todos los campos");
				return;
		}
		
		var valoresC=$("[name='sMsgConfidencialidad']").val();
	
		var cells =$("#"+idFilaNum).find('td');
           
        
        cells[0].innerHTML= document.getElementById("ClaveMsg").value ;
       
        
           
        var indice = idFilaNum.substring(1);
		var indInt = parseInt(indice);
		
	
	    vValores = StringToVector3(valoresC,";");
		vValores.vBorrar(indInt);
		vValores.vInsert(document.getElementById("ClaveMsg").value,indInt);

		document.forms[0].sMsgConfidencialidad.value=VectorToString2(vValores,";");

        document.getElementById("ClaveMsg").value="";
    
     
        idFilaNum="";
           
           
 }     		
          
function appRowMsg(){
    
	 // Agrega una nueva fila a la tabla
	        var Clave = document.getElementById("ClaveMsg").value;
	     	var html ="";
			
			if (Clave ==""){
					alert("Debe completar todos los campos");
					return;
			}
	          	
	         if (document.forms[0].sMsgConfidencialidad.value == ""){
	          	document.forms[0].sMsgConfidencialidad.value = Clave;
	          }
	         else{
	         
	              $("[name='sMsgConfidencialidad']").val($("[name='sMsgConfidencialidad']").val()+ ";"+ Clave);
	             
	          }

	          var valoresC=$("[name='sMsgConfidencialidad']").val();
			
			
		      var vValores =  StringToVector3(valoresC,';');
			
			
	 	      var estilo ="filaBlanca";
			  
			  var ide = vValores.vArray.length -1;
			
	          var idR ="N"+ ide.toString();
	             
	          html+="<tr id="+idR+" ondblclick='camposSeleccionadosMsg(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
	     		      
	          html+="<td width='7%'>"+Clave;
	     
	         
	          $( "#userstbodyConfig" ).append(html);
	        		
				 
	           document.getElementById("ClaveMsg").value="";

	           idFilaNum="";
	         	 
	}





	function camposSeleccionadosMsg(row)
	{// Guarda el id de la fila seleccionada en idFilaNum
		// Tambien guarda los valores de los campos de la fila seleccionada
	     	/* var cell0 = $(row).find("td:eq(0)");
	     	 var cell1=$(row).find("td:eq(1)");
	     
	         idFilaNum=row.id;
	         document.getElementById("ClaveMsg").value= cell0.html();  
	       	 var aux=cell1.html();
	       	 aux= aux.replace(/\&amp;/g,'&');
	       	 aux= aux.replace(/\&lt;/g,'<');
	       	 aux= aux.replace(/\&gt;/g,'>');
	       	 aux= aux.replace(/\&quot;/g,'"');*/
	       	 
		var cell0 = $(row).find('td');
	     
        idFilaNum=row.id;
        document.getElementById("ClaveMsg").value= cell0.html();    
    	
	     	
	}

	function cargarTablaMsg()
	{// Carga la tabla en la pestaña de numeración.
		    var valoresC=$("[name='sMsgConfidencialidad']").val();
		    

	        var estilo ="filaBlanca";		
		
			  if (valoresC  !="") {
				  var claves = StringToVector3(valoresC,';');

				  var html="";
	     
	    	
	     		for(i=0;i<claves.vArray.length;i++){
	     		
	     		     
	     			var idR ="N"+ i.toString();
	     		      html+="<tr id="+idR+" ondblclick='camposSeleccionadosMsg(this);'  class=\""+estilo+"\" onmouseover=\"this.style.backgroundColor='#A0CFEC'\" onmouseout=\"this.style.backgroundColor='#FFFFFF'\" >";
	                  html+="<td width='7%'>"+claves.vArray[i]+"</td></tr>" ;
	           	 
	                }
	            
	             
	            $("#msgConfig > tbody").html(html);
				
			}	 	

	}

//Fin de funciones agregadas para agregar, modificar y eliminar justificaciones para el tipo legal Reservado

