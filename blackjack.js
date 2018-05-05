var cards = [];
var indCar=1;
var indCar2=1;
var indCar3=1;
var hitClick=0;
var cpuClicks=0;
var playePoints=0;
var comPoints=0;
var money=500;
var money2=0;
var bet=0;
var bet1;
var playerValues=[];
var cpuValues=[];
var win=false;
var black_jack;
var ab=false;
var ba=false;
var cardsCounter=0;

//**********************************************SHUFFLE_CARDS**********************************************

function shuffle_time(){

var i = 0;
var time = 0;
var shuffle_time = 6;
var counter = 0;

$($('.mazzo').get().reverse()).each(function(){
  var card = $(this);
  setTimeout(function(){
    card.animate({ 'margin-left' : '175px' },1);
    setTimeout(function(){
      card.animate({ 'z-index' : i });
      card.animate({ 'margin-left' : '0px' },20);
    },100);
    i++;
  },time);
  time += 500;
  counter++;
    
  if(counter > shuffle_time){
        return false;
    
  }
  
});
setTimeout(slideDisplay,1000);
setTimeout(setr,2000);
setTimeout(showFiches,2000);
setTimeout(showButtons,4000);
}

var ci=1;
var bi=7;

function setr(){

var far=setInterval(function(){
  $('#mazzo'+ci).addClass('mazzo'+bi);
  ci++;
  bi--;
if(ci===7){
  clearInterval(far);
}
},500);
}

//***********************************START_ANIMATIONS**********************************************************

function showFiches(){
  var ficCounter=1;
  var setFic=setInterval(function(){
    $('.fic'+ficCounter).fadeIn(800);
    ficCounter++;
    if(ficCounter===6){return clearInterval(setFic);}
  },300);
  
}

function slideDisplay(){

$('#rigthDisplay').show('clip',2000); 
//$('#rigthDisplay').show('fold',2000);
//$('#rigthDisplay').show("slide", { direction: "left" }, 3000);
//$('#rigthDisplay').show('drop', { direction: "left" }, 3000);
}

function showButtons(){
$('#play').show('bounce',500);
$('#hit').show('bounce',500);
$('#stand').show('bounce',500);
}

//******************************************************CARDS**********************************************
function createCards(){

for (var i = 1; i < 53; i++) {
     cards.push(cards2={});
   }

cards.forEach(function(card){
  card.src="cards/"+indCar++ + ".png";
   if(indCar%13===0){card.value=10};
   if(indCar%13===1){card.value=10};
   if(indCar%13===12){card.value=10};
   if(indCar>0&&indCar<=11){card.value=indCar2++;}
   if(indCar>14&&indCar<=24){card.value=indCar3++;indCar2=1;} 
   if(indCar>27&&indCar<=37){card.value=indCar2++;indCar3=1;}
   if(indCar>40&&indCar<=50){card.value=indCar3++;}
});
$('#pMoney').html(money);
$('#pBet').html(bet);
shufleCards();
}

function shufleCards(){
nArr=[];
for ( var i = 0; i < 51; i++ ) {
nArr.push(cards.splice(Math.floor(Math.random()*cards.length),1)[0]);}
nArr.push(cards[0]);
cards=nArr;
};
//*************************************FICHES*************************************************************
function fiches(amount){
 
if(amount>money){
  if (amount===100){$('#undred').prop('onclick',null);}
  if (amount===50){$('#fifty').prop('onclick',null);}
  if (amount===25){$('#twentyfive').prop('onclick',null);}
  if (amount===10){$('#ten').prop('onclick',null);}

}else{
bet+=amount;
money-=amount;
$('#pMoney').html(money);
$('#pBet').html(bet);
}
if(bet!=0){$( "#play" ).attr('onclick','play()')};
}

//*************************************PLAY_BUTTON********************************************************
function play(){

$('#play').prop('onclick',null);
$('.fic').prop('onclick',null);
$('#f').append($('<img>',{id:'f1',class:'img img4',src:cards[0].src,heigth:'0',width:'0'}))
         playerValues.push(cards[0].value);
          setTimeout(function(){first('#f1');}, 300);

$('#a').append($('<img>',{id:'a1',class:'img img4',src:cards[1].src,heigth:'0',width:'0'}))
         cpuValues.push(cards[1].value);
         setTimeout(function(){first('#a1');}, 300);

$('#g').append($('<img>',{id:'g1',class:'img img4',src:cards[2].src,heigth:'0',width:'0'}))
         playerValues.push(cards[2].value);
         setTimeout(function(){first('#g1');}, 300);

$('#b').append($('<img>',{id:'b1',class:'img img4',src:"img2/back.png",heigth:'0',width:'0'}))          
         setTimeout(function(){first2('#b1');}, 300);

hitClick=1;
cardsCounter+=3;
$('#middleDisplay').fadeOut();
cards.push(cards[0],cards[1],cards[2])
cards.splice(0,3);
playePoints+=aces(playerValues);//(cards[0].value+cards[2].value);
setTimeout(function(){$('#playerPoints').html(sum);}, 1000);
comPoints+=aces2(cpuValues);//cards[1].value;
setTimeout(function(){$('#comPoints').html(cpuSum);}, 1000);
blackjack();

if(black_jack===false){

$( "#hit" ).attr('onclick','hit()');
$( "#stand" ).attr('onclick','stand()')
};

if(black_jack===true){
setTimeout(function(){
  $('#playerPoints').html('');
  $('#comPoints').html(' ');
  $('#flipper').css({'transform' : 'rotateY(180deg)'});
  $('#b2').append($('<img>',{class:'img img4',src:cards[0].src,width:'88%'}));
  cpuValues.push(cards[0].value);
  cards.push(cards[0]);
  cards.shift();
  blackjack2();
},3000)

  }
}

