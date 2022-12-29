let canvas = document.getElementById('lesson02');
let ctx = canvas.getContext('2d');


var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

function draw_line(x, y, start_x, start_y, r, g, b) {
    for (var j = 0; j < y; j++) {
        for (var i = 0; i < x; i++) {
            data.data[1500 * 4 * (start_y + j) + (start_x + i) * 4] = r;
            data.data[1500 * 4 * (start_y + j) + (start_x + i) * 4 + 1] = g;
            data.data[1500 * 4 * (start_y + j) + (start_x + i) * 4 + 2] = b;
            data.data[1500 * 4 * (start_y + j) + (start_x + i) * 4 + 3] = 255; //alfa canal
        }
    }
}

for (var j = 0; j < 100; j++) {
    for (var i = 0; i < 40; i++) {
        //red
        data.data[1500 * 4 * (9 + j) + (9 + i) * 4] = 255;
        data.data[1500 * 4 * (9 + j) + (9 + i) * 4 + 3] = 255; //alfa canal
    }
}

//purple
draw_line(70, 10, 49, 9, 138, 43, 226);
draw_line(90, 10, 39, 19, 138, 43, 226);
draw_line(110, 10, 29, 29, 138, 43, 226);
draw_line(130, 10, 19, 39, 138, 43, 226);
draw_line(150, 20, 9, 49, 138, 43, 226);
draw_line(130, 10, 19, 69, 138, 43, 226);
draw_line(110, 10, 29, 79, 138, 43, 226);
draw_line(90, 10, 39, 89, 138, 43, 226);
draw_line(70, 10, 49, 99, 138, 43, 226);

//white
draw_line(20, 10, 109, 39, 255, 255, 255);
draw_line(40, 20, 99, 49, 255, 255, 255);
draw_line(20, 10, 109, 69, 255, 255, 255);

//black
draw_line(20, 20, 109, 49, 0, 0, 0);

ctx.putImageData(data, 0, 0);
j = 0;

function draw_fish() {
    // ctx.clearRect (0, 0, canvas.width, canvas.height);
    j += 10;
    var img = new Image();
    img.src = "./fish.png";
    img.onload = function () {
        ctx.drawImage(img, j + 10, 10, 150, 100);
    };
}

k = 0;

function draw_spange() {
    if (k < 500) {
        k += 5;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = "./sq.webp";
    img.onload = function () {
        ctx.drawImage(img, k + 10, 500 - k / 5, 200, 300);
    };
}

setInterval(draw_fish, 100);
setInterval(draw_spange, 100);

// download_img = function (el) {
// get image URI from canvas object
// var imageURI = canvas.toDataURL("image/png");
// el.href = imageURI;
// };
