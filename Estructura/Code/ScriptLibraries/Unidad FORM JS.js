function crearFormulario() {
	var codigo = document.forms[0].selForm.options[document.forms[0].selForm.selectedIndex].value;
	var loc = DirABS() + "MiembrosFormulario?OpenForm&unidad=" + document.getElementById("sNroUnidad").value+"&codigo="+codigo;
	location.replace(loc);
}

function abrirForm(id) {
	var loc = DirABS() + "0/" + id + "?OpenDocument";
	location.replace(loc);
}

function borrarFormularios(codigo) {
	if (confirm("¿Está seguro que desea quitar el formulario seleccionado?")) {
		var unidad = document.getElementById("sNroUnidad").value;
		var loc = DirABS() + "FormController?OpenAgent&unidad=" + unidad + "&codigo=" + codigo;
		location.replace(loc); 
	}
}