var canvas = document.getElementById("classwork_3");
var context = canvas.getContext("2d");
var a = {a: 0};

function get_spec_variables(p_0, p_1, p_2) {
    var p_0_ = {X: 0, Y: 0};
    var p_1_ = {X: 0, Y: 0};
    var p_0__ = {X: 0, Y: 0};
    p_0_.X = p_0.X * 0.5 + p_1.X * 0.5;
    p_1_.X = p_1.X * 0.5 + p_2.X * 0.5;
    p_0__.X = p_0_.X * 0.5 + p_1_.X * 0.5;

    p_0_.Y = p_0.Y * 0.5 + p_1.Y * 0.5;
    p_1_.Y = p_1.Y * 0.5 + p_2.Y * 0.5;
    p_0__.Y = p_0_.Y * 0.5 + p_1_.Y * 0.5;

    return [p_0_, p_0__, p_1_];
}

function get_D(p_0, p_1, p_2) {
    var N_y = p_2.X - p_0.X;
    var N_x = p_0.Y - p_2.Y;

    var chisl = ((p_1.X - p_0.X) * N_x + (p_1.Y - p_0.Y) * N_y);

    var D = chisl / Math.sqrt((Math.pow(N_x, 2)) + (Math.pow(N_y, 2)));
    return Math.abs(D) < 1;
}

function Bezier(p_0, p_1, p_2) {
    if (!get_D(p_0, p_1, p_2)) {
        var spec_var = get_spec_variables(p_0, p_1, p_2);
        Bezier(p_0, spec_var[0], spec_var[1]);
        Bezier(spec_var[1], spec_var[2], p_2);
    } else {
        context.beginPath();
        context.moveTo(p_0.X, p_0.Y);
        context.lineTo(p_2.X, p_2.Y);
        context.stroke();
    }
}

Bezier({X: 50, Y: 50}, {X: 200, Y: 500}, {X: 400, Y: 150})
