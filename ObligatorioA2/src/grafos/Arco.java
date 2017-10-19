package grafos;

public class Arco {
	private int peso;
	private boolean existe;

	public Arco() {
//		this.peso = 0;
//		this.existe = false;
	}

	public Arco(int peso) {
		this.peso = peso;
		this.existe = true;
	}

	public int getPeso() {
		return peso;
	}

	public void setPeso(int peso) {
		this.peso = peso;
	}

	public boolean isExiste() {
		return existe;
	}

	public void setExiste(boolean existe) {
		this.existe = existe;
	}

	@Override
	public String toString() {
		return existe ? peso + "" : "";
	}

}
