"use strict"

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

const playerX = Players('jim', 'X');
const playerO = Players('stu', 'O');

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

		if(!board.includes(null)){
			return "DRAW"
		}
	}
}


const clearBoard = () => {

	let sqrs = document.querySelectorAll(".square")

	sqrs.forEach((sqr) => {
		sqr.textContent = "";
	})
}

const displayController = (() => {

	let _moveCounter = 0;
	const board = gameBoard._board; // inherit gameboard

	const counterFunc = () => {

		return (moveElem) => {

			let curPlayer = _moveCounter % 2 === 0 ? playerX : playerO;
			let curMark = curPlayer.getMark();

			moveElem.textContent = curMark;

			let curGame = board.moves
			curGame[moveElem.dataset.key] = curMark;

			let res = checkResult(curGame);

			if(res == true){
				alert(`${curPlayer.getName()} WON`);
				_moveCounter = 0;
				board.moves = Array(9).fill(null);
				clearBoard();
				return;
			} else if (res == "DRAW") {
				alert("DRAW!");
				_moveCounter = 0;
				board.moves = Array(9).fill(null);
				clearBoard()
				return;
			}
			_moveCounter++;
		}
	}

	return {counterFunc}
})()

var makeMove = displayController.counterFunc();

const playBtns = document.querySelectorAll(".makeMove")

playBtns.forEach((sqr) => {
	sqr.addEventListener('click', (e) => {
		let moveElem = e.target;
		if (moveElem.textContent != "") {
			return;
		}
		makeMove(moveElem);
	})
})