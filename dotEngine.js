var userPrompt = `
  Features:
    p : pauses/unpauses dot engine
    r : restarts engine with the same parameters
    c : restarts engine, allows users to change parameters
    d : hold d and hover over dot to hide it

  addDot(dot quantity, time between dots, dot field radius, dot radius)
`;

// initializing values
var randInt = (lower,upper) => {return Math.floor(Math.random()*(upper-lower)+lower)};
var userInput = window.prompt(userPrompt,`addDot(Infinity,50,'100*Math.random()',50)`);
var dotDelStatus = false;

runEngine();

function runEngine() {
  // creates dot container
  document.getElementById('dotCont').outerHTML = '<div id="dotCont"></div>';
  
  // initializing values
  var dotIt = 0;
  var pause = false;
  var coords = "calc(50vw - 50%), calc(50vh - 50%)";
  
  function createDot(fieldRadius,dotRadius) {
    // Plays audio when dot is created
    var bruhSound = new Audio('bruh-sound-effect.mp3');
    bruhSound.play(); // interact with page first

    // creates dot
    document.getElementById('dotCont').insertAdjacentHTML('beforeend',`<div class="dot"></div>`);
    var fixedRan = randInt(0,360);
    
    // applying style to dot (position,color,size)
    document.querySelectorAll('div.dot')[dotIt].style = `
      position:absolute;
      border-radius:50%;
      background:hsla(${randInt(0,255)},100%,50%,${Math.random()*(0.9)+0.1});
      width:${dotRadius*2}px;
      height:${dotRadius*2}px;
      transform:translate(${coords});
    `;

    // hides dot if d key is held and cursor hovered over targeted dot
    document.querySelectorAll('div.dot')[dotIt].setAttribute('onmouseover','if (dotDelStatus == true) {this.style = "display:none"}');
    
    // storing postion relative to page border
    var x = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().left;
    var y = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().top;
    
    // adding vector to dots position to get position of next dot
    coords = `${x+fieldRadius*Math.cos(fixedRan*Math.PI/180)}px, ${y+fieldRadius*Math.sin(fixedRan*Math.PI/180)}px`;
    
    dotIt++;
  }
  
  // responsible for d key behavior
  document.onkeydown = event => {if (event.key == "d") {dotDelStatus = true}}
  document.onkeyup = event => {if (event.key == "d") {dotDelStatus = false}}
  
  document.onkeypress = event => {
    // r : restarts engine with the same parameters
    if (event.key == "r") {
      pause = true;
      runEngine();
    }

    // c : restarts engine, allows users to change parameters
    if (event.key == "c") {
      userInput = window.prompt(userPrompt,userInput);
      pause = true;
      runEngine();
    }

    // p : pauses/unpauses engine 
    if (event.key == "p" && pause == false) {pause = true}
    else if (event.key != "p" && pause == true) {}
    else {pause = false}
  };

  // adds styled dot in intervals, takes evaluable parameters
  function addDot(dotMax,interval,fieldRadius,dotRadius) {
    var dotR = eval(dotRadius);
    var fieldR = eval(fieldRadius);
    var ntrvl = eval(interval);
    var dotM = eval(dotMax);

    if (pause == false) {createDot(fieldR,dotR)}
    if (dotIt < dotM) {setTimeout(addDot,ntrvl,dotMax,interval,fieldRadius,dotRadius)}
  }

  // runs users input as code
  eval(userInput);
}
