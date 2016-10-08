var FRAMESIZE = 800;
var MAX_X = 2;
var MIN_X = -2;
var MAX_Y = 2;
var MIN_Y = -2;
var STROKEWIDTH = 5;
var AXISWIDTH = 1;
// z plane canvas
var zCanvasDiv = document.getElementById('zPlaneDiv');
var zCanvas = document.createElement('canvas');
zCanvas.setAttribute('width', FRAMESIZE);
zCanvas.setAttribute('height', FRAMESIZE);
zCanvas.setAttribute('id', 'zCanvas');
zCanvas.setAttribute('style','border:1px solid #000000');
zCanvasDiv.appendChild(zCanvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	zCanvas = G_vmlCanvasManager.initElement(zCanvas);
}
var zContext = zCanvas.getContext("2d");	

var clickX = new Array();
var clickY = new Array();
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
	clickDrag.push(dragging);
}

function mapUpdate()
{
	var sel = document.getElementById("mapping");
	var map = sel.options[sel.selectedIndex].value;
	if(map == "z^2")
	{
		f = function(z){
			z = z.pow(new Complex("2"))
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
wCanvas.setAttribute('style','border:1px solid #000000');
wCanvasDiv.appendChild(wCanvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	wCanvas = G_vmlCanvasManager.initElement(wCanvas);
}
var wContext = wCanvas.getContext("2d");	

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
	zContext.strokeStyle = "#FF0000";
	zContext.lineJoin = "round";
	zContext.lineWidth = STROKEWIDTH;
			
	for(var i=0; i < clickX.length; i++) 
	{
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

		var zreal = MIN_X + (MAX_X - MIN_X)*(clickX[i]/zCanvas.width)
		var zimg = MIN_Y + (MAX_Y - MIN_Y)*(clickY[i]/zCanvas.height)
		var inp = new Complex(zreal, zimg);
		var out = f(inp).toVector();

		var out_x = Math.round(((out[0] - MIN_X)/(MAX_X - MIN_X))*wCanvas.width)
		var out_y = Math.round(((out[1] - MIN_Y)/(MAX_Y - MIN_Y))*wCanvas.height)

		wContext.fillStyle = "#FF0000";
		wContext.strokeStyle = "#FF0000";
		wContext.lineWidth = STROKEWIDTH;
		if(i != 0)
		{
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
wMap();
