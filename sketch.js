//import processing.sound.*;
var pitchnote1 = 0.0; 
var pitchnote2 = 0.0; 
var vibrato1 = 0.0; 
var vibrato2 = 0.0; 
//SinOsc note1sin;
let note1sin;
//SinOsc note2sin;
let note2sin;
//SinOsc note1vibrate;
let note1vibrate;
//SinOsc note2vibrate;
let note2vibrate;
//PGraphics sourceImage;
//PGraphics maskImage;
let sourceImage;
let maskImage;
let yy=0.0;
let xcontrolarea;
let ycontrolarea;
var letters= " ";
var i=0.0;

let pitchTab = [
4,
8,
12,
16,
20,
24,
28,
32,
36,
40,
44,    
48,//A0
52,
56,
58,//C1
62,
66,
68,
72,//E1  
78,//F1  
82,
86,//G1  
92,
96,//A1
102,
110,
114,//C2
122,
128,
138,
144,//E2
154,//F2
162,
172,//G2
182,
194,//A2
206,
216,
230,//C3
244,
258,
274,
290,//E3
306,//F3
324,
344,//G3
364,
386, //A3
408, 
432,
460,//C4
486,
516,//D4
544,
576,//E4
612,//F4
648,
686,//G4
728,
770,//A4
816,
866,
916,//C5
970,
1028,
1090,
1154,//E5
1222,//F5
1296,
1372,//G5
1454  
];

let osc, playing, freq, amp;

let haha;

function preload() {
  haha =
    loadFont('ProcessingSansPro-Semibold.ttf');
}

let boxSize;
let controlSize;

function setup() {
  background(16,16,22);
  
  boxSize = windowHeight/3;
  
  //fullScreen(P3D);
  //fullscreen();
  //let cnv = createCanvas(100, 100);
  let cnv = createCanvas(windowWidth*0.8, windowHeight*0.8,WEBGL);
  //cnv.mousePressed(playOscillator);
  cnv.mouseOver(playOscillator);
  osc = new p5.Oscillator('sine');
  
  //noStroke();

  xcontrolarea = boxSize/4.8;//145.0;
  ycontrolarea=boxSize/5.4;//130.0;
  rect(xcontrolarea,ycontrolarea,boxSize*1.1,boxSize*1.1);
  ortho(-width,width,-height,height,-width*2,width*2);
  //camera(900, -500, 1200, 0,300,0,0, 1, 0);
  //return;
  //sourceImage = createGraphics(1000,200);
  //maskImage = createGraphics(1000,200);
  //PFont haha;
  //haha=createFont("Jost-Regular_Bold",45);
  //haha = loadFont('assets/Jost-Regular_Bold.otf');
  //textFont(haha);
  
  
  note1vibrate= new p5.Oscillator('sine');
  note2vibrate = new p5.Oscillator('sine');
  note1sin = new p5.Oscillator('sine');
  note2sin = new p5.Oscillator('sine');
  
}


//---------------------------USING KEYS TO HOLD A NOTE AND CONTROL VIBRATOS------------------------

//boolean shiftKeyPressed = false; // by default it plays continuous freq.  
//boolean vibrato = false; // by default it doesn't play vibrato. 
//int debugPrint = 0;
//int keyCount = 0;

var shiftKeyPressed = false; // by default it plays continuous freq.  
var vibrato = false; // by default it doesn't play vibrato. 
var debugPrint = 0;
var keyCount = 0;

function keyPressed() {
  switch (keyCode){
     
     case SHIFT:
        shiftKeyPressed = true;
        debugPrint ++;
     break;
     
     case LEFT:
       vibrato = false;
       // println("left key pressed: "+debugPrint);
       // text("left key pressed",0,debugPrint*20);
       //println("vibrato set to false..");
     break;
     
     case RIGHT:
       vibrato = true;
       //println("vibrato set to true..");
     break;
     
     case UP_ARROW:
       yy=yy-20;
       //translate(0,y,0);     
     break;
     
     case DOWN_ARROW:
       yy=yy+20;
    break;

     default:
      
     break;
  }
}

