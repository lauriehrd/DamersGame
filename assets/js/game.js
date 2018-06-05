var board = document.querySelector('#board');
var numbers = ['one','two','three','four','five','six','seven','eight'];
var letters = ['a','b','c','d','e','f','g','h'];
var colors = ['red2','black2'];
var activePiece = "";
var activePieceList = "";
var activeColor = "";
var restart = true;
damier();
addListeners();
var currentColor = 'red2';

var canMove = false;

addActiveGroup('black2');

function addActiveGroup(color){
	var elements = document.querySelectorAll('.'+color+'.piece');
	for(var i = 0; i < elements.length; i++){
		elements[i].classList += ' active_group';
	}
}


function removeActiveGroup(color){
	var elements = document.querySelectorAll('.'+color+'.piece');
	for(var i = 0; i < elements.length; i++){
		elements[i].classList.remove('active_group');
	}
}


// document.getElementById("reprendre").onclick = function() {
// 	document.getElementById("slide-out").style.display = "none";
// }

function toggleSidebar(){
	document.getElementById("slide-out").classList.toggle("is-active");
}

// function alerte(){

// 	alert("Ton profil à été créé avec succès");
// }

function addListeners(){

	const burger = document.getElementById("menuh");
	const close = document.getElementById("close");
	// const reprendre = document.getElementById("reprendre");
	const quitter = document.getElementById("quitter");
	const submit = document.getElementById("submit");
	
	close.onclick = toggleSidebar;
	burger.onclick = toggleSidebar;
	// reprendre.onclick = toggleSidebar;
	quitter.onclick = toggleSidebar;
	
	// submit.onclick = alerte;

	for(var i = 0; i < document.querySelectorAll('.square').length; i++){
    (function () {
      var square = document.querySelectorAll('.square')[i];
			if(square.classList[2] == 'black2'){
				square.addEventListener("click", function(){
					var squareList = square.parentElement.classList + " " + square.classList;
					var squareRow = squareList.split(" ")[1];
					var squareColumn = squareList.split(" ")[3];

					if(this.children.length > 0 && findColor(this) == currentColor && (activePiece == '' || canMove == false)){
				    setActivePiece(square);
				  }
				  else{
				  	var activePieceRow = activePieceList.split(" ")[1];
				  	var activePieceColumn = activePieceList.split(" ")[3];
				  	if(isValidMove(square)){
				  		movePiece(activePiece, square, activePieceRow, activePieceColumn, squareRow, squareColumn);

				  	}
				  }
				});
			}
    }());
	}
}

function movePiece(old, n, activePieceRow, activePieceColumn, squareRow, squareColumn){
	n.innerHTML = old.innerHTML;
	old.innerHTML = "";
	if(Math.abs(numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow)) == 2 &&
		 Math.abs(letters.indexOf(activePieceColumn) - letters.indexOf(squareColumn)) == 2){
		var middleSquare = findMiddleSquare(activePieceRow, squareRow, activePieceColumn, squareColumn);
		middleSquare.innerHTML = "";
	}
	if(canMove == false){
		canMakeKing(n);
		resetActivePiece();
	}
	else{
		setActivePiece(n);
	}
}
function canMakeKing(s){
	if(findColor(s) == 'black2' && findRow(s) == 'eight'){
		makeKing(s);
	}
	else if(findColor(s) == 'red2' && findRow(s) == 'one'){
		makeKing(s);
	}
}

function isKing(s){
	if(s.children && s.children[0].innerHTML == 'K'){
		return true;
	}
}

function makeKing(s){
	s.children[0].innerHTML = "K";
}

function findColor(s){

	return s.children[0].classList[0];

}

function isValidMove(square, active = activePiece){
	var activePieceRow = findRow(active);
	var squareRow = findRow(square);
	var activePieceColumn = findColumn(active);
	var squareColumn = findColumn(square);
	var oppositeColor = '';
	activeColor == 'black2' ? oppositeColor = 'red2' : oppositeColor = 'black2';
	var middleSquare = findMiddleSquare(activePieceRow, squareRow, activePieceColumn, squareColumn);
	
	if(activeColor == 'black2'){
		var rowDifference = -1;

	}
	else{

		rowDifference = 1;

	}
	if(canMove == false && testOne(square, rowDifference)){

		canMove = false;
		return true;
	}
	else if(testTwo(active, square, rowDifference)){
		if(canJump(square)){
			canMove = true;
			removeActiveGroup(currentColor);
		}
		else{
			canMove = false;
		}
		return true;
	}

	return false;
}

