var dotIt = 0;
var randInt = (lower,upper) => {return Math.floor(Math.random()*(upper-lower)+lower)};
var coords = "calc(50vw - 50%), calc(50vh - 50%)";

function createDot(fieldRadius,dotRadius) {
  document.body.insertAdjacentHTML('beforeend',`<div class="dot"></div>`);
  var fixedRan = randInt(0,360);
  
  document.querySelectorAll('div.dot')[dotIt].style = `
    position:absolute;
    border-radius:50%;
    background:hsla(${randInt(0,255)},100%,50%,${Math.random()});
    width:${dotRadius*2}px;
    height:${dotRadius*2}px;
    transform:translate(${coords});
  `;
  
  var x = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().left;
  var y = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().top;

  coords = `${x+Math.random()*fieldRadius*Math.cos(fixedRan*Math.PI/180)}px, ${y+Math.random()*fieldRadius*Math.sin(fixedRan*Math.PI/180)}px`;

  dotIt++;
}

function addDots(dotMax,interval,fieldRadius,dotRadius) {
  var dotR = eval(dotRadius);
  var fieldR = eval(fieldRadius);
  var ntrvl = eval(interval);
  var dotM = eval(dotMax);

  createDot(fieldR,dotR);
  dotIt < dotM ? setTimeout(addDots,ntrvl,dotMax,interval,fieldRadius,dotRadius) : ()=>{};
}

addDots(Infinity,1,80,40);