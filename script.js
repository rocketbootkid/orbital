<!-- Define Global Variables -->
type = "";
tv = "";
ver = "";
bv = "";
acount = 0;
bcount = 0;
a_x_diff = 0;
a_y_diff = 0;
b_x_diff = 0;
b_y_diff = 0;
a_x_pos = 0;
a_y_pos = 0;
b_x_pos = 0;
b_y_pos = 0;
bname = "";
bspeed = 0;
bbrave = 0;
bweapon = 0;
bdetect = 0;
breact = 0;
bhp = 0;
bdamage = 0;
aname = "";
aspeed = 0;
abrave = 0;
aweapon = 0;
adetect = 0;
areact = 0;
ahp = 0;
adamage = 0;
pause = 0;
astatus = "Alive";
bstatus = "Alive";
test_speed_multiplier = 50;
gameover = 0;
dojo_width = 800;
dojo_height = 650;
dojo_x_offset = 170;
dojo_y_offset = 45;
a_bravery_factor = 0;
b_bravery_factor = 0;
a_status_run = 0;
a_status_fight = 0;
a_status_alive = 0;
a_status_dead = 0;
b_status_run = 0;
b_status_fight = 0;
b_status_alive = 0;
b_status_dead = 0;
a_init_hp = 0;
b_init_hp = 0;


function updateMulti(speed) {
	test_speed_multiplier = speed;
} 

function pauseFight(state) {
	pause = state;
}

function runClock() {
today = new Date();
display= today.toLocaleString();
document.getElementById('refresh').innerHTML = "<font face=verdana size=1><u>Last refresh:</u> " + display + "</font>";
}

