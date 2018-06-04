var
	w = 800,
	h = 600,
	wRp = 4, //width referencial padrão
	hRp = 4, //height referencial padrão
	wR = 4, // width referencial
	hR = 4, // height referencial
	mLp = 8, //margin left referencial padrão
	mTp = 8, //margin right referencial (padrão)
	mL = 8,
	mT = 8,
	grad = null,
	qPh = 0,
	qPv = 0,
	optSel = null,
	elgrad = document.getElementById( 'gradient-princ' ),
	spcGrad = document.getElementById( 'spc-grad' ),
	divGrad = spcGrad.parentNode,
	px = document.getElementById( 'px' ),
	py = document.getElementById( 'py' ),
	selectedElement=null,
	selEl = null,
	currentX=0,
	currentY=0,
	qtdPortas=[],
	indAddPorta = true,
	indAddLine = true,
	linePt1  = null,
	linePt2  = null,
	lineProv = null,
	indSel = false,
	indDel = false,
	p_in = [],
	p_out = [],
  fat = 1;//( rangeZoom.value / 100 );

var
	portasAdd = [],
	fiosAdd = [],
	caminho = [];

function procResultados()
{
	portasAdd.forEach( function( el )
	{
		console.log( el );
		
	});
}

function procCaminhos()
{
	caminho = [];
	//Adiciona os fios
	fiosAdd.forEach( function( fio )
	{ addCaminhos([ fio.pI, fio.pF ]); });
}

function addCaminhos( cam )
{
	found = -1;

	caminho.forEach( function( el, i )
	{
		el.forEach( function( tEl )
		{
			cam.forEach( function( c, j )
			{
				if( tEl.toString() == c.toString() )
				{ found = i; itn = j; }
			});
		});
	});
	
	if( found < 0 )
		caminho.push( cam );
	else
	{
		cam.forEach( function( el, i )
		{
			if( i != itn )
				caminho[ found ].push( el );
		});
	}
	procResultados();
}

function addLine( evt )
{
	var
		i = getCrd( mL, evt.offsetX ),
		j = getCrd( mT, evt.offsetY ),
		x = getPos( mL, i ) + ( wR / 2 ),
		y = getPos( mT, j ) + ( hR / 2 );

	if( linePt1 == null )
	{
		linePt1 = [ x, y ];
		lineProv = grad.line();
		lineProv.pI = [ i, j ];
		lineProv.stroke({width: 4});
	}
	else if( linePt2 == null )
	{
		linePt2 = [ x, y ];
		lineProv.plot([linePt1, linePt2]);
		linePt1 = linePt2 = null;
		lineProv.pF = [ i, j ];
		addCaminhos([ lineProv.pI, lineProv.pF ]);
		lineProv.click( function()
		{
			if( indDel )
			{
				var fioDel = this;
				fiosAdd.forEach( function( fio, i )
				{
					if( fioDel.pI == fio.pI && fioDel.pF == fio.pF )
					{ ind = i; }
				});
				fiosAdd.splice( ind, 1 );
				if( indDel )
				{ this.remove(); }
				procCaminhos();
			}
		});
		fiosAdd.push( lineProv );
	}
}

function addPorta( evt )
{
	if( indAddPorta )
	{
		var
			i = getCrd( mL, evt.offsetX ),
			j = getCrd( mT, evt.offsetY ),
			x = getPos( mL, i ),
			y = getPos( mT, j );

		x+= ( wR / 2 );
		y+= ( hR / 2 );

		if( optSel != null )
		{
			var
				pol = optSel.poly.clone(),
				circ = optSel.circles,
				obj={};

			pol.name = optSel.name;
			pol.indPorta = optSel.indPorta;
			pol.circ = [];
			pol.attr( 'title', optSel.name );
			pol.attr( 'alt', optSel.name );
			pol.obj = obj;
			obj.poly = pol;
			obj.portas = [];
			pol.fill( optSel.color );
			pol.opacity( 0.5 );
			pol.move( x, y );
			pol.show();
			pol.click( function()
			{
				indAddPorta = false;
				if( indSel )
				{ selEl = this; }

				if( indDel )
				{
					var polDel = this;
					//Retira da lista de portas
					portasAdd.forEach( function( porta, i )
					{
						if( porta.toString() == polDel.toString() )
						{ ind = i; }
					});
					portasAdd.splice( ind, 1 );

					//Apaga os pontinhos
					this.circ.forEach( function( el )
					{ el.remove(); });

					//Apaga o poligono
					this.remove();
				}
			});

			//Bolinhas de entrada e saída
			circ.forEach( function( el )
			{
				var
				  c = el.clone(),
					tx = ( x - mL ),
					ty = ( y - mT );

				c.direcao = el.direcao;
				c.dx( tx ).dy( ty );
				
				var
					cx = c.x(),
					cy = c.y(),
					ci = getCrd( mL, cx ),
					cj = getCrd( mT, cy );
				
				c.x = cx;
				c.y = cy;
				c.i = ci;
				c.j = cj;

				if( c.direcao == 'in' )
					p_in.push([ ci, cj ]);
				else if( c.direcao == 'out' )
					p_out.push([ ci, cj ]);

				c.show();
				pol.circ.push( c );
				obj.portas.push( c );
			});

			var ind = ( obj.portas[ 0 ].i + "," + obj.portas[ 0 ].j );
			if( optSel.name == 'in' )
			{
				pol.val = 0;
				p_in[ ind ] = pol;
				pol.click( function()
				{
					var val = prompt( "Insira o valor", this.val );
					
					this.val = ( val == true ) ? 1 : 0;
				});
			}
			if( optSel.name == 'out' )
			{
				p_out[ ind ] = pol;
				pol.click( function()
				{
					alert( this.val );
				});
			}

			portasAdd.push( obj );
			procResultados();
		}
	}
	indAddPorta = true;
}