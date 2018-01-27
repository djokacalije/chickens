var shootChicken = (function () {
    var level = 1;
    var lifeLeft = 3;
    var gemeOver = false;
    var score = 0;
    var counterInterval;
    var introInterval;
    var speedIntertval = 40;
    var intervalGame;
    var play = false;
    var levelSpeed = [6,7,10,12];

    $("body").on("contextmenu",function(e){
        return false;
      });
    sound.intro.play();
     introInterval = setInterval(function(){
        elements.displayIndikator.classList.toggle('startGameIndikator');
    },500);

    var randomNumbers = function (start, end, count) {
        var returnArray = [],
            randomNumber;
        for (var i = 0; i < count; i++) {
            randomNumber = Math.floor(Math.random() * (end - start)) + start;
            if (returnArray.indexOf(randomNumber) == -1) {
                returnArray.push(randomNumber);
            } else {
                --i;
            }
        }
        return returnArray;
    };
    var writeText = function(el,text){
        el.textContent = text;
    }
    var hide = function(el){
        el.style.display = 'none';
    }
    var show = function(el){
        el.style.display = 'block';
    }
    var levelUp = function (score) {
      var levelIncreased=false;
        if (score >= 60 && level==3) {
           level=4;
           levelIncreased=true;
        }else if (score >= 40 && level==2) {
          level=3;
          levelIncreased=true;
        }else if (score >= 5 && level==1) {
          level=2;
          levelIncreased=true;
        }
       if(levelIncreased){
            var position = randomNumbers(10,900,4);
            addChicken(elements['chicken'+level],position[level-1]);
       }
    }
    var writeScore = function (element,score) {
        writeText(element,score);
    }
    var writeLevel = function (el,level) {
        writeText(el,level);
    }
    var writeGameOverScore = function (score) {
            hide(elements.lifeEgg3);
            show(elements.displayGameOver);
            writeText(elements.gameOverScore,score);
            if (score <= 100) {
                elements.trophy.setAttribute('src', '/img/throphy/trophy-bronze.png');
            }
            if (score >= 100) {
                elements.trophy.setAttribute('src', '/img/throphy/trophy-silver.png');
            }
            if (score >= 250) {
                elements.trophy.setAttribute('src', '/img/throphy/trophy-gold.png');
            }
    }

    var counterTimer = function () {
        sound.intro.stop();
        clearInterval(introInterval);
        hide(elements.displayIndikator);
        show(elements.displayCounter);
        var timer = 6
        counterInterval = setInterval(function () {
            sound.gun.play();
            timer--;
            elements.displayCounter.classList.toggle('startGameIndikator');
            writeText(elements.displayCounter,timer);
            if (timer <= 0) {
                sound.gun.stop();
                sound.start.play();
                writeText(elements.displayCounter,'SHOOT!');
                clearInterval(counterInterval);
                setTimeout(function () {
                    hide(elements.displayCounter);
                }, 1000)
            }
        }, 1000)
    }

    var randomChicken = function () {
        var chicken = ['chicken-1.png', 'chicken-2.png', 'chicken-3.png'];
        return chicken[Math.floor(Math.random() * chicken.length)];
    };
    
    var addChicken = function (chicken, position) {
        chicken.setAttribute('src', '/img/chicken/' + randomChicken())
        chicken.style.top = -150 + 'px';
        chicken.style.left = position + 'px';
        show(chicken);
    }
    
    var checkDown = function (chicken, display, position) {
        if (chicken.offsetTop > display.offsetHeight) {
            lifeLeft--;
            hide(chicken);
            addChicken(chicken, position);
        }
    }
    var lifeDown = function (lifeLeft) {
        if(lifeLeft<3 && lifeLeft>0){
            hide(elements['lifeEgg'+lifeLeft]);
        }
    };
    var checkGameOver = function () {
        if (lifeLeft <= 0) {
            clearInterval(intervalGame);
            for(var i = 1;i<=4;i++){
                hide(elements['chicken'+i]);
              }
            writeGameOverScore(score);
            sound.intro.play();
        }
    }
    var addBlo0d = function (positionLeft, positionTop,blood) {
        blood.style.top = positionTop + 'px';
        blood.style.left = positionLeft + 'px';
        show(blood);
    }
    var shoot = function () {
        $("img").on("contextmenu",function(){
            return false;
         }); 
        elements.display.addEventListener('click', function (event) {
            var random = randomNumbers(10, 900, 4);
            var position = random[Math.floor(Math.random()*random.length)];
            sound.gun.play();
            var target = event.target;
            if (target.hasAttribute("data-target")) {
                score++;
                sound.chicken.play();
                addBlo0d(target.offsetLeft - 50, target.offsetTop - 50,elements.blood);
                hide(target);
                addChicken(target, position);
            }
        })
    }
    var chickenSetting = function(level){
        var randomPositions = randomNumbers(10, 900, 4);
        if(level>1 && level<5){
            console.log('tu sam');
            for(var i = 1;i<level;i++){
                
                checkDown(elements['chicken'+i],elements.display,randomPositions[i-1]);
            }
        }
    }
    var chickenMove = function(chicken,speed){
           var position = chicken.offsetTop+=speed;
           chicken.style.top = position+'px'
    }
    var action = function () {
        play = true;
        var position = randomNumbers(10,900,4);
        shoot();
        addChicken(elements.chicken1,position[0]);
        intervalGame = setInterval(function () {
            var randomPositions = randomNumbers(10, 900, 4);
            chickenMove(elements.chicken1,levelSpeed[0]);
            chickenMove(elements.chicken2,levelSpeed[1]);
            chickenMove(elements.chicken3,levelSpeed[2]);
            chickenMove(elements.chicken4,levelSpeed[3]);
            checkDown(elements.chicken1, elements.display, randomPositions[0]);
            checkDown(elements.chicken2, elements.display, randomPositions[1]);
            checkDown(elements.chicken3, elements.display, randomPositions[2]);
            checkDown(elements.chicken4, elements.display, randomPositions[3]);
            // chickenSetting(level);
            lifeDown(lifeLeft);
            writeScore(elements.score,score);
            writeLevel(elements.level,level);
            levelUp(score);
            checkGameOver();
        }, speedIntertval);
        
    }
    var start = function(){
        elements.buttonStart.addEventListener('click',function(){
            if(play==false){
                writeText(elements.buttonText,'Reset Game');
                counterTimer();
                setTimeout(function(){
                    action();
                },6000)
            }
            if(play==true){
                window.location.reload();
            }
        })
    }
    
    return {
        proba: start
    }
}());

shootChicken.proba();

for(var i = 1;i<4;i++){
    console.log($('chicken'+i));
}
