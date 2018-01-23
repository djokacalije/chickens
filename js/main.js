var elements = {
    score:document.getElementById('display-info-score-text'),
    level:document.getElementById('display-info-level-text'),
    life:document.getElementById('display-info-life-picture'),
    cowboy:document.getElementById('display-info-life-cowboy-picture'),
    display:document.getElementById('display-main'),
    displayIndikator:document.getElementById('display-main-indikator'),
    displayCounter:document.getElementById('display-main-indikator-counter'),
    displayGameOver:document.getElementById('display-main-info'),
    gameOverScore:document.getElementById('display-main-info-text-score'),
    trophy:document.getElementById('throphy'),
    buttonStart:document.getElementById('button-startGame-text'),
    chicken1:document.getElementById('chicken-1'),
    chicken2:document.getElementById('chicken-2'),
    chicken3:document.getElementById('chicken-3'),
}

var sound = {
    intro: new Howl({
        src:['/sounds/intro.ogg'],
        loop:true
    }),
    gun: new Howl({
        src:['/sounds/gunShot.ogg']
    }),
    chicken: new Howl({
        src:['/sounds/chicken.ogg']
    }),
    start: new Howl({
        src:['/sounds/startGame.ogg']
    }),
}
var shootChicken = (function(){
    var level = 1;
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
        var speed = [5,35,40,25];
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

    var action = function(){
        setTimeout(function(){
            elements.chicken1.setAttribute('src','.img/chicken/'+randomChicken);
            elements.chicken1.style.top = -50+'px';
            elements.chicken1.style.left = randomPosition(100,300)+'px';
            elements.chicken1.style.display = 'block';
            var speed = speed();
            var intervalMove = setInterval(function(){
    
            },1000)
        },8000)
    }

    return{
        counter:counterTimer
    }
}());
