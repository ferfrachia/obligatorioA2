package funcionesAux;

import java.util.Comparator;

import dominio.Productor;

public class ComparatorProductor<T> implements Comparator<T> {

	@Override
	public int compare(T o1, T o2) {
		return Integer.valueOf(((Productor) o1).getCedula())-Integer.valueOf(((Productor) o2).getCedula());
	}

	
	
}
