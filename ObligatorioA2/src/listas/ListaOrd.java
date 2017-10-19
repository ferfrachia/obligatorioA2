package listas;

import java.util.Comparator;
import java.util.Iterator;

public class ListaOrd<T> extends Lista<T> {

	private NodoLista<T> inicio;
	private Comparator<T> comp;
	
	public ListaOrd(Comparator<T> comp) {
		this.inicio = null;
		this.comp = comp;
	}

	@Override
	public Iterator<T> iterator() {
		return new Iterator<T>() {
			
			NodoLista<T> aux = inicio;
			
			@Override
			public boolean hasNext() {
				return aux != null;
			}

			@Override
			public T next() {
				T ret = aux.getDato();
				aux = aux.getSig();
				return ret;
			}
		};
	}

	@Override
	public int largo(){
		return largoRec(inicio);
	}
	

	private int largoRec(NodoLista<T> nodo) {
		if(nodo == null){
			return 0;
		}
		else
		{
			return 1 + largoRec(nodo.getSig());
		}
	}

	@Override
	public void insertar(T dato) {
		if(inicio == null || comp.compare(dato, inicio.getDato())<=0)
			inicio = new NodoLista<T>(dato,inicio);
		else
			insertarRec(dato, inicio);
	}

	private void insertarRec(T dato, NodoLista<T> nodo) {
		if(nodo.getSig()==null || comp.compare(dato, nodo.getSig().getDato())<=0)
			nodo.setSig(new NodoLista<T>(dato,nodo.getSig()));
		else
			insertarRec(dato, nodo.getSig());
	}

}
