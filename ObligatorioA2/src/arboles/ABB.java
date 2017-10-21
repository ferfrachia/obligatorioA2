package arboles;

import java.util.Iterator;

import funcionesAux.ComparatorProductor;

public class ABB<T> implements Iterable<T> {
	private NodoABB<T> raiz;
	private ComparatorProductor<T> comp;

	public ABB(ComparatorProductor<T> comp) {
		this.comp = comp;
	}
	
	public void insertar(T x)
	{
		if(raiz == null)
			raiz = new NodoABB<T>(x);
		else
			insertarRec(x, raiz);
	}

	private void insertarRec(T x, NodoABB<T> nodo) {


		if(comp.compare(x, raiz.getDato())<=0){
			if(nodo.getIzq() == null)
				nodo.setIzq(new NodoABB<T>(x));
			else
				insertarRec(x,nodo.getIzq());	
		}
		else if(comp.compare(x, raiz.getDato())>0){
			if(nodo.getDer() == null)
				nodo.setDer(new NodoABB<T>(x));
			else 
				insertarRec(x,nodo.getDer());
		}
	}
	
	/*
	//Pre: !EsVacio()
	public int borrarMinimo(){
		int min;
		if(raiz.getIzq()==null){
			min = raiz.getDato();
			raiz = raiz.getDer();
		}else
			min = borrarMinimoRec(raiz);
		return min;
	}

	private int borrarMinimoRec(NodoABB nodo) {
		int min;
		if(nodo.getIzq().getIzq()==null){
			min = nodo.getIzq().getDato();
			nodo.setIzq(nodo.getIzq().getDer());
		}else
			min = borrarMinimoRec(nodo.getIzq());
		return min;
	}
	*/
	
	public void listarAscendente()
	{
		listarAscendenteAux(raiz);
	}

	public void listarDescendente()
	{
		listarDescendenteAux(raiz);
	}

	private void listarAscendenteAux(NodoABB<T> nodo) {
		if(nodo != null)
		{
			listarAscendenteAux(nodo.getIzq());
			System.out.println(nodo.getDato());
			listarAscendenteAux(nodo.getDer());
		}
	}

	private void listarDescendenteAux(NodoABB<T> nodo) {
		if(nodo != null)
		{
			listarDescendenteAux(nodo.getDer());
			System.out.println(nodo.getDato());
			listarDescendenteAux(nodo.getIzq());
		}
	}
	
	public boolean pertenece(T dato)
	{
		return perteneceRec(raiz, dato);
	}

	private boolean perteneceRec(NodoABB<T> nodo, T dato) {
		if(nodo == null)
			return false;
		else{
			if(comp.compare(dato, nodo.getDato())==0)
			//if(nodo.getDato() == dato)
				return true;
			//else if(dato < nodo.getDato())
			else if (comp.compare(dato, nodo.getDato())<0)	
				return perteneceRec(nodo.getIzq(), dato);
			else 
				return perteneceRec(nodo.getDer(), dato);
		}
	}
	
	
	/*
	//Pre: pertenece(dato)
	public void borrar(T dato)
 	{
		if(raiz.getDato()==dato)
		{
			if(raiz.getIzq()==null)
				raiz = raiz.getDer();
			else if(raiz.getDer()==null)
				raiz = raiz.getIzq();
			else
			{
				if(raiz.getDer().getIzq()==null)
				{
					raiz.setDato(raiz.getDer().getDato());
					raiz.setDer(raiz.getDer().getDer());
				}
				else{
					raiz.setDato(borrarMinimoRec(raiz.getDer()));
				}
			}
		}
		else 
			borrarRec(raiz, dato);
	}

	private void borrarRec(NodoABB nodo, T dato) {
		if(dato < nodo.getDato())
		{
			if(nodo.getIzq().getDato()==dato)
			{
				if(nodo.getIzq().getIzq()==null)
					nodo.setIzq(nodo.getIzq().getDer());
				else if(nodo.getIzq().getDer()==null)
					nodo.setIzq(nodo.getIzq().getIzq());
				else
				{
					if(nodo.getIzq().getDer().getIzq()==null)
					{
						nodo.getIzq().setDato(nodo.getIzq().getDer().getDato());
						nodo.getIzq().setDer(nodo.getIzq().getDer().getDer());
					}
					else{
						nodo.getIzq().setDato(borrarMinimoRec(nodo.getIzq().getDer()));
					}
				}
			}
			else 
				borrarRec(nodo.getIzq(), dato);
		} else if(dato < nodo.getDato())
		{
			if(nodo.getDer().getDato()==dato)
			{
				if(nodo.getDer().getIzq()==null)
					nodo.setIzq(nodo.getDer().getDer());
				else if(nodo.getDer().getDer()==null)
					nodo.setIzq(nodo.getDer().getIzq());
				else
				{
					if(nodo.getDer().getDer().getIzq()==null)
					{
						nodo.getDer().setDato(nodo.getDer().getDer().getDato());
						nodo.getDer().setDer(nodo.getDer().getDer().getDer());
					}
					else{
						nodo.getDer().setDato(borrarMinimoRec(nodo.getDer().getDer()));
					}
				}
			}
			else 
				borrarRec(nodo.getDer(), dato);
		}
	}
*/
	@Override
	public Iterator<T> iterator() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
