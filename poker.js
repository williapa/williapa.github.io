//uncomment this section to run pokertest.js with node
/*module.exports = {
	determineWinner: determineWinner,
	Card: Card,
	Player: Player,
	Deck: Deck,
	sortByRank: sortByRank,
	sortBySuit: sortBySuit,
	flushRank: flushRank,
	straightRank: straightRank,
	straightFlushRank: straightFlushRank,
	getFlushCards: getFlushCards,
	straightFlushRank: straightFlushRank,
	FOAKrank: FOAKrank,
	TOAKrank: TOAKrank,
	twoPairRank: twoPairRank,
	pairRank: pairRank,
	fullHouseRank: fullHouseRank,
	highCardRank: highCardRank,
	handStrength: handStrength
};*/ 

function determineWinner(player1, player2, boardcards){
  var p1hand, p2hand;

  if(player1.hand){
    p1hand = player1.hand.concat(boardcards);
 	p2hand = player2.hand.concat(boardcards);
  }
  else{
 	p1hand = player1.concat(boardcards);
 	p2hand = player2.concat(boardcards);
  }

  var p1rank = 0, p2rank = 0;
  p1rank = straightFlushRank(p1hand);
  p2rank = straightFlushRank(p2hand);

  if(p1rank > p2rank){
    return player1;
  }

  if(p2rank > p1rank){
    return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
 	//if you have a straight flush tie it can't be resolved (hand uses 5 cards)
 	return 'TIE';
  }

  p1rank = FOAKrank(p1hand);
  p2rank = FOAKrank(p2hand);

  if(p1rank > p2rank){
	return player1;
  }
  if(p2rank > p1rank){
 	return player2;
  }
  if(p2rank == p1rank && p1rank != 0){
	var tie = resolveTie(p1hand, p2hand, "FOAK", p1rank);
	if(tie == "tie"){
      return "TIE";
 	}
 	else if(tie == "player1"){
 	  return player1;
 	}
 	else{
 	  return player2;
 	}
  }

  p1rank = fullHouseRank(p1hand);
  p2rank = fullHouseRank(p2hand);

  if(p1rank > p2rank){
 	return player1;
  }

  if(p2rank > p1rank){
	return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
  //cant resolve tie of hand that uses 5 cards
    return 'TIE';
  }

  p1rank = flushRank(p1hand);
  p2rank = flushRank(p2hand);

  if(p1rank > p2rank){
	return player1;
  }

  if(p2rank > p1rank){
	return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
	var tie = resolveTie(p1hand, p2hand, "FLUSH", p1rank);
	if(tie == "tie"){
      return "TIE";
 	}
 	else if(tie == "player1"){
 	  return player1;
 	}
 	else{
 	  return player2;
 	}
 	//return 'TIE';
  }

  p1rank = straightRank(p1hand);
  p2rank = straightRank(p2hand);

  if(p1rank > p2rank){
 	return player1;
  }

  if(p2rank > p1rank){
	return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
	return 'TIE';
  }

  p1rank = TOAKrank(p1hand);
  p2rank = TOAKrank(p2hand);

  if(p1rank > p2rank){
	return player1;
  }

  if(p2rank > p1rank){
	return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
	var tie = resolveTie(p1hand, p2hand, "TOAK", p1rank);
	if(tie == "tie"){
      return "TIE";
 	}
 	else if(tie =="player1"){
 	  return player1;
 	}
 	else{
 	  return player2;
 	}

 	//return 'TIE';
  }

  p1rank = twoPairRank(p1hand);
  p2rank = twoPairRank(p2hand);

  if(p1rank > p2rank){
	return player1;
  }

  if(p2rank > p1rank){
    return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
    var tie = resolveTie(p1hand, p2hand, "TWOPAIR", p1rank);
 			
 	if(tie == "tie"){
 	  return "TIE";
 	}
 	else if(tie == "player1"){
 	  return player1;
 	}
 	else{
 	  return player2;
 	}
 	//return 'TIE';
  }

  p1rank = pairRank(p1hand);
  p2rank = pairRank(p2hand);

  if(p1rank > p2rank){
	return player1;
  }

  if(p2rank > p1rank){
	return player2;
  }

  if(p2rank == p1rank && p1rank != 0){
 	var tie = resolveTie(p1hand, p2hand, "PAIR", p1rank);
 	if(tie == "tie"){
 	  return "TIE";
 	}
 	else if(tie == "player1"){
 	  return player1;
 	}
 	else{
 	  return player2;
 	}
  }

  p1rank = highCardRank(p1hand);
  p2rank = highCardRank(p2hand);

  if(p1rank > p2rank){
	return player1;
  }

  if(p2rank > p1rank){
	return player2;
  }
  var tie = resolveTie(p1hand, p2hand, "highcard", p1rank);	
  if(tie == "tie"){
    return "TIE";
  }
  else if(tie == "player1"){
    return player1;
  }
  else {
    return player2;
  }
}  

