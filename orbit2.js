var degrees = 0;
var layer_pos_x = 0;
var layer_pos_y = 0;
var radius = 16;
var speed = 50 ;
var center_pos_x = 0;
var center_pos_y = 0;
var desc = "";
var rot_x = 0;
var rot_y = 0;

function myOrbit(y,x) {

center_pos_x = parseInt(x);
center_pos_y = parseInt(y);

if (degrees == 360) {
	degrees = 0;}
else {degrees = degrees + 5};

rot_x = Math.round(radius * Math.cos(degrees * ((Math.PI)/180)));
rot_y = Math.round(radius * Math.sin(degrees * ((Math.PI)/180)));

layer_pos_x = center_pos_x + rot_x;
layer_pos_y = center_pos_y - rot_y;

document.getElementById('pip').style.top = layer_pos_y - 7;
document.getElementById('pip').style.left = layer_pos_x - 2;

document.getElementById('marker').innerHTML = "<font face=verdana size=1 color='#000000'>Marker currently orbiting " + center_pos_x + "," + center_pos_y + ", Radius " + radius + ", Speed " + speed + " at " + degrees + " deg.";
document.getElementById('marker').style.left = (parseInt(document.body.clientWidth))/2 - 150;

window.setTimeout('myOrbit(center_pos_y,center_pos_x)',speed);

return;

}

function runtime() {
var today = new Date();
var display= today.toLocaleString();
document.getElementById('time').innerHTML = "<font face=verdana size=1>" + display + "</font>";
window.setTimeout('runtime()',1000);
}

function getbrowser() {
type = navigator.appName;
  tv = navigator.appVersion
ver = tv.substring(0,tv.indexOf("."))
  // required for NN6
  if (ver == 5) ver = 6
  // required for IE5+
  bv=tv.indexOf("MSIE")
  if ( bv!= -1) {ver = tv.substring(bv+5,bv+6)}
typever = type + " " + ver;
document.getElementById('browser_layer').innerHTML = "<font face=verdana size=1>" + typever + " (IE6/NS6 tested)</font>";

}