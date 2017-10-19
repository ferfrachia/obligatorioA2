package listas;

import java.util.Iterator;

public class ListaSE<T> extends Lista<T>{

	private NodoLista<T> inicio;

	public ListaSE() {
		this.inicio = null;
	}
	
	public void agregarPpio(T dato)
	{
		inicio = new NodoLista<T>(dato,inicio);
	}
	
	public void agregarFin(T dato)
	{
		if(inicio == null)
			inicio = new NodoLista<T>(dato);
		else
			agregarFinRec(dato, inicio);
	}
	
	private void agregarFinRec(T dato, NodoLista<T> nodo) {
		if(nodo.getSig()==null)
			nodo.setSig(new NodoLista<T>(dato));
		else
			agregarFinRec(dato, nodo.getSig());
	}
	
	//Pre: k>=0
	public void agregarEnPosK(int k, T dato)
	{
		if(k==0 || inicio == null)
			agregarPpio(dato);
		else
			agregarEnPosKRec(k, dato, inicio);
	}

	private void agregarEnPosKRec(int k, T dato, NodoLista<T> nodo) {
		if(k==1 || nodo.getSig()==null)
			nodo.setSig(new NodoLista<T>(dato,nodo.getSig()));
		else
			agregarEnPosKRec(k-1, dato, nodo.getSig());
	}
	
	//Pre: largo!=0
	public void borrarPpio(){
		inicio = inicio.getSig();
	}
	
	//Pre: largo!=0
	public void borrarFin(){
		if(inicio.getSig()==null)
			inicio = null;
		else
			borrarFinRec(inicio);
	}

	private void borrarFinRec(NodoLista<T> nodo) {
		if(nodo.getSig().getSig() == null)
			nodo.setSig(null);
		else
			borrarFinRec(nodo.getSig());
	}
	@Override
	public void insertar(T dato) {
		agregarFin(dato);
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
	public String toString() {
		return mostrarLista();
	}

	private String mostrarLista() {
		return "aa";
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

}
