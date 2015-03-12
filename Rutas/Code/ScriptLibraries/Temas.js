var oficinas;
var grupos;
var tab;
var tabselect='InfoGral';
var dlg0, dlg1;

var modo;
var frm;
var inicializado=false;

var frm;
var modo;
var strdato;
var strvisualiz;
var strnuevo;
var t;
var tab;
var tabselect='general';


function bloqCampos() {
    var tipo = document.getElementById("Tipo").value;
    if (tipo == 0) {
        document.getElementById("Requerido").disabled = false;
        document.getElementById("Agente").disabled = false;
        document.getElementById("Opciones").disabled = false;
        document.getElementById("TipoOpciones").disabled = false;
        document.getElementById("Tamano").disabled = false;
    }
    else if (tipo == 5) {
        document.getElementById("Requerido").value = 0;
        document.getElementById("Requerido").disabled = true;
        document.getElementById("Agente").disabled = false;
        document.getElementById("Opciones").value = "";
        document.getElementById("Opciones").disabled = true;
        document.getElementById("TipoOpciones").disabled = true;
        document.getElementById("Tamano").disabled = false;
    }
    else if (tipo == 10) {
        document.getElementById("Requerido").value = 0;
        document.getElementById("Requerido").disabled = false;
        document.getElementById("Agente").disabled = false;
        document.getElementById("Opciones").value = "";
        document.getElementById("Opciones").disabled = true;
        document.getElementById("TipoOpciones").disabled = true;
        document.getElementById("Tamano").disabled = false;
    }
    else {
        document.getElementById("Requerido").disabled = false;
        document.getElementById("Agente").value = 0;
        document.getElementById("Agente").disabled = true;
        if (tipo == 6) {
            document.getElementById("Tamano").disabled = false;
            document.getElementById("Opciones").disabled = false;
            document.getElementById("TipoOpciones").disabled = false;
        }        
        else if (tipo == 7 || tipo == 8 || tipo == 9) {
            document.getElementById("Tamano").value = 0;
            document.getElementById("Tamano").disabled = true;
            document.getElementById("Opciones").disabled = false;
            document.getElementById("TipoOpciones").disabled = false;
        }
        else {
            document.getElementById("Opciones").value = "";
            document.getElementById("Opciones").disabled = true;
            document.getElementById("TipoOpciones").disabled = true;
            document.getElementById("Tamano").disabled = false;
        }
    }
}
function agregarUnidad(nombre,codigo) {
    var vValores =  StringToVector3(document.forms[0].sUnidad.value,",");
    if (vValores.vIsMember(codigo)) {
        alert ("La unidad "+nombre + " ya ha sido seleccionada.");
        return false;
    }
    if (document.forms[0].sUnidad.value == "") {
        document.forms[0].sUnidad.value= codigo;
    }else {
        document.forms[0].sUnidad.value+= ","+codigo;
    }
    if (document.forms[0].unidades.value == "") {
        document.forms[0].unidades.value= nombre;
    }
    else {
        
        document.forms[0].unidades.value+= ";"+nombre;
    }

    cargarUnidades();
    $('#NamePickerUnidadULTRA').dialog('close');
}
function borrarUnidad(indice) {

    var vValores =  StringToVector3(document.forms[0].sUnidad.value,",");
    vValores.vBorrar(indice);
    document.forms[0].sUnidad.value=VectorToString2(vValores,",");
    
    var vValores =  StringToVector3(document.forms[0].unidades.value,";");
    vValores.vBorrar(indice);
    document.forms[0].unidades.value=VectorToString2(vValores,";");

    cargarUnidades();

}
function cargarUnidades() {
    $("#UniList > tbody").html("");

    var codigos = StringToVector3(document.forms[0].sUnidad.value,",");

    var nombres = StringToVector3(document.forms[0].unidades.value,";");
    var row="";
    
    for(var  i=0;i<codigos.vArray.length;i++) {
        
        row += "<tr>";
        row+="<td class=\"tdSeleccion\"><nobr>"+nombres.vArray[i]+"</nobr></td>";
        row+="<td class=\"tdSeleccion\">";
        if (document.forms[0].modo.value=="1") {
            row+="<td class=\"tdSeleccion\" align='right'><img alt=\"Remover de Administradores\" src=\""+DirABS()+"images/icons/remove.gif\" onclick=\"borrarUnidad("+ i+ ")\"></td>"            
        }else {
            row+="</td>"
        }
        row+="</tr>";

    }
    
    $( "#sUnidad-List" ).append(row);
}
function changecss(theClass,element,value) {
    var cssRules;

    var added = false;
    for (var S = 0; S < document.styleSheets.length; S++) {

        if (document.styleSheets[S]['rules']) {
            cssRules = 'rules';
        } else if (document.styleSheets[S]['cssRules']) {
            cssRules = 'cssRules';
        } else {
      //no rules found... browser unknown
        }

        for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
            if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
                if(document.styleSheets[S][cssRules][R].style[element]) {
                    document.styleSheets[S][cssRules][R].style[element] = value;
                    added=true;
                    break;
                }
            }
        }
        if(!added) {
            if(document.styleSheets[S].insertRule) {
                document.styleSheets[S].insertRule(theClass+'{ '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
            } else if (document.styleSheets[S].addRule) {
                document.styleSheets[S].addRule(theClass,element+': '+value+';');
            }
        }
    }
}


