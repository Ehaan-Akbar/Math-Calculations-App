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

let centerX = 1;
let centerY = 1;
let zoom = 4;
let originX, originY;

function drawGraph() {
    //Sets context of graph
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, width, height);
    originX = cx(-centerX*100*zoom);
    originY = cy(-centerY*100*zoom);
    const step = 25*zoom;

    //Vertical Grid Lines
    for (let n = Math.ceil(-originX/step); originX + n*step <= width; n++) {
        let x = originX + n*step;
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 2;
        if (n == 0) {
            ctx.strokeStyle = "#8d8d8d";
        } else if (n % 4 != 0) {
            ctx.lineWidth = 0.5;
        }
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    //Horizontal Grid Lines
    for (let n = Math.ceil(-originY/step); originY + n*step <= height; n++) {
        let y = originY + n*step;
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 2;
        if (n == 0) {
            ctx.strokeStyle = "#8d8d8d";
        } else if (n % 4 != 0) {
            ctx.lineWidth = 0.5;
        }
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    let line1 = document.getElementById("graphInput").value.replaceAll(' ', '');
    let line2 = document.getElementById("graphInput2").value.replaceAll(' ', '');
    let line3 = document.getElementById("graphInput3").value.replaceAll(' ', '');

    try {
        if (line1) {
            graph(line1, "red");
        }
    } catch (error) {
        alert("Graph 1 Invalid expression or not supported");
    }
    try {
        if (line2) {
            graph(line2, "blue");
        }
    } catch (error) {
        alert("Graph 2 Invalid expression or not supported");
    }
    try {
        if (line3) {
            graph(line3, "green");
        }
    } catch (error) {
        alert("Graph 3 Invalid expression or not supported");
    }
}

function graph(line, color) {
    //Loops through the graph
    for (let i = -originX; i < width-originX; i++) {

        //Evaluates the current and next y value of the graph
        //Replaces common math expressions with their javascript Math equivalents
        let y1 = eval(line.replaceAll("x", i/100/zoom).replaceAll("^","**").replaceAll("sin", "Math.sin").replaceAll("cos", "Math.cos").replaceAll("tan", "Math.tan")
        .replaceAll("pi", "Math.PI").replaceAll("e", "Math.E").replaceAll("log", "Math.log").replaceAll("sqrt", "Math.sqrt").replaceAll("abs", "Math.abs").replaceAll("x", "(x)"));

        let y2 = eval(line.replaceAll("x", (i+1)/100/zoom).replaceAll("^","**").replaceAll("sin", "Math.sin").replaceAll("cos", "Math.cos").replaceAll("tan", "Math.tan")
        .replaceAll("pi", "Math.PI").replaceAll("e", "Math.E").replaceAll("log", "Math.log").replaceAll("sqrt", "Math.sqrt").replaceAll("abs", "Math.abs").replaceAll("x", "(x)"));

        //Gets distance between the 2 y values
        let d = y2*100 - y1*100;

        //Interpolates between the 2 y values to fill in any gaps in the graph (like anti-aliasing)
        ctx.fillStyle = color;
        ctx.fillRect(originX + i, originY - y1*100*zoom, 2, 2);
        for (let j = 1; j < Math.abs(d); ++j) {
            ctx.fillRect(originX + i + 1, originY - (y1*100 + j*Math.sign(d))*zoom, 2, 2);
        }
    }
}

drawGraph();
