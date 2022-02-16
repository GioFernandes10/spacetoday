var foguete, xf, yf, espaço;
var music;

var meteoro,xmeteoro, ymeteoro;
var meteoro2,xmeteoro2, ymeteoro2; 

var hitMeteoro,hitMeteoro2;
var pontos, vida, telaCreditos, velocidadeMeteoro;
var telainicio, creditos, controles, estado;
var gameOver, xgameover, ygameover;
var diamante, xdiamante, ydiamante, hitDiamante;

function preload(){
  music = loadSound('musicaespaco.ogg', playSound);
  foguete = loadImage("foguete.png");
  meteoro = loadImage("meteor01.png");
  espaço = loadImage("teladojogo.png");
  telainicio = loadImage("1.png");
  controles = loadImage("comandos.png");
  gameOver = loadImage("gameover.png");
  diamante = loadImage("diamondblue.png");
  telaCreditos = loadImage("creditos.png");
  
}

function setup() {
  createCanvas(400, 400);
  xf = 200;
  yf = 300;
  xmeteoro = 200;
  ymeteoro = 20;
  xgamerover = 200;
  ygameover = 420;
  xdiamante = 200
  ydiamante = 20
  pontos = 0;
  vida = 100;
  estado = 0;
  hitMeteoro = false;
  hitMeteoro2 = false;
  hitDiamante = false;
 
}

function draw() {
  if(estado == 0){
    opening();
  }
  if(estado == 1){
    fase1();
  }
  if(estado == 3){
    creditos();
  }
  
   if(estado == 4){
    comandos();
  }
  
}

function playSound(){
music.play();
}


function opening(){
  background(telainicio);
   
}

function comandos(){
  background(controles);
  text("Aperte 'SPACE' para continuar",65,380)
  fill("White");
  textSize(20);
}

function fase1(){
  background(espaço);
  image(espaço,-470,-80);
  image(diamante,xdiamante,ydiamante,30,30);
  image(meteoro, xmeteoro, ymeteoro,50,80);
  image(foguete,xf,yf,30,60);
  image(gameOver,xgameover,ygameover,300,300);
  moverfoguete();
  moverMeteoro();
  moverDiamante();
  colisaoMeteoro();
  colisaoDiamante();
  final();
  
  text("Pontos:"+pontos, 310,20)
  fill("White");
  textSize(16)
  
  text("Vida:"+vida, 7,20)
  fill("White");
  
}


function moverfoguete(){
  if(keyIsDown(UP_ARROW)){
    yf=yf-3;
  }
  if(keyIsDown(DOWN_ARROW)){
    yf=yf+3;
  }
  if(keyIsDown(LEFT_ARROW)){
    xf=xf-3;
    }
  if(keyIsDown(RIGHT_ARROW)){
    xf=xf+3;
  }
}


function colisaoDiamante(){
hitDiamante = collideRectRect(xf,yf,30,60,xdiamante,ydiamante,25,30);
  if(hitDiamante == true){
    pontos++;
    
  }
  
}

function colisaoMeteoro(){
  hitMeteoro = collideRectRect(xf,yf,30,60,xmeteoro,ymeteoro,50,80);
  if(hitMeteoro){
    vida--;
  }
  if(vida<0){
    vida=0;
  }
}


function moverMeteoro(){
  ymeteoro = ymeteoro + 2;
  if(ymeteoro>405){
    ymeteoro = 0
    xmeteoro = random(0,360);
 }
}

function moverDiamante(){
  ydiamante = ydiamante + 2;
  if(ydiamante>405){
    ydiamante = 0
    xdiamante = random(0,360)
  }
}

function creditos(){
  background(telaCreditos)
}

function final(){
  if(vida<=0){
    ygameover--;
    xmeteoro = -50;
    xdiamante = -50;
    yf = yf +4;
  }
  if(ygameover<-150){
    ygameover = 420;
  }
  if(pontos>100){
    estado = 3;
  }
}

function keyPressed(){
  if(keyCode === ENTER){
    estado=4;
  }
  if((keyCode === ESCAPE && vida<=0) ||(keyCode === ESCAPE && pontos>=100)){
     estado = 0;
     pontos = 0;
     vida = 100;
     xf = 200;
     yf = 300;
     xgameover = 50;
     ygameover = 420;
  }
   if(keyCode ===32 && estado==4){
    estado = 1;
  }
}