function Card(suit,rank){
  this.suit = suit;
  this.rank = rank;
  return this;
};

function Player(name,chips){
  this.hand = [];
  this.firstName = name;
  this.chips = parseInt(chips);
  this.bet = function(amount){
    this.chips -= amount;
    return amount;
  };

  this.win = function(amount){
    this.chips += amount;
  };

  this.deal = function(card){
    this.hand.push(card);
  };

  return this;
}

function shuffle(array) {
  var i = 0, j = 0, temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  return array;
}

function Deck(){
  this.cards = [];

  for(var i = 2; i < 15; i++){
    this.cards[(i-2)*4] = new Card("h", i);
    this.cards[(i-2)*4+1] = new Card("s", i);
    this.cards[(i-2)*4+2] = new Card("c", i);
    this.cards[(i-2)*4+3] = new Card("d", i);
  };

  this.shuffle = function(){
  	this.cards = shuffle (this.cards);
  };

  this.deal = function(){
  	return this.cards.shift();
  };

  return this;
}

function sortByRank (cards){
  return cards.sort(function(a,b){
  	if(a.rank > b.rank) return -1;
	if(a.rank < b.rank) return 1;
    return 0;
  });
}

function sortBySuit(cards){
  return cards.sort( function(a,b){
  	if(a.suit > b.suit) return -1;
  	if(a.suit < b.suit) return 1;
  	return 0;
  });
}

function flushRank(cards){
  sortBySuit(cards);
  spadesCount = 0, heartsCount = 0, diamondsCount = 0, clubsCount = 0;
  
  for(var i = 0; i < cards.length; i++){
			
	if(cards[i].suit == "s") spadesCount++;

	if(cards[i].suit == "h") heartsCount++;

	if(cards[i].suit == "d") diamondsCount++;

	if(cards[i].suit == "c") clubsCount++;
  };

  if( spadesCount > 4  || heartsCount > 4 || diamondsCount > 4 || clubsCount > 4){
	return sortByRank(getFlushCards(cards))[0].rank;
  };

  return 0;
}

function straightRank(cards){
  var hand = sortByRank(cards);

  for(var i = 1; i < 11; i++){
	haslowcard = false, hastwocard = false, hasthreecard = false, hasfourcard = false, hashighcard = false;
	lowcard = i;
	twocard = i+1;
	threecard = i+2;
	fourcard = i+3;
	highcard = i+4;

	if(i == 1){
	  lowcard = 14;
	};

	for(var j = 0; j < hand.length; j++){
      if(hand[j].rank == lowcard) haslowcard = true;
      if(hand[j].rank == twocard) hastwocard = true;
      if(hand[j].rank == threecard) hasthreecard = true;
      if(hand[j].rank == fourcard) hasfourcard = true;
      if(hand[j].rank == highcard) hashighcard = true;
	};

	if(haslowcard && hastwocard && hasthreecard && hasfourcard && hashighcard){
      return highcard;	
	}; 
  };

  return 0;
}

function getFlushCards (cards){

  noflushcards = [];

  sortBySuit(cards);

  spades = [];
  hearts = [];
  diamonds = [];
  clubs = [];

  for(var i = 0; i < cards.length; i++){

	if(cards[i].suit == "s") spades.push(cards[i]);

	if(cards[i].suit == "h") hearts.push(cards[i]);

	if(cards[i].suit == "d") diamonds.push(cards[i]);

	if(cards[i].suit == "c") clubs.push(cards[i]);
  };

  if(spades.length > 4) return spades;
		
  if(hearts.length > 4) return hearts;

  if(clubs.length > 4) return clubs;

  if(diamonds.length > 4) return diamonds;

  return noflushcards;
}

function straightFlushRank (cards){

  var fr = flushRank(cards);

  if(fr > 0){

    flushcards = [];
    flushcards = getFlushCards(cards);
    flushcards = sortByRank(flushcards);
    flushcards.splice(5,2);
    var sr = straightRank(flushcards);

	if(sr > 0){
	  return sr;
	};
  };

  return 0;
}

