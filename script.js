var context;
var myCanvas, myVar, myCoinVar, myLegVar, myCrackVar;
var myRx, myRy;
var pacman, pacEye, opens = false;
var edge, edge2, edge3;
var coin, coins = [];
var letter;
var life;
var enemy, leg, legs = [];
var enemy2, leg2, legs2 = [];
var crack, cracks = [];
var pacBrow, eneBrow, eneBrow2;
var losing;

//DAT.gui
var AnimationSettings = function(){
  this.speed = 25;
  this.position = 150;
}

var animation = new AnimationSettings();
var gui = new dat.gui.GUI();
gui.add(animation, 'speed', 5, 40);
gui.add(animation, 'position', -150, 250);

//CANVAS
function updateCanvas() {
    myCanvas = document.getElementById( "myCanvas" );
    context = myCanvas.getContext( "2d" );

    var grd = context.createLinearGradient(0, 0, 0, 1000);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "DarkSlateGray");

    context.fillStyle = grd;
    context.fillRect( 0, 0, myCanvas.width, myCanvas.height );

    edge = new Rect("Blue");
    edge.setReferencePoint(0, myCanvas.height/2);
    edge2 = new Rect("MediumBlue");
    edge3 = new Rect("DarkBlue");

    pacman = new Pacm("yellow", 100);
    pacman.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    pacEye = new Pacm("black", 20);

    letter = new Rect("white");
    letter.setReferencePoint(20, 20);
    life = new Pacm("yellow", 30);

    enemy = new Ghost("dodgerblue");
    enemy.setReferencePoint(myCanvas.width/4, myCanvas.height/2-30);

    enemy2 = new Ghost("red");
    enemy2.setReferencePoint(myCanvas.width/4-160, myCanvas.height/2-30);

    pacBrow = new Rect("black");
    pacBrow.setReferencePoint(pacman.X0, pacman.Y0);
    eneBrow = new Rect("black");
    eneBrow.setReferencePoint(enemy.X0, enemy.Y0);
    eneBrow2 = new Rect("black");
    eneBrow2.setReferencePoint(enemy2.X0, enemy2.Y0);

    losing = new Rect("rgba(255, 0, 0, 0.5)");

    myVar = setTimeout( nextFrame, 50 );
    myCrackVar = setTimeout( nextCrackAnimation, 20);
    myCoinVar = setTimeout( nextCoinAnimation, 20);
    myLegVar = setTimeout( nextLegAnimation, 20);

}

//NASTĘPNA KLATKA

