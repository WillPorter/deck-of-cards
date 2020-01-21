// #### TODO
// ability to have an Ace score either 11 or 1.  as of now they are only 11.
// lock down the buttons after the game is over except for the deal blackjack button

window.addEventListener('load', function() {

    // create card object

    var suites = ['hearts', 'diamonds', 'spades', 'clubs'];
    var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
    var score = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    var deckArr = [];
    var isDeckBuilt = false;
    var dealerScore = 0;
    var playerScore = 0;
    var bothScores = {};

    //buttons
    let dealBtn = document.querySelector('.deal-button');
    let hitBtn = document.querySelector('.hit-button');
    let stayBtn = document.querySelector('.stay-button');

    //deck display
    var dealersFirst = document.querySelector('.dealers-first');
    var dealersSecond = document.querySelector('.dealers-second');
    var playersFirst = document.querySelector('.players-first');
    var playersSecond = document.querySelector('.players-second');
    var dealersHit = document.querySelector('.dealers-hit');
    var playersHit = document.querySelector('.players-hit');
    var message = document.querySelector('.message');

    //create deck by looping 52 times and return results to deck array
    var Deck = {
        
        // build the deck.  sets and array of objects into deckArr
        build: function() {
            //check to see if the deck is already built.  if it is, don't build again
            if(!isDeckBuilt) {
                //start with an empty deck
                deckArr = [];
                for (var i = 0 ; i < 4 ; i++) {
                    let cardSuite = suites[i];
                    
                    for (var x = 0 ; x < 13 ; x++ ) {
                        //build the card object and add it to the deckArr array variable
                        let card = {};
                        let cardValue = values[x];
                        let cardScore = score[x];
                        card.value = cardValue;
                        card.suite = cardSuite;
                        card.score = cardScore;
                        //card.img is for the file-path of the image
                        card.img   = `${cardValue}-${cardSuite}`;
                        deckArr.unshift(card);
                    };
                };
            }
            //limit the ability of the user to deal a second deck to the array
            isDeckBuilt = true;

            return deckArr;
        },

        shuffle: function (array) {
            var m = array.length, t, i;
        
            // While there remain elements to shuffle…
            while (m) {
        
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
        
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
            }
            
            return array;
        },

        //pull the value and the name out of the card object
        displayName: function(item) {
            var deckDisplayName = [item.value, item.suite,].join(' of ');
            var imgURL = `images/${item.img}.png`;

            return `
            <div class="card-block">
            <img src="${imgURL}" />
            <span>${deckDisplayName}</span>
            </div>
            `
            ;
        },

        //loop through the above displayname to get all the card values
        display: function() {
            cardNameDisplay = deckArr.map(Deck.displayName);
            cardDisplay.innerHTML = deckArr.map(Deck.displayName).join('');
        },

        //cut the deck in half display two arrays
        cut: function(arr) {
            let cut1 = arr.slice(0, 26);
            let cut2 = arr.slice(27, 51);
            let cut1Display = cut1.map(Deck.displayName);
            let cut2Display = cut2.map(Deck.displayName);

            cardDisplay.innerHTML = `<strong>Cut 1</strong><br>${cut1Display}<br><br>
                <strong>Cut 2<br></strong>${cut2Display}`;
        
        },

        //remove the first four cards from the deck, display them, add the score value, and return the deck array
        dealBJ: function(arr) {
            //loop throught the array to get the first four values and display
            for( var i = 0 ; i < 4 ; i++ ) {
                
                var nextCard = arr.shift();
                var nextCardName = Deck.displayName(nextCard);
                
                if( i == 0 ) {
                    dealersFirst.innerHTML = `${nextCardName}`;
                    dealerScore = nextCard.score;
                }
                else if( i == 1 ) {
                    playersFirst.innerHTML = `${nextCardName}`;
                    playerScore = nextCard.score;
                }
                else if( i == 2 ) {
                    dealersSecond.innerHTML = `${nextCardName}`;
                    dealerScore += nextCard.score;
                }
                else if( i == 3 ) {
                    playersSecond.innerHTML = `${nextCardName}`;
                    playerScore += nextCard.score;
                }
                
            }
            //set the scores to the bothScores object
            bothScores.dealerScore = dealerScore;
            bothScores.playerScore = playerScore;
            return arr;
        },

        // remove the next card from the deck, display it on the player side, add to the players score and return the deck array
        hitBJ: function(arr) {
            var nextCard = arr.shift();
            var nextCardName = Deck.displayName(nextCard);
            playersHit.innerHTML += nextCardName;
            //add new card score to player score
            bothScores.playerScore += nextCard.score;
            if (bothScores.playerScore > 21) {
                message.innerHTML = '<strong>YOU BUSTED<br />YOU STINK!</strong>';
            }
            return arr;
        },

        //checks the dealers score.  if less than 17 and less than the players score, hit again.  then run the score check funtion
        stayBJ: function(arr) {
            if (bothScores.dealerScore < bothScores.playerScore && bothScores.dealerScore < 17) {
                var nextCard = arr.shift();
                var nextCardName = Deck.displayName(nextCard);
                dealersHit.innerHTML += nextCardName;
                //add new card score to player score
                bothScores.dealerScore += nextCard.score;
                Deck.scoreCheck();
            } else {
                Deck.scoreCheck();
            }
            },

        //logic to decide if the dealer should hit again or stay.  If hitting again, run the stayBJ function.  If staying, compare dealer vs player score and display a message.
        scoreCheck: function() {
            if (bothScores.dealerScore < bothScores.playerScore && bothScores.dealerScore < 17) {
                Deck.stayBJ(deckArr);
            } else if (bothScores.dealerScore >= 17  && bothScores.dealerScore > bothScores.playerScore && bothScores.dealerScore <= 21 ) {
                message.innerHTML = 'Dealer WINS';
            } else if (bothScores.dealerScore > 21) {
                message.innerHTML = 'Dealer Busts<br />You WIN!!!';
            } else if (bothScores.dealerScore == bothScores.playerScore){
                message.innerHTML = 'This round is a PUSH';
            } else if (bothScores.dealerScore < bothScores.playerScore){
                message.innerHTML = 'You WIN!!!';
            }
        },

        //clears all the cards and messages off the table
        clearTable : function() {
            dealersFirst.innerHTML = '';
            dealersSecond.innerHTML = '';
            playersFirst.innerHTML = '';
            playersSecond.innerHTML = '';
            dealersHit.innerHTML = '';
            playersHit.innerHTML = '';
            message.innerHTML = '';
        }

    }

    if (dealBtn) {
        dealBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Deck.clearTable();
            Deck.build();
            Deck.shuffle(deckArr);
            Deck.dealBJ(deckArr);
            //give ability to build a new deck that is not shuffled
            isDeckBuilt = false;
        });
    }

    if (hitBtn) {
        hitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Deck.hitBJ(deckArr);
            //give ability to build a new deck that is not shuffled
            isDeckBuilt = false;
        });
    }

    if (stayBtn) {
        stayBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Deck.stayBJ(deckArr);
            //give ability to build a new deck that is not shuffled
            isDeckBuilt = false;
        });
    }


});