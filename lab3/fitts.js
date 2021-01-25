let state = 0;
let circles = [];
let currCircle;
let total = 10;
let currCount = 1;
function setup(){
    let canvas = createCanvas(600, 600);
    canvas.parent('canvascontainer');
    currCircle = new Circle(random(width), random(height), random(10,60));
    circles.push(currCircle);
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
        fill(0);
        textSize(18);
        textAlign(CENTER,CENTER);
        text(`Graph`,width/2,500);
    }
}

function mouseClicked(){
    if(state == 0)
        state = 1;
    if(state == 1){
        if(currCircle.check(mouseX, mouseY)){
            currCircle = new Circle(random(width), random(height), random(10,60));
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