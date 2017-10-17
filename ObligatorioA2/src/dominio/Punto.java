package dominio;

public class Punto {

	enum TipoPunto {
		Silo, Ciudad, Plantacion
	};
	double coordX;
	double coordY;
	TipoPunto tipoPunto;
	
	public Punto(double coordX, double coordY, TipoPunto tipo) {
		this.coordX=coordX;
		this.coordY=coordY;
		this.tipoPunto=tipo;
	}
	
	public Punto() {
		
	}
	
	public double getCoordX() {
		return coordX;
	}
	public void setCoordX(double coordX) {
		this.coordX = coordX;
	}
	public double getCoordY() {
		return coordY;
	}
	public void setCoordY(double coordY) {
		this.coordY = coordY;
	}

	public TipoPunto getTipoPunto() {
		return tipoPunto;
	}

	public void setTipoPunto(TipoPunto tipoPunto) {
		this.tipoPunto = tipoPunto;
	}
	
	
	
}
