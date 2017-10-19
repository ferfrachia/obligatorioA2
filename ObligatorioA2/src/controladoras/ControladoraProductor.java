package controladoras;

import dominio.Productor;
import listas.Lista;
import listas.ListaSE;

public class ControladoraProductor {

	Lista <Productor> productores = new ListaSE<Productor>();

	private static ControladoraProductor instancia;

	public static ControladoraProductor getInstacia() {
		if (instancia==null) return new ControladoraProductor();
		return instancia;

	}

	public boolean registrarProductor(String cedula, String nombre, String direccion, String email, String celular) {
		boolean ret = false;
		
		if(productores.largo()>0) {
			if(!buscarProductor(cedula)) {
				productores.insertar(new Productor(cedula, nombre, direccion, email, celular));
				ret = true;
			}
		}else {
			productores.insertar(new Productor(cedula, nombre, direccion, email, celular));
			ret = true;
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
