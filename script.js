"use strict"

var startGame = document.getElementById("startGame");
var resetGame = document.getElementById("resetGame");
var playBtns = document.querySelectorAll(".makeMove");

const gameBoard = (() => {
	// private var
	var _board = {
		moves: Array(9).fill(null)
	}
	return {_board}
})()

const Players = (name, mark) => {
	const getName = () => name;
	const getMark = () => mark;
	return {getName, getMark}
}

var playerX, playerO;

const checkResult = (board) => {
	let winningCombinations = [
		[0,1,2], [3,4,5],[6,7,8],
		[0,3,6], [1,4,7],[2,5,8],
		[0,4,8], [2,4,6]
	]

	for (var i = 0; i < winningCombinations.length; i++) {

		let a = winningCombinations[i]

		if(board[a[0]] && board[a[0]] === board[a[1]]  && board[a[1]] === board[a[2]]){
			return true; //Somebody Won Game
		}
	}

	if(!board.includes(null)){
			return "DRAW"
	}
}

const displayController = (() => {
	let _moveCounter = 0;
	const board = gameBoard._board; // inherit gameboard

	const clearBoard = () => {

		_moveCounter = 0;
		board.moves = Array(9).fill(null);

		let sqrs = document.querySelectorAll(".square")

		sqrs.forEach((sqr) => {
			sqr.textContent = "";
		})
	}

	const resetBoard = () => {
		clearBoard();
	}

	const enableButtonsToPlay = () => {
		playBtns.forEach((sqr) => {
			sqr.disabled = false;
			sqr.addEventListener('click', (e) => {
				let markedSqr = e.target;
				display.moveTracker()(markedSqr);
			})
		})
	}

	const disableButtons = () => {
		console.log("disbles")
		playBtns.forEach((sqr) => {
			sqr.disabled = true;
		})
	}

	const moveTracker = () => {

		return (markedSqr) => {

			if (markedSqr.textContent != "" ) {
				return;
			}

			let curPlayer = _moveCounter % 2 === 0 ? playerX : playerO;
			let opponentPlayer = _moveCounter % 2 === 0 ? playerO : playerX;
			if (curPlayer === undefined || opponentPlayer === undefined ) {
				return;
			}
			let curMark = curPlayer.getMark();
			markedSqr.textContent = curMark;
			let curGame = board.moves
			curGame[markedSqr.dataset.key] = curMark;
			document.querySelector(".status").innerHTML =` Next Turn: ${opponentPlayer.getName()} - ${opponentPlayer.getMark()}`

			let res = checkResult(curGame);

			if(res == true){
				document.querySelector(".status").innerHTML = `Congratulations ${curPlayer.getName()}! You WON`
				disableButtons()
				return;
			} else if (res == "DRAW") {
				document.querySelector(".status").innerHTML = `Match is DRAWN`
				disableButtons()
				return;
			}

			_moveCounter++;

		}
	}
	return {moveTracker, resetBoard, enableButtonsToPlay, disableButtons}
})()

var display = displayController;

startGame.addEventListener('click', (e) => {
	if(playBtns[0].disabled){
		display.enableButtonsToPlay();
	}
	
	var X = document.getElementById("X").value;
	var O = document.getElementById("O").value;
	if (X == "" || O == "") {
		alert("Enter Name of the Players")
		return;
	}
	playerX = Players(`${X}`, 'X');
	playerO = Players(`${O}`, 'O');
})

display.disableButtons();

resetGame.addEventListener('click', (e) => {
	display.resetBoard();
	document.querySelector(".status").innerHTML = `Click Start to start the game`
})