function runtime() {
today = new Date();
display= today.toLocaleString();
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



function start(a_name,a_id,a_speed,a_brave,a_weapon,a_detect,a_react,a_hp,a_damage,b_name,b_id,b_speed,b_brave,b_weapon,b_detect,b_react,b_hp,b_damage) {

<!-- Generate Random Start Positions for both bots -->
a_x_start = Math.round(Math.random()*dojo_width) + dojo_x_offset;
a_y_start = Math.round(Math.random()*dojo_height) + dojo_y_offset;
b_x_start = Math.round(Math.random()*dojo_width) + dojo_x_offset;
b_y_start = Math.round(Math.random()*dojo_height) + dojo_y_offset;

<!-- Position Dojo -->
document.getElementById('dojo').style.top = dojo_y_offset;
document.getElementById('dojo').style.left = dojo_x_offset;
document.getElementById('dojo').style.width = dojo_width;
document.getElementById('dojo').style.height = dojo_height;

<!-- Position Bots at Start Positions -->
document.getElementById('abot').style.left = a_x_start;
document.getElementById('abot').style.top = a_y_start;
document.getElementById('bbot').style.left = b_x_start;
document.getElementById('bbot').style.left = b_y_start;

document.getElementById('dojo').innerHTML = "<FONT FACE='verdana' SIZE='1' COLOR='lightgrey'>A Start: " + a_x_start + "," + a_y_start + "<BR>B Start: " + b_x_start + "," + b_y_start + "</font>";

a_init_hp = a_hp;
b_init_hp = b_hp;

<!-- Start individual Bot functions -->
afight(a_name,a_id,a_speed,a_brave,a_weapon,a_detect,a_react,a_hp,a_damage);
bfight(b_name,b_id,b_speed,b_brave,b_weapon,b_detect,b_react,b_hp,b_damage);
}



<!-- Bot A Function -->

function afight(a_name,a_id,a_speed,a_brave,a_weapon,a_detect,a_react,a_hp,a_damage) {

if (gameover == 0) {

if (pause == 0) {
	
	aname = a_name;
	aid = a_id;
	aspeed = 2;
	abrave = parseInt(a_brave);
	aweapon = parseInt(a_weapon);
	adetect = parseInt(a_detect);
	areact = parseInt(a_react);
	ahp = parseInt(a_hp);
	adamage = parseInt(a_damage);

	acount = acount + 1

	<!-- Determine A Bot posn -->
	a_x_pos = parseInt(document.getElementById('abot').style.left);
	a_y_pos = parseInt(document.getElementById('abot').style.top);

	<!-- Determine Range to Bot B -->
	a_x_diff = parseInt(document.getElementById('bbot').style.left) - parseInt(document.getElementById('abot').style.left);
	a_y_diff = parseInt(document.getElementById('bbot').style.top) - parseInt(document.getElementById('abot').style.top);
	arange = Math.sqrt((a_x_diff*a_x_diff) + (a_y_diff*a_y_diff));
	if (isNaN(arange)) {
		arange = 0;
	}

	<!-- Only need to determine if Bot is brave if within weapon range -->
	if (arange <= aweapon) {
	<!-- Determine Bravery-related movement -->
	a_bravery_factor = Math.round(Math.random()*abrave);
	if (a_bravery_factor <= (abrave/2)) {
		astatus = "Running";
		a_status_run = a_status_run + 1;}
	else {
		astatus = "Fighting!";
		a_status_fight = a_status_fight + 1;
	}
	}
	else {
		a_bravery_factor = 5;
		astatus = "Alive";
		a_status_alive = a_status_alive + 1;
	}

	<!-- Determine how to move layer in X -->
	if (a_x_diff < 0) {
		if (a_bravery_factor >= (abrave/2)) {
		document.getElementById('abot').style.left = parseInt(document.getElementById('abot').style.left) - 2;}
		else {
		document.getElementById('abot').style.left = parseInt(document.getElementById('abot').style.left) + 2;}
	}
	if (a_x_diff > 0) {
		if (a_bravery_factor >= (abrave/2)) {
		document.getElementById('abot').style.left = parseInt(document.getElementById('abot').style.left) + 2;}
		else {
		document.getElementById('abot').style.left = parseInt(document.getElementById('abot').style.left) - 2;}
	}
	
	<!-- Determine how to move layer in Y -->
	if (a_y_diff < 0) {
		if (a_bravery_factor >= (abrave/2)) {
		document.getElementById('abot').style.top = parseInt(document.getElementById('abot').style.top) - 2;}
		else {
		document.getElementById('abot').style.top = parseInt(document.getElementById('abot').style.top) + 2;}
	}
	if (a_y_diff > 0) {
		if (a_bravery_factor >= (abrave/2)) {
		document.getElementById('abot').style.top = parseInt(document.getElementById('abot').style.top) + 2;}
		else {
		document.getElementById('abot').style.top = parseInt(document.getElementById('abot').style.top) - 2;}
	}

	<!-- If not running away -->	
	if (a_bravery_factor >= (abrave/2)) {
		<!-- Inflict Damage if in Range -->
		if (arange <= aweapon) {
			bhp = parseInt(bhp) - parseInt(adamage);
		}
	}

	if (ahp <= 0) {
		astatus = "Dead";
		a_status_dead = a_status_dead + 1;
	}

	<!-- Write data to Information Layer -->
	document.getElementById('astat').innerHTML = "<font face=arial size=1>Range: " + Math.round(arange) + "<BR>Pos: " + a_x_pos + "," + a_y_pos + "<BR>Delta: " + a_x_diff + "," + a_y_diff + "<BR>HP: " + ahp + "<BR>Damage: " + adamage + "<BR>Status: " + astatus + "<BR>A.F.R.D: " + a_status_alive + "." + a_status_fight + "." + a_status_run + "." + a_status_dead;

	} <!-- Close Pause -->

	<!-- If Bot dead, don't carry on -->
	if (ahp > 0) {
		<!-- Trigger function -->
		window.setTimeout('afight(aname,aid,aspeed,abrave,aweapon,adetect,areact,ahp,adamage)',(1/aspeed)*test_speed_multiplier);}
	else {
		<!-- If i'm dead, concede defeat -->
		winner(bname);
	}
	
} <!-- Close Gameover -->

} <!-- Close function -->



<!-- Bot B Function -->

function bfight(b_name,b_id,b_speed,b_brave,b_weapon,b_detect,b_react,b_hp,b_damage) {

if (gameover == 0) {

if (pause == 0) {

	bname = b_name;
	bid = b_id;
	bspeed = 2;
	bbrave = parseInt(b_brave);
	bweapon = parseInt(b_weapon);
	bdetect = parseInt(b_detect);
	breact = parseInt(b_react);
	bhp = parseInt(b_hp);
	bdamage = parseInt(b_damage);

	bcount = bcount + 1

	<!-- Determine B Bot posn -->
	b_x_pos = parseInt(document.getElementById('bbot').style.left);
	b_y_pos = parseInt(document.getElementById('bbot').style.top);

	<!-- Determine Range to Bot A -->
	b_x_diff = parseInt(document.getElementById('abot').style.left) - parseInt(document.getElementById('bbot').style.left);
	b_y_diff = parseInt(document.getElementById('abot').style.top) - parseInt(document.getElementById('bbot').style.top);
	brange = Math.sqrt((b_x_diff*b_x_diff) + (b_y_diff*b_y_diff));
	if (isNaN(brange)) {
		brange = 0;
	}
	
	<!-- Only need to determine if Bot is brave if within weapon range -->
	if (brange <= bweapon) {
	<!-- Determine Bravery-related movement -->
	b_bravery_factor = Math.round(Math.random()*bbrave);
	if (b_bravery_factor <= (bbrave/2)) {
		bstatus = "Running";
		b_status_run = b_status_run + 1;}
	else {
		bstatus = "Fighting!";
		b_status_fight = b_status_fight + 1;
	}
	}
	else {
		b_bravery_factor = 5;
		bstatus = "Alive";
		b_status_alive = b_status_alive + 1;
	}

	<!-- Determine how to move layer in X -->
	if (b_x_diff < 0) {
		if (b_bravery_factor >= (bbrave/2)) {
		document.getElementById('bbot').style.left = parseInt(document.getElementById('bbot').style.left) - 2;}
		else {
		document.getElementById('bbot').style.left = parseInt(document.getElementById('bbot').style.left) + 2;}
	}
	
	if (b_x_diff > 0) {
		if (b_bravery_factor >= (bbrave/2)) {
		document.getElementById('bbot').style.left = parseInt(document.getElementById('bbot').style.left) + 2;}
		else {
		document.getElementById('bbot').style.left = parseInt(document.getElementById('bbot').style.left) - 2;}
	}

	<!-- Determine how to move layer in Y -->
	if (b_y_diff < 0) {
		if (b_bravery_factor >= (bbrave/2)) {
		document.getElementById('bbot').style.top = parseInt(document.getElementById('bbot').style.top) - 2;}
		else {
		document.getElementById('bbot').style.top = parseInt(document.getElementById('bbot').style.top) + 2;}
	}
	if (b_y_diff > 0) {
		if (b_bravery_factor >= (bbrave/2)) {
		document.getElementById('bbot').style.top = parseInt(document.getElementById('bbot').style.top) + 2;}
		else {
		document.getElementById('bbot').style.top = parseInt(document.getElementById('bbot').style.top) - 2;}
	}

	<!-- If not running away -->
	if (b_bravery_factor >= (bbrave/2)) {
		<!-- Inflict Damage if in Range -->
		if (brange <= bweapon) {
			ahp = parseInt(ahp) - parseInt(bdamage);
		}
	}

	if (bhp <= 0) {
		bstatus = "Dead";
		b_status_dead = b_status_dead + 1;
	}

	<!-- Write data to Information Layer -->
	document.getElementById('bstat').innerHTML = "<font face=arial size=1>Range: " + Math.round(brange) + "<BR>Pos: " + b_x_pos + "," + b_y_pos + "<BR>Delta: " + b_x_diff + "," + b_y_diff + "<BR>HP: " + bhp + "<BR>Damage: " + bdamage + "<BR>Status: " + bstatus + "<BR>A.F.R.D: " + b_status_alive + "." + b_status_fight + "." + b_status_run + "." + b_status_dead;

	}

	<!-- If Bot dead, don't carry on -->
	if (bhp > 0) {
		<!-- Trigger function -->
		window.setTimeout('bfight(bname,bid,bspeed,bbrave,bweapon,bdetect,breact,bhp,bdamage)',(1/bspeed)*test_speed_multiplier);}
	else {
		<!-- If i'm dead, concede defeat -->
		winner(aname);
	}
	
}

}


function winner(bot) {

gameover = 1;

document.getElementById('dojo').innerHTML = "The fight is over! The winner......<B>" + bot + "!</B><P><font face=arial size=1><u>" + aname + " Statistics</u><BR>Turns: " + acount + "<BR>Moving: " + Math.round((a_status_alive/acount)*100) + "% (" + a_status_alive + ")<BR>Fighting: " + Math.round((a_status_fight/acount)*100) + "% (" + a_status_fight + ")<BR>Running: " + Math.round((a_status_run/acount)*100) + "% (" + a_status_run + ")<BR>Bot lost " + (a_init_hp - ahp) + " HP, finishing with " + ahp + "HP.<BR>Bot travelled " + (acount*aspeed) + " pixels during the fight.<P><u>" + bname + " Statistics</u><BR>Turns: " + bcount + "<BR>Moving: " + Math.round((b_status_alive/bcount)*100) + "% (" + b_status_alive + ")<BR>Fighting: " + Math.round((b_status_fight/bcount)*100) + "% (" + b_status_fight + ")<BR>Running: " + Math.round((b_status_run/bcount)*100) + "% (" + b_status_run + ")<BR>Bot lost " + (b_init_hp - bhp) + " HP, finishing with " + bhp + "HP.<BR>Bot travelled " + (bcount*bspeed) + " pixels during the fight.<P><u>Key</u><BR>Moving = Manouevering while not in own weapon range<BR>Fighting = Striking opponent<BR>Running = Try to break engagement whilst in own weapon range (driven by Bravery)</font>";

}