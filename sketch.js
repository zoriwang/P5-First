//import processing.sound.*;

let boxSize;
let controlSize;
let controlLeft;
let controlTop;
let boxLeft;
let volStep;

// This ratio is to turn the hard numbers in Zori's orig codes to right numbers (using box size as the anchor - Zori's box size is 700);
let zoriRatio;

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
let volumeLevel=0.0;
let xcontrolarea;
let ycontrolarea;

let leftBtnClicked = false;

var letters= " ";
var i=0.0;

let gridTab = [
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
1454,
];

let pitchTab = [
// ------------------------FIRST OCTAVE------------------------------
["26","♫×"], 
["27","A0"], 
["29","A#/B♭"],  
["31","B0"],  
["33","C1"],  
["35","C#/D♭"],  
["37","D1"],  
["38","D#/E♭"], 
["41","E1"],   
["44","F1"],   
["46","F#/G♭"],  
["49","G1"], 
["52","G#/A♭"], 
 //---------------------------SECOND OCTAVE----------------
["54","A1"],  
["58","A#/B♭"],  
["62","B1"], 
["65","C2"],  
["69","C#/D♭"],  
["73","D2"], 
["78","D#/E♭"], 
["82","E2"], 
["88","F2"], 
["92","F#/G♭"],  
["98","G2"], 
["104","G#/A♭"], 
 //-------------------------------THIRD OCTAVE-----------------
["110","A2"], 
["117","A#/B♭"], 
["123","B2"],  
["131","C3"],  
["139","C#/D♭"], 
["147","D3"], 
["156","D#/E♭"], 
["165","E3"], 
["174","F3"],  
["185","F#/G♭"],  
["196","G3"],  
["208","G#/A♭"], 
 //-------------------------------FOURTH OCTAVE------------
["220","A3"], 
["233","A#/B♭"],
["246","B3"], 
["262","C4"], 
["277" ,"C#/D♭"], 
["294","D4"], 
["310","D#/E♭"],
["329","E4"],
["349","F4"],
["370","F#/G♭"],
["392","G4"],
["416","G#/A♭"],
 // ------------------------FIFTH OCTAVE-------------------------------
["440","A4"],
["466","A#/B♭"], 
["494","B4"], 
["523","C5"],
["554","C#/D♭"],
["587","D5"],
["622","D#/E♭"],
["659","E5"],
["698","F5"],
["740","F#/G♭"],
["784","G5"],
["830","G#/A♭"],
["880","A5"],
];

let osc, playing, freq, amp;

let haha;

function preload() {
  haha =
    loadFont('ProcessingSansPro-Semibold.ttf');
}


function setup() {
  
 
  background(16,16,22);
  
  //fullScreen(P3D);
  //fullscreen();
  //let cnv = createCanvas(100, 100);
  let cnv = createCanvas(windowWidth*1.0, windowHeight*1.0,WEBGL);
  
  boxSize = windowHeight/2;
  controlSize = 2.1*boxSize;
  controlLeft  = -controlSize;
  controlTop =-controlSize/5*2;
  boxLeft = boxSize/10*3;
  volStep = boxSize / 10;

  // This ratio is to turn the hard numbers in Zori's orig codes to right numbers (using box size as the anchor - Zori's box size is 700);
  zoriRatio = zoriRatio;
  
  cnv.mousePressed(playOscillator);
  cnv.mouseOver(playOscillator);
  //osc = new p5.Oscillator('sine');
  
  //noStroke();

  xcontrolarea = boxSize/4.8;//145.0;
  ycontrolarea=boxSize/5.4;//130.0;
  rect(xcontrolarea,ycontrolarea,boxSize*1.1,boxSize*1.1);
  ortho(-width,width,-height,height,-width*2,width*2);
  
  note1vibrate= new p5.Oscillator('sine');
  note2vibrate = new p5.Oscillator('sine');
  note1sin = new p5.Oscillator('sine');
  note2sin = new p5.Oscillator('sine');
 
  note1sin.amp(0, 0.1);
  note2sin.amp(0, 0.1);
  note2vibrate.amp(0, 0.1);
  note1vibrate.amp(0, 0.1);
  
  note1vibrate.start();
  note2vibrate.start();
  note1sin.start();
  note2sin.start();
  playing = true;
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
     
     case LEFT_ARROW:
       vibrato = false;
       // println("left key pressed: "+debugPrint);
       // text("left key pressed",0,debugPrint*20);
       //println("vibrato set to false..");
     break;
     
     case RIGHT_ARROW:
       vibrato = true;
       //println("vibrato set to true..");
     break;
     
     case DOWN_ARROW:
       if(volumeLevel>0)
         volumeLevel -= volStep;
       //translate(0,y,0);     
     break;
     
     case UP_ARROW:
       if(volumeLevel < boxSize)
         volumeLevel += volStep;
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
  //osc.start();
  note1sin.start();
  note2sin.start();
  note1vibrate.start();
  note2vibrate.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  note1vibrate.amp(0, 0.5);
  note2vibrate.amp(0, 0.5);
  note1sin.amp(0, 0.5);
  note2sin.amp(0, 0.5);
  //osc.amp(0, 0.5);
  playing = false;
}

