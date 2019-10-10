const ctx = canvas.getContext("2d");

fitToContainer(canvas);

function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// click function to reseed random tree
canvas.addEventListener("click",()=> {
      treeSeed = Math.random() * 10000 | 0;
      treeGrow = 0.1; // regrow tree
});


/* Seeded random functions
   randSeed(int)  int is a seed value
   randInt()  random integer 0 or 1
   randInt(max) random integer from  0 <= random < max
   randInt(min, max) random integer from min <= random < max
   randFloat()  like Math.random
   randFloat(max) random float 0 <= random < max
   randFloat(min, max) random float min <= random < max
   */
const seededRandom = (() => {
    var seed = 1;
    return { max : 3244569809797284, reseed (s) { seed = s }, random ()  { return seed = ((871968857123411 * seed) + 758569012740852) % this.max }}
})();
const randSeed = (seed) => seededRandom.reseed(seed|0);
const randInt = (min = 2, max = min + (min = 0)) => (seededRandom.random() % (max - min)) + min;
const randFloat  = (min = 1, max = min + (min = 0)) => (seededRandom.random() / seededRandom.max) * (max - min) + min;
const randBernoulli = (p = 0.5) => seededRandom.random() < (seededRandom.max * p);


/* TREE CONSTANTS all angles in radians and lengths/widths are in pixels */
const angMin = 0.01;  // branching angle min and max
const angMax= 0.6;
const angBias = 0; // Direction of the tree tilt. o: 0
const lengMin = 0.8;  // length reduction per branch min and max
const lengMax = 0.9;
const widthMin = 0.6; // width reduction per branch min max
const widthMax = 0.8;
const trunkMin = 6;  // trunk base width ,min and max
const trunkMax = 10;
const maxBranches = 150; // Max number of branches. o: 200


const windX = -1;   // wind direction vector
const windY = 0;
const bendability = 8; // greater than 1. The bigger this number the more the thin branches will bend first

// the canvas height you are scaling up or down to a different sized canvas
const windStrength = 0.01 * bendability * ((200 ** 2) / (canvas.height ** 2));  // wind strength


// The wind is used to simulate branch spring back the following
// two number control that. Note that the sum on the two following should
// be below 1 or the function will oscillate out of control
const windBendRectSpeed = 0.01;  // how fast the tree reacts to the wing
const windBranchSpring = 0.98;   // the amount and speed of the branch spring back

const gustProbability = 1/100; // how often there is a gust of wind

// Values trying to have a gusty wind effect
var windCycle = 0;
var windCycleGust = 0;
var windCycleGustTime = 0;
var currentWind = 0;
var windFollow = 0;
var windActual = 0;


// The seed value for the tree
var treeSeed = Math.random() * 10000 | 0;

// Vars to build tree with
var branchCount = 0;
var maxTrunk = 0;
var treeGrow = 0.01; // this value should not be zero

// Tree location.
let xRoot = 0.5; // o: 0.5

// Starts a new tree
function drawTree(seed) {
    branchCount = 0;
    treeGrow += 0.02;
    randSeed(seed);
    maxTrunk = randInt(trunkMin, trunkMax);
    drawBranch(canvas.width * xRoot, canvas.height, -Math.PI / 2, canvas.height / 5, maxTrunk);
}

// Recusive tree
function drawBranch(x, y, dir, leng, width) {
    branchCount ++;
    const treeGrowVal = (treeGrow > 1 ? 1 : treeGrow < 0.1 ? 0.1 : treeGrow) ** 2 ;

    // get wind bending force and turn branch direction
    const xx = Math.cos(dir) * leng * treeGrowVal;
    const yy = Math.sin(dir) * leng * treeGrowVal;
    const windSideWayForce = windX * yy - windY * xx;

    // change direction by addition based on the wind and scale to 
    // (windStrength * windActual) the wind force
    // ((1 - width / maxTrunk) ** bendability)  the amount of bending due to branch thickness
    // windSideWayForce the force depending on the branch angle to the wind
    dir += (windStrength * windActual) * ((1 - width / maxTrunk) ** bendability) * windSideWayForce;

    // draw the branch
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.lineTo(x, y);
    x += Math.cos(dir) * leng * treeGrowVal;
    y += Math.sin(dir) * leng * treeGrowVal;
    ctx.lineTo(x, y);
    ctx.stroke();

    // if not to thing, not to short and not to many
    if (branchCount < maxBranches && leng > 5 && width > 1) {
        // to stop recusive bias (due to branch count limit)
        // random select direction of first recusive bend
        const rDir = randInt() ? -1 : 1;

        treeGrow -= 0.2;
        drawBranch(
            x,y,
            dir + randFloat(angMin, angMax) * rDir + angBias, 
            leng * randFloat(lengMin, lengMax), 
            width * randFloat(widthMin, widthMax)
        );
        // bend next branch the other way
        drawBranch(
            x,y,
            dir + randFloat(angMin, angMax) * -rDir + angBias, 
            leng * randFloat(lengMin, lengMax), 
            width * randFloat(widthMin, widthMax)
        );
        treeGrow += 0.2;
    }
}

// Dont ask this is a quick try at wind gusts 
// Wind needs a spacial component this sim does not include that.

function updateWind() {
    if (Math.random() < gustProbability) {
        windCycleGustTime = (Math.random() * 10 + 1) | 0;
    }
    if (windCycleGustTime > 0) {
        windCycleGustTime --;
        windCycleGust += windCycleGustTime/20
    } else {
        windCycleGust *= 0.99;
    }
    windCycle += windCycleGust;
    currentWind = (Math.sin(windCycle/40) * 0.6 + 0.4) ** 2;
    currentWind = currentWind < 0 ? 0 : currentWind;
    windFollow += (currentWind - windActual) * windBendRectSpeed;
    windFollow *= windBranchSpring ;
    windActual += windFollow;
}
requestAnimationFrame(update);
function update() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateWind();
    drawTree(treeSeed);
    requestAnimationFrame(update);
}