function nextFrame() {
  context = myCanvas.getContext( "2d" );

  var grd = context.createLinearGradient(0, 0, 0, 1000);
  grd.addColorStop(0, "black");
  grd.addColorStop(1, "DarkSlateGray");

  context.fillStyle = grd;
  context.fillRect( 0, 0, myCanvas.width, myCanvas.height );

  if(animation.position < 50)
  {
    pacBrow.Color = "black";
    eneBrow.Color = "black";
    eneBrow2.Color = "black";
  }
  else
  {
    pacBrow.Color = "rgba(0,0,0,0)";
    eneBrow.Color = "rgba(0,0,0,0)";
    eneBrow2.Color = "rgba(0,0,0,0)";
  }

  if(animation.position < -30)
  {
    losing.Color = "rgba(255,0,0,0.2)";
    life.Color = "black";
  }
  else
  {
    losing.Color = "rgba(255,0,0,0)";
    life.Color = "yellow";
  }

// KRAWEDZIE

  context.save();
      context.transform( myCanvas.width, 0, 0, 20, edge.X0, edge.Y0-pacman.R*2 );
      edge.display();
  context.restore();

  context.save();
      context.transform( myCanvas.width, 0, 0, 15, edge.X0, edge.Y0-pacman.R*2+5 );
      edge2.display();
  context.restore();

  context.save();
      context.transform( myCanvas.width, 0, 0, 7, edge.X0, edge.Y0-pacman.R*2+13 );
      edge3.display();
  context.restore();

  context.save();
      context.transform( myCanvas.width, 0, 0, 20, edge.X0, edge.Y0+pacman.R*2 );
      edge.display();
  context.restore();

  context.save();
      context.transform( myCanvas.width, 0, 0, 15, edge.X0, edge.Y0+pacman.R*2 );
      edge2.display();
  context.restore();

  context.save();
      context.transform( myCanvas.width, 0, 0, 7, edge.X0, edge.Y0+pacman.R*2 );
      edge3.display();
  context.restore();

  for ( i = 0; i < cracks.length; i ++ ) {
      var crack = cracks[ i ];
      crack.setReferencePoint( crack.X0 - animation.speed, crack.Y0 );
      context.save();
          context.transform( 5, 0, 0, 15, crack.X0, crack.Y0-pacman.R*2 );
          crack.display();
      context.restore();

      context.save();
          context.transform( 5, 0, 0, 15, crack.X0 - animation.speed, crack.Y0+pacman.R*2+5 );
          crack.display();
      context.restore();
      if ( crack.X0 < 0 )
      {
          cracks.splice( i, 1 );
      }
  }

  //NAPIS
    //L
  context.save();
      context.transform( 10, 0, 0, 50, letter.X0, letter.Y0 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0, letter.Y0+50 );
      letter.display();
  context.restore();

    //I
  context.save();
      context.transform( 10, 0, 0, 60, letter.X0+50, letter.Y0 );
      letter.display();
  context.restore();

    //V
  context.save();
      context.transform( 10, 0, 0, 50, letter.X0+70, letter.Y0 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 30, 0, 0, 10, letter.X0+70, letter.Y0+50 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 10, 0, 0, 50, letter.X0+90, letter.Y0 );
      letter.display();
  context.restore();

    //E
  context.save();
      context.transform( 10, 0, 0, 40, letter.X0+110, letter.Y0+10 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0+110, letter.Y0 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0+110, letter.Y0+25 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0+110, letter.Y0+50 );
      letter.display();
  context.restore();

    //S
  context.save();
      context.transform( 10, 0, 0, 20, letter.X0+160, letter.Y0+10 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0+160, letter.Y0 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0+160, letter.Y0+25 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 10, 0, 0, 20, letter.X0+190, letter.Y0+35 );
      letter.display();
  context.restore();

  context.save();
      context.transform( 40, 0, 0, 10, letter.X0+160, letter.Y0+50 );
      letter.display();
  context.restore();

  //ŻYCIA
  context.save();
      context.transform( 1, 0, 0, 1, letter.X0+250, letter.Y0+30 );
      life.display();
  context.restore();

  context.save();
      context.transform( 1, 0, 0, 1, letter.X0+320, letter.Y0+30 );
      life.display();
  context.restore();

  //DUCHY
  context.save();
      context.transform( 70, 0, 0, 70, enemy.X0, enemy.Y0 );
      enemy.display();
  context.restore();

  for ( i = 0; i < legs.length; i ++ ) {
      var leg = legs[ i ];
      leg.setReferencePoint( leg.X0 - 8, leg.Y0 );
      context.save();
          context.transform( 1, 0, 0, 1, leg.X0, leg.Y0 );
          leg.display();
      context.restore();
      if ( leg.X0 < enemy.X0-53 ) legs.splice( i, 1 );
    }

    context.save();
        context.transform( 70, 0, 0, 70, enemy2.X0, enemy2.Y0 );
        enemy2.display();
    context.restore();

    for ( i = 0; i < legs2.length; i ++ ) {
        var leg2 = legs2[ i ];
        leg2.setReferencePoint( leg2.X0 - 8, leg2.Y0 );
        context.save();
            context.transform( 1, 0, 0, 1, leg2.X0, leg2.Y0 );
            leg2.display();
        context.restore();
        if ( leg2.X0 < enemy2.X0-53 ) legs2.splice( i, 1 );
      }

      context.save();
          context.translate( eneBrow.X0+40, eneBrow.Y0-25 );
          context.rotate( 0.75 * Math.PI );
          context.scale( 40, 10 );
          eneBrow.display();
      context.restore();

      context.save();
          context.translate( eneBrow.X0-30, eneBrow.Y0-32 );
          context.rotate( 0.25 * Math.PI );
          context.scale( 40, 10 );
          eneBrow.display();
      context.restore();

      context.save();
          context.translate( eneBrow2.X0+40, eneBrow2.Y0-25 );
          context.rotate( 0.75 * Math.PI );
          context.scale( 40, 10 );
          eneBrow2.display();
      context.restore();

      context.save();
          context.translate( eneBrow2.X0-30, eneBrow2.Y0-32 );
          context.rotate( 0.25 * Math.PI );
          context.scale( 40, 10 );
          eneBrow2.display();
      context.restore();

        //COINY
        for ( i = 0; i < coins.length; i ++ ) {
            var coin = coins[ i ];
            coin.setReferencePoint( coin.X0 - animation.speed, coin.Y0 );
            context.save();
                context.transform( 1, 0, 0, 1, coin.X0, coin.Y0 );
                coin.display();
            context.restore();
            if ( coin.X0 < pacman.X0+ animation.position )
            {
                coins.splice( i, 1 );
            }
        }

        //PACMAN
        for (i = 0; i < 500; i ++)
        {
            if(opens == false)
            {
              pacman.moveMouth(pacman.Start-0.0001);
              if(pacman.Start < 0.0001)
              {
                opens = true;
              }
            }
            else {
              pacman.moveMouth(pacman.Start+0.0001);
              if(pacman.Start > 0.25)
              {
                opens = false;
              }
            }
            context.save();
                context.transform( 1, 0, 0, 1, pacman.X0 + animation.position, pacman.Y0 );
                pacman.display();
            context.restore();
          }

        context.save();
            context.transform( 1, 0, 0, 1, pacman.X0+ animation.position-10, pacman.Y0-50 );
            pacEye.display();
        context.restore();

        context.save();
            context.translate( pacBrow.X0 + animation.position-10, pacBrow.Y0-85 );
            context.rotate( 0.75 * Math.PI );
            context.scale( 40, 10 );
            pacBrow.display();
        context.restore();

        context.save();
            context.transform( myCanvas.width, 0, 0, myCanvas.height, 0, 0 );
            losing.display();
        context.restore();

  myVar = setTimeout( nextFrame, 50 );
}