function abreSeccion(idSeccion) {
    //    alert(idSeccion);
}

function inicializarGrafico() {
    if(!inicializado) {
        var tb = document.getElementById("toolbarContainer");

        var edicion = document.forms[0].modo.value == "1";
        if (!edicion) {
            // Cargo la aplicación solo la primera vez
            if (editor == undefined) {
                var tb = document.getElementById("toolbarContainer");
                tb.style.display = 'none';
                tb.style.visibility =  'hidden';
                var xmlString = document.forms[0].XML.value;
                var recorrido = new Array();
                editor = new mxVisualizacion('/mxgraph/Expediente/config/workfloweditor.xml', xmlString, recorrido);
            }
        } else {
            if (editor == undefined) {
                var tb = document.getElementById("toolbarContainer");
                editor = new mxApplication('/mxgraph/Expediente/config/workfloweditor.xml', true);
                document.getElementById('graph').style.top="0px";
                document.getElementById('graph').style.left="55px";
            } else {
                var tb = document.getElementById("toolbarContainer");
                tb.style.visibility = "visible";
            }
        }
    }
} // function() {
function setearOficina(id, nombre, idCell) {
    //var g = document.getElementsByTagName('mxEditor');
    
    var celda = editor.graph.model.getCell(idCell);
    if (celda == null) {
        alert('null');
    } else {
        if (id == "nulo") {
            nombre = "";
            id = "";
        }
        celda.setAttribute('idOficina', id);
        celda.setAttribute('label', nombre);
        editor.graph.refresh(celda);
        editor.graph.enabled = true;
        editor.toolbar.toolbar.enabled = true;
        var combo = document.getElementById('combo');
        combo.style.visibility = "hidden";
    }
}
function setearGrupo(id, nombre, idCell) {
    //var g = document.getElementsByTagName('mxEditor');
    
    var celda = editor.graph.model.getCell(idCell);
    if (celda == null) {
        alert('null');
    } else {
        if (id == "nulo") {
            nombre = "";
            id = "";
        }
        celda.setAttribute('idGrupo', id);
        celda.setAttribute('label', nombre);
        editor.graph.refresh(celda);
        editor.graph.enabled = true;
        editor.toolbar.toolbar.enabled = true;
        var combo = document.getElementById('comboGrupos');
        combo.style.visibility = "hidden";
    }
}

function guardarDiagrama() {
    if (editor != null) {
        var enc = new mxCodec(mxUtils.createXmlDocument());
        var node = enc.encode(editor.graph.model);
        var xml = mxUtils.getXml(node);
        document.forms[0].XML.value = xml;
    }
}
//////////////////////////////////// ACCIONES TEMA //////////////////////////////////////////////////////////////////////////////////////////////