/*
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
    var AvolumeLevel = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    for (var i = 0; i < points.length; i++) {
        var px = points[i].x;
        var py = points[i].y;
        var pz = points[i].z;

        points[i].x = Axx*px + Axy*py + Axz*pz;
        points[i].y = Ayx*px + AvolumeLevel*py + Ayz*pz;
        points[i].z = Azx*px + Azy*py + Azz*pz;
    }
}
*/

function roundRect(a, b, c, d, tl, tr, br, bl){
  c += a;
  d += b;
  
  if (a > c) {
    const temp = a; a = c; c = temp;
  }

  if (b > d) {
    const temp = b; b = d; d = temp;
  }

  const maxRounding = min((c - a) / 2, (d - b) / 2);
  if (tl > maxRounding) tl = maxRounding;
  if (tr > maxRounding) tr = maxRounding;
  if (br > maxRounding) br = maxRounding;
  if (bl > maxRounding) bl = maxRounding;

  rr(a, b, c, d, tl, tr, br, bl);
}

function rr(x1, y1, x2, y2, tl, tr, br, bl){
  beginShape();
  if (tr != 0) {
      vertex(x2-tr, y1);
      quadraticVertex(x2, y1, x2, y1+tr);
    } else {
      vertex(x2, y1);
    }
    if (br != 0) {
      vertex(x2, y2-br);
      quadraticVertex(x2, y2, x2-br, y2);
    } else {
      vertex(x2, y2);
    }
    if (bl != 0) {
      vertex(x1+bl, y2);
      quadraticVertex(x1, y2, x1, y2-bl);
    } else {
      vertex(x1, y2);
    }
    if (tl != 0) {
      vertex(x1, y1+tl);
      quadraticVertex(x1, y1, x1+tl, y1);
    } else {
      vertex(x1, y1);
    }
  endShape(CLOSE);
}

