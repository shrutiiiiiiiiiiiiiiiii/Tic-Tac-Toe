let boxes = document.querySelectorAll(".box");
let ResetBtn = document.querySelector("#Reset-btn");
let NewBtn = document.querySelector("#New-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let currentPlayerDisplay = document.querySelector("#current-player");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const updateTurnIndicator = () => {
    if (currentPlayerDisplay) {
        currentPlayerDisplay.innerText = turnO ? "O" : "X";
    }
};

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("player-o", "player-x");
    });
    msgContainer.classList.add("hide");
    updateTurnIndicator();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("player-o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("player-x");
            turnO = true;
        }
        box.disabled = true;
        updateTurnIndicator();
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showMsg = (winner) => {
    msg.innerText = `🎉 Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBoxes();
                showMsg(pos1);
                return;
            }
        }
    }
};

NewBtn.addEventListener("click", resetGame);
ResetBtn.addEventListener("click", resetGame);