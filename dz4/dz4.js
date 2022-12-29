let canvas = document.getElementById('lab04');
let context = canvas.getContext('2d');

var R = 250;
var x = 0;
var y = R;
var x1 = 810;
var y1 = 375;
var delta = 1 - 2 * R;
var error = 0;
colors = ['#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#DC143C', '#FF0000', '#B22222', '#8B0000']


function draw_cirlce() {

    var idata = context.getImageData(0, 0, canvas.width, canvas.height);


    function draw_line(x, y) {
        idata.data[1620 * 4 * y + x * 4] = 0;
        idata.data[1620 * 4 * y + x * 4 + 1] = 230;
        idata.data[1620 * 4 * y + x * 4 + 2] = 230;
        idata.data[1620 * 4 * y + x * 4 + 3] = 250; //alfa canal
    }

    while (y >= x) {
        draw_line(x1 + x, y1 + y)
        draw_line(x1 + x, y1 - y)
        draw_line(x1 - x, y1 + y)
        draw_line(x1 - x, y1 - y)
        draw_line(x1 + y, y1 + x)
        draw_line(x1 + y, y1 - x)
        draw_line(x1 - y, y1 + x)
        draw_line(x1 - y, y1 - x)
        draw_line(x1 - y, y1 - x)
        error = 2 * (delta + y) - 1
        if ((delta < 0) && (error <= 0)) {
            delta += 2 * ++x + 1
            continue
        }
        if ((delta > 0) && (error > 0)) {
            delta -= 2 * --y + 1
            continue
        }
        delta += 2 * (++x - --y)
    }

    x = 0;
    y = R;
    delta = 1 - 2 * R;
    error = 0;
    context.putImageData(idata, 0, 0)
}

draw_cirlce()


