const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = 1000;
let height = 600;

canvas.width = width;
canvas.height = height;

const cy = (y) => {
    return height/2 - y;
}

const cx = (x) => {
    return width/2 + x;
}

ctx.fillStyle = "White";
ctx.fillRect(0, 0, width, height);

let centerX = 1;
let centerY = 1;
let zoom = 1;

for (let x = 0; x <= width; x += 25) {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    if (x == width/2 - 100*centerX) {
        ctx.strokeStyle = "#8d8d8d";
    } else if (x % 100 != 0) {
        ctx.lineWidth = 0.5;
    }
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
}

for (let y = 0; y <= height; y += 25) {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    if (y == height/2 + 100*centerY) {
        ctx.strokeStyle = "#8d8d8d";
    } else if (y % 100 != 0) {
        ctx.lineWidth = 0.5;
    }
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
}

function evaluate(line) {
    line = line.replaceAll(' ', '');
    let list = line.split(/([*+/-=])/);

    if (line.includes("x")) {
        graph(line);
    } else {
        return eval(line);
    }


}

function graph(line) {
    for (let i = -width/2 + centerX*100; i < width/2 + centerX*100; i++) {
        let y1 = eval(line.replaceAll("x", i/100/zoom).replaceAll("^","**").replaceAll("sin", "Math.sin"));
        let y2 = eval(line.replaceAll("x", (i+1)/100/zoom).replaceAll("^","**").replaceAll("sin", "Math.sin"));
        let d = y2*100 - y1*100;

        ctx.fillStyle = "red";
        ctx.fillRect(cx(i-centerX*100), cy((y1-centerY)*100*zoom), 1, 1);
        for (let j = 1; j < Math.abs(d); ++j) {
            ctx.fillRect(cx(i + 1), cy(((y1-centerY)*100 + j*Math.sign(d))*zoom), 1, 1);
        }
    }
}

graph("sin(x)");