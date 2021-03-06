window.addEventListener('load', function() {

    // create card object

    var suites = ['hearts', 'diamonds', 'spades', 'clubs'];
    var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
    var deckArr = [];
    var isDeckBuilt = false;

    //buttons
    let buildBtn = document.querySelector('.build-button');
    let shuffleBtn = document.querySelector('.shuffle-button');
    let cutBtn = document.querySelector('.cut-button');
    let dealBtn = document.querySelector('.deal-button');
    let randomDealBtn = document.querySelector('.random-deal-button');
    let bjBtn = document.querySelector('bj-button')

    //deck display
    var cardDisplay = document.querySelector('.card-display');
    var dealDisplay = document.querySelector('.delt-cards');

    //create deck by looping 52 times and return results to deck array
    var Deck = {
        
        build: function() {
            //check to see if the deck is already built.  if it is, don't build again
            if(!isDeckBuilt) {
                //start with an empty deck
                deckArr = [];
                for (var i = 0 ; i < 4 ; i++) {
                    let cardSuite = suites[i];
                    
                    for (var x = 0 ; x < 13 ; x++ ) {
                        let card = {};
                        let cardValue = values[x];
                        card.value = cardValue;
                        card.suite = cardSuite;
                        card.img   = `${cardValue}-${cardSuite}`;
                        deckArr.unshift(card);
                    };
                };
            }
            //limit the ability of the user to deal a second deck to the array
            isDeckBuilt = true;
            //clear the dealt cards field
            dealDisplay.innerHTML = '';
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

        deal: function(arr) {
            //take the first item in the card array, remove it, and display it
            var firstCard = arr.shift();
            var firstCardName = Deck.displayName(firstCard);
            dealDisplay.innerHTML = `<br><br>Delt card:<br>${firstCardName}`;

        },

        dealRandom: function(arr) {
            //find a random card in the deck and display it
            var randCard = arr[Math.floor(Math.random()*arr.length)];
            var randCardLocation = arr.indexOf(randCard);
            arr.splice(randCardLocation, 1);
            var randCardDisplay = Deck.displayName(randCard);
            dealDisplay.innerHTML = `<br><br>Randomly delt card:<br>${randCardDisplay}`;

        }

        
    }

    if (buildBtn) {
    buildBtn.addEventListener('click', function(event) {
        event.preventDefault();
        Deck.build();
        Deck.display();
    });
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Deck.build();
            Deck.shuffle(deckArr);
            Deck.display();
            //give ability to build a new deck that is not shuffled
            isDeckBuilt = false;
        });
    }

    if (cutBtn) {
        cutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Deck.cut(deckArr);
            //give ability to create a fresh deck
            isDeckBuilt = false;
        });
    }

    if (dealBtn) {
        dealBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Deck.deal(deckArr);
            Deck.display(deckArr);
            //give ability to create a fresh deck
            isDeckBuilt = false;
        });
    }

    if (randomDealBtn) {
        randomDealBtn.addEventListener('click', function(event){
            event.preventDefault();
            Deck.dealRandom(deckArr);
            Deck.display(deckArr);

        });
    }


    function newFunction() {
        console.log(buildBtn);
    }

});