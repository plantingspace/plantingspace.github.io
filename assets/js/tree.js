const ctx = canvas.getContext("2d");

fitToContainer(canvas);

// Make sure the size of canvas is the size of the parent div.
function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// Create new seed an grow on click.
canvas.addEventListener("click",()=> {
      treeSeed = Math.random() * 10000 | 0;
      treeGrow = 0.1; // Reset to regrow.
});


// Seeded random functions.
const seededRandom = (() => {
    let seed = 1;
    return {
        max : 3244569809797284,
        reseed (s) { seed = s },
        random ()  { return seed = ((871968857123411 * seed) + 758569012740852) % this.max }
    }
})();
// Create random seed.
const randSeed = (seed) => seededRandom.reseed(seed|0);
// randInt()  random integer 0 or 1
// randInt(max) random integer from  0 <= random < max
// randInt(min, max) random integer from min <= random < max
const randInt = (min = 2, max = min + (min = 0)) => (seededRandom.random() % (max - min)) + min;
// randFloat()  like Math.random
// randFloat(max) random float 0 <= random < max
// randFloat(min, max) random float min <= random < max
const randFloat  = (min = 1, max = min + (min = 0)) => (seededRandom.random() / seededRandom.max) * (max - min) + min;
// Biased coin flip.
const randBernoulli = (p = 0.5) => seededRandom.random() < (seededRandom.max * p);

const treeSelector = (treeType) => {
    console.log("Tree type: ", treeType);
    let treeParams;
    if (treeType === "Mangrove") {
        treeParams = mangrove;
    } else {
        treeParams = basic;
    }
    // Tree Paramaters: all angles in radians and lengths/widths are in pixels.
    ({
        drawRoots, // Should roots be drawn (upside down tree).
        angMin, // Branching angle min and max.
        angMax,
        angBias, // Direction of the tree tilt.
        lengMin, // Length reduction per branch min and max.
        lengMax,
        widthMin, // Width reduction per branch min max.
        widthMax,
        trunkMin, // Trunk base width ,min and max.
        trunkMax,
        maxBranches, // Max number of branches.
        xRoot, // Tree location.
        windX, // Wind direction vector.
        windY,
        bendability,
        // The wind is used to simulate branch spring back the following
        // two number control that. Note that the sum on the two following should
        // be below 1 or the function will oscillate out of control.
        windBendRectSpeed, // How fast the tree reacts to the wind.
        windBranchSpring, // The amount and speed of the branch spring back.
        gustProbability // How often there is a gust of wind.
    } = treeParams);
};

const basic = {
    drawRoots: false,
    angMin: 0.01,
    angMax: 0.6,
    angBias: 0,
    lengMin: 0.8,
    lengMax: 0.9,
    widthMin: 0.6,
    widthMax: 0.8,
    trunkMin: 6,
    trunkMax: 10,
    maxBranches: 150,
    xRoot: 0.5,
    windX: -1,
    windY: 0,
    bendability: 8,
    windBendRectSpeed: 0.01,
    windBranchSpring: 0.98,
    gustProbability: 0.01
};

const mangrove = {
    drawRoots: true,
    angMin: 0.01,
    angMax: 1.2,
    angBias: 0,
    lengMin: 0.7,
    lengMax: 0.8,
    widthMin: 0.6,
    widthMax: 0.8,
    trunkMin: 6,
    trunkMax: 10,
    maxBranches: 150,
    xRoot: 0.5,
    windX: -2,
    windY: 0,
    bendability: 1,
    windBendRectSpeed: 0.01,
    windBranchSpring: 0.8,
    gustProbability: 0.01
};

let treeType = document.body.getElementsByTagName('script')[0].classList[0];
treeSelector(treeType);

// the canvas height you are scaling up or down to a different sized canvas
const windStrength = 0.01 * bendability * ((200 ** 2) / (canvas.height ** 2));  // wind strength

// Values trying to have a gusty wind effect
let windCycle = 0;
let windCycleGust = 0;
let windCycleGustTime = 0;
let currentWind = 0;
let windFollow = 0;
let windActual = 0;


// The seed value for the tree
let treeSeed = Math.random() * 10000 | 0;

// Vars to build tree with
let branchCount = 0;
let maxTrunk = 0;
let treeGrow = 0.01; // this value should not be zero

// Starts a new tree.
function drawTree(seed) {
    branchCount = 0;
    treeGrow += 0.02;
    randSeed(seed);
    maxTrunk = randInt(trunkMin, trunkMax);
    if (drawRoots) {
        // Double the limit to cover for the roots.
        maxBranches += maxBranches;
        drawBranch(canvas.width * xRoot, canvas.height * 0.7, -Math.PI / 2, canvas.height / 5, maxTrunk);
        drawBranch(canvas.width * xRoot, canvas.height * 0.6, Math.PI / 2, canvas.height / 6, maxTrunk, true); // Upside down.
    } else {
        drawBranch(canvas.width * xRoot, canvas.height, -Math.PI / 2, canvas.height / 5, maxTrunk);
    }
}

// Recusive tree.
function drawBranch(x, y, dir, leng, width, isRoot = false) {
    branchCount ++;
    const treeGrowVal = (treeGrow > 1 ? 1 : treeGrow < 0.1 ? 0.1 : treeGrow) ** 2 ;
    
    // Get wind bending force and turn branch direction.
    const xx = Math.cos(dir) * leng * treeGrowVal;
    const yy = Math.sin(dir) * leng * treeGrowVal;
    const windSideWayForce = windX * yy - windY * xx;
    
    if (isRoot) {
        // Make roots more vertical (gravity).
        dir = Math.tanh(dir - Math.PI / 2) + Math.PI / 2
    } else {
        // change direction by addition based on the wind and scale to 
        // (windStrength * windActual) the wind force
        // ((1 - width / maxTrunk) ** bendability)  the amount of bending due to branch thickness
        // windSideWayForce the force depending on the branch angle to the wind
        dir += (windStrength * windActual) * ((1 - width / maxTrunk) ** bendability) * windSideWayForce;
    }
    
    // draw the branch
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.lineTo(x, y);
    x += Math.cos(dir) * leng * treeGrowVal;
    y += Math.sin(dir) * leng * treeGrowVal;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Grow if not enough branches and insufficient size.
    if (branchCount < maxBranches && leng > 5 && width > 1) {
        // Do not grow from the tip.
        treeGrow -= 0.2;
        drawBranch(
            x,y,
            dir + randFloat(angMin, angMax) + angBias, 
            leng * randFloat(lengMin, lengMax), 
            width * randFloat(widthMin, widthMax),
            isRoot
        );
        // Bend next branch the other way.
        drawBranch(
            x,y,
            dir - randFloat(angMin, angMax) + angBias, 
            leng * randFloat(lengMin, lengMax), 
            width * randFloat(widthMin, widthMax),
            isRoot
        );
        treeGrow += 0.2;
    }
}

// Basic wind gusts.
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