function DirABS() { 
    var pathname=location.pathname;
    return (pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 

function ValidarCamposDoc() {
    if (document.getElementById("sTema"))
        if (document.forms[0].sTema.value=="")
            alert("Debe ingresar un nombre para el tema");
        else
            return true;
        else
            return true;
        return false;
}


function salirdocnuevo() {
    if (ValidarCamposDoc()) { 
        var pathDB = DirABS();    
        document.forms[0].Retorno.value = pathDB +"/BandejaporNombre?OpenForm"
        document.forms[0].submit();
    }
}

function salirdocsalvado(nuevo) {
    if (nuevo==0) {
        if (ValidarCamposDoc()) { 
            //Cargo el retorno
            var pathDB = DirABS();    
            document.forms[0].Retorno.value = pathDB;
            
            document.forms[0].submit();
        }
        else if (ValidarCamposDoc()) { 
	        var pathDB = DirABS();    
	        document.forms[0].Retorno.value = pathDB;
	        document.forms[0].submit();
	    }
	}
}
function CrearNuevaVersion() {
    document.forms[0].NuevaVersion.click()
}

function NuevoPasoRuta() {
    document.forms[0].PasoRuta.click()
}
function NuevaTransicionRuta() {
    document.forms[0].TransicionRuta.click()
}

//Guardar
function Salvar(nuevo) {
    var valido = false;
    valido = ValidarCamposDoc();

    if (valido) {
        guardarDiagrama();
        //cmpReturn.value =DirABS() + vista +"/XPLACEUNIDX?openDocument"; //DIEGO: PARA CUANDO EL DOCUMENTO ES NUEVO
        document.forms[0].submit();
    }
}

//Salir
function Salir() {
    //Cargo el retorno
    //var pathDB = DirABS();
    //document.forms[0].Retorno.value = pathDB +"/Inicio?Openframeset&Frame=Derecho&Src=" + document.forms[0].vistaOrigen.value
    //url=document.forms[0].Retorno.value;
    top.location.replace("/"+document.getElementById("PathAdmin").value+"/Configuracion Expedientes?OpenForm");
}

//Editar
function Editar() {
//document.forms[0].Editar.click()
    var pathDB = DirABS();
    url=pathDB+"/0/"+document.forms[0].unid.value+"?EditDocument"
    window.location=url;
} 

function Activar() {

    if (confirm("¿Esta Seguro que desea Activar el Tema?")) {
        window.location.replace(DirABS()+"/ActivarTema?OpenAgent&unid="+document.getElementById("unid").value)
    }
}
function Desactivar() {

    if (confirm("¿Esta Seguro que desea Desactivar el Tema?")) {
        document.forms[0].DesactivarTema.click();
    }
}
function seleccionUnidades(boton,campo) {
    NamePicker.init({
        prompt: '<p>Seleccione la Unidad</p>',
        addressbook: "/"+document.forms[0].sPathDbOrg.value,
        viewname: '(BusquedaNroPorUnidad)',
        column: 1,
        column_codigo: 2,
        msg_repetido: "La Unidad ya se encuentra agregada",
        empty: true
    });
    NamePicker.open(boton, campo, 'con_codigo', 'Seleccione  la Unidad');
}

function abrirDoc(id) {
    window.location=DirABS()+"/0/"+id+"?OpenDocument";
}
var cargaXML = function(req) {
	var txt = req.getText();        
    if(txt.indexOf("#NUNIDAD#")>0) {
        while(txt.indexOf("#NUNIDAD#")>0) {
            izquierda = txt.substring(0,txt.indexOf("#NUNIDAD#"))
            derecha = txt.substring(txt.indexOf("#NUNIDAD#")+9,txt.length)
            nro = derecha.substring(0,derecha.indexOf("#NUNIDAD#"))
            derecha = derecha.substring(derecha.indexOf("#NUNIDAD#")+9,derecha.length)
            nombre=""
            for(var i=0;i<oficinas.length;i++) {
                if (oficinas[i].codigo==nro) {
                    nombre = oficinas[i].nombre;
                }
            }
            txt = izquierda+nombre+derecha;
        }        
    }

    if (txt.indexOf("#NGRUPO#")>0) {
        while(txt.indexOf("#NGRUPO#")>0) {
            izquierda = txt.substring(0,txt.indexOf("#NGRUPO#"))
            derecha = txt.substring(txt.indexOf("#NGRUPO#")+8,txt.length)
            nro = derecha.substring(0,derecha.indexOf("#NGRUPO#"))
            derecha = derecha.substring(derecha.indexOf("#NGRUPO#")+8,derecha.length)
            nombre=""
            for(var i=0;i<grupos.length;i++) {
                if (grupos[i].codigo==nro) {
                    nombre = grupos[i].nombre;
                }
            }
            txt = izquierda+nombre+derecha;
        }
    }
    document.forms[0].XML.value=txt;                
}  

var onerror = function(req) {
    mxUtils.alert(req.getStatus());            
}                

function cargarXML() {
    var urlVistaXML= DirABS() + '/(XmlTema)?OpenView&RestrictToCategory=';
    if (document.forms[0].codigoAux.value!="") {
        urlVistaXML = urlVistaXML+document.forms[0].codigoAux.value+"$$"+document.forms[0].versionAux.value;
        var req = new mxXmlRequest(urlVistaXML, '', 'GET', true);            
        req.send(cargaXML, onerror);
    }
}
