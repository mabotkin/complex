var Z_MAX_X = 2;
var Z_MIN_X = -2;
var Z_MAX_Y = 2;
var Z_MIN_Y = -2;
var W_MAX_X = 2;
var W_MIN_X = -2;
var W_MAX_Y = 2;
var W_MIN_Y = -2;
var STROKEWIDTH = 5;
var AXISWIDTH = 1;
//
var FRAMESIZE = 800;
if(window.innerWidth <= 1366)
{
	FRAMESIZE = 550;
}
else if(window.innerWidth <= 1600)
{
	FRAMESIZE = 660;
}
//
var STROKECOLOR = "#FF0000";
// z plane canvas
var zCanvasDiv = document.getElementById('zPlaneDiv');
var zCanvas = document.createElement('canvas');
zCanvas.setAttribute('width', FRAMESIZE);
zCanvas.setAttribute('height', FRAMESIZE);
zCanvas.setAttribute('id', 'zCanvas');
zCanvasDiv.appendChild(zCanvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	zCanvas = G_vmlCanvasManager.initElement(zCanvas);
}
var zContext = zCanvas.getContext("2d");	

var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickDrag = new Array();
var paint;

$('#zCanvas').mousemove(function(e) {
	if(paint)
	{
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

$('#zCanvas').mousedown(function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
});

$('#zCanvas').mouseup(function(e) {
	paint = false;
});

$('#zCanvas').mouseleave(function(e) {
	paint = false;
});

var f = function(z){
	return z;
};

function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickColor.push(STROKECOLOR);
	clickDrag.push(dragging);
}

function updateColor(jscolor)
{
	STROKECOLOR = "#" + jscolor;
}

function mapUpdate()
{
	var sel = document.getElementById("mapping");
	var map = sel.options[sel.selectedIndex].value;
	if(map == "3z")
	{
		f = function(z){
			z = z.mul(new Complex("3"))
			return z;
		};
	}
	else if(map == "iz")
	{
		f = function(z){
			z = z.mul(new Complex("i"))
			return z;
		};
	}
	else if(map == "z^2")
	{
		f = function(z){
			z = z.pow(new Complex("2"))
			return z;
		};
	}
	else if(map == "z^i")
	{
		f = function(z){
			z = z.pow(new Complex("i"))
			return z;
		};
	}
	else if(map == "Sqrt(z)")
	{
		f = function(z){
			z = z.sqrt();
			return z;
		};
	}
	else if(map == "Exp(z)")
	{
		f = function(z){
			z = z.exp();
			return z;
		};
	}
	else if(map == "Exp(iz)")
	{
		f = function(z){
			z = (z.mul(Complex.I)).exp();
			return z;
		};
	}
	else if(map == "Log(z)")
	{
		f = function(z){
			z = z.log();
			return z;
		};
	}
	else if(map == "Conj(z)")
	{
		f = function(z){
			z = z.conjugate();
			return z;
		};
	}
	else if(map == "Sin(z)")
	{
		f = function(z){
			z = z.sin();
			return z;
		};
	}
	else if(map == "Cos(z)")
	{
		f = function(z){
			z = z.cos();
			return z;
		};
	}
	else if(map == "1/z")
	{
		f = function(z){
			z = Complex.ONE.div(z);
			return z;
		};
	}
	else // if nothing, use f(z) = z
	{
		f = function(z){
			return z;
		};
	}
	wMap();
}

// w plane canvas
var wCanvasDiv = document.getElementById('wPlaneDiv');
wCanvas = document.createElement('canvas');
wCanvas.setAttribute('width', FRAMESIZE);
wCanvas.setAttribute('height', FRAMESIZE);
wCanvas.setAttribute('id', 'wCanvas');
wCanvasDiv.appendChild(wCanvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	wCanvas = G_vmlCanvasManager.initElement(wCanvas);
}
var wContext = wCanvas.getContext("2d");	

function clearCanvas()
{
	clickX = [];
	clickY = [];
	clickDrag = [];
	clickColor = [];
	redraw();
}

function resetRange()
{
	document.getElementById("ZMAXX").value = 2;
	document.getElementById("ZMINX").value = -2;
	document.getElementById("ZMAXY").value = 2;
	document.getElementById("ZMINY").value = -2;
	document.getElementById("WMAXX").value = 2;
	document.getElementById("WMINX").value = -2;
	document.getElementById("WMAXY").value = 2;
	document.getElementById("WMINY").value = -2;
	Z_MAX_X = 2;
	Z_MIN_X = -2;
	Z_MAX_Y = 2;
	Z_MIN_Y = -2;
	W_MAX_X = 2;
	W_MIN_X = -2;
	W_MAX_Y = 2;
	W_MIN_Y = -2;
}

function updateRange()
{
	var zmaxx = parseFloat(document.getElementById("ZMAXX").value);
	var zminx = parseFloat(document.getElementById("ZMINX").value);
	var zmaxy = parseFloat(document.getElementById("ZMAXY").value);
	var zminy = parseFloat(document.getElementById("ZMINY").value);
	var wmaxx = parseFloat(document.getElementById("WMAXX").value);
	var wminx = parseFloat(document.getElementById("WMINX").value);
	var wmaxy = parseFloat(document.getElementById("WMAXY").value);
	var wminy = parseFloat(document.getElementById("WMINY").value);
	if(!isNaN(zmaxx))
	{
		document.getElementById("ZMAXX").value = zmaxx;
		Z_MAX_X = zmaxx;
	}
	else
	{
		document.getElementById("ZMAXX").value = 2;
	}
	if(!isNaN(zminx))
	{
		document.getElementById("ZMINX").value = zminx;
		Z_MIN_X = zminx;
	}
	else
	{
		document.getElementById("ZMINX").value = -2;
	}
	if(!isNaN(zmaxy))
	{
		document.getElementById("ZMAXY").value = zmaxy;
		Z_MAX_Y = zmaxy;
	}
	else
	{
		document.getElementById("ZMAXY").value = 2;
	}
	if(!isNaN(zminy))
	{
		document.getElementById("ZMINY").value = zminy;
		Z_MIN_Y = zminy;
	}
	else
	{
		document.getElementById("ZMINY").value = -2;
	}
	if(!isNaN(wmaxx))
	{
		document.getElementById("WMAXX").value = wmaxx;
		W_MAX_X = wmaxx;
	}
	else
	{
		document.getElementById("WMAXX").value = 2;
	}
	if(!isNaN(wminx))
	{
		document.getElementById("WMINX").value = wminx;
		W_MIN_X = wminx;
	}
	else
	{
		document.getElementById("WMINX").value = -2;
	}
	if(!isNaN(wmaxy))
	{
		document.getElementById("WMAXY").value = wmaxy;
		W_MAX_Y = wmaxy;
	}
	else
	{
		document.getElementById("WMAXY").value = 2;
	}
	if(!isNaN(wminy))
	{
		document.getElementById("WMINY").value = wminy;
		W_MIN_Y = wminy;
	}
	else
	{
		document.getElementById("WMINY").value = -2;
	}
	redraw();
}

function redraw()
{
	zContext.clearRect(0, 0, zContext.canvas.width, zContext.canvas.height); // Clears the zCanvas
	zContext.lineWidth = AXISWIDTH;
	zContext.strokeStyle = "#000000";
	//axes
	zContext.beginPath();
	zContext.moveTo(0,zCanvas.height/2);
	zContext.lineTo(zCanvas.width,zCanvas.height/2);
	zContext.closePath();
	zContext.stroke();
	// other axis
	zContext.beginPath();
	zContext.moveTo(zCanvas.width/2,0);
	zContext.lineTo(zCanvas.width/2,zCanvas.height);
	zContext.closePath();
	zContext.stroke();
	//
	zContext.lineJoin = "round";
	zContext.lineWidth = STROKEWIDTH;
			
	for(var i=0; i < clickX.length; i++) 
	{
		zContext.strokeStyle = clickColor[i];
		zContext.beginPath();
		if(clickDrag[i] && i)
		{
			zContext.moveTo(clickX[i-1], clickY[i-1]);
		}
		else
		{
			zContext.moveTo(clickX[i]-1, clickY[i]);
		}
		zContext.lineTo(clickX[i], clickY[i]);
		zContext.closePath();
		zContext.stroke();
	}
	// do the mapping
	wMap();
}

function wMap()
{
	wContext.clearRect(0,0,wCanvas.width,wCanvas.height);
	wContext.lineWidth = AXISWIDTH;
	wContext.strokeStyle = "#000000";
	//axes
	wContext.beginPath();
	wContext.moveTo(0,wCanvas.height/2);
	wContext.lineTo(wCanvas.width,wCanvas.height/2);
	wContext.closePath();
	wContext.stroke();
	// other axis
	wContext.beginPath();
	wContext.moveTo(wCanvas.width/2,0);
	wContext.lineTo(wCanvas.width/2,wCanvas.height);
	wContext.closePath();
	wContext.stroke();
	//
	var zplane = zContext.getImageData(0,0,zCanvas.width,zCanvas.height);
	var data = zplane.data;
	var prevx = -1;
	var prevy = -1;
	
	for(var i = 0; i < clickDrag.length; i++)
	{
		var k = clickX[i]*zCanvas.width + clickY[i];

		var red = data[k];
		var green = data[k+1];
		var blue = data[k+2];
		var alpha = data[k+3];

		var zreal = Z_MIN_X + (Z_MAX_X - Z_MIN_X)*(clickX[i]/zCanvas.width);
		var zimg = Z_MIN_Y + (Z_MAX_Y - Z_MIN_Y)*(1-(clickY[i]/zCanvas.height));
		var inp = new Complex(zreal, zimg);
		var out = f(inp).toVector();

		var out_x = Math.round(((out[0] - W_MIN_X)/(W_MAX_X - W_MIN_X))*wCanvas.width)
		var out_y = Math.round((1-((out[1] - W_MIN_Y)/(W_MAX_Y - W_MIN_Y)))*wCanvas.height)

		wContext.lineWidth = STROKEWIDTH;
		wContext.lineJoin = "round";
		if(i != 0)
		{
			wContext.strokeStyle = clickColor[i];
			wContext.beginPath();
			if(clickDrag[i])
			{
				wContext.moveTo(prevx, prevy);
			}
			else
			{
				wContext.moveTo(out_x, out_y);
			}
			wContext.lineTo(out_x,out_y);
			wContext.closePath();
			wContext.stroke();
		}
		prevx = out_x;
		prevy = out_y;
	}
}
redraw();
