// parameters
let time = 0;
let fR = 25;
let start = false;
//arrays
let wavesData = [];
let wavesUpdatingData = [];
let sumArray = [];
//objects
let randomCircle;
//DOM
let addDomElementButton , confirmButton;

function preload(){

}
function setup(){
	frameRate(fR);
	addDomElementButton = createButton("add more waves");
	addDomElementButton.mousePressed(addNewWave);
	br1 = createElement('br', 'br1');
	confirmButton = createButton("Show graph");
	confirmButton.mousePressed(graphDisplay);
	br2 = createElement('br', 'br1');
	createCanvas(innerWidth - 20,  innerHeight - 200);
}

function addNewWave(){
	br3 = createElement('br', 'br1');
	wavesData[wavesData.length] = createInput("r");
	wavesData[wavesData.length-1].style('width', '100px');
	wavesData[wavesData.length] = createInput("phase");
	wavesData[wavesData.length-1].style('width', '100px');
	wavesData[wavesData.length] = createInput("frequency");
	wavesData[wavesData.length-1].style('width', '100px');
}
function graphDisplay(){
	if(wavesData.length > 0){
		wavesUpdatingData[0] = new Wave(200, 200, +wavesData[0].value(), +wavesData[1].value(), +wavesData[2].value());
		wavesUpdatingData[0].update();
		start = true;
		for(let i = 1; i < wavesData.length / 3; i++){
			wavesUpdatingData[i] = new Wave(wavesUpdatingData[i - 1].pX, wavesUpdatingData[i - 1].pY, +wavesData[i * 3].value(), +wavesData[i * 3+1].value(), +wavesData[i * 3+2].value());
			wavesUpdatingData[i].update();
		}
		
	}else{
		start = false;
	}
}

	

function draw(){
	background(255,255,0);
	if(start){
		for(let i = 0; i < wavesUpdatingData.length; i ++){
			wavesUpdatingData[i].display();
			wavesUpdatingData[i].showPoint();
			wavesUpdatingData[i].update();
			
		}
		for(let i = 1; i < wavesUpdatingData.length; i ++){
			wavesUpdatingData[i].posX = wavesUpdatingData[i - 1].pX;
			wavesUpdatingData[i].posY = wavesUpdatingData[i - 1].pY;
			if(i + 1 === wavesUpdatingData.length){
				sumArray.unshift(wavesUpdatingData[i].pY);
			}
		}


		time++;
		if(sumArray.length > 500){
			sumArray.pop();
		}
		for(let i = 0; i < sumArray.length; i++){
			stroke(0,0,255);
			strokeWeight(2);
			point(400 + i , sumArray[i]);
		}
		line(wavesUpdatingData[wavesUpdatingData.length-1].pX, wavesUpdatingData[wavesUpdatingData.length-1].pY, 400,sumArray[0])
	}
}