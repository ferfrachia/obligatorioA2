package listas;

public abstract class Lista<T> implements Iterable<T>{
	
	public abstract int largo();
	
	public abstract void insertar(T dato);
	
}
