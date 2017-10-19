package grafos;

import listas.Lista;
import listas.ListaSE;

public class Grafo {
	
	private int contador;
	private int tope;
	private Arco[][] matAdy;
	private String[] vec;
	
	public Grafo(int tope) {
//		this.contador = 0;
		this.tope = tope;
		this.vec = new String[tope];
		this.matAdy = new Arco[tope][tope];
		
		for (int i = 0; i < matAdy.length; i++) {
			for (int j = 0; j < matAdy[0].length; j++) {
				matAdy[i][j] = new Arco();
			}
		}
		
	}
	
	public boolean esVacio(){
		return contador == 0;
	}
	
	public boolean esLleno(){
		return contador == tope;
	}

	public boolean existeVertice(String v1)
	{
		for (int i = 0; i < vec.length; i++)
			if(vec[i].equals(v1))
				return true;
		return false;
	}
	
	//Pre: existeVertice(v1) && existeVertice(v2) 
	public boolean existeArista(String v1, String v2){
		int posV1 = posVertice(v1);
		int posV2 = posVertice(v2);
		return matAdy[posV1][posV2].isExiste();
	}

	//Pre: existeVertice(v1) && existeVertice(v2) && existeArista(v1,v2)
	public int obtenerArista(String v1, String v2){
		int posV1 = posVertice(v1);
		int posV2 = posVertice(v2);
		return matAdy[posV1][posV2].getPeso();
	}
	
	//Pre: existeVertice(v1) && existeVertice(v2) && !existeArista(v1,v2)	
	public void agregarArista(String v1, String v2, int peso){
		int posV1 = posVertice(v1);
		int posV2 = posVertice(v2);
		matAdy[posV1][posV2].setExiste(true);
		matAdy[posV1][posV2].setPeso(peso);
	}
	
	//Pre: existeVertice(v1) && existeVertice(v2) && existeArista(v1,v2)
	public void borrarArista(String v1, String v2){
		int posV1 = posVertice(v1);
		int posV2 = posVertice(v2);
		matAdy[posV1][posV2].setExiste(false);
	}
	
	//Pre: !esLleno()
	public void agregarVertice(String vertice)
	{
		int posNull = 0;
		while(vec[posNull]!=null)
			posNull++;
		
		vec[posNull] = vertice;
		
		this.contador++;
	}
	
	//Pre: existeVertice(vertice)
	public void borrarVertice(String vertice)
	{
		int posNull = 0;
		while(!vec[posNull].equals(vertice))
			posNull++;
		
		vec[posNull] = null;
		
		for (int i = 0; i < matAdy.length; i++) {
			matAdy[i][posNull].setExiste(false);
			matAdy[posNull][i].setExiste(false);
		}
		
//		for (int i = 0; i < matAdy.length; 
//				matAdy[i][posNull].setExiste(false),
//				matAdy[posNull][i++].setExiste(false)
//		);
		
		this.contador--;
	}
	
	//Pre: existeVertice(vertice)
	public Lista<String> adyacentes(String vertice)
	{
		int posV = posVertice(vertice);
		Lista<String> ret = new ListaSE<String>();
		for (int i = 0; i < matAdy.length; i++)
			if(matAdy[posV][i].isExiste())
				ret.insertar(vec[i]);
		return ret;
	}		
	//Pre: existeVertice(vertice)
	public Lista<String> incidentes(String vertice)
	{
		int posV = posVertice(vertice);
		Lista<String> ret = new ListaSE<String>();
		for (int i = 0; i < matAdy.length; i++)
			if(matAdy[i][posV].isExiste())
				ret.insertar(vec[i]);
		return ret;
	}
	
	
	
	//Pre: !existeArista
	private int posVertice(String vertice)
	{

		for (int i = 0; i < vec.length; i++)
			if(vec[i].equals(vertice))
				return i;
		return -1;
	}
}