function keyReleased() {

  //if(!keyPressed)
    //return;
  
  switch (keyCode){
     
     case SHIFT:
        shiftKeyPressed = false;
     //   text("shift key released",0,debugPrint*20);
        debugPrint ++;
     break;
     case LEFT:
        //println("left key released: "+debugPrint);
        //text("left key pressed",0,debugPrint*20);
        debugPrint ++;
     break;
     
     default:
       // my logic...
     break;     
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}

class Vector {
  constructor(...components) {
    this.components = components
  }
}

let point = new Vector(1, 2, 3);
let points = [point];

function mRotate(pitch, roll, yaw) {
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    for (var i = 0; i < points.length; i++) {
        var px = points[i].x;
        var py = points[i].y;
        var pz = points[i].z;

        points[i].x = Axx*px + Axy*py + Axz*pz;
        points[i].y = Ayx*px + Ayy*py + Ayz*pz;
        points[i].z = Azx*px + Azy*py + Azz*pz;
    }
}

function draw() {

  //console.log(windowWidth);
  //console.log(windowHeight);
   background(16,16,22);
  

   //--------------------------------------------area for mouse control-------------------------------------------------
   stroke(250,110);
   strokeWeight(3);
   noFill();
   controlSize = 2*boxSize;
   let controlX  = -controlSize;
   let controlY =-controlSize/5*2;
   rect(controlX,controlY,controlSize,controlSize,10);

//---------------------------------------------line indicators in control area-------------------------------------------------

  let xhz = mouseX*1.5 - windowWidth/1.5;
  let yhz = mouseY*1.5 - windowHeight/1.5;

  if(xhz>controlX+controlSize)
  {
    xhz=controlX+controlSize;
  }
  else if(xhz<controlX)
  {
    xhz=controlX;
  }
   if(yhz>controlY + controlSize)
  {
    yhz=controlY+controlSize;
  }
  else if(yhz<controlY)
  {
    yhz=controlY;
  }
  
  fill(250+yy/1.5,80-yy/2.5,135-yy);
  noStroke();
  ellipse(xhz,yhz,20,20);
 
  stroke(250+yy/1.5,80-yy/2.5,135-yy,180);
  strokeWeight(2);
  line(controlX,yhz,controlX+controlSize,yhz);
  line(xhz, controlY,xhz,controlY+controlSize);

  // the moving texts:
  let numberX,numberY;
  numberX=map(xhz,controlX,controlX+controlSize,0,pitchTab.length - 1);
  numberY=map(yhz,controlY,controlY+controlSize,0,pitchTab.length - 1);
  let printX=int(numberX);
  let printY=int(numberY); 
  
  //fill(225,200);
  textSize(windowHeight/40);  
  textFont(haha);
  fill(255,200);
  text(pitchTab[printX]+" Hz",xhz,controlY+controlSize + controlSize/20);
  text(pitchTab[printY]+" Hz",controlX - controlSize / 10 - 10,yhz+10);    
//----------------------------------------------the GRIDS in control area--------------------------------------------------
   let w=20;
   let opaque=35-w;
   let weight=1;   
    stroke(50,50,50,opaque);strokeWeight(weight);
  
  let lowest = pitchTab[0];
  let highest = pitchTab[pitchTab.length-1];
  
  for(let pt = 0; pt < pitchTab.length; pt += 1)
  {
    //console.log(pt);
    let pitchStep = map(pitchTab[pt], lowest, highest, 0,controlSize);
    //console.log(pitchStep);
    let ys = controlY + controlSize- pitchStep;
    let xs = controlX + pitchStep;
    line(controlX,ys,controlX+controlSize,ys);
    line(xs, controlY,xs,controlY+controlSize);
  }
  //line(xhz, controlY,xhz,controlY+controlSize);

//--------------------------------------------Drawing the volume bar------------------------------------------------------
  rect(0, boxSize, boxSize, boxSize/5);
  
  
//--------------------------------------------- MAIN BOX--------------------------------------
   strokeWeight(2);  
  // set color:
   stroke(225-2.5*yy,70-yy/9,105+2*yy,150);
   noFill();
 
   push(); //push the whole box group
  
   if (yy>0)
   {
   stroke(225,70,105,150);
    
   }
   //myTranslate(-800,490,0,xr);
   //the box translate:
  //myTranslate(450,-300,0,xr);
  stroke(225,70,105,150);
  
  translate(boxSize,0,0);
  rotateX(-PI/6);
  rotateY(-PI/6);  
  //rotateZ(PI/3*2);  
  box(boxSize, boxSize, boxSize);  
  //draw the volume level plane:
  fill('rgba(100,100,100, 0.25)');

  // draw texts for the box:
  push();
  textSize(windowHeight/40);  
  textFont(haha);
  fill(255,200);
  translate(0,0,boxSize/2);
  text("0Hz",-boxSize/2,boxSize/2+boxSize/16);
  text("880Hz",boxSize/2,boxSize/2+boxSize/16);
  
  translate(0,0,-boxSize);
  text("880Hz",-boxSize/2-boxSize/4,boxSize/2+boxSize/16);
  translate(0,-boxSize,0);
  text("VOLUME+",-boxSize/2,boxSize/2-boxSize/16);
  pop();  
  
  translate(0,boxSize/2+yy,0);
  box(boxSize,1,boxSize);  

  
  push(); // push the fixed part of the box
  
  //------------------------------------- Using mouse and keyboard to control position of sphere:---------------------------------
  pop();
  
  // map the xhz and yhz to volume level plan's coord.:
  let x=map(xhz,controlX,controlX+controlSize,0, boxSize);
  let y=map(yhz,controlY,controlY+controlSize,0, boxSize);
  // adjust the Y coord:
  y = boxSize -y;
  
  if (x>boxSize)
    x=boxSize;
  else if (x<0)
    x=0;
  if (y>boxSize)
    y=boxSize;
  else if (y<0)
    y=0;   
  
/*  
  points[0].x = x;
  points[0].y = y;
  points[0].z = 0;
  mRotate(-PI/6, -PI/6, 0);
  translate(points[0].x,points[0].y,points[0].z);

*/  
  //translate(boxSize,0,0);
  fill('rgba(100,100,100, 0.25)');
  //translate(0,boxSize/2,0);
  rotateX(-PI/2);
  translate(x-boxSize/2,y-boxSize/2,0);

  if (y<-boxSize)
  {
    y=-boxSize;
  }

  if((keyPressed==true)&&(keyCode==UP))
  {
    y=y-boxSize/35;
    translate(0,y,0);
  }
   
  if (y>0)
  {
    y=0;     
  }
  
  if((keyPressed==true)&&(keyCode==DOWN))
  {
    y=y+boxSize/35;
    translate(0,y,0); 
  }
 
  if(keyPressed==false)
  {
    translate(0,y,0);
  }  
  if((keyPressed==true)&&(keyCode!=UP)&&(keyCode!=DOWN))
  {
    translate(0,y,0);
  }   
  
  fill(225-2.5*y,70-y/9,105+2*y);
  noStroke();
  
  if (y>0)
  {
    fill(225,70,105);
  }
  
  sphere(boxSize / 25);
  //translate(boxSize/2-x,-y,boxSize/2-z); 
  pop();
  
  
  return;
  
  
  
  
  //background(220)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  //text('tap to play', 20, 20);
  //text('freq: ' + freq, 20, 40);
  //text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

