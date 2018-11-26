var Furry = require('./furry.js');
var Coin = require('./coin.js');


function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.tempo = 400;
    var self = this;

    this.startGame = function () {
        this.interval = setInterval(function () {
            self.moveFurry()
        }, this.tempo);
    };

    this.speedUp = function() {
        if (this.score > 1 && this.score < 5) {
            clearInterval(self.interval);
            self.interval = setInterval(function() {
                self.moveFurry();
            }, 350);
        } else if (this.score > 6 && this.score < 20) {
            clearInterval(self.interval);
            self.interval = setInterval(function() {
                self.moveFurry();
            }, 250);
        } else if (this.score > 20) {
            clearInterval(self.interval);
            self.interval = setInterval(function() {
                self.moveFurry();
            }, 200);
        }
    };


    this.Game = function(x,y) {
        return x + (y * 10);
    };


    this.showFurry = function(){
        this.board[ this.Game(this.furry.x, this.furry.y) ].classList.add('furry');
    };

    this.showCoin = function(){
        this.board[ this.Game(this.coin.x, this.coin.y) ].classList.add('coin');
    };

    this.removeCoin = function () {
        this.board[ this.Game(this.coin.x, this.coin.y) ].classList.remove('coin');
    };

    this.moveFurry = function() {
        this.hideVisibleFurry();
        this.showFurry();


        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        }
        else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        else if (this.furry.direction === "down") {
            this.furry.y =  this.furry.y - 1;
        }

        this.hideVisibleFurry();
        this.checkCoinCollision();
        if (this.gameOver() === false) {
            this.showFurry();
        }
    };

    this.hideVisibleFurry = function() {
        if(document.querySelector(".furry") !== null) {
           document.querySelector(".furry").classList.remove('furry')
        }
    };

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                self.furry.direction = 'left';
                break;
            case 38:
                self.furry.direction = "down";
                break;
            case 39:
                self.furry.direction = 'right';
                break;
            case 40:
                self.furry.direction = 'up';
                break;
        }
    };

    document.addEventListener('keydown', function(event){
        self.turnFurry(event);
    });

    var brit = document.querySelector(".britImg");
    brit.addEventListener('mouseover', function() {
        document.getElementById("love").play();
    });


    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
           this.board [this.Game(this.coin.x, this.coin.y)].classList.remove('coin');
           this.score++;
           var scoreId = document.querySelector("#score div strong");
           scoreId.innerHTML = this.score;
           document.getElementById('point').play();
           this.coin = new Coin();
           this.showCoin();
           this.speedUp();
        }
    };

    this.gameOver = function() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            document.getElementById("wall").play();
            clearInterval(this.interval);
            var over = document.getElementById("over");
            over.classList.remove("invisible");

            var score = document.querySelector(".final");
            var strong = document.querySelector("#score div strong");
            score.textContent = strong.textContent;

            this.hideVisibleFurry();
            this.removeCoin();
            this.startAgain();
        }
    };

     this.startAgain = function () {
         var button = document.querySelector(".button");
         button.addEventListener("click", function () {
             location.reload();

         });
    };


this.showCoin();
this.startGame();

}

document.addEventListener("DOMContentLoaded", function() {

    new Game();

});
