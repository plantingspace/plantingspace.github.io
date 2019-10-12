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
        max : 2576436549074795,
        reseed (s) { seed = s },
        random ()  {
            return seed = ((8765432352450986 * seed) + 8507698654323524) % this.max
        }
    }
})();
// Create random seed.
const randSeed = (seed) => seededRandom.reseed(seed|0);
// randInt()  random integer 0 or 1
// randInt(max) random integer from  0 <= random < max
// randInt(min, max) random integer from min <= random < max
const randInt =
    (min = 2, max = min + (min = 0)) => (seededRandom.random() % (max - min)) + min;
// randFloat()  like Math.random
// randFloat(max) random float 0 <= random < max
// randFloat(min, max) random float min <= random < max
const randFloat  =
    (min = 1, max = min + (min = 0)) =>
        (seededRandom.random() / seededRandom.max) * (max - min) + min;

const treeSelector = (treeType) => {
    let treeParams;
    if (treeType === "Mangrove") {
        treeParams = mangrove;
    } else if (treeType === "Broadleaf") {
        treeParams = broadleaf;
    } else if (treeType === "Taiga") {
        treeParams = taiga;
    } else {
        treeParams = basic;
    }
    // Tree Paramaters: all angles in radians and lengths/widths are in pixels.
    ({
        drawRoots, // Should roots be drawn (upside down tree).
        drawLeaves, // Should leaves be drawn.
        dirStickiness, // Probability of growth continuing in original direction.
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
        originX, // x tree location.
        originY, // y tree location.
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
    drawLeaves: false,
    dirStickiness: false,
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
    originX: 0.5,
    originY: 0,
    windX: -1,
    windY: 0,
    bendability: 8,
    windBendRectSpeed: 0.01,
    windBranchSpring: 0.98,
    gustProbability: 0.01
};

const broadleaf = {
    drawRoots: false,
    drawLeaves: true,
    dirStickiness: false,
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
    originX: 0.5,
    originY: 0,
    windX: -1.1,
    windY: 0,
    bendability: 2,
    windBendRectSpeed: 0.005,
    windBranchSpring: 0.8,
    gustProbability: 0.01
};

const taiga = {
    drawRoots: false,
    drawLeaves: false,
    dirStickiness: true,
    angMin: 1.3,
    angMax: 1.4,
    angBias: 0.3,
    lengMin: 0.4,
    lengMax: 0.5,
    widthMin: 0.6,
    widthMax: 0.8,
    trunkMin: 6,
    trunkMax: 10,
    maxBranches: 200,
    originX: 0.3,
    originY: 0,
    windX: -0.5,
    windY: 0,
    bendability: 1,
    windBendRectSpeed: 0.01,
    windBranchSpring: 0.8,
    gustProbability: 0.01
};

const mangrove = {
    drawRoots: true,
    drawLeaves: false,
    dirStickiness: false,
    angMin: 0.3,
    angMax: 1.2,
    angBias: 0,
    lengMin: 0.7,
    lengMax: 0.8,
    widthMin: 0.6,
    widthMax: 0.8,
    trunkMin: 6,
    trunkMax: 10,
    maxBranches: 150,
    originX: 0.5,
    originY: 0.3,
    windX: -2,
    windY: 0,
    bendability: 1,
    windBendRectSpeed: 0.01,
    windBranchSpring: 0.8,
    gustProbability: 0.01
};

let treeType = document.body.getElementsByTagName('script')[0].classList[0];
treeSelector(treeType);

/// x location of the seed on canvas.
const seedX = canvas.width * originX;
// y location of the seed on canvas.
const seedY = canvas.height * (1 -originY);
// The canvas height you are scaling up or down to a different sized canvas.
const windStrength = 0.01 * bendability * ((200 ** 2) / (canvas.height ** 2));

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
        drawBranch(seedX, seedY, -Math.PI / 2, canvas.height / 5, maxTrunk);
        // Upside down.
        drawBranch(seedX, seedY - canvas.height * 0.1, Math.PI / 2, canvas.height / 6, maxTrunk, true);
    } else {
        drawBranch(seedX, seedY, -Math.PI / 2, canvas.height / 5, maxTrunk);
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

    // Draw the branch.
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.lineTo(x, y);
    x += Math.cos(dir) * leng * treeGrowVal;
    y += Math.sin(dir) * leng * treeGrowVal;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Grow if not enough branches and insufficient size.
    if (branchCount < maxBranches && leng > 5 && width > 1) {
        // Do not grow immediately.
        treeGrow -= 0.2;
        if (dirStickiness) {
            // Keep one branch going straight.
            drawBranch(
                x,y,
                dir + angBias, 
                leng * randFloat(lengMin, lengMax) ** 0.2,
                width * randFloat(widthMin, widthMax),
                isRoot
            );
        }
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
    } else if (drawLeaves) {
        ctx.beginPath();
        ctx.arc(x, y, canvas.height / 30, 0, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
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
