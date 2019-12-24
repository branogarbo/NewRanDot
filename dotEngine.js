var dotIt = 0;
var randInt = (lower,upper) => {return Math.floor(Math.random()*(upper-lower)+lower)};
var coords = "calc(50vw - 50%), calc(50vh - 50%)";

function createDot(fieldRadius,dotRadius) {
  document.body.insertAdjacentHTML('beforeend',`<div class="dot"></div>`);
  var fixedRan = randInt(0,360);
  
  document.querySelectorAll('div.dot')[dotIt].style = `
    position:absolute;
    border-radius:50%;
    background:hsl(${randInt(0,255)},100%,50%);
    width:${dotRadius*2}px;
    height:${dotRadius*2}px;
    transform:translate(${coords});
  `;
  
  var x = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().left;
  var y = document.querySelectorAll('div.dot')[dotIt].getBoundingClientRect().top;

  coords = `${x+fieldRadius*Math.cos(fixedRan*Math.PI/180)}px, ${y+fieldRadius*Math.sin(fixedRan*Math.PI/180)}px`;

  dotIt++;
}

function addDots(interval,fieldRadius,dotRadius) {
  setInterval(createDot,interval,fieldRadius,dotRadius);
}

addDots(1,10,10);