var canvas = document.getElementById("lab07");
var ctx = canvas.getContext("2d");
var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
ctx.strokeStyle = "rgb(8,0,255)";
var dots = [{x: 40, y: 320},
    {x: 84, y: 200},
    {x: 110, y: 170},
    {x: 165, y: 20},
    {x: 50, y: 37}];
// Рисуем фигуру
for (i = 0; i < dots.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(dots[i].x, dots[i].y);
    ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
    ctx.stroke();
}
ctx.beginPath();
ctx.moveTo(dots[0].x, dots[0].y);
ctx.lineTo(dots[dots.length - 1].x, dots[dots.length - 1].y);
ctx.stroke();

var drawCutoffLine = function (x0, x1, y0, y1, polygonDots) {
    var lineStartParameter = 0;
    var lineEndParameter = 1;

    for (var i = 0; i < polygonDots.length; i++) {
        var x3 = polygonDots[i].x;
        var y3 = polygonDots[i].y;
        var x4 = polygonDots[(i + 1) % polygonDots.length].x;
        var y4 = polygonDots[(i + 1) % polygonDots.length].y;
        var directionNumber = (y4 - y3) * (x1 - x0) - (x4 - x3) * (y1 - y0);
        var intersectionParameter = ((y3 - y0) * (x4 - x3) - (x3 - x0) * (y4 - y3))
            / ((y1 - y0) * (x4 - x3) - (x1 - x0) * (y4 - y3));

        if (directionNumber < 0) {
            if (intersectionParameter < lineEndParameter) {
                lineEndParameter = intersectionParameter;
            }
        } else if (directionNumber > 0) {
            if (intersectionParameter > lineStartParameter) {
                lineStartParameter = intersectionParameter;
            }
        }
    }

    if (lineStartParameter <= lineEndParameter) {
        ctx.beginPath();
        ctx.moveTo(x0 + lineStartParameter * (x1 - x0), y0 + lineStartParameter * (y1 - y0));
        ctx.lineTo(x0 + lineEndParameter * (x1 - x0), y0 + lineEndParameter * (y1 - y0));
        ctx.stroke();
    }
};


canvas.addEventListener('mousedown', function (event) {
    x1 = event.clientX;
    y1 = event.clientY;
});

canvas.addEventListener('mouseup', function (event) {
    x2 = event.clientX;
    y2 = event.clientY;
    drawCutoffLine(x1, x2, y1, y2, dots);
});