function FOAKrank(cards){

  foakRank = 0;

  var hand = sortByRank(cards);

  for(var i = 0; i < hand.length - 3; i++){

  	if(hand[i].rank == hand[i+1].rank && hand[i+1].rank == hand[i+2].rank && hand[i+2].rank == hand[i+3].rank) return hand[i].rank;
  };

  return foakRank;
}

function TOAKrank (cards){

  toakRank = 0;

  cards = sortByRank(cards);

  for(var i = 0; i < cards.length-2; i++){

    if(cards[i].rank == cards[i+1].rank && cards[i+1].rank == cards[i+2].rank ) return cards[i].rank;
  };

  return toakRank;

}

function twoPairRank (cards){

  var hand = sortByRank(cards);

  pairOneRank = 0;

  for(var i = 0; i < hand.length-1; i++){

	if(hand[i].rank == hand[i+1].rank && pairOneRank == 0){

      pairOneRank = hand[i].rank;
	};
  };

  if(pairOneRank > 0){
 
	pairTwoRank = 0;

	for(var i = 0; i < hand.length-1; i++){

      if(hand[i].rank != pairOneRank && hand[i+1].rank == hand[i].rank && pairTwoRank == 0){

		pairTwoRank = hand[i].rank;
	  };
    };
  };

  if(pairOneRank > 0 && pairTwoRank > 0){

	return pairOneRank*10 + pairTwoRank;
  };
		
  return 0;
}

function pairRank(cards) {

  var hand = sortByRank(cards);
  pairOneRank = 0;

  for(var i = 0; i < hand.length - 1; i++){
 	if(hand[i].rank == hand[i+1].rank && pairOneRank == 0){
      pairOneRank = hand[i].rank;
	}
  }
  return pairOneRank;
}

function fullHouseRank (cards){

  toakRank = TOAKrank(cards);

  if(toakRank > 0){
	pRank = 0;
	for(var i = 0; i < cards.length-1; i++){
      if(cards[i].rank == cards[i+1].rank && toakRank != cards[i].rank && pRank == 0){
		pRank = cards[i].rank;
		return toakRank*10+pRank;
  	  }
	}
  }

  return 0;
}

function highCardRank (cards){

  hand = sortByRank(cards);

  return hand[0].rank;
}


