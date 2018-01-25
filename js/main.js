
var shootChicken = (function () {
    var level = 4;
    var lifeLeft = 3;
    var play = false;
    var gemeOver = false;
    var score = 1;
    var intervalMove;
    var counterInterval;
    var introInterval;
    var speedIntertval = 50;
    var chickenShoot = 0;

    elements.displayIndikator.style.display = 'none';
    // sound.intro.play();
    //  introInterval = setInterval(function(){
    //     elements.displayIndikator.classList.toggle('startGameIndikator');
    // },500);

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
    var levelUp = function (score, level) {
        if (score >= 10) {
            level++;
        }
        if (score >= 20) {
            level++;
        }
        if (score >= 30) {
            level++;
        }

    }
    var writeScore = function (score) {
        elements.score.textContent = score;
    }

    var writeLevel = function (level) {
        elements.level.textContent = level;
    }
    var writeGameOverScore = function (score) {
        if (gameOver == true) {
            elements.displayGameOver.style.display = 'block';
            elements.gameOverScore.textContent = score;
            if (score <= 10) {
                elements.trophy.setAttribute('src', '/img/throphy/trophy-bronze.png');
            }
            if (score >= 12) {
                elements.trophy.setAttribute('src', '/img/throphy/trophy-silver.png');
            }
            if (score >= 30) {
                elements.trophy.setAttribute('src', '/img/throphy/trophy-gold.png');
            }
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
    var speed = function () {
        var speed = [4, 6, 8, 7];
        return speed[Math.floor(Math.random() * speed.length)];
    }
    
    var chickenSetting = function (chicken, position) {
        chicken.setAttribute('src', '/img/chicken/' + randomChicken())
        chicken.style.top = -50 + 'px';
        chicken.style.left = position + 'px';
        chicken.style.display = 'block';
    }
    var chickenPositions = function (level) {
        var position = randomNumbers(10, 900, 9);
        console.log(position);
        if (level == 1) {
            chickenSetting(elements.chicken1, position[0]);
        }
        if (level == 2) {
            chickenSetting(elements.chicken1, position[1]);
            chickenSetting(elements.chicken2, position[2]);
        }
        if (level == 3) {
            chickenSetting(elements.chicken1, position[3]);
            chickenSetting(elements.chicken2, position[4]);
            chickenSetting(elements.chicken3, position[5]);
        }
        if (level == 4) {
            chickenSetting(elements.chicken1, position[6]);
            chickenSetting(elements.chicken2, position[7]);
            chickenSetting(elements.chicken3, position[8]);
            chickenSetting(elements.chicken4, position[9]);
        }

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
            $('#life-3').hide();
        }
        if (lifeLeft == 1) {
            $('#life-2').hide();
        }
        if (lifeLeft == 0) {
            $('#life-1').hide()
        }
    };
    var checkGameOver = function () {
        if (lifeLeft <= 0) {
            clearInterval(intervalMove);
            elements.chicken1.style.display = 'none';
            elements.chicken2.style.display = 'none';
            elements.chicken3.style.display = 'none';
            elements.chicken4.style.display = 'none';
            gameOver = true;
        }
    }
    var addBlo0d = function (positionLeft, positionTop) {
        elements.blood.style.top = positionTop + 'px';
        elements.blood.style.left = positionLeft + 'px';
        elements.blood.style.display = 'block'
    }
    var shoot = function () {
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
    
    var action = function () {
        shoot();
        chickenPositions(level);
        var chicken1 = speed();
        var chicken2 = speed();
        var chicken3 = speed();
        var chicken4 = speed();
        chickenSetting(elements.chicken1,Math.floor(Math.random()*(900-10)+10));
        intervalMove = setInterval(function () {
            var randomPositions = randomNumbers(10, 900, 4);
            $("#chicken-1").css('top', $("#chicken-1").position().top + chicken1);
            $("#chicken-2").css('top', $("#chicken-2").position().top + chicken2);
            $("#chicken-3").css('top', $("#chicken-3").position().top + chicken3);
            $("#chicken-4").css('top', $("#chicken-4").position().top + chicken4);
            checkDown(elements.chicken1, elements.display, randomPositions[0]);
            checkDown(elements.chicken2, elements.display, randomPositions[1]);
            checkDown(elements.chicken3, elements.display, randomPositions[2]);
            checkDown(elements.chicken4, elements.display, randomPositions[3]);
            lifeDown();
            writeScore(score);
            writeLevel(level);
            // checkGameOver();
            // writeGameOverScore(score);
           
        }, speedIntertval)
    }
    return {
        proba: action
    }
}());

shootChicken.proba();