function testOne(square, rowDifference){
	if((numbers.indexOf(findRow(activePiece)) - numbers.indexOf(findRow(square)) == rowDifference ||
	    isKing(activePiece) && Math.abs(numbers.indexOf(findRow(activePiece)) - numbers.indexOf(findRow(square))) == 1) &&
		 Math.abs(letters.indexOf(findColumn(activePiece)) - letters.indexOf(findColumn(square))) == 1 && square.children.length == 0 &&
		 canMove == false){
		return true;

	}
}

function testTwo(active, square, rowDifference){
	var middleSquare = findMiddleSquare(findRow(active), findRow(square), findColumn(active), findColumn(square));
	var oppositeColor = '';
	activeColor == 'black2' ? oppositeColor = 'red2' : oppositeColor = 'black2';
	if(square && middleSquare && middleSquare.children[0] && 
				  (numbers.indexOf(findRow(active)) - numbers.indexOf(findRow(square)) == rowDifference * 2 ||
				  (isKing(activePiece) && Math.abs(numbers.indexOf(findRow(active)) - numbers.indexOf(findRow(square))) == 2)) && 
				  Math.abs(letters.indexOf(findColumn(active)) - letters.indexOf(findColumn(square))) == 2 && square.children.length == 0 &&
				  findColor(middleSquare) == oppositeColor){
		return true;
	}
}

function canJump(s){
	var squareRow = findRow(s);
	var squareColumn = findColumn(s);
	var downLeft = findSquare(numbers[numbers.indexOf(squareRow) + 2], letters[letters.indexOf(squareColumn) - 2]);
	var downRight = findSquare(numbers[numbers.indexOf(squareRow) + 2], letters[letters.indexOf(squareColumn) + 2]);
	var upLeft = findSquare(numbers[numbers.indexOf(squareRow) - 2], letters[letters.indexOf(squareColumn) - 2]);
	var upRight = findSquare(numbers[numbers.indexOf(squareRow) - 2], letters[letters.indexOf(squareColumn) + 2]);
	if((activeColor == 'black2' || isKing(activePiece)) && testTwo(s, downLeft, -1)){
		return true;
	}
	else if((activeColor == 'black2' || isKing(activePiece)) && testTwo(s, downRight, -1)){
		return true;
	}
	else if((activeColor == 'red2' || isKing(activePiece)) && testTwo(s, upLeft, 1)){
		return true;
	}
	else if((activeColor == 'red2' || isKing(activePiece)) && testTwo(s, upRight, 1)){
		return true;
	}
	return false;
}

function findRow(s){
	if(s){
		return s.parentElement.classList[1];
	}
}

function findColumn(s){
	if(s){
		return s.classList[1];
	}
}

function findSquare(row, column){
	return document.querySelector('.row.' + row + ' div.square.' + column);
}
function findMiddleSquare (activePieceRow, squareRow, activePieceColumn, squareColumn){
	var activeRowIndex = numbers.indexOf(activePieceRow);
	var squareRowIndex = numbers.indexOf(squareRow);
	var middleRow = numbers[Math.abs((activeRowIndex + squareRowIndex)/2)];
	
	var activeColumnIndex = letters.indexOf(activePieceColumn);
	var squareColumnIndex = letters.indexOf(squareColumn);
	var middleColumn = letters[Math.abs((activeColumnIndex + squareColumnIndex)/2)];

	return findSquare(middleRow, middleColumn);
}

function reload() {
    location.reload();
 //   alert("Nouvelle Partie !");
}

function setActivePiece(s){
	if(s.children.length > 0){
		if(activePiece && activePiece.children[0]){
			activePiece.children[0].classList.remove('active');
		}
		activePiece = s;
		activePieceList = activePiece.parentElement.classList + " " + activePiece.classList;
		activeColor = s.querySelector('div').classList[0];
		activePiece.children[0].classList = activePiece.children[0].classList + " active";
	}
}

