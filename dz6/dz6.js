var canvas = document.getElementById("lab06");
var ctx = canvas.getContext("2d");
var xl1 = [1500, 500, 200], xl2 = [240, 500, 1500], yl1 = [300, 1800, 400], yl2 = [900, 300, 1600];

for (var i = 0; i < xl1.length; i++) {
    ctx.beginPath()
    ctx.moveTo(xl1[i], yl1[i])
    ctx.lineTo(xl2[i], yl2[i])
    ctx.stroke()
}

canvas.addEventListener('mousedown', function (event) {
    xs1 = event.clientX;
    ys1 = event.clientY;
});

var Xmin = 0, Xmax = 0, Ymin = 0, Ymax = 0;

canvas.addEventListener('mouseup', function (event) {
    xs2 = event.clientX;
    ys2 = event.clientY;

    if (xs1 < xs2) {
        Xmin = xs1;
        Xmax = xs2;
    } else {
        Xmin = xs2;
        Xmax = xs1;
    }

    if (ys1 < ys2) {
        Ymin = ys1;
        Ymax = ys2;
    } else {
        Ymin = ys2;
        Ymax = ys1;
    }

    for (var x = Xmin; x <= Xmax; x++) {
        ctx.fillRect(x, Ymin, 1, 1);
        ctx.fillRect(x, Ymax, 1, 1);
    }

    for (var y = Ymin; y <= Ymax; y++) {
        ctx.fillRect(Xmin, y, 1, 1);
        ctx.fillRect(Xmax, y, 1, 1);
    }

    for (var j = 0; j < xl1.length; j++) {
        var p = [xl1[j] - xl2[j], xl2[j] - xl1[j], yl1[j] - yl2[j], yl2[j] - yl1[j]];
        var q = [xl1[j] - Xmin, Xmax - xl1[j], yl1[j] - Ymin, Ymax - yl1[j]];
        var t0 = 0, t1 = 1, flag = 1;

        top:
            for (var i = 0; i < 4; i++) {
                if (p[i] > 0) {
                    if (t1 > q[i] / p[i])
                        t1 = q[i] / p[i];
                }
                if (p[i] < 0) {
                    if (t0 < q[i] / p[i])
                        t0 = q[i] / p[i];
                }
                if (p[i] == 0) {
                    if (q[i] < 0) {
                        flag = 0;
                        break top;
                    }
                }
            }

        ctx.beginPath()
        ctx.moveTo(xl1[j], yl1[j])
        ctx.lineTo(xl2[j], yl2[j])
        ctx.strokeStyle = "white";
        ctx.stroke()

        if (flag) {
            var xn1 = xl1[j] + p[1] * t0;
            var yn1 = yl1[j] + p[3] * t0;
            var xn2 = xl1[j] + p[1] * t1;
            var yn2 = yl1[j] + p[3] * t1;

            ctx.beginPath()
            ctx.moveTo(xn1, yn1)
            ctx.lineTo(xn2, yn2)
            ctx.strokeStyle = "black";
            ctx.stroke()
        }
    }
});

var link = document.createElement("a");
link.innerHTML = 'save image';
link.addEventListener('click', function (event) {
    link.href = canvas.toDataURL();
    link.download = "canvas.png";
}, false)
document.body.appendChild(link);
