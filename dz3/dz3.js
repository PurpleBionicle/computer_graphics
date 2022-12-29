function Line(idata, x0, y0, x1, y1) {
    var y = y0;
    var eps = 0;
    var k = 2 * (y1 - y0);
    var pw = 1;
    for (var x = x0; x <= x1; x++) {
        idata.data[(x + y * idata.width) * 4 + 3] = 255 *
            Math.pow(Math.abs(0.5 - (eps / (2 * (x1 - x0)))), pw);
        idata.data[(x + (y + 1) * idata.width) * 4 + 3] = 255 *
            Math.pow(Math.abs(0.5 + (eps / (2 * (x1 - x0)))), pw);
        eps = eps + k;
        if (eps > (x1 - x0)) {
            y++;
            eps = eps - 2 * (x1 - x0);
        }
    }

}

var canvas = document.getElementById("lab03");
var ctx = canvas.getContext("2d");

var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
const center_x = 830;
const center_y = 435;
length_pow_2 = 270 * 270;
x = 1100;
y = 436;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (y > center_y) {
        y += 1;
        // y =y+abs(410 - Math.sqrt(length_pow_2 - x * x));
        x = Math.sqrt(length_pow_2 - Math.pow(center_y - y, 2)) + center_x;
        Line(idata, center_x, center_y, x, y);
        ctx.putImageData(idata, 0, 0);
    }
}

setInterval(draw, 80);

