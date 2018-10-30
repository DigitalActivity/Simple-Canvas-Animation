/***
*	Projet : Exercice 3 - DÉVELOPPEMENT D'APPLICATIONS WEB ET DE COMMERCE ÉLECTRONIQUE
*
*	Description : - créer un carré qui se deplace en rotation sur lui meme
*				  - Changer la couleur du carré quand la sourie est over le canvas
*	Author : Younes Rabdi 0821450
*	Date : 20/10/2017
*
***/

// Draw a square
var square = {
	x: 0,
	y: 0,
	side: 50,
	color:	'blue',
	draw:	function()	{
		ctx.beginPath();
		ctx.fillStyle =	this.color;
		ctx.fillRect(this.x, this.y, this.side, this.side);
		ctx.closePath();
	}
};

// Commencer le dessin
function commencerDessin() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	square.side= 50;
	square.x= -square.side/2;
	square.y= -square.side/2;
	square.color=	'red';
	rotateForwardBackward();
}

var x = 0; // represente le mouvement du carré sur l'axe x
var forward = true; // avancer quand vrai et reculer si faux.

// Rotation du canvas vers l'avant et l'arrière
function rotateForwardBackward() {
	// Clear
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// sauvegarder etat
	ctx.save();
	// positionner la feuille au milieu + x
	ctx.translate(x + canvas.width/2, canvas.height/2);
	// Faire un rotation
	ctx.rotate(x * Math.PI/180);
	// Dessiner le carré
	square.draw();
	// Restaurer
	ctx.restore();
	// avancer ou reculer sur le x
	if(forward) {
		x++;
	} else {
		x--;
	}
	// Verifier si la limite est atteinte, et s'ajuster
	if(x >= canvas.width/2) {
		forward = false;
	} else if(x <= -canvas.width/2) {
		forward = true;
	}
	window.requestAnimationFrame(rotateForwardBackward);
} // Fin rotateForward

// Generer une couleur random
// source: https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Plugin colorify mon carré
(function($) {
	$.fn.mySquareColorify = function() {
		$("body").on('mouseover', $(this), function() {
			square.color=	getRandomColor();
		});
	};
}(jQuery));
// Fin plugin
