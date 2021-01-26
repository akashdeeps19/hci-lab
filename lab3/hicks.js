let state = 0;
let circles = [];
let currCircles = [];
let total = 10;
let currCount = 1;
let totCircles = 10;
let canvas;
let prevx,prevy;
let instr;
let datar = [];
let datad = [];

function setup(){
    canvas = createCanvas(700, 600);
    canvas.parent('canvascontainer');
    prevx = width/2;
    prevy = height/2;
    currCircles = createCircles();
    instr = random()<0.5?'smallest':'biggest';
}

function draw(){
    background(240);
    if(state == 0){
        fill(0);
        textSize(40);
        textAlign(CENTER,CENTER);
        text('Hick Hyman\'s law',width/2,100);
        textSize(16)
        text('Click to start',width/2,height/2)
    }
    if(state == 1){
        if(total < currCount)
            state = 2;
        for(let currCircle of currCircles)
            currCircle.show();
        fill(0);
        // textSize(18);
        textAlign(CENTER,CENTER);
        textSize(24);
        text(`Select the ${instr} circle - ${currCount}/${total}`, width/2,30);
    }
    if(state == 2){
        noLoop();
        circles.pop();
        let maxd = 0;
        for(let circle of circles){
            maxd = max(maxd, circle.dist);
        }
        for(let circle of circles){
            datar.push({x : circle.r, y : circle.time});
            circle.dist = map(circle.dist, 0, maxd, 10, 70);
            datad.push({x : circle.dist, y : circle.time});
        }
        datar.sort((a,b) => (a.x - b.x));
        datad.sort((a,b) => (a.x - b.x) )
        var myChart = new Chart(canvas, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Radius vs Reaction time',
                    
                    data: datar,
                    lineTension: 0.2,
                    fill: false,
                    borderColor: 'blue',
                    backgroundColor: 'white',
                    pointBorderColor: 'blue',
                    pointBackgroundColor: 'blue',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                },
                {

                    label: 'Distance covered vs Reaction time',
                    
                    data: datad,
                    lineTension: 0.2,
                    fill: false,
                    borderColor: 'red',
                    backgroundColor: 'white',
                    pointBorderColor: 'red',
                    pointBackgroundColor: 'red',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                }
                ],

            },
            
            options: {
                legend : {labels: { fontSize: 24 } },
                scales: {
                    
                    xAxes: [{
                        type: 'linear',  
                        display: true, 
                        scaleLabel: {
                             display: true, 
                             labelString: 'Radius/Distance', 
                             fontSize : 24
                        },
                        ticks:{
                            fontSize : 20
                        }
                   }], 
                    yAxes: [{
                        scaleLabel: {
                            display: true, 
                            labelString: 'Reaction time(ms)', 
                            fontSize : 24
                       },
                        ticks: {
                            beginAtZero: true,
                            fontSize : 20
                        },
                        stacked: true
                    }]
                },
                responsive: false
            }
        });
        document.getElementById('defaultCanvas0').style.backgroundColor = 'rgba(240,240,240,1)'
        document.getElementById('defaultCanvas0').style.display = ''
    }
}

function mouseClicked(){
    if(state == 0)
        state = 1;
    if(state == 1){
        for(let currCircle of currCircles){
            if(currCircle.check(mouseX, mouseY)){
                prevx = currCircle.x;
                prevy = currCircle.y;
                circles.push(currCircle);
                currCircles = createCircles();
                instr = random()<0.5?'smallest':'biggest';
                currCount++;
            }
        }
    }
}

function createCircles(){
    let created = [];
    
    while(created.length < totCircles){
        let x = random(50, width-50);
        let y = random(80, height-50);
        let r = random(10,70);
        let add = true;
        for(let circle of created){
            if(circle.check(x,y,r)){
                add = false;
                break;
            }
        }
        if(add)
            created.push(new Circle(x,y,r));
    }
    return created;
}

class Circle {
    constructor(x, y,r) {
        this.x = x;
        this.y = y;
        this.r = r
        this.color = color(random(255), random(255), random(255));
        this.clicked = false;
        this.time = -1;
        this.dist = (this.x-prevx)*(this.x-prevx) + (this.y-prevy)*(this.y-prevy);
        this.show = function () {
            if(this.time == -1)
                this.time = millis();
            fill(this.color);
            ellipse(this.x, this.y, this.r*2)
        };

        this.check = function (x, y,d) {
            let r = this.r;
            if(d)r += d;
            let dist = (this.x-x)*(this.x-x) + (this.y-y)*(this.y-y)
            if (dist <= r*r){
                this.clicked = !this.clicked;
                this.time = millis() - this.time;
                return true;
            }
            return false;
        };
    }
}