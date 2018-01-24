
var shootChicken = (function(){
    var level = 1;
    var lifeLeft = 3;
    var play = false;
    var score = 0;
    var intervalMove ;
    var counterInterval;
    var introInterval;
    var speedIntertval = 50;
    var chickenShoot = 0;
    
    
    sound.intro.play();
     introInterval = setInterval(function(){
        elements.displayIndikator.classList.toggle('startGameIndikator');
    },500);

    var writeScore = function(score){
        elements.score.textContent = score;
    }

    var showLife = function(){

    }
    var writeGameOverScore = function(score){
        elements.displayGameOver.style.display = 'block';
        elements.gameOverScore.textContent = score;
        if(score<=35){
            elements.trophy.setAttribute('src','/img/throphy/trophy-bronze.png');
        }
        if(score>=36){
            elements.trophy.setAttribute('src','/img/throphy/trophy-silver.png');
        }
        if(score>=75){
            elements.trophy.setAttribute('src','/img/throphy/trophy-gold.png');    
        }
    }

    var counterTimer = function(){
        sound.intro.stop();
        clearInterval(introInterval);
        elements.displayIndikator.style.display = 'none';
        elements.displayCounter.style.display = 'block';
        var timer = 6
         counterInterval = setInterval(function(){
            sound.gun.play();
            timer--;
            elements.displayCounter.classList.toggle('startGameIndikator');
            elements.displayCounter.textContent = timer;
            if(timer<=0){
                sound.gun.stop();
                sound.start.play();
                elements.displayCounter.textContent = 'SHOOT!';
                clearInterval(counterInterval);
                setTimeout(function(){
                    elements.displayCounter.style.display = 'none';
                },1000)
            }
        },1000)
    }

    var randomChicken = function(){
        var chicken = ['chicken-1.png','chicken-2.png','chicken-3.png'];
        return chicken[Math.floor(Math.random()*chicken.length)];
    };
    var speed = function(){
        var speed = [2,4,5,6];
        return speed[Math.floor(Math.random()*speed.length)];
    }
    var randomPosition = function(from,to){
        return Math.floor(Math.random()*(to-from)+from);
    }
    
    var chickenSetting = function(chicken,start,end){
        chicken.setAttribute('src','/img/chicken/'+randomChicken())
        chicken.style.top = -50+'px';
        chicken.style.left = randomPosition(start,end)+'px';
        chicken.style.display = 'block';
    }
    var checkLevel = function(level){
        if(level==1){
           chickenSetting(elements.chicken1,20,900);
        }
        if(level==2){
            chickenSetting(elements.chicken1,20,450);
            chickenSetting(elements.chicken2,500,900);
        }
        if(level==3){
            chickenSetting(elements.chicken1,20,300);
            chickenSetting(elements.chicken2,350,750);
            chickenSetting(elements.chicken3,800,850);
        }
    }
   var checkDown = function(chicken,display,from,to){
        if(chicken.offsetTop>display.offsetHeight){
            lifeLeft--;
            chicken.style.display = 'none';
            chickenSetting(chicken,from,to);
        }
   }
   var lifeDown = function(){
       if(lifeLeft==2){
           $('#life-3').hide();
       }
       if(lifeLeft==1){
           $('#life-2').hide();
       }
       if(lifeLeft==0){
           $('#life-1').hide()
       }
   };
   var checkGameOver = function(){
       if(lifeLeft<=0){
           clearInterval(intervalMove);
           elements.chicken1.style.display = 'none';
           elements.chicken2.style.display = 'none';
           elements.chicken3.style.display = 'none';
       }
   }
    var action = function(){
            var chicken1= speed();
            var chicken2 = speed();
            var chicken3 = speed();
            checkLevel(level);
                intervalMove = setInterval(function(){ 
                    $("#chicken-1").css('top', $("#chicken-1").position().top +chicken1);     
                    $("#chicken-2").css('top', $("#chicken-2").position().top +chicken2);     
                    $("#chicken-3").css('top', $("#chicken-3").position().top +chicken3);     
                    checkDown(elements.chicken1,elements.display,20,300);
                    checkDown(elements.chicken2,elements.display,350,750);
                    checkDown(elements.chicken3,elements.display,800,850);
                    lifeDown();
                    // checkGameOver();
            },speedIntertval)
    }
    return{
        proba:action
    }
}());

shootChicken.proba();
