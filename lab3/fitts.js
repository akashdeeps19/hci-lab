let state = 0;
let circles = [];
let currCircle;
let total = 10;
let currCount = 1;
let canvas;
let prevx,prevy;
let datar = [];
let datad = [];
function setup(){
    canvas = createCanvas(700, 600);
    canvas.parent('canvascontainer');
    currCircle = new Circle(random(50, width-50), random(50,height-50), random(10,70));
    circles.push(currCircle);
    prevx = width/2;
    prevy = height/2;
}

function draw(){
    background(240);
    if(state == 0){
        fill(0);
        textSize(40);
        textAlign(CENTER,CENTER);
        text('Fitt\'s law',width/2,100);
        textSize(16)
        text('Click to start',width/2,height/2)
    }
    if(state == 1){
        if(total < currCount)
            state = 2;
        currCircle.show();
        fill(0);
        textSize(18);
        textAlign(CENTER,CENTER);
        text(`${currCount}/${total}`,width/2,500);
    }
    if(state == 2){
        noLoop();
        circles.pop()
        for(let circle of circles){
            datar.push({x : circle.r, y : circle.time});
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
                // {

                //     label: 'Distance covered vs Reaction time',
                    
                //     data: datad,
                //     lineTension: 0.2,
                //     fill: false,
                //     borderColor: 'red',
                //     backgroundColor: 'white',
                //     pointBorderColor: 'red',
                //     pointBackgroundColor: 'red',
                //     pointRadius: 5,
                //     pointHoverRadius: 10,
                //     pointHitRadius: 30,
                // }
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
                             labelString: 'Radius', 
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
        if(currCircle.check(mouseX, mouseY)){
            prevx = currCircle.x;
            prevy = currCircle.y;
            currCircle = new Circle(random(50, width-50), random(50,height-50), random(10,60));
            circles.push(currCircle);
            currCount++;
        }
    }
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
        this.dist = map(this.dist, 0, width*width+height*height, 10,500);
        // this.dist = map
        this.show = function () {
            if(this.time == -1)
                this.time = millis();
            fill(this.color);
            ellipse(this.x, this.y, this.r*2)
        };

        this.check = function (x, y) {
            let dist = (this.x-x)*(this.x-x) + (this.y-y)*(this.y-y)
            if (dist <= this.r*this.r){
                this.clicked = !this.clicked;
                this.time = millis() - this.time;
                return true;
            }
            return false;
        };
    }
}