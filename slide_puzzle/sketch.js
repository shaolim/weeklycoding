let source;

// tiles configuration
let tiles = [];
let cols = 4;
let rows = 4;
let w, h;
let blankIndex;

// order of tiles 
let board = [];

const numOfShuffle = 100;

function preload() {
    source = loadImage("choochoobot.png");
}

function setup() {
    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;

            let img = createImage(w, h);
            img.copy(source, x, y, w, h, 0, 0, w, h);
            
            let index = i + j * cols;
            let tile = new Tile(index, img);
            tiles.push(tile);

            board.push(index);
        }
    }

    // remove last tile
    board.pop();
    tiles.pop();
    // -1 means empty spot
    board.push(-1);
    blankIndex = board.length - 1;

    simpleShuffle(board);
}

function simpleShuffle(arr) {
    for (let i = 0; i < numOfShuffle; i++) {
        randomMove(arr);
    }
}

function randomMove(arr) {
    let r1 = floor(random(cols));
    let r2 = floor(random(rows));
    move(r1, r2, arr);

}

function move(i, j, arr) {
    let blankCol = blankIndex % cols;
    let blankRow = floor(blankIndex / rows);

    if (isNeighbor(i, j, blankCol, blankRow)) {
        let index = i + j * cols;
        swap(blankIndex, index, arr);
        blankIndex = index;
    }
}

function isNeighbor(i, j, x, y) {
    if (i !== x && j !== y) {
        return false;
    }

    if (abs(i - x) === 1 || abs(j - y) === 1) {
        return true;
    }

    return false;
}

function swap(i, j, arr) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let index = i + j * cols;
            let x = i * w;
            let y = j * h;
            let tileIndex = board[index];
            if (tileIndex > -1) {
                let img = tiles[tileIndex].img;
                image(img, x, y, w, h);
            }
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            strokeWeight(2);
            noFill();
            rect(x, y, w, h);
        }
    }
}

function mousePressed() {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    move(i, j, board);
}