function startAgain() {

    var turnOff = document.getElementById('turnL');
    var turnOn = document.getElementById('turnR');
    var resetB = document.getElementById('reset');
    var startB = document.getElementById('start');
    var strictB = document.getElementById('strict');
    var upLeft = document.getElementById('upLeft');
    var upRight = document.getElementById('upRight');
    var downLeft = document.getElementById('downLeft');
    var downRight = document.getElementById('downRight');
    var display = document.getElementById('counter');
    var result = document.getElementById('result');

    var colors = ["red", "blue", "yellow", "green"];
    var colorsTwo = ["#FA5858", "#58ACFA", "#F7D358", "#58FA82"];
    var audio = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];

    var colorKey = {
        "red": "upLeft",
        "blue": "upRight",
        "yellow": "downRight",
        "green": "downLeft"
    };

    var startStrict = 0;
    var stepsToDoNum = [];
    var stepsTodo = [];
    var time = 1;
    var timesRun = 0;
    var onButton = 0;
    var startOnce = 0;
    var interval;
    var startTap = 0;
    var colorChosed = [];
    var tapCounter = 0;
    var startTapTwo = 0;
    var a;

    function timer() {

        interval = setInterval(function () {

            if (startTap == 0) {

                result.innerHTML = "Siga a sequência";

                timesRun++;

                if (timesRun % 2 !== 0) {

                    a = new Audio(audio[stepsToDoNum[time - 1]]);
                    a.play();

                    stepsTodo[time - 1].style.background = colorsTwo[stepsToDoNum[time - 1]];

                } else {
                    stepsTodo[time - 1].style.background = colors[stepsToDoNum[time - 1]];

                    time++;
                }

                if (timesRun == stepsTodo.length * 2) {
                    timesRun = 0;
                    time = 1;
                    startTap = 1;
                    colorChosed = [];
                    clearInterval(interval);

                }

            }

        }, 1500);

    };

    function newStep() {

        if (startTapTwo == 0) {

            var min = Math.ceil(0);
            var max = Math.floor(3);
            var num = Math.floor(Math.random() * (max - min + 1)) + min;

            var color = colors[num];
            var colorTwo = colorsTwo[num];
            var nameKey = colorKey[color];
            var rand = document.getElementById(nameKey);

            stepsToDoNum.push(num);
            stepsTodo.push(rand);
        }
        display.innerHTML = "" + stepsTodo.length + "";

        timer();

    };

    function On() {
        turnOff.style.background = "black";
        turnOn.style.background = "blue";

    };

    function Off() {

        clearInterval(interval);
        timesRun = 0;
        turnOn.style.background = "black";
        turnOff.style.background = "blue";
        startB.style.background = "red";
        strictB.style.background = "yellow";
        upLeft.style.background = "red";
        upRight.style.background = "blue";
        downRight.style.background = "yellow";
        downLeft.style.background = "green";
        display.innerHTML = "0";
        startStrict = 0;
        onButton = 0;
        startOnce = 0;
        stepsToDoNum = [];
        stepsTodo = [];
        colorChosed = [];
        time = 1;
        startTap = 0;
        startTapTwo = 0;

    };

    turnOn.onclick = function () {
        onButton = 1;
        On();
    };

    turnOff.onclick = function () {
        Off();
    };

    function startGame() {
        newStep();
    };

    resetB.onclick = function () {
        location.reload();
    }

    startB.onclick = function () {
        if (onButton == 1 && startOnce == 0) {
            startOnce = 1;
            startB.style.background = "#FA5858";
            startGame();
        }
    };

    strictB.onclick = function () {
        if (startStrict === 0 && onButton == 1) {
            strictB.style.background = "#F2F5A9";
            startStrict = 1;
        } else {
            strictB.style.background = "yellow";
            startStrict = 0;
        }
    };


    function compare() {

        startTap = 0;
        tapCounter = 0;
        var counter = 0;
        for (var x = 0; x < colorChosed.length; x++) {
            if (colorChosed[x] == stepsToDoNum[x]) {
                counter++;
            }
        }

        if (counter == colorChosed.length) {
            result.innerHTML = "Você está correto!";
            startTapTwo = 0;

            if (counter == 20) {
                counter = 0;
                alert("Você é um gênio!! Você venceu!!");
                Off();
            } else {
                counter = 0;
                var timerTwo = setTimeout(function todo() {

                    startGame();

                }, 1000);
            }

        } else {
            if (startStrict == 0) {
                result.innerHTML = "Errado, mostrar-lhe-ei outra vez!";
                startTapTwo = 1;
                counter = 0;
                var timerTwo = setTimeout(function todo() {

                    startGame();

                }, 1000);

            } else {
                result.innerHTML = "Errado, iniciei o outra vez!";
                counter = 0;
                stepsTodo = [];
                stepsToDoNum = [];
                startTapTwo = 0;
                var timerTwo = setTimeout(function todo() {

                    startGame();

                }, 1000);
            }
        }

    };



    upLeft.onmousedown = function () {
        if (startTap == 1) {
            tapCounter++;
            upLeft.style.background = "#FA5858";
            a = new Audio(audio[0]);
            a.play();
            colorChosed.push(0);
        }
    };

    upLeft.onmouseup = function () {
        if (startTap == 1) {
            upLeft.style.background = "red";
            if (tapCounter >= stepsTodo.length) {

                compare();
            }
        }
    };

    upRight.onmousedown = function () {
        if (startTap == 1) {
            tapCounter++;
            upRight.style.background = "#58ACFA";
            var a = new Audio(audio[1]);
            a.play();
            colorChosed.push(1);
        }
    };

    upRight.onmouseup = function () {
        if (startTap == 1) {
            upRight.style.background = "blue";
            if (tapCounter >= stepsTodo.length) {
                compare();
            }
        }
    };

    downRight.onmousedown = function () {
        if (startTap == 1) {
            tapCounter++;
            downRight.style.background = "#F3F781";
            var a = new Audio(audio[2]);
            a.play();
            colorChosed.push(2);
        }
    };

    downRight.onmouseup = function () {
        if (startTap == 1) {
            downRight.style.background = "yellow";
            if (tapCounter >= stepsTodo.length) {
                compare();
            }
        }
    };

    downLeft.onmousedown = function () {
        if (startTap == 1) {
            tapCounter++;
            downLeft.style.background = "#58FA82";
            var a = new Audio(audio[3]);
            a.play();
            colorChosed.push(3);
        }
    };

    downLeft.onmouseup = function () {
        if (startTap == 1) {
            downLeft.style.background = "green";
            if (tapCounter >= stepsTodo.length) {
                compare();
            }
        }
    };

};
startAgain();