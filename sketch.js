var canva;
var jogador;
var GCaixa, GEspinho, GPlataforma, GBinvisivel;
var binvisivel;
var plataforma1;
var edges;
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var imgCaixa;
var imgEspinho;
var imgBackground;
function preload(){
    imgCaixa = loadImage("JogoDoMarkin-main/freescifiplatform/png/Tiles/Tile (5).png")
    imgEspinho = loadImage("JogoDoMarkin-main/freescifiplatform/png/Tiles/Spike.png")
    imgBackground = loadImage("JogoDoMarkin-main/JogoDoMarkin-bg.jpg")
    imgPlataforma1 = loadImage("JogoDoMarkin-main/freescifiplatform/png/Tiles/Tile (15).png")
    imgJogador = loadImage("JogoDoMarkin-main/freescifiplatform/png/Objects/Box.png")





}
function setup() {
    canva = createCanvas(700, 300);
    
    jogador = createSprite(50,50,25,25);
    jogador.addImage(imgJogador);
    jogador.scale = 0.1;
    edges = createEdgeSprites();
    plataforma1 = createSprite(50,125,100,25);
    plataforma1.addImage(imgPlataforma1);
    plataforma1.scale = 0.5;
    GCaixa = createGroup();
    GPlataforma = createGroup();
    GEspinho = createGroup();
	GBinvisivel = createGroup();

	

}
    function draw(){
    background(imgBackground);
    drawSprites();
    if(estadoJogo === JOGAR){
         gerarCaixas();
         gerarEspinho();
        
        if(jogador.isTouching(GBinvisivel)||jogador.collide(GEspinho)){
            estadoJogo = ENCERRAR;
        }

    }
    else if(estadoJogo === ENCERRAR){
         GCaixa.destroyEach();
         GEspinho.destroyEach();
         GBinvisivel.destroyEach();
         plataforma1.visible = false;
         textSize(20);
         fill("red");
         text("GAME OVER, pressione R para reiniciar", 225, 150);
         
         if(keyDown("r")){
            estadoJogo = JOGAR;
            plataforma1.visible = true;
            jogador.x = 50;
            jogador.y = 50;
        }
    }
    jogador.collide(plataforma1);
    jogador.collide(GCaixa);
    console.log("estado jogo é "+ estadoJogo)
    if(keyDown("space")){
        pular();
    }
   
    if(keyDown(RIGHT_ARROW)){
       jogador.x = jogador.x+5;
    }
    if(keyDown(LEFT_ARROW)){
       jogador.x = jogador.x-5;
    }
    
    jogador.velocityY = jogador.velocityY+0.5;
    
    
    

}
    function gerarCaixas(){
        if (frameCount % 40 === 0){
            var caixa = createSprite(700,300,50,50);
            GCaixa.add(caixa);
            caixa.y = Math.round(random(250,150));
            caixa.velocityX = -5;
            GCaixa.lifetime = 200;
            caixa.addImage(imgCaixa);
            caixa.scale = 0.3;
            binvisivel = createSprite(200,200,100,20);
            binvisivel.x = caixa.x;
            binvisivel.y = caixa.y+15;
            binvisivel.velocityX = -5
            binvisivel.visible = false;
            binvisivel.lifetime = 200;
            GBinvisivel.add(binvisivel);
            
        }
    } 
    function gerarEspinho(){
        if (frameCount % 25 === 0){
            var espinho = createSprite(725,260,50,50);
            GEspinho.add(espinho);
            espinho.velocityX = -3;
            GEspinho.lifetime=200;
            espinho.addImage(imgEspinho);
            espinho.scale = 0.3;
        }
    }     
      
    function pular(){
        if(keyDown("space")){
            jogador.velocityY = jogador.velocityY-5;
            jogador.y = jogador.y-2;
        }
    }