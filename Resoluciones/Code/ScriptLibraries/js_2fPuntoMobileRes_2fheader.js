function abrirAnexo(id){
		if (anexoSeleccionado=="")
			alert('Debe seleccionar un anexo');
		else{
			window.open(location.pathname+"/../0/"+id+"/$file/"+anexoSeleccionado);
		}
	}

