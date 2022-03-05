const table = document.getElementById("table");
const game_over_div = document.getElementById("game_over");
const game_over_header = document.createElement("h2");
game_over_header.setAttribute("id", "game_over_header");
game_over_div.appendChild(game_over_header);
generateTable();

function generateTable() {
    table.innerHTML = "";
    game_over_header.innerText = "click on a cell";
    let cell, row;
    for (let i = 0; i < 10; i++) {
        row = table.insertRow(i);
        for (let j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () {
                clickCell(this);
            }
            const mine = document.createAttribute("is_mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    addMines();
}

function addMines() {
    for (let i = 0; i < 10; i++) {
        const row = Math.trunc(Math.random() * 10);
        const col = Math.trunc(Math.random() * 10);
        const cell = table.rows[row].cells[col];
        cell.setAttribute("is_mine", "true");
    }
}

function clickCell(cell) {
    let j, i, mineCount = 0;
    const cellRow = cell.parentNode.rowIndex;
    const cellCol = cell.cellIndex;
    if (cell.getAttribute("is_mine") === "true") {
        uncoverMines();
        game_over_header.innerText = "Game Over! You Lost";
    } else {
        cell.className = "clicked";
        for (i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                if (table.rows[i].cells[j].getAttribute("is_mine") === "true")
                    mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount === 0) {
            for (i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    if (table.rows[i].cells[j].innerHTML === "")
                        clickCell(table.rows[i].cells[j]);
                }
            }
        }
        isGameOver();
    }
}

function uncoverMines() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = table.rows[i].cells[j];
            if (cell.getAttribute("is_mine") === "true") cell.className = "mine";
        }
    }
}

function isGameOver() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((table.rows[i].cells[j].getAttribute("is_mine") === "false") &&
                (table.rows[i].cells[j].innerHTML === ""))
                return;
        }
    }
    game_over_header.innerText = "Congratulations! You Win";
    uncoverMines();
}