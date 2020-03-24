const cards = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
];

const htmlVars = {
    nameInput: document.getElementById("input"),
    addBtn: document.getElementById("add-btn"),
    playersScore: document.getElementById("players-score"),
    players: [
    {
        num: 1,
        scoreDOM: null,
        wins: 0,
        name: "",
        score: 0
    },
    {
        num: 2,
        scoreDOM: null,
        wins: 0,
        name: "",
        score: 0
    },
    {
        num: 3,
        scoreDOM: null,
        wins: 0,
        name: "",
        score: 0
    }],
    playerTable1: null,
    playerTable2: null,
    playerTable3: null,
    starsBtn: document.getElementById("start-btn"),
    gameBoard: document.getElementById("game-board"),
};

const vars = {
    playersQty: 0,
    toAppendScore: "",
    toAppendTable: "",
    randomeCards: [],
    toAppendCards: [],
    cardsVal: [],
    time: -300
};

const funcs = {
    addPlayer: function() {
        if (htmlVars.nameInput.value != "") {
            vars.playersQty++;
            this.appendPlayer(vars.playersQty);
            htmlVars.players[vars.playersQty - 1].name = htmlVars.nameInput.value;
            htmlVars.playersScore.innerHTML += vars.toAppendScore;
            htmlVars.gameBoard.innerHTML += vars.toAppendTable;
            htmlVars.nameInput.value = null;
            this.setPlayersHtmlVars();
            this.ChekForLimit();
        };
    },
    appendPlayer: function(z) {
        vars.toAppendScore = 
        `<div class="player" id=player-${z}>
            <p id="player-${z}-score">0</p>
            <p>${htmlVars.nameInput.value}</p>
        </div>`;
        vars.toAppendTable =
        `<div class="player-table" id=player-table-${z}>
            <h2>${htmlVars.nameInput.value}</h2>
            <div class="player-cards" id="player-cards-${z}"></div>
        </div>`;
    },
    setPlayersHtmlVars: function() {
        htmlVars.players[0].scoreDOM = document.getElementById(`player-1-score`);
        htmlVars.players[1].scoreDOM = document.getElementById(`player-2-score`);
        htmlVars.players[2].scoreDOM = document.getElementById(`player-3-score`);
        htmlVars.playerTable1 = document.getElementById(`player-cards-1`);
        htmlVars.playerTable2 = document.getElementById(`player-cards-2`);
        htmlVars.playerTable3 = document.getElementById(`player-cards-3`);
    },
    ChekForLimit: function() {
        if (vars.playersQty == 2) {
            htmlVars.starsBtn.style.display = "block";
        } else if (vars.playersQty == 3) {
            htmlVars.addBtn.style.display = "none";
            htmlVars.nameInput.style.display = "none";
            vars.time = -450;
        }
    },
    startGame: function(){
        htmlVars.starsBtn.disabled = true;
        funcs.resetGame();
        while ( vars.randomeCards.length < vars.playersQty * 5) {
            let num = (Math.floor(Math.random() * 52 + 1));
            if ( vars.randomeCards.includes(num)) {
                continue;
            }
            vars.randomeCards.push(num);
            vars.toAppendCards.push(`<img src="cards/${num}.jpg">`);
            vars.cardsVal.push(cards[num - 1]);
        }
        funcs.dealCards();
    },
    dealCards: function() {
        for (let i = 0; i < vars.playersQty * 5; i += vars.playersQty) {
            vars.time += vars.playersQty * 150;
            setTimeout(() => {
                htmlVars.playerTable1.innerHTML += vars.toAppendCards[i];
            }, vars.time);
            setTimeout(() => {
                htmlVars.playerTable2.innerHTML += vars.toAppendCards[i+1];
            }, vars.time + 150);
            if (vars.playersQty == 3) {
                setTimeout(() => {
                    htmlVars.playerTable3.innerHTML += vars.toAppendCards[i+2];
                }, vars.time + 300);
            };
        };
        funcs.calculate();
    },
    calculate: function() {
        let sum1 = 0;
        let sum2 = 0;
        let sum3 = 0;
        for (let i = 0; i < vars.cardsVal.length; i += vars.playersQty) {
            sum1 += vars.cardsVal[i];
            sum2 += vars.cardsVal[i+1];
            if (vars.playersQty == 3) {
                sum3 += vars.cardsVal[i+2];
            };
        };
        htmlVars.players[0].score = sum1;
        htmlVars.players[1].score = sum2;
        htmlVars.players[2].score = sum3;
        funcs.compare();

    },
    compare: function() {
        htmlVars.players.sort(function(a, b) {
            return b.score - a.score;
        });
        this.declareWinner();
    },
    declareWinner: function() {
        setTimeout(() => {
            alert("and the winner is: " + htmlVars.players[0].name);
            htmlVars.players[0].wins++;
            htmlVars.players[0].scoreDOM.innerHTML = htmlVars.players[0].wins;
            htmlVars.starsBtn.disabled = false;
        }, vars.playersQty * 800);
    },
    resetGame: function() {
        vars.randomeCards = [];
        vars.toAppendCards = [];
        vars.cardsVal = [];
        vars.time = -300;
        htmlVars.playerTable1.innerHTML = null;
        htmlVars.playerTable2.innerHTML = null;
        if (htmlVars.playerTable3 != undefined) {
            htmlVars.playerTable3.innerHTML = null;
        }
        this.reSort();
    },
    reSort: ()=> {
        htmlVars.players.sort(function(a, b) {
            return a.num - b.num;
        });
    }
};