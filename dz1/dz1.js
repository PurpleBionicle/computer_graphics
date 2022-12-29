    let canvas = document.getElementById("lesson01");
    let context = canvas.getContext("2d");


    pos = 0;

    function draw_ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
}

    function draw_arc(x, y, radius, startAngle, endAngle) {
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.fill();
}

    function fillRect(style, x, y, width, height) {
    context.beginPath();
    context.fillStyle = style;
    context.fillRect(x, y, width, height);

    context.fill();
}

    function draw_fish() {
    pos += 1;
    //body fish
    context.fillStyle = '#4177ea';
    draw_ellipse(100 + pos, 100, 100, 50, 0, 0, 2 * Math.PI);
    context.fill();

    //eye
    context.fillStyle = '#efebeb';
    draw_arc(170 + pos, 100, 20, 0, 2 * Math.PI)

    // eye
    context.fillStyle = '#0e0e0e'
    draw_arc(180 + pos, 100, 10, 0, 2 * Math.PI)

    //fin fish
    context.strokeStyle = '#f5032e';
    draw_ellipse(100 + pos, 100, 50, 100, Math.PI / 2, 0, Math.PI)
    context.stroke();

    //arc fish
    context.strokeStyle = '#0e0e0e';
    draw_ellipse(160 + pos, 100, 40, 40, Math.PI / 2, 0, Math.PI)
    context.stroke();

    context.beginPath()
    context.clearRect(0, 0, pos, 200)
}

    pos_x = 0;


    function draw_spange_bob() {
    if (pos_x < 600) {
    pos_x += 1
}

    //body
    fillRect('#eed55b', window.innerWidth - 900 + pos_x, window.innerHeight - 300 - (pos_x / 6), 100, 100);

    //shorts
    fillRect('#f3f1f1', window.innerWidth - 900 + pos_x, window.innerHeight - 220 - (pos_x / 6), 100, 20);
    fillRect('#654321', window.innerWidth - 900 + pos_x, window.innerHeight - 200 - (pos_x / 6), 100, 30);

    context.beginPath()
    context.clearRect(window.innerWidth - 900, window.innerHeight - 300 - (pos_x / 6), pos_x, 100)

    //left arm
    fillRect('#eed55b', window.innerWidth - 920 + pos_x, window.innerHeight - 250 - (pos_x / 6), 20, 80);

    //right arm
    fillRect('#eed55b', window.innerWidth - 800 + pos_x, window.innerHeight - 250 - (pos_x / 6), 20, 80);

    context.beginPath()
    context.clearRect(window.innerWidth - 920, window.innerHeight - 250 - (pos_x / 6), pos_x, 200)

    //left leg
    fillRect('#eed55b', window.innerWidth - 890 + pos_x, window.innerHeight - 170 - (pos_x / 6), 15, 60);

    context.beginPath()
    context.clearRect(window.innerWidth - 890, window.innerHeight - 170 - (pos_x / 6), pos_x, 70)

    //right leg
    fillRect('#eed55b', window.innerWidth - 820 + pos_x, window.innerHeight - 170 - (pos_x / 6), 15, 60);

    context.beginPath()
    context.clearRect(window.innerWidth - 820 + pos_x, window.innerHeight - 170 - (pos_x / 6), 1, 70)

}

    setInterval(draw_fish, 10);
    // x=600 , y=100
    setInterval(draw_spange_bob, 20);