//FUNKCJE ANIMACJI

function nextCoinAnimation( ) {
    var isOK = Math.floor( Math.random() * 5 );
    console.log( isOK, coins.length  );
    isOK = 1;
    if ( isOK === 1 ) {
        coin = new Circle("PaleGoldenrod",20);
        coin.setReferencePoint(myCanvas.width, myCanvas.height/2);
        coins.push( coin );
    }
//-------------------------------------------------------------------
    myCoinVar = setTimeout( nextCoinAnimation, 1620 - animation.speed * 20 );
}

function nextCrackAnimation( ) {
    var isOK = Math.floor( Math.random() * 5 );
    console.log( isOK, cracks.length  );
    isOK = 1;
    if ( isOK === 1 ) {
        crack = new Rect("rgba(0,0,0,0.4)");
        crack.setReferencePoint(myCanvas.width, edge.Y0);
        cracks.push( crack );
    }
//-------------------------------------------------------------------
    myCrackVar = setTimeout( nextCrackAnimation, 5120 - animation.speed*100 );
}

function nextLegAnimation( ) {
    leg = new Circle( "dodgerblue", 15 );
    leg.setReferencePoint( enemy.X0+64, enemy.Y0+120 );
    legs.push( leg );

    leg2 = new Circle( "red", 15 );
    leg2.setReferencePoint( enemy2.X0+64, enemy2.Y0+120 );
    legs2.push( leg2 );

    myLegVar = setTimeout( nextLegAnimation, 300 );
}

//KSZTAŁTY

function Ghost( color ) {
    this.Color = color;
    this.X = 0;
    this.Y = 0;
    this.X0 = 0;
    this.Y0 = 0;

    this.display = function() {
        context.fillStyle = color;
        context.beginPath();
        context.rect( this.X - 1, this.Y, 2, 1.75 );
        context.closePath();
        context.fill();

        context.fillStyle = color;
        context.beginPath();
        context.arc( this.X, this.Y, 1, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();

        context.fillStyle = "white";
        context.beginPath();
        context.arc( this.X-0.4, this.Y, 0.2, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();

        context.fillStyle = "white";
        context.beginPath();
        context.arc( this.X+0.4, this.Y, 0.2, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();

        context.fillStyle = "black";
        context.beginPath();
        context.arc( this.X-0.35, this.Y, 0.1, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();

        context.fillStyle = "black";
        context.beginPath();
        context.arc( this.X+0.45, this.Y, 0.1, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Pacm( color, radius ) {
    this.X = 0;
    this.Y = 0;
    this.R = radius;
    this.Color = color;
    this.X0 = 0;
    this.Y0 = 0;
    this.Start = 0.25;
    this.End = 2 - this.Start;

    this.display = function() {
        context.fillStyle = this.Color;
        context.beginPath();
        context.moveTo(this.X, this.Y);
        context.arc( this.X, this.Y, this.R, this.Start * Math.PI, this.End * Math.PI );
        context.lineTo(this.X, this.Y);
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }

    this.moveMouth = function( s ) {
        this.Start = s;
        this.End = 2 - this.Start
    }
}

function Circle( color, radius ) {
    this.X = 0;
    this.Y = 0;
    this.R = radius;
    this.Color = color;
    this.X0 = 0;
    this.Y0 = 0;

    this.display = function() {
        context.fillStyle = this.Color;
        context.beginPath();
        context.arc( this.X, this.Y, this.R, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Rect( color )
{
    this.X = 0;
    this.Y = 0;
    this.W = 1;
    this.H = 1;
    this.Color = color;
    this.X0 = 0;
    this.Y0 = 0;

    this.display = function( ) {
      context.fillStyle = this.Color;
      context.fillRect( this.X, this.Y, this.W, this.H );
    };

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}