function resolveTie(p1hand, p2hand, handStrength, handRank){

//we are in this block because two hands ranked the same on a particular strength.
//so we need to make sure that:

//if the handStrength is 
//Straight Flush
//Straight
//we can't split a tie so just return tie (or don't try to resolve in the first place) <-- this

//TIES WE CAN RESOLVE:
//FOAK: remove the FOAK cards (get handRank, filter hands of that card)
//sort by rank and compare the FIRST CARD ONLY

//FLUSH: get the flush cards only. sort and compare each field

//TOAK: remove the TOAK (filter by rank)
//sort remaining cards by rank and compare FIRST 2

//TWO PAIR: remove the two paired cards by filter from rank)
//sort remaining cards and compare FIRST CARD ONLY

//PAIR: remove pair cards (by handrank) 
//sort remaining cards by rank and compare FIRST 3

//high card:
//sort by rank and compare FIRST 5

  if(handStrength == "FOAK"){
    var p1cards = p1hand.filter(function(val){
	  return (val.rank !== handRank);
	});
	var p2cards = p1hand.filter(function(val){
	  return (val.rank !== handrank);
	});

	p1cards = sortByRank(p1cards);
	p2cards = sortByRank(p2cards);

	if(p1cards[0].rank > p2cards[0].rank){
	  return "player1";
	}
	else if(p1cards[0].rank < p2cards[0].rank){
	  return "player2";
	}
	else {
	  return "tie";
	}
  }

  else if(handStrength == "FLUSH"){
    var p1cards = getFlushCards(p1hand);
	var p2cards = getFlushCards(p2hand);

	p1cards = sortByRank(p1cards);
	p2cards = sortByRank(p2cards);

	for(var i = 0; i < p1cards.length; i++){
      if(p1cards[i].rank > p2cards[i].rank){
		return "player1";
	  }
	  else if(p2cards[i].rank > p1cards[i].rank){
	    return "player2";
	  }
	}
	return "tie";
  }

  else if(handStrength == "TOAK"){
	var p1cards = p1hand.filter(function(val){
  	  return (val.rank !== handRank);
	});
	var p2cards = p2hand.filter(function(val){
	  return (val.rank !== handRank);
	});

	var p1cards = sortByRank(p1cards);
	var p2cards = sortByRank(p2cards);

	for(var i = 0; i < 2; i++){
	  if(p1cards[i].rank > p2cards[i].rank){
	 	return "player1";
	  }
	  else if(p2cards[i].rank > p1cards[i].rank){
		return "player2";
	  }
	}
	return "tie";
  }

  else if(handStrength == "TWOPAIR"){

	//sort hands by rank, first card that isn't pair is the strength
	var p1cards = sortByRank(p1hand);
	var p2cards = sortByRank(p2hand);
	var pairs = [];

	for(var i = 0; i < p1cards.length-1; i++){
  	  if(p1cards[i].rank == p1cards[i+1].rank){
	    pairs.push(p1cards[i].rank);
	  }
	}

	p1cards = p1hand.filter(function(val){
	  return (val.rank !== pairs[0] && val.rank !== pairs[1]);
	});
			
	p2cards = p2hand.filter(function(val){
	  return (val.rank !== pairs[0] && val.rank !== pairs[1]);
	});
	p1cards = sortByRank(p1cards);
	p2cards = sortByRank(p2cards);

	if(p1cards[0].rank > p2cards[0].rank){
	  return "player1";
	}
	else if(p1cards[0].rank < p2cards[0].rank){
	  return "player2";
	}
	else{
	  return "tie";
	}
  }

  else if(handStrength == "PAIR"){
	var p1cards = p1hand.filter(function(val){
	  return (val.rank !== handRank);  
	});
	var p2cards = p2hand.filter(function(val){
	  return (val.rank !== handRank);
	});

	var p1cards = sortByRank(p1cards);
	var p2cards = sortByRank(p2cards);

	for(var i = 0; i < 3; i++){
	  if(p1cards[i].rank > p2cards[i].rank){
	 	return "player1";
	  }
	  else if(p2cards[i].rank > p1cards[i].rank){
		return "player2";
	  }
	}
	return "tie";
  }
  //resolve high card tie!
  else {
 	var p1cards = sortByRank(p1hand);
	var p2cards = sortByRank(p2hand);

	for(var i = 0; i < 5; i++){
   	  if(p1cards[i].rank > p2cards[i].rank){
		return "player1";
	  }
	  else if(p2cards[i].rank > p1cards[i].rank){
		return "player2";
	  }
	}
	return "tie";
  }
}

function handStrength(cards, board){
  var handStrength = {
    hand: "",
	rank: 0,
	strength: 0
  };
	 
  hand = cards.concat(board);

  straightFlush = straightFlushRank(hand);

  if(straightFlush > 0){
    handStrength.hand = "straight flush";
	handStrength.strength = 9;
	handStrength.rank = straightFlush;
	return handStrength;
  }

  foak = FOAKrank(hand);

  if(foak > 0){
 	handStrength.hand = "foak";
	handStrength.rank = foak;
	handStrength.strength = 8;
	return handStrength;
  }

  fullhouse = fullHouseRank(hand);

  if(fullhouse > 0){
	handStrength.hand = "full house";
	handStrength.rank = fullhouse;
	handStrength.strength = 7;
	return handStrength;
  }

  flush = flushRank(hand);

  if(flush > 0){
	handStrength.hand = "flush";
	handStrength.rank = flush;
	handStrength.strength = 6;
	return handStrength;
  }

  straight = straightRank(hand);

  if(straight > 0){
 	handStrength.hand = "straight";
	handStrength.rank = straight;
	handStrength.strength = 5;
	return handStrength;
  }

  toak = TOAKrank(hand);

  if(toak > 0){
 	handStrength.hand = "toak";
	handStrength.rank = toak;
	handStrength.strength = 4;
	return handStrength;
  }

  twopair = twoPairRank(hand);

  if(twopair > 0){
	handStrength.hand = "twopair";
	handStrength.rank = twopair;
	handStrength.strength = 3;
	return handStrength;
  }

  pair = pairRank(hand);

  if(pair > 0){
	handStrength.hand = "pair";
	handStrength.rank = pair;
	handStrength.strength = 2;
	return handStrength;
  }

  highcard = highCardRank(hand);

  handStrength.hand = "high card";
  handStrength.rank = highcard;
  handStrength.strength = 1;
  return handStrength;
}
