package controladoras;

import java.util.ArrayList;
import java.util.List;

import dominio.Productor;

public class ControladoraProductor {

	List <Productor> productores = new ArrayList <Productor>();

	private static ControladoraProductor instancia;

	public static ControladoraProductor getInstacia() {
		if (instancia==null) return new ControladoraProductor();
		return instancia;

	}

	public boolean registrarProductor(String cedula, String nombre, String direccion, String email, String celular) {
		boolean ret = false;
		
		if(productores.size()!=0) {
			if(!buscarProductor(cedula)) {
				productores.add(new Productor(cedula, nombre, direccion, email, celular));
				//listarProductores();
				ret = true;
			}
		}else {
			productores.add(new Productor(cedula, nombre, direccion, email, celular));
			ret = true;
		}

		return ret;
	}

	public boolean buscarProductor(String cedula) {
		boolean ret = false;

		for(int i = 0; i < productores.size(); i++) {
			Productor p = productores.get(i);
			if (p.getCedula().equals(cedula)) {
				ret = true;
			} 
		}
		return ret;

	}

	public String listarProductores() {
		String retorno="";
		
		for(int i = 0; i < productores.size(); i++) {
			Productor p = productores.get(i);
			if (retorno == "") {
				retorno=p.toString();
			}else{
				retorno = retorno + "|"+p.toString();
			}
		}
		return retorno;

	}
}
