let animals = ['Dog','Puppy','Turtle','Rabbit','Parrot','Cat','Kitten','Goldfish',
            'Mouse','Tropical fish','Hamster','Koala Bear','Guinea Pig','Monkey'];
let time = 8;
let timer = time;
let curr = 0;
let state = 0;
let buttons = [];
let selected = [];
let showed = [];
let doneButton, startButton, restartButton;

function setup(){
    let canvas = createCanvas(600, 600);
    canvas.parent('canvascontainer');
    let col = color(200,150,200);
    for(let i = 0;i < animals.length;i++){
        if(i%2)
            buttons.push(new Button(animals[i],3*width/4, 100+30*(i-1),100,40,col));
        else 
            buttons.push(new Button(animals[i],width/4, 100+30*(i),100,40,col));
        doneButton = new Button('DONE', width/2,height-50,100,50,color(240,250,255));
        startButton = new Button('START', width/2,height-50,100,50,color(240,250,255));
        restartButton = new Button('RESTART', width/2,height-150,100,50,color(240,250,255));
    }
    animals = shuffle(animals)
    showed = animals.slice(0,8);
}

function draw(){
    if(state == 0){
        background(200,255,200);
        fill(0);
        textSize(40);
        textAlign(CENTER,CENTER);
        text('SERIAL POSITION EFFECT',width/2,height/2);
        startButton.show()
    }
    if(state == 1){
        background(200,255,200);
        drawAnimals();
        if(timer < 0){
            state = 2;
            timer = time;
        }
        if(millis() - curr >= 1000){
            timer--;
            curr = millis();
        }
    }
    
    if(state == 2){
        background(200,255,200);
        fill(0);
        textSize(18);
        textAlign(CENTER,CENTER);
        text("Select the animals you saw earlier",width/2,50);
        for(let i = 0;i < animals.length;i++)
            buttons[i].show()
        doneButton.show();
    }
    if(state == 3){
        background(200,255,200);
        let tot = 0;
        for(let animal of showed){
            if(selected.includes(animal))
                tot++;
        }
        fill(0);
        textSize(40);
        textAlign(CENTER,CENTER);
        text(`Recall % = ${tot/showed.length*100}`,width/2,height/2);
        restartButton.show()
    }
}

function mouseClicked(){
    if(state == 0){
        if(startButton.check(mouseX,mouseY)){
            state = 1;
            startButton.clicked = false;
            selected = [];
            animals = shuffle(animals)
            showed = animals.slice(0,8);
        }
    }
    if(state == 2){
        
        for(let button of buttons){
            if(button.check(mouseX, mouseY)){
                if(button.clicked && selected.length < 8){
                    selected.push(button.txt);
                }
                else if(selected.length == 8){
                    button.clicked = false;
                }
                if(!button.clicked && selected.includes(button.txt)){
                    selected.splice(selected.indexOf(button.txt),1);
                }
            }

        }
        if(doneButton.check(mouseX,mouseY)){
            for(let button of buttons){
                // if(button.clicked)
                //     selected.push(button.txt)
                button.clicked = false;
            }
            state = 3;
            doneButton.clicked = false;
        }
    }
    if(state == 3){
        if(restartButton.check(mouseX,mouseY)){
            state = 0;
            restartButton.clicked = false;
        }
    }
}

function drawAnimals(){
    
    for(let i = 0;i < showed.length;i++){
        fill(200,150,200);
        rectMode(CORNER)
        rect(width/2-50,100 + 50*i,100,40);
        fill(0);
        textSize(18);
        textAlign(CENTER,CENTER);
        text(showed[i],width/2,125+50*i);
        
    }
    text("Remeber as many animals as you can",width/2,50);
    textSize(32);
    text(timer, width/2, height-50);
}

class Button {
    constructor(txt, x, y, w, h, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.color = col;
        this.orgCol = col;
        this.clicked = false;

        this.show = function () {
            if(this.clicked){
                strokeWeight(4);
                this.color = color(100,180,250)
            }
            else{
                strokeWeight(1);
                this.color = this.orgCol;
            }
            fill(this.color);
            rectMode(CENTER);
            rect(this.x, this.y, this.w, this.h);
            fill(0);
            textSize(18);
            textAlign(CENTER, CENTER);
            text(this.txt, this.x, this.y);
        };

        this.check = function (x, y) {
            if (x >= this.x - this.w / 2 && x <= this.x + this.w / 2 && y >= this.y - this.h / 2 && y <= this.y + this.h / 2){
                this.clicked = !this.clicked;
                return true;
            }
            return false;
        };
    }
}