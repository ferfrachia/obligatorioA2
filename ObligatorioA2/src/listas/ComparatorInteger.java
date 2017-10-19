package listas;

import java.util.Comparator;

public class ComparatorInteger<Integer> implements Comparator<Integer> {

	@Override
	public int compare(Integer o1, Integer o2) {
		return (int)o1 - (int)o2;
	}
	
}