//****************************************BLACK_JACK *********************************************
function blackjack(){
if(playerValues[0]+playerValues[1]===21){
   $('#blackImage2').fadeIn(100);
   black_jack=true;
}else{
  black_jack=false;
}}

function blackjack2(){
if(cpuValues[0]+cpuValues[1]===21){
 $('#middleDisplay').html('You Lose!!!').show('drop', { direction: "right" }, 1400);
 setTimeout(function(){
 $('#playerPoints').html('');
 $('#comPoints').html('');
 $('#blackImage1').fadeIn(100);
}, 1400);
}else{
  win=true;
  $('#middleDisplay').html('You Win!!!').show("pulsate", 1400);
  //setTimeout(function(){$('#middleDisplay').html('You Win!!!');}, 1400);
}
return setTimeout(reStart, 4000);
} 

//*************************************************CARDS_ANIMATE*******************************************
function first(x){$(x).animate({width:'88%'},700)};
function first2(y){$(y).animate({width:'91%'},700).css('border', "solid 0.5px black");};
function first3(z){$(z).animate({height:'0%',width:'0%'},900)};
//*************************************************HIT_BUTTON*********************************************
function hit(){

if(hitClick===1){
   hit2('#h','#pl1');
}else if(hitClick===2){
   hit2('#i','#pl2');
}else if(hitClick===3){
   hit2('#l','#pl3');
   
}else{
  return;}

cards.push(cards[0]);
cards.shift();
}

function hit2(ids,ids2){
  sum=0;
  sum2=0;
$(ids).append($('<img>',{id:'pl'+hitClick,class:'img img4',src:cards[0].src,heigth:'0',width:'0'}))
first(ids2);
playerValues.push(cards[0].value);
playePoints+=aces(playerValues);//cards[0].value;
setTimeout(function(){$('#playerPoints').html(sum);}, 500);
cardsCounter++;
hitClick++;
hitChecker();
}

function hitChecker(){

if(sum>21){
  $('#middleDisplay').html('Busted!!!').show("bounce", 1400);
  $('#hit').prop('onclick',null);
  $('#stand').prop('onclick',null);
  /*setTimeout(function(){*///}, 1400);
  setTimeout(function(){reStart()}, 3000);}
if(hitClick===4&&sum<=21||sum===21){
  setTimeout(stand,1500);
  $('#hit').prop('onclick',null);
  $('#stand').prop('onclick',null);
}}

//*****************************************STAND**********************************************************
function stand(){
a=false; 
$('#hit').prop('onclick',null);
$('#stand').prop('onclick',null);
$('#b2').append($('<img>',{class:'img img4',src:cards[0].src,width:'88%'}))          
         $('#flipper').css({'transform' : 'rotateY(180deg)'});


cpuValues.push(cards[0].value);
cardsCounter++;
comPoints+=aces2(cpuValues);
if(cpuValues[0]+cpuValues[1]===21){
  $('#comPoints').html('');
  $('#blackImage1').fadeIn(100);
/* setTimeout(function(){
  $('#middleDisplay').html('You Lose!!!');
  setTimeout(reStart,4000);
}, 2000);*/
$('#middleDisplay').html('You Lose!!!').show('drop', { direction: "right" }, 1400);
setTimeout(reStart,4000);
}else{
cpuSum=0;
cpuSum2=0; 
comPoints+=aces2(cpuValues);//cards[0].value;
setTimeout(function(){$('#comPoints').html(cpuSum);}, 400);
standCheck();
}
cards.push(cards[0]);
cards.shift();

}


