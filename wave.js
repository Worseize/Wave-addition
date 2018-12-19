class Wave{
	constructor(posX, posY, r ,phase, frequency, pX, pY){
		this.posX = posX;
		this.posY = posY;
		this.r = r;
		this.phase = phase;
		this.frequency = frequency;
		this.pX = pX;
		this.pY = pY;
	}
	display(){
		stroke(0);
		strokeWeight(2);
		noFill();
		ellipse(this.posX , this.posY, 2 * this.r);
	}
	showPoint(){
		stroke(255, 0, 0);
		strokeWeight(5);
		point(this.pX, this.pY);
	}
	update(){
		let temp = this.phase / PI / 2 / fR + time * this.frequency / PI / 2 / fR;
		this.pX = this.posX + this.r * cos(temp);
		this.pY = this.posY + this.r * sin(temp);
	}
}