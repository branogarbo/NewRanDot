var userPrompt = `
  Features:
    p : pauses/unpauses dot engine
    r : restarts engine with the same parameters
    c : restarts engine, allows users to change parameters
    double click dot to remove it

  addDot(dot quantity, time between dots, dot field radius, dot radius)
`;

var randInt = (lower,upper) => {return Math.floor(Math.random()*(upper-lower)+lower)};
var userInput = window.prompt(userPrompt,'addDot(Infinity,50,100,50)');

runEngine();

function runEngine() {
  // initializing values
  document.getElementById('dotCont').outerHTML = '<div id="dotCont"></div>';

  var dotIt = 0;
  var coords = "calc(50vw - 50%), calc(50vh - 50%)";
  
  function createDot(fieldRadius,dotRadius) {
    document.getElementById('dotCont').insertAdjacentHTML('beforeend',`<div class="dot"></div>`); // creating dot
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

    var dotDelStatus = false;
    document.querySelectorAll('div.dot')[dotIt].setAttribute('onmouseover','if (dotDelStatus == true) {this.outerHTML = ""}');
    
    // storing postion relative to page border
    var x = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().left;
    var y = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().top;
    
    // adding vector to dots position to get position of next dot
    coords = `${x+Math.random()*fieldRadius*Math.cos(fixedRan*Math.PI/180)}px, ${y+Math.random()*fieldRadius*Math.sin(fixedRan*Math.PI/180)}px`;
    
    dotIt++;
  }
  
  var pause = false;
  
  // does stuff when key is pressed
  document.onkeypress = event => {
    if (event.key == "d") {dotDelStatus = true}
    else {dotDelStatus = false}

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

    // you know what ill do something else for now
    //// q : removes last dot (not complete)
    //if (event.key == "q" && dotIt-1 != 0) {
    //  console.log(document.querySelectorAll('div.dot').length);
    //  console.log(dotIt);

    //  var lastIndex = dotIt-1;
    //  document.querySelectorAll('div.dot')[lastIndex].outerHTML = "";
    //  
    //  x = document.querySelectorAll('div.dot')[lastIndex-1].getBoundingClientRect().left;
    //  y = document.querySelectorAll('div.dot')[lastIndex-1].getBoundingClientRect().top;

    //  dotIt--;
    //}

    // question mark notation doesn't work for some reason
  
    //event.key == "p" && pause == false ? pause = true :
    //event.key =! "p" && pause == true ? ()=>{} :
    //pause = false;
  };

  // adds styled dot in intervals, takes evaluatable parameters
  function addDot(dotMax,interval,fieldRadius,dotRadius) {
    var dotR = eval(dotRadius);
    var fieldR = eval(fieldRadius);
    var ntrvl = eval(interval);
    var dotM = eval(dotMax);

    pause == false ? createDot(fieldR,dotR) : ()=>{};
    dotIt < dotM ? setTimeout(addDot,ntrvl,dotMax,interval,fieldRadius,dotRadius) : ()=>{};
  }  

  // runs users input as code
  eval(userInput);
}