window.onload = function() {
    const menu = new ButtonMenu();
    const rules = new Rules();
    const storage = new Storage();
    const game = new Game();
    let cards, gameController;

    document.querySelector('.menu').addEventListener('click', function(e) {
        menu.tableToggle(e.target);
    });

    rules.getRules();

    document.querySelector('.register').addEventListener('click', function() {
        let name = document.querySelector('.name');
        let email = document.querySelector('.email');
        let user = {
            name: name.value,
            email: email.value
        };
        storage.addUser(user);

        gameController = game;
        rules.clearRules();
        game.startGame(menu.getSettings(), user.name);
        cards = game.getCardsArrayLength();
    });

    document.querySelector('.newGame').addEventListener('click', function () {
        game.startGame(menu.getSettings(), '');
        game.gameCounterRefresh();
        cards = game.getCardsArrayLength();
    });

    let menuScrit = document.querySelector('.scritTableMenu');
    menuScrit.addEventListener('click', function(e) {
        menu.selectScirt(e.target);
    });

    let menuDifficulty = document.querySelector('.difficultyTableMenu');
    menuDifficulty.addEventListener('click', function(e) {
        menu.selectDifficulty(e.target);
    });


    let counter = 0;
    let currentCards = [];

    let gameContainer = document.querySelector('.game');
    gameContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('front') && counter < 2) {
            counter++;
            let element = e.target.parentElement.parentElement;
            element.classList.toggle('_opened');
            currentCards.push(element);
            if (counter === 2) {
                if (currentCards[0].querySelector('.back').dataset.id === currentCards[1].querySelector('.back').dataset.id) {
                    currentCards[0].style.visibility = "hidden";
                    currentCards[1].style.visibility = "hidden";

                    counter = 0;
                    currentCards = [];
                    cards -= 2;
                    console.log(cards);
                } else {
                    setTimeout(function() {
                        for (let i = 0; i < 2; i++) {
                            currentCards[i].classList.remove('_opened');
                        }
                        counter = 0;
                        currentCards = [];
                    }, 500);
                }
            }
            if (cards === 0) {
                setTimeout(game.winGame(), 5500);
            }
        }
        return;

    });

};