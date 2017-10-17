package dominio;

public class Tramo {
	
	double coordXi;
	double coordYi;
	double coordXf;
	double coordYf;
	int peso;
	
	
	public Tramo(Double coordXi, Double coordYi, Double coordXf, Double coordYf, int peso) {
		
		this.coordXi=coordXi;
		this.coordYi=coordYi;
		this.coordXf=coordXf;
		this.coordYf=coordYf;
		this.peso=peso;
		
	}
	
	public Tramo() {
		
	}
	
	public double getCoordXi() {
		return coordXi;
	}
	public void setCoordXi(double coordXi) {
		this.coordXi = coordXi;
	}
	public double getCoordYi() {
		return coordYi;
	}
	public void setCoordYi(double coordYi) {
		this.coordYi = coordYi;
	}
	public double getCoordXf() {
		return coordXf;
	}
	public void setCoordXf(double coordXf) {
		this.coordXf = coordXf;
	}
	public double getCoordYf() {
		return coordYf;
	}
	public void setCoordYf(double coordYf) {
		this.coordYf = coordYf;
	}
	public int getPeso() {
		return peso;
	}
	public void setPeso(int peso) {
		this.peso = peso;
	}
	
	

}
