
var shootChicken = (function(){
    var level = 3;
    var lifeLeft = 3;
    var play = false;
    var score = 0;
    
    
    sound.intro.play();
    var introInterval = setInterval(function(){
        elements.displayIndikator.classList.toggle('startGameIndikator');
    },500);

    var writeScore = function(score){
        elements.score.textContent = score;
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
        var counterInterval = setInterval(function(){
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
        var speed = [3,6,9,12];
        return speed[Math.floor(Math.random()*speed.length)];
    }
    var randomPosition = function(from,to){
        return Math.floor(Math.random()*(to-from)+from);
    }
    var writeLife = function(){
        for(var i = 0;i<lifeLeft;i++){
            var img = document.createElement('img');
            img.setAttribute('src',"/img/Egg/egg.png");
            img.setAttribute('alt','chicken');
            elements.life.appendChild(img);
        }
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
            chickenSetting(elements.chicken3,800,900);
        }
    }
    var action = function(){
        counterTimer();
        setTimeout(function(){
            var topPosition = -50;
            checkLevel(level);
            writeLife();
            var randomSpeed=speed();
            var intervalMove = setInterval(function(){
                topPosition+=randomSpeed;
                topPosition++;
                elements.chicken1.style.top = topPosition+'px';
                elements.chicken2.style.top = topPosition+'px';
                elements.chicken3.style.top = topPosition+'px';
            },100)
        },8000)
    }

    return{
        proba:action
    }
}());

// shootChicken.proba();
