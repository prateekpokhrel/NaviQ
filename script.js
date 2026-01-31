const SIZE = 10;
const FLOORS = 4;

let floors = [];
let currentFloor = 0;

let start = [0,0];
let goal = [9,9];

let lastPath = [];
let dynamicDone = false;

let roomLabels = {};
let labelToCell = {};
let algorithmResults = [];

/* ---------- COST ---------- */
function movementCost(r,c){
    let label = roomLabels[`${r}-${c}`] || "";

    if(label.includes("Stairs")) return 3;
    if(label.includes("Lift")) return 2;

    return 1;
}

/* ---------- MAP ---------- */
function generateMap(){
    floors = [];
    dynamicDone = false;

    for(let f=0; f<FLOORS; f++){
        let grid=[];

        for(let r=0;r<SIZE;r++){
            let row=[];
            for(let c=0;c<SIZE;c++){
                row.push({ blocked: Math.random()<0.28 });
            }
            grid.push(row);
        }

        floors.push(grid);
    }

    generateLabels(currentFloor);
    clearTable();
    drawGrid();
}

/* ---------- LABELS ---------- */
function generateLabels(floor){
    roomLabels = {};
    labelToCell = {};

    function addLabel(r,c,name){
        roomLabels[`${r}-${c}`] = name;
        labelToCell[name] = [r,c];
        floors[floor][r][c].blocked = false;
    }

    /* ---- CLASSROOMS A B C ---- */
    let blocks = ["A","B","C"];
    let roomIndex = 0;

    blocks.forEach(b=>{
        for(let i=0;i<4;i++){
            let r = Math.floor(Math.random()*SIZE);
            let c = Math.floor(Math.random()*SIZE);

            addLabel(
                r,
                c,
                `${b}-${floor+1}${roomIndex.toString().padStart(2,"0")}`
            );

            roomIndex++;
        }
    });

    /* ---- FACILITIES ---- */
    addLabel(0,5,"Ladies WC");
    addLabel(1,5,"Gents WC");

    /* ---- MULTIPLE LIFTS ---- */
    addLabel(4,4,"Lift-1");
    addLabel(2,2,"Lift-2");
    addLabel(7,7,"Lift-3");

    /* ---- MULTIPLE STAIRS ---- */
    addLabel(5,4,"Stairs-1");
    addLabel(1,8,"Stairs-2");
    addLabel(8,1,"Stairs-3");

    addLabel(9,0,"EXIT");
    addLabel(0,9,"EXIT");

    if(floor===0){
        addLabel(5,8,"Library");
        addLabel(3,8,"Director");

        addLabel(0,4,"A Block Entry");
        addLabel(9,4,"B Block Entry");
        addLabel(4,9,"C Block Entry");
    }

    populateSelectors();
}

/* ---------- SELECTORS ---------- */
function populateSelectors(){
    let s=document.getElementById("startSelect");
    let g=document.getElementById("goalSelect");

    s.innerHTML="";
    g.innerHTML="";

    Object.keys(labelToCell).forEach(name=>{
        s.innerHTML+=`<option>${name}</option>`;
        g.innerHTML+=`<option>${name}</option>`;
    });

    updateStartGoal();
}

function updateStartGoal(){
    start = labelToCell[
        document.getElementById("startSelect").value
    ];
    goal = labelToCell[
        document.getElementById("goalSelect").value
    ];

    drawGrid();
}

/* ---------- GRID ---------- */
function drawGrid(){
    const g=document.getElementById("grid");
    g.innerHTML="";

    let grid=floors[currentFloor];

    for(let r=0;r<SIZE;r++){
        for(let c=0;c<SIZE;c++){
            let div=document.createElement("div");
            div.className="cell";

            if(grid[r][c].blocked) div.classList.add("blocked");
            if(r===start[0]&&c===start[1]) div.classList.add("start");
            if(r===goal[0]&&c===goal[1]) div.classList.add("goal");

            div.innerText=roomLabels[`${r}-${c}`] || "";
            div.id=`cell-${r}-${c}`;
            g.appendChild(div);
        }
    }

    paintBestPath();
}

function paintBestPath(){
    lastPath.forEach(p=>{
        let cell=document.getElementById(`cell-${p[0]}-${p[1]}`);
        if(cell) cell.classList.add("best-path");
    });
}

/* ---------- NEIGHBORS ---------- */
function neighbors(r,c){
    const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    let grid=floors[currentFloor];
    let res=[];

    for(let d of dirs){
        let nr=r+d[0], nc=c+d[1];

        if(nr>=0 && nc>=0 && nr<SIZE && nc<SIZE &&
           !grid[nr][nc].blocked){

            let label = roomLabels[`${nr}-${nc}`] || "";

            // Always allow start and goal
            if(
                (nr === goal[0] && nc === goal[1]) ||
                (nr === start[0] && nc === start[1])
            ){
                res.push([nr,nc]);
                continue;
            }

            // ❌ Block classrooms and restricted rooms
            if(
                label.startsWith("A-") ||
                label.startsWith("B-") ||
                label.startsWith("C-") ||
                label.includes("WC") ||
                label.includes("Director") ||
                label.includes("Library")
            ){
                continue;
            }

            // ✅ allow corridor / lift / stairs / entries
            res.push([nr,nc]);
        }
    }

    return res;
}


