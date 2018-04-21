var
	w = 800,
	h = 600,
	wRp = 3, //width referencial padrão
	hRp = 3, //height referencial padrão
	wR = 3, // width referencial
	hR = 3, // height referencial
	mLp = 10, //margin left referencial padrão
	mTp = 10, //margin right referencial (padrão)
	mL = 10,
	mT = 10,
	grad = null,
	qPh = 0,
	qPv = 0,
	spcGrad = document.getElementById( 'spc-grad' ),
	rangeZoom = document.getElementById( 'n-zoom' ),
	elmov = document.getElementById( 'elmov' );

elmov.draggable = true;

elmov.ondragstart = function( evt )
{
	console.log( evt );
	console.log( "Movendo..." );
}

spcGrad.ondragover = function( evt )
{
	document.getElementById( 'dclientx' ).value = evt.offsetX;
	document.getElementById( 'dclienty' ).value = evt.offsetY;
	return false;
}

spcGrad.ondrop = function( evt )
{
	console.log( "Soltou" );
	console.log( evt );

	var
		i = getCrd( mL, evt.offsetX ),
		j = getCrd( mT, evt.offsetY ),
		x = getPos( mL, i ),
		y = getPos( mT, j ),
		rect = grad.rect( 40, 40 );

    rect.attr({ fill: '#f06', class: 'teste2', 'data-xp': i, 'data-yp': j });
    rect.move( x, y );

    console.log( "X = " + x );
    console.log( "Y = " + y );
    console.log( "i = " + i );
    console.log( "j = " + j );
}

elmov.ondragend = function( evt )
{
	console.log( "Livre" );
}

rangeZoom.onchange = function()
{
	if( this.value >= 40 && this.value <= 100 )
		resizeScreen();
}

function onMouseOverHole(){}

function resizeScreen()
{
	w = spcGrad.offsetWidth - 30;
	h = spcGrad.offsetHeight;

	grad = SVG( 'gradient-princ' ).size( w, h );
	resizeGrid();
}

function resizeGrid()
{
	var fat = ( rangeZoom.value / 100 );

	//Apaga tudo da tela para reinserir
	document.getElementById( 'gradient-princ' ).innerHTML = "";

	mL = mLp * fat;
	mT = mTp * fat;

	wR = wRp * fat;
	hR = hRp * fat;

	qPh = Math.ceil( ( w / ( wR + mL ) ) );
	qPv = Math.ceil( ( h / ( hR + mT ) ) );

	for( i = 0; i < qPh; i++ )
		for( j = 0; j < qPv; j++ )
		{
			var rect = grad.rect( wR, hR );

			rect.attr({ fill: '#f06', class: 'teste', 'data-xp': i, 'data-yp': j });
			rect.move( getPos( mL, i ), getPos( mT, j ) );
		}
}

// ( x, y )
function getPos( m, t )
{ return ( m * ( 1 + t * 2 ) ); }
// mL + i * mL * 2 = x
// mL * ( 1 + i * 2 ) = x
// mL = x / ( 1 + i * 2 )

// ( i, j )
function getCrd( m, pos )
{ return Math.round( ( ( pos - m ) / ( m * 2 ) ) ); }
// x = mL + i * mL * 2
// x - mL = i * mL * 2
// ( x - mL ) / ( mL * 2 ) = i

window.onresize = function()
{
	console.log( window.offsetHeight );
	resizeScreen();
    ajustaNavbar();
}

function ajustaNavbar()
{
	var sizeNavbar = document.getElementsByClassName( 'navbar' )[ 0 ].clientHeight;
    $( '.container-fluid' ).css( 'padding-top', sizeNavbar + "px" );
}

$( document ).ready( function()
{
    ajustaNavbar();
});

SVG.on( document, 'DOMContentLoaded', function()
{ resizeScreen(); } );