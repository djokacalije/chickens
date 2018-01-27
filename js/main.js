var shootChicken = (function () {
    var level = 1,
        lifeLeft = 3,
        score = 0,
        counterInterval,
        introInterval,
        speedInterval = 40,
        intervalGame,
        play = false,
        levelSpeed = [4, 7, 9, 11],
        width = {
            min: 10,
            max: 900
        };
    document.addEventListener('contextmenu',function(e){
        e.preventDefault();
    });
    sound.intro.play();
    introInterval = setInterval(function () {
        elements.displayIndikator.classList.toggle('startGameIndikator');
    }, 500);
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
    var randomChicken = function () {
        var chicken = ['chicken-1.png', 'chicken-2.png', 'chicken-3.png'];
        return chicken[Math.floor(Math.random() * chicken.length)];
    };
    var random = randomNumbers(width.min, width.max, 4);
    var writeText = function (el, text) {
        el.textContent = text;
    };
    var hide = function (el) {
        el.style.display = 'none';
    }
    var show = function (el) {
        el.style.display = 'block';
    };
    var addChicken = function (chicken, position) {
        chicken.setAttribute('src', '/img/chicken/' + randomChicken());
        chicken.style.top = -150 + 'px';
        chicken.style.left = position + 'px';
        show(chicken);
    };
    var checkDown = function (chicken, display, position) {
        if (chicken.offsetTop > display.offsetHeight) {
            lifeLeft--;
            hide(chicken);
            addChicken(chicken, position);
        }
    };
    var chickenMove = function (chicken, speed) {
        var position = chicken.offsetTop += speed;
        chicken.style.top = position + 'px'
    };
    var levelUp = function (score) {
        var levelIncreased = false;
        if (score >= 45 && level == 3) {
            level = 4;
            levelIncreased = true;
        } else if (score >= 30 && level == 2) {
            level = 3;
            levelIncreased = true;
        } else if (score >= 15 && level == 1) {
            level = 2;
            levelIncreased = true;
        }
        if (levelIncreased) {
            var position = randomNumbers(width.min, width.max, 4);
            addChicken(elements['chicken' + level], position[level - 1]);
        }
    };
    var writeScore = function (element, score) {
        writeText(element, score);
    };
    var writeLevel = function (el, level) {
        writeText(el, level);
    };
    var writeGameOverScore = function (score) {
        hide(elements.lifeEgg3);
        show(elements.displayGameOver);
        writeText(elements.gameOverScore, score);
        if (score <= 100) {
            elements.trophy.setAttribute('src', '/img/throphy/trophy-bronze.png');
        }
        if (score >= 100) {
            elements.trophy.setAttribute('src', '/img/throphy/trophy-silver.png');
        }
        if (score >= 250) {
            elements.trophy.setAttribute('src', '/img/throphy/trophy-gold.png');
        }
    };
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
            writeText(elements.displayCounter, timer);
            if (timer <= 0) {
                sound.gun.stop();
                sound.start.play();
                writeText(elements.displayCounter, 'SHOOT!');
                clearInterval(counterInterval);
                setTimeout(function () {
                    hide(elements.displayCounter);
                }, 1000)
            }
        }, 1000)
    };
    var lifeDown = function (lifeLeft) {
        if (lifeLeft < 3 && lifeLeft > 0) {
            hide(elements['lifeEgg' + lifeLeft]);
        }
    };
    var checkGameOver = function (lifeLeft) {
        if (lifeLeft <= 0) {
            clearInterval(intervalGame);
            for (var i = 1; i <= 4; i++) {
                hide(elements['chicken' + i]);
            }
            writeGameOverScore(score);
            sound.intro.play();
        }
    };
    var addBlo0d = function (positionLeft, positionTop, blood) {
        blood.style.top = positionTop + 'px';
        blood.style.left = positionLeft + 'px';
        show(blood);
    };
    var shoot = function () {
        elements.display.addEventListener('click', function (event) {
            var random = randomNumbers(width.min, width.max, 4);
            var position = random[Math.floor(Math.random() * random.length)];
            sound.gun.play();
            var target = event.target;
            if (target.hasAttribute("data-target")) {
                score++;
                sound.chicken.play();
                addBlo0d(target.offsetLeft - 50, target.offsetTop - 50, elements.blood);
                hide(target);
                addChicken(target, position);
            }
        })
    };
    var chickenFall = function (level) {
        var position = randomNumbers(width.min, width.max, 4);
        if ((level == 1) || (level > 1 && level == 2) || (level > 2 && level == 3) || (level > 3 && level == 4)) {
            for (var i = 1; i <= level; i++) {
                chickenMove(elements['chicken' + i], levelSpeed[i - 1]);
                checkDown(elements['chicken' + i], elements.display, position[i - 1]);
            }
        }
    };
    var action = function () {
        play = true;
        var randomPosition = random[Math.floor(Math.random() * random.length)];
        shoot();
        addChicken(elements.chicken1, randomPosition);
        intervalGame = setInterval(function () {
            chickenFall(level);
            levelUp(score);
            lifeDown(lifeLeft);
            writeScore(elements.score, score);
            writeLevel(elements.level, level);
            checkGameOver(lifeLeft);
        }, speedInterval);
    };
    var start = function () {
        elements.buttonStart.addEventListener('click', function () {
            if (play == false) {
                writeText(elements.buttonText, 'Reset Game');
                counterTimer();
                setTimeout(function () {
                    action();
                }, 6000)
            }
            if (play == true) {
                window.location.reload();
            }
        })
    };
    return {
        proba: start
    }
}());
shootChicken.proba();