function draw() {

  //console.log(windowWidth);
  //console.log(windowHeight);
   background(16,16,22);
  
  // Adjust the whole layout:
  translate(boxSize / 4,0,0);
  
   //--------------------------------------------area for mouse control-------------------------------------------------
   stroke(250,110);
   strokeWeight(3);
   noFill();

   rect(controlLeft,controlTop,controlSize,controlSize,10);

//----------------------------------------------the GRIDS in control area--------------------------------------------------
   let w=20;
   let opaque=35-w;
   let weight=1;   
    stroke(50,50,50,opaque);strokeWeight(weight);
  
  if(volumeLevel <= 0.0)
    volumeLevel = 0.0;
  
  let lowest = int(gridTab[0]);
  let highest = int(gridTab[gridTab.length-1]);
  
 
  for(let ft = 0; ft < gridTab.length; ft += 1)
  {
    //console.log(ft);
    let gridStep = map(int(gridTab[ft]), lowest, highest, 0,controlSize);
    //console.log(gridStep);
    let ys = controlTop + controlSize- gridStep;
    let xs = controlLeft + gridStep;
    line(controlLeft,ys,controlLeft+controlSize,ys);
    line(xs, controlTop,xs,controlTop+controlSize);
  }
  //line(xhz, controlTop,xhz,controlTop+controlSize);
//---------------------------------------------line indicators in control area-------------------------------------------------

  let xhz = mouseX*1.5 - windowWidth/1.5;
  let yhz = mouseY*1.5 - windowHeight/1.5;

  if(xhz>controlLeft+controlSize)
  {
    xhz=controlLeft+controlSize;
  }
  else if(xhz<controlLeft)
  {
    xhz=controlLeft;
  }
   if(yhz>controlTop + controlSize)
  {
    yhz=controlTop+controlSize;
  }
  else if(yhz<controlTop)
  {
    yhz=controlTop;
  }
  
    // find closed value from freqTab ------------------------
  let goal;
  goal = xhz - controlLeft;
  goal = map(goal, 0,controlSize, lowest, highest);
  let xhz1 = gridTab.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  xhz1 = map(xhz1, lowest, highest, 0,controlSize);
  xhz = xhz1 + controlLeft;

  goal = controlSize - yhz + controlTop;
  goal = map(goal, 0,controlSize, lowest, highest);
  let yhz1 = gridTab.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  yhz1 = map(yhz1, lowest, highest, 0,controlSize);
  yhz = controlSize - yhz1 + controlTop;
  
  let ballRad = 20;
  //move toward camera not to be blocked by gird lines:
  translate(0,0,ballRad);
  
  //fill(250+volumeLevel/1.5,80-volumeLevel/2.5,135-volumeLevel);

 
  let R = 250*zoriRatio-volumeLevel/1.5;
  let G = 80*zoriRatio +volumeLevel/2.5;
  let B = 135*zoriRatio+volumeLevel;
   
  
  fill(R,G,B);
  noStroke();
  ellipse(xhz,yhz,ballRad,ballRad);
 
  //stroke(250+volumeLevel/1.5,80-volumeLevel/2.5,135-volumeLevel,180);
  stroke(R,G,B,180);
  strokeWeight(2);
  
  line(controlLeft,yhz,controlLeft+controlSize,yhz);
  line(xhz, controlTop,xhz,controlTop+controlSize);

  // the moving texts:
  let numberX,numberY;
  numberX=map(xhz,controlLeft,controlLeft+controlSize,0,gridTab.length - 1);
  numberY=map(yhz,controlTop,controlTop+controlSize,0,gridTab.length - 1);
  let gridNoX=int(numberX);
  let gridNoY=int(numberY); 
  gridNoY = gridTab.length - gridNoY - 1;
  
  let pitchNoX = int(map(gridNoX,0,gridTab.length-1,0,880));
  let pitchNoY = int(map(gridNoY,0,gridTab.length-1,0,880));
  
  goal = pitchNoX;
  let pitchX = pitchTab.reduce((prev, curr) => Math.abs(int(curr[0]) - goal) < Math.abs(int(prev[0]) - goal) ? curr : prev);
  goal = pitchNoY;
  let pitchY = pitchTab.reduce((prev, curr) => Math.abs(int(curr[0]) - goal) < Math.abs(int(prev[0]) - goal) ? curr : prev);
 
  //fill(225,200);
  textSize(windowHeight/40);  
  textFont(haha);
  fill(255,200);
  text(pitchNoX+" Hz",xhz,controlTop+controlSize + controlSize/20);
  text(pitchNoY+" Hz",controlLeft - controlSize / 10 - 10,yhz+10);    
  // pitch name (if has)
  text(pitchX[1],xhz,controlTop - controlSize/40);
  text(pitchY[1],controlLeft + controlSize + 10,yhz+10);    
//--------------------------------------------Drawing the manual------------------------------------------------------

 text("INSTRUCTIONS",controlLeft,controlTop - windowHeight/40*7);    
 text("1. Left-click in the window to gain focus.",controlLeft,controlTop - windowHeight/40*6);    
 text("2. Use up/down arrows keys to adjust the volume.",controlLeft,controlTop - windowHeight/40*5);    
 text("3. Move the mouse around to change pitches.",controlLeft,controlTop - windowHeight/40*4);    
 text("4. Use left/right arrows keys to turn vibrato on/off.",controlLeft,controlTop - windowHeight/40*3);   

//--------------------------------------------Drawing the volumeLevel bar------------------------------------------------------
  let rd = int(boxSize /5);
  stroke(36,36,42);
  fill('rgba(36,36,42, 0.25)');
  roundRect(boxLeft, boxSize+boxSize/10, boxSize*1.4, boxSize/6, rd,rd,rd,rd);
  
  // the moving bar:
  //sourceImage.fill(250+y/1.5,80-y/2.5,135-y,180);
  fill(R,G,B,180);
  //dont' make the bar too slim:
  let volBarW0 = boxSize*1.4/8;
  push();
  noStroke();
  volBarW = (boxSize*1.4-volBarW0)/10 * (volumeLevel/volStep);
  roundRect(boxSize/10*3, boxSize+boxSize/10, volBarW+volBarW0, boxSize/6, rd,rd,rd,rd);
  pop();
  
  textSize(windowHeight/40);  
  textFont(haha);
  fill(255,200);
  text("− volumeLevel +",boxSize/10*8,boxSize-boxSize/20+boxSize/10);

//-----------------------------------------------DISPLAYING "HOLD" WHEN SHIFT IS PRESSED----------------------------------
    if(shiftKeyPressed)
   {
     text("HOLD ",boxSize/10*3+boxSize*1.2, boxSize+boxSize/6 + boxSize/10+boxSize/10);
   }
   else if(vibrato==true)
   {
     text("VIBRATO: ON ",boxSize/10*3+boxSize*0.95, boxSize+boxSize/6 + boxSize/10+boxSize/10);
   }
   else
   {
     text("VIBRATO: OFF ",boxSize/10*3+boxSize*0.95, boxSize+boxSize/6 + boxSize/10+boxSize/10);
   }  

//--------------------------------------------- MAIN BOX--------------------------------------
   strokeWeight(2);  
  // set color:
   stroke(225-2.5*volumeLevel,70-volumeLevel/9,105+2*volumeLevel,150);
   noFill();
 
   push(); //push the whole box group
  
  
   //stroke(225*zoriRatio-2.5*volumeLevel,70*zoriRatio-volumeLevel/9,105*zoriRatio+2*volumeLevel,150*zoriRatio);    
   stroke(225*zoriRatio+2.5*volumeLevel,70*zoriRatio+volumeLevel/9,105*zoriRatio-2*volumeLevel,150*zoriRatio);    
   //myTranslate(-800,490,0,xr);
   //the box translate:
  //myTranslate(450,-300,0,xr);
  //stroke(225,70,105,150);
  
  translate(boxSize,0,0);
  rotateX(-PI/6);
  rotateY(-PI/6);  
  //rotateZ(PI/3*2);  
  box(boxSize, boxSize, boxSize);  
  //draw the volumeLevel level plane:
  fill('rgba(100,100,100, 0.25)');

  // draw texts for the box:
  push(); // push the fixed part of the box;
  textSize(windowHeight/40);  
  textFont(haha);
  fill(255,200);
  translate(0,0,boxSize/2);
  text("0Hz",-boxSize/2,boxSize/2+boxSize/16);
  text("880Hz",boxSize/2,boxSize/2+boxSize/16);
  
  translate(0,0,-boxSize);
  text("880Hz",-boxSize/2-boxSize/4,boxSize/2+boxSize/16);
  translate(0,-boxSize,0);
  text("volumeLevel+",-boxSize/2,boxSize/2-boxSize/16);
  pop();  
  
  // volumeLevel level plane:
  translate(0,boxSize/2-volumeLevel,0);
  box(boxSize,1,boxSize);  

  
  //------------------------------------- Using mouse and keyboard to control position of sphere:---------------------------------
  
  // map the xhz and yhz to volumeLevel level plan's coord.:
  let x=map(xhz,controlLeft,controlLeft+controlSize,0, boxSize);
  let y=map(yhz,controlTop,controlTop+controlSize,0, boxSize);
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
  
  fill('rgba(100,100,100, 0.25)');
  rotateX(-PI/2); // make the ball moving in the horizontal plane.
  translate(x-boxSize/2,y-boxSize/2,0);

  if (y<-boxSize)
  {
    y=-boxSize;
  }
  if (y>0)
  {
    fill(225,70,105);
  }
  
  sphere(boxSize / 25);
  pop();
  

//-----------------------------------------------Mapping pitch and volumeLevel of Sine Ocillator with x,y,z coordinates----------------------------------
  let volume=map(volumeLevel,0,boxSize,0,0.8);
 
  freq1 = int(pitchNoX);
  freq2 = int(pitchNoY);
  
  //freq1 = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  //volumme = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
 
  note1sin.freq(freq1,0.1);
  note1sin.amp(volume, 0.1);
  
  note2sin.freq(freq2,0.1);
  note2sin.amp(volume, 0.1);
 
  if(vibrato)
  {
    note1vibrate.freq(freq1+5,0.1);
    note1vibrate.amp(volume/3, 0.1);//volume/3); 
    note2vibrate.freq(freq2+5,0.1);
    note2vibrate.amp(volume/3, 0.1);// volume/3); 
  }
  else
  {
    note1vibrate.amp(0,0.1); 
    note2vibrate.amp(0,0.1); 
  }
  
  return;
  
/*  
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
*/  
}
