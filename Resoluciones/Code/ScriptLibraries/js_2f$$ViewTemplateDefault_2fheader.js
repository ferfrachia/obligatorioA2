function getSelectedDocs(){
  var x = 0;
  var seldocs = new Array();
  var form = document._DominoForm;
  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].type == "checkbox") {
      if (form.elements[i].name == "$$SelectDoc") {
		if(form.elements[i].checked) {
		 seldocs[x]=form.elements[i].value
		 x++;
		}
      }
    }
  }
  return seldocs;
}
function abrirDoc(univid){
	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	top.location.href = pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
}