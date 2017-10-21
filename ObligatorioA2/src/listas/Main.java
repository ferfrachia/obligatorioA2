package listas;

import java.util.Arrays;

import funcionesAux.ComparatorProductor;

public class Main {

	public static void main(String[] args) {
		int[][]mat = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
		int[][]mat2 = {{1,2,3},{4,5,6},{7,8,9}};
		
		
//		System.out.println(ej1(mat));
//		System.out.println(ej1Mejorado(mat));
//		System.out.println(ej1Rarofico(mat));
//		System.out.println(ej1(mat2));
//		System.out.println(ej1Mejorado(mat2));
//		System.out.println(ej1Rarofico(mat2));
		
//		int[] vec = vectorRandomico(10, 1, 10);
//		System.out.println(Arrays.toString(vec));
//		System.out.println(minimoElemento(vec));
		
		Lista<Integer> miLista = new ListaOrd<Integer>(new ComparatorProductor<Integer>());
//		Lista<Integer> miLista = new ListaSE<Integer>();
		miLista.insertar(5);
		miLista.insertar(1);
		miLista.insertar(9);
		miLista.insertar(7);
		miLista.insertar(3);
//		miLista.agregarEnPosK(4, 8);
//		miLista.agregarEnPosK(2, 4);
//		miLista.agregarEnPosK(1, 2);
//		miLista.agregarEnPosK(5, 6);

		for(Integer elem : miLista)
		{
			System.out.println(elem);
		}
		
//		System.out.println("Largo: " + miLista.largo());
		
	}
	
	private static int[] vectorRandomico(int largo, int numMin, int numMax)
	{
		int[] ret = new int[largo];
		for (int i = 0; i < largo; i++) {
			ret[i] = numMin + ((int)(Math.random()*(numMax-numMin+1)));
		}
		return ret;
	}

	private static int ej1(int[][] mat) {
		int suma = 0;
		for (int i = 0; i < mat.length; i++) 
			for (int j = 0; j < mat[0].length; j++) 
				if(i==j || i+j+1==mat.length)
					suma += mat[i][j];
		return suma;
	}

	private static int ej1Mejorado(int[][] mat) {
		int suma = 0;
		int largo = mat.length;
		for (int i = 0; i < largo; i++) 
			suma += mat[i][i] + mat[i][largo-1-i];
		if(largo%2!=0)
			suma -= mat[largo/2][largo/2];
		return suma;
	}

	private static int ej1Rarofico(int[][] mat) {
		int suma = 0;
		int largo = mat.length;
		for (int i = 0; i < largo/2; i++)
			suma += mat[i][i] + mat[i][largo-1-i] + mat[largo-1-i][i]+ mat[largo-1-i][largo-1-i];
		if(largo%2!=0)
			suma += mat[largo/2][largo/2];
		return suma;
	}
	
	private static int minimoElemento(int[] vec)
	{
		return minimoElementoRec(vec, 0, vec.length-1);
	}

	//Pre: desde >= 0, desde <= hasta, hasta<vec.length
	private static int minimoElementoRec(int[] vec, int desde, int hasta) {
		if(desde==hasta)
			return vec[hasta];
		else
		{
			int medio = (desde + hasta) / 2;
			int minIzq = minimoElementoRec(vec, desde, medio);
			int minDer = minimoElementoRec(vec, medio+1, hasta);
			return Math.min(minIzq, minDer);
		}	
	}
	 
	
}