function standCheck(){
 
if(cpuSum<sum){

   if(cpuClicks===0){return setTimeout(function(){check('#c','#cp0')}, 1000);}
   if(cpuClicks===1){return setTimeout(function(){check('#d','#cp1')}, 1000);}
   if(cpuClicks===2){return setTimeout(function(){check('#e','#cp2')}, 1000);}

}
if(cpuSum>sum&&cpuSum<=21){
  //setTimeout(function(){$('#middleDisplay').html('You Lose!!!');}, 1400);
  $('#middleDisplay').html('You Lose!!!').show('drop', { direction: "right" }, 1400);
  return setTimeout(reStart,4000);}
if(cpuSum===sum){
  //setTimeout(function(){$('#middleDisplay').html('You Lose!!!');}, 1400);
  $('#middleDisplay').html('You Lose!!!').show('drop', { direction: "right" }, 1400);
  return setTimeout(reStart,4000);}
if(cpuSum>21){
  win=true;
  //setTimeout(function(){$('#middleDisplay').html('You Win!!!');}, 1400);
  $('#middleDisplay').html('You Win!!!').show("pulsate", 1400);
  return setTimeout(reStart,4000);}
if(cpuSum<sum&&cpuClicks===3){
  win=true;
  //setTimeout(function(){$('#middleDisplay').html('You Win!!!');}, 1400);
  $('#middleDisplay').html('You Win!!!').show("pulsate", 1400);
  return setTimeout(reStart,4000);}


}

function check(ids,ids2){
    cpuSum=0;
cpuSum2=0;  
$(ids).append($('<img>',{id:'cp'+cpuClicks,class:'img img4',src:cards[0].src,heigth:'0',width:'0'}))
first(ids2);

cardsCounter++;

cpuValues.push(cards[0].value);

comPoints+=aces2(cpuValues);//cards[0].value;

setTimeout(function(){$('#comPoints').html(cpuSum);}, 800);
cards.push(cards[0]);
cards.shift();
setTimeout(standCheck,800);
cpuClicks++;
}

//**************************************************RESET_FUNCTIONS*******************************************

function reStart(){

if(money===0&&win===false){
  gameOver();
}else{
  if(win===true){
  for (var i = 0; i < 5; i++) {
    $('#moneyWon').html('+' + bet*2).delay(60).fadeIn(80).delay(60).fadeOut(80); 
}
setTimeout(function(){
money+=(bet*2);
  $('#pMoney').html(money);
  bet=0; 
  $('#pBet').html(bet);},300);
  }else{
  bet=0; 
  $('#pBet').html(bet);
}


$('#blackImage1').fadeOut(100);
$('#blackImage2').fadeOut(100);      
$('#playerPoints').html('');
$('#comPoints').html('');
$('#middleDisplay').hide("slide",2000);


ab=false;
ba=false;
playePoints=0;
comPoints=0;
hitClick=0;
cpuClicks=0;
sum=0;
sum2=0;
cpuSum=0;
cpuSum2=0;
playerValues=[];
cpuValues=[];
win=false;
black_jack=null;

if(cardsCounter>52){
  shufleCards();
  cardsCounter=0;
}

var plus = $('.img4');
first3(plus);
setTimeout(function(){
  $('.cards-area img:last-child').remove();
  restoreFiches();
  $('#flipper').css({'transform' : 'rotateY(0deg)'});
},1000);
}
}

function restoreFiches(){
$( "#five" ).attr('onclick','fiches(5)');
$( "#ten" ).attr('onclick','fiches(10)');
$( "#twentyfive" ).attr('onclick','fiches(25)');
$( "#fifty" ).attr('onclick','fiches(50)');
$( "#undred" ).attr('onclick','fiches(100)');
}

//************************************************ACES******************************************************
var sum=0;
var sum2=0;
var cpuSum=0;
var cpuSum2=0;


function aces(x){
if(ab===false){x.sort(function(a,b){return a-b})};
if(ab===true){x.sort(function(a,b){return b-a})};


for (var j = 1; j < x.length; j++) {
  sum2 = (sum2 + x[j]);
}

for (var i = 0; i < x.length; i++) {
   if(x[0]===1&&sum2<=10){
     x[0]=11;
    ab=true;
}
  if(x[0]===11&&sum2>10){
    x[0]=1;

}
sum = (sum + x[i]);
}
}

function aces2(x){
if(ba===false){x.sort(function(a,b){return a-b})};
if(ba===true){x.sort(function(a,b){return b-a})};


for (var s = 1; s < x.length; s++) {
  cpuSum2 = (cpuSum2 + x[s]);
}

for (var d = 0; d < x.length; d++) {
   if(x[0]===1&&cpuSum2<=10){
     x[0]=11;
    ba=true;
}
  if(x[0]===11&&cpuSum2>10){
    x[0]=1;

}
cpuSum = (cpuSum + x[d]);
}
}

//************************************************GAME_OVER***********************************************

function gameOver(){
$('#middleDisplay').html('Game Over!!!');
setTimeout(function(){
$('#middleDisplay').html('Play Again?').attr('onclick','playAgain()');
},2000);
}

function playAgain(){
money=500;
$('#pMoney').html(money);
$('#middleDisplay').prop('onclick',null);
reStart();
shufleCards();
}





















































































  