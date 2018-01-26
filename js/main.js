var shootChicken = (function () {
    var level = 1;
    var lifeLeft = 3;
    var gemeOver = false;
    var score = 1;
    var counterInterval;
    var introInterval;
    var speedIntertval = 40;
    var intervalGame;
    var play = false;

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
    var levelUp = function (score) {
        if (score >= 50) {
          level=2;
        }
        if (score >= 100) {
          level=3;
        }
        if (score >= 150) {
           level=4;
        }
    }
    var writeScore = function (score) {
        elements.score.textContent = score;
    }

    var writeLevel = function (level) {
        elements.level.textContent = level;
    }
    var writeGameOverScore = function (score) {
       
            elements.displayGameOver.style.display = 'block';
            elements.gameOverScore.textContent = score;
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
        elements.displayIndikator.style.display = 'none';
        elements.displayCounter.style.display = 'block';
        var timer = 6
        counterInterval = setInterval(function () {
            sound.gun.play();
            timer--;
            elements.displayCounter.classList.toggle('startGameIndikator');
            elements.displayCounter.textContent = timer;
            if (timer <= 0) {
                sound.gun.stop();
                sound.start.play();
                elements.displayCounter.textContent = 'SHOOT!';
                clearInterval(counterInterval);
                setTimeout(function () {
                    elements.displayCounter.style.display = 'none';
                }, 1000)
            }
        }, 1000)
    }

    var randomChicken = function () {
        var chicken = ['chicken-1.png', 'chicken-2.png', 'chicken-3.png'];
        return chicken[Math.floor(Math.random() * chicken.length)];
    };
    
    var chickenSetting = function (chicken, position) {
        chicken.setAttribute('src', '/img/chicken/' + randomChicken())
        chicken.style.top = -150 + 'px';
        chicken.style.left = position + 'px';
        chicken.style.display = 'block';
    }
    
    var checkDown = function (chicken, display, position) {
        if (chicken.offsetTop > display.offsetHeight) {
            lifeLeft--;
            chicken.style.display = 'none';
            chickenSetting(chicken, position);
        }
    }
    var lifeDown = function () {
        if (lifeLeft == 2) {
            elements.lifeEgg3.style.display = 'none';
        }
        if (lifeLeft == 1) {
            elements.lifeEgg2.style.display = 'none';
        }
        if (lifeLeft == 0) {
            elements.lifeEgg1.style.display = 'none';
        }
    };
    var checkGameOver = function () {
        if (lifeLeft <= 0) {
            clearInterval(intervalGame);
            elements.chicken1.style.display = 'none';
            elements.chicken2.style.display = 'none';
            elements.chicken3.style.display = 'none';
            elements.chicken4.style.display = 'none';
            writeGameOverScore(score);
            sound.intro.play();
        }
    }
    var addBlo0d = function (positionLeft, positionTop) {
        elements.blood.style.top = positionTop + 'px';
        elements.blood.style.left = positionLeft + 'px';
        elements.blood.style.display = 'block'
    }
    var shoot = function () {
        $("img").on("contextmenu",function(){
            return false;
         }); 
        elements.display.addEventListener('click', function (event) {
            var random = randomNumbers(10, 900, 4);
            sound.gun.play();
            var target = event.target;
            if (target.id == 'chicken-1') {
                score++;
                sound.chicken.play();
                addBlo0d(target.offsetLeft - 50, target.offsetTop - 50);
                target.style.display = 'none';
                chickenSetting(target, random[0]);
            }
            if (target.id == 'chicken-2') {
                score++;
                sound.chicken.play();
                addBlo0d(target.offsetLeft - 50, target.offsetTop - 50);
                target.style.display = 'none';
                chickenSetting(target, random[1]);
            }
            if (target.id == 'chicken-3') {
                score++;
                sound.chicken.play();
                addBlo0d(target.offsetLeft - 50, target.offsetTop - 50);
                target.style.display = 'none';
                chickenSetting(target, random[2]);
            }
            if (target.id == 'chicken-4') {
                score++;
                sound.chicken.play();
                addBlo0d(target.offsetLeft - 50, target.offsetTop - 50);
                target.style.display = 'none';
                chickenSetting(target, random[3]);
            }

        })
    }
    var swichLevel = function(){
        if(level==2){
            console.log('tu sam');
        clearTimeout(level2);
        }
        
    }
   
    var action = function () {
        play = true;
        var position = randomNumbers(10,900,4);
        shoot();
        var levelSpeed = [6,7,10,12]
        chickenSetting(elements.chicken1,position[0]);
         var level2 = setTimeout(function(){
            chickenSetting(elements.chicken2,position[1])
        },20000);
        var level3 = setTimeout(function(){
            chickenSetting(elements.chicken3,position[2])
        },30000);
        var level4 = setTimeout(function(){
            chickenSetting(elements.chicken4,position[3])
        },40000);
        intervalGame = setInterval(function () {
            var randomPositions = randomNumbers(10, 900, 4);
            $("#chicken-1").css('top', $("#chicken-1").position().top + levelSpeed[0]);
            $("#chicken-2").css('top', $("#chicken-2").position().top + levelSpeed[1]);
            $("#chicken-3").css('top', $("#chicken-3").position().top + levelSpeed[2]);
            $("#chicken-4").css('top', $("#chicken-4").position().top + levelSpeed[3]);
            checkDown(elements.chicken1, elements.display, randomPositions[0]);
            checkDown(elements.chicken2, elements.display, randomPositions[1]);
            checkDown(elements.chicken3, elements.display, randomPositions[2]);
            checkDown(elements.chicken4, elements.display, randomPositions[3]);
            lifeDown();
            writeScore(score);
            writeLevel(level);
            levelUp(score);
            checkGameOver();
        }, speedIntertval);
        
    }
    var start = function(){
        elements.buttonStart.addEventListener('click',function(){
            if(play==false){
                elements.buttonText.textContent = 'Reset Game';
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
