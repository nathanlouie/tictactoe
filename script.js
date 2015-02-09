var board = [["", "", ""], ["", "", ""], ["", "", ""]]; //create board
var x; //x coordinate
var y; //y coordinate
var turn = 0; //turns
var maxTurns; //Math.pow(board.length, 2);

function placePiece(place) { //puts pieces on the board
	if(turn % 2 === 0 && validSpace()) {
		$(place).text("X"); //place X on board
		board[y][x] = "X"; //place x in matrix
		turn++; //increase turns by 1
	} else if (turn % 2 === 1 && validSpace()) {
		$(place).text("O");
		board[y][x] = "O";
		turn++;
	};
};

function validSpace() { //checks if space is empty
	if(board[y][x] === "X" || board[y][x] === "O") {
		return false;
	} else {
		return true;
	};
};

function winCheck(gameBoard) { //checks if a win has occurred
	var counterV = 0, counterH = 0, counterD = 0, counterDR = 0;
	var lastMove = board[y][x];

	for(var i = 0; i < gameBoard.length; i++) {
		if(lastMove === gameBoard[i][x]) { //vertical
			counterV++;
		}
		if(lastMove === gameBoard[y][i]) { //horizontal
			counterH++;
		}
		if(lastMove === gameBoard[i][i]) { //diagonal upper left to lower right
			counterD++;
		}
		if(lastMove === gameBoard[gameBoard.length-i-1][i]) { //diagonal lower right to upper left
			counterDR++;
		}
	};
	if(counterV === board.length || counterH === board.length || counterD === board.length || counterDR === board.length) {
		alert(lastMove + " wins!"); //win message
	} else if(turn === maxTurns) {
		alert("Tie Game."); //tie message
	}
};

function move() {
	$("td").on("click", function() {
		//from this, go up to the parent, then get the index of the child (column)
		x = $(this).parent().children().index($(this));
		//from this, go to the grandparent, then down to the row, then get the index of this's parent (row)
		y = $(this).parent().parent().children().index($(this).parent()); 
		placePiece(this);
		winCheck(board);
	});
};

$(document).ready(function() {
	maxTurns = $(".board tr td").length;
	move();
});

//better interface