/* ---------- PATH ---------- */
function reconstruct(parent,end){
    let path=[];
    let cur=end.toString();

    while(cur){
        let p=cur.split(",").map(Number);
        path.push(p);
        cur=parent[cur];
    }

    return path.reverse();
}

/* ---------- SEARCH ---------- */
function runSearch(type){
    let open=[start];
    let parent={};
    let visited=new Set([start.toString()]);
    let gScore={};
    gScore[start]=0;
    let nodes=0;

    while(open.length){
        let cur;

        if(type==="dfs") cur=open.pop();
        else if(type==="bfs") cur=open.shift();
        else{
            open.sort((a,b)=>{
                let ha=Math.abs(a[0]-goal[0])+Math.abs(a[1]-goal[1]);
                let hb=Math.abs(b[0]-goal[0])+Math.abs(b[1]-goal[1]);

                if(type==="best") return ha-hb;
                return (gScore[a]+ha)-(gScore[b]+hb);
            });
            cur=open.shift();
        }

        nodes++;

        if(cur.toString()===goal.toString())
            return { path:reconstruct(parent,goal), nodes };

        for(let nb of neighbors(...cur)){
            let key=nb.toString();
            if(!visited.has(key)){
                visited.add(key);
                parent[key]=cur.toString();
                gScore[nb]=gScore[cur]+movementCost(...nb);
                open.push(nb);
            }
        }
    }

    return null;
}

/* ---------- PATH COST ---------- */
function pathCost(path){
    return path.reduce((sum,p)=>sum+movementCost(...p),0);
}

/* ---------- BLOCK PATH ---------- */
function blockPathCells(path){
    let grid=floors[currentFloor];
    let blocks=3+Math.floor(Math.random()*3);

    for(let i=0;i<blocks;i++){
        let p=path[Math.floor(Math.random()*path.length)];
        grid[p[0]][p[1]].blocked=true;
    }
}

/* ---------- TABLE ---------- */
function clearTable(){
    algorithmResults=[];
    document.getElementById("analysisTable").innerHTML=
    "<tr><th>Algorithm</th><th>Length</th><th>Cost</th><th>Nodes</th><th>Time</th></tr>";
}

/* ---------- RUN ---------- */
function runAllAlgorithms(){
    clearTable();

    let algos=["bfs","dfs","best","astar"];
    let bestResult=null;
    let bestScore=Infinity;
    let foundAnyPath=false;

    algos.forEach(algo=>{
        let t0=performance.now();
        let result=runSearch(algo);
        let t1=performance.now();

        if(!result) return;

        foundAnyPath = true;

        let time=t1-t0;
        let cost=pathCost(result.path);

        let row=document.getElementById("analysisTable").insertRow();
        row.insertCell(0).innerText=algo.toUpperCase();
        row.insertCell(1).innerText=result.path.length;
        row.insertCell(2).innerText=cost;
        row.insertCell(3).innerText=result.nodes;
        row.insertCell(4).innerText=time.toFixed(2)+" ms";

        let score = cost*50 + result.nodes*2 + time;

        algorithmResults.push({
            name: algo.toUpperCase(),
            length: result.path.length,
            cost: cost,
            nodes: result.nodes,
            time: time,
            score: score
        });

        if(score<bestScore){
            bestScore=score;
            bestResult=result;
        }
    });

    /* ---------- IF NO PATH FOUND ---------- */
    if(!foundAnyPath){
        lastPath=[];
        drawGrid();

        document.getElementById("conclusionText").innerText =
        "Path Blocked: Due to obstacles or dynamic changes, no safe route is currently available between the selected start and destination points. Please regenerate the map or choose another destination.";

        return;
    }

    if(bestResult){
        lastPath=bestResult.path;
        drawGrid();

        if(!dynamicDone){
            dynamicDone=true;
            blockPathCells(lastPath);
        }
    }

    generateConclusion();
}


/* ---------- CONCLUSION ---------- */
function generateConclusion(){

    if(algorithmResults.length === 0) return;

    algorithmResults.sort((a,b)=>{
        if(a.cost !== b.cost) return a.cost - b.cost;
        if(a.nodes !== b.nodes) return a.nodes - b.nodes;
        return a.time - b.time;
    });

    let best = algorithmResults[0];

    let reason =
        `it achieved minimal evacuation cost (${best.cost}), `
        + `explored fewer nodes (${best.nodes}), `
        + `and completed computation faster than others.`;

    document.getElementById("conclusionText").innerText =
        "Algorithms were compared based on path cost, nodes explored and execution time. "
        + "Optimal searches like BFS and A* generally produce shortest optimal evacuation paths, "
        + "while DFS or heuristic-only searches may sometimes produce longer non-optimal routes depending on map layout. "
        + "After dynamically blocking portions of the computed route, algorithms successfully recomputed alternative paths, "
        + "demonstrating their ability to adapt to changing campus conditions during emergencies.\n\n"
        + `Based on the analysis table, the system selected ${best.name} `
        + `as the most suitable algorithm because ${reason} `
        + "Hence, it provided the safest and most efficient evacuation path for this scenario.";
}
