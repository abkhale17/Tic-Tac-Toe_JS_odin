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

const displayController = (() => {
	let _moveCounter = 0;
	const board = gameBoard._board; // inherit gameboard

	const counterFunc = () => {
		return (moveElem) => {
			let curPlayer = _moveCounter % 2 === 0 ? playerX : playerO;
			let curMark = curPlayer.getMark();
			moveElem.textContent = curMark;
			board.moves[moveElem.dataset.key] = curMark;
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