function resetActivePiece(){
	document.querySelector('.active').classList.remove('active');
	activePiece = "";
	activePieceList = "";
	activeColor = "";
	changeColor();
}

function changeColor(){
	removeActiveGroup(currentColor);
	currentColor == 'red2' ? currentColor = 'black2' : currentColor = 'red2';
	addActiveGroup(currentColor);

	statusChange(currentColor);
}

function damier(){
	addRows();
	addColumns();
	addPions();

}

function addRows(){
	for(var i = 0; i < 8; i++){
		board.innerHTML += "<div class='row "+numbers[i]+"'></div>";
	}
}

function addColumns(){
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var color = "black2";
			if(i%2 == 0 && j%2 == 0 || i%2 == 1 && j%2 == 1){
				color = 'red2';
			}
			document.querySelector('.row.'+numbers[i]+'').innerHTML += '<div class="square '+letters[j]+' '+color+'"></div>';
		}
	}
}

function addPions(){
	for(var i = 0; i < document.querySelectorAll('.square').length; i++){
		var square = document.querySelectorAll('.square')[i];
		var color = 'black2';
		if(numbers.indexOf(square.parentElement.classList[1]) > 4){
			color = 'red2';
		}
		if(square.parentElement.classList[1] != 'four' && square.parentElement.classList[1] != 'five' && square.classList[2] == 'black2'){
			square.innerHTML = '<div class="'+color+' piece"></div>';
		}
	}
}

function addSPions(){}

function statusChange(color){

	console.log(color);

	const status = document.querySelector('#status');

	if(color === 'red2')
		status.innerHTML = "<p>C'est au tour du joueur 1</p>";

	if(color === 'black2')
		status.innerHTML = "<p>C'est au tour du joueur 2</p>"; 
};

function save(){

	var tab = [];

for(var i = 0; i < document.querySelectorAll('.piece').length; i++){
      var SPions = document.querySelectorAll('.piece')[i];
			if(SPions.classList[0] == 'black2'){

					var SPionsBlackList = SPions.parentElement.parentElement.classList + " " + SPions.parentElement.classList;
					var SPionsBlackRow = SPionsBlackList.split(" ")[1];
					var SPionsBlackColumn = SPionsBlackList.split(" ")[3];
					var SPionsBlack = SPionsBlackRow + SPionsBlackColumn;

					tab.push(SPionsBlack);

					// console.log(SPionsBlack);
				}

					if(SPions.classList[0] == 'red2'){

						var SPionsRedList = SPions.parentElement.parentElement.classList + " " + SPions.parentElement.classList;
						var SPionsRedRow = SPionsRedList.split(" ")[1];
						var SPionsRedColumn = SPionsRedList.split(" ")[3];
						var SPionsRed = SPionsRedRow + " " + SPionsRedColumn;

						tab.push(SPionsRed);

						// console.log(SPionsRed);
					}


}
//document.getElementById("reprendre").
//console.log(tab);

// sessionStorage.setItem('pions', tab);
// sessionStorage.setItem("colorS", currentColor);
// monStockage = sessionStorage;
// console.log(sessionStorage);
monStockage = localStorage;
localStorage.setItem('pions', tab);
localStorage.setItem('colorS', currentColor);
alert("Mémorisation effectuée");

if(!localStorage.getItem('pions', tab) && ('colorS', currentColor)){
    $window.localStorage.setItem('pions', tab) && ('colorS', currentColor);
}

console.log(localStorage);
}


$('.button--bubble').each(function() {
  var $circlesTopLeft = $(this).parent().find('.circle.top-left');
  var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();
  
  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
  
  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  $(this).on('mouseover', function() {
    btTl.restart();
  });
});





// var http = require('http');

// var server = http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end('Salut tout le monde !');
// });
// server.listen(8081);


// var http = require('http');
// var fs = require('fs');


// var server = http.createServer(function(req, res) {
//     fs.readFile('./index.html', 'utf-8', function(error, content) {
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.end(content);
//     });
// });

// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket) {
//     socket.emit('message', 'Vous êtes bien connecté !');
//     socket.on('message', function (message) {
//         console.log('Un client me parle ! Il me dit : ' + message);
//     });	

// });


// server.listen(8081);
