degrees = 0;
radius = 0;
layer_pos_x = 0;
layer_pos_y = 0;
number_moons = 8;
spawn_count = 1;
count = 1;
status = "";
loop = 0;
speed = 1;

function getpositions() {

screen_height = parseInt(document.body.clientHeight);
screen_width = parseInt(document.body.clientWidth);
centre_y = screen_height/2;
centre_x = screen_width/2;
document.getElementById('planet').style.top = centre_y - 100;
document.getElementById('planet').style.left = centre_x - 100;
document.getElementById('planetdetails').innerHTML = "<font face=verdana size=1>Planet Centre<BR>X: " + centre_x + ", Y: " + centre_y + "</font>";

myOrbit();
}

moons = new Array(number_moons);
deg = new Array(number_moons);

function myOrbit() {

loop++;

radius_multi = (parseInt(document.getElementById('planet').style.top)) - 100;

if (loop <= number_moons) {
var radius = (Math.round(Math.random()*radius_multi)) + 150;
var degree = Math.round(Math.random()*360);
moons[count-1] = radius;
deg[count-1] = degree;
}

if (count <= number_moons) {

if (deg[count-1] == 360) {
	deg[count-1] = 0;}
else {deg[count-1]++};

rot_x = Math.round(moons[count-1] * Math.cos(deg[count-1] * ((Math.PI)/180)));
rot_y = Math.round(moons[count-1] * Math.sin(deg[count-1] * ((Math.PI)/180)));

layer_pos_x = centre_x + rot_x;
layer_pos_y = centre_y - rot_y;

layer = "moon" + count;

document.getElementById(layer).style.top = layer_pos_y - 25;
document.getElementById(layer).style.left = layer_pos_x - 25;

content = "moon" + count + "details";

document.getElementById(content).innerHTML = "<font face=verdana size=1>" + count + ".<BR>R: " + moons[count-1] + "<BR>D: " + deg[count-1] + "<BR>" + (layer_pos_x-25) + "," + (layer_pos_y-25) + "</font>";

document.getElementById(content).style.top = layer_pos_y - 25;
document.getElementById(content).style.left = layer_pos_x + 30;

if (count == number_moons) {
	count = 1;}
else {count++;}

window.setTimeout('myOrbit()',speed);

}
}
