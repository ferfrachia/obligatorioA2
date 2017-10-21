package controladoras;

import arboles.ABB;
import dominio.Productor;
import funcionesAux.ComparatorProductor;


public class ControladoraProductor {

	ABB<Productor> productores = new ABB<Productor>(new ComparatorProductor<Productor>());

	private static ControladoraProductor instancia;

	public static ControladoraProductor getInstacia() {
		if (instancia==null) return new ControladoraProductor();
		return instancia;

	}

	public boolean registrarProductor(String cedula, String nombre, String direccion, String email, String celular) {
		boolean ret = false;

		Productor p = new Productor(cedula, nombre, direccion, email, celular);
		if(!productores.pertenece(p)) {
			productores.insertar(p);
			ret = true;

		}else {

		}

		return ret;
	}

	public boolean buscarProductor(String cedula) {
		boolean ret = false;

		/*for(int i = 0; i < productores.largo(); i++) {
			Productor p = productores.get(i);
			if (p.getCedula().equals(cedula)) {
				ret = true;
			} 
		}*/
		return ret;

	}

	public String listarProductores() {
		return productores.toString();
	}
}
