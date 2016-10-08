var FRAMESIZE = 800;
var MAX_X = 1;
var MIN_X = -1;
var MAX_Y = 1;
var MIN_Y = -1;
var STROKEWIDTH = 5;
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

$("#mapping").change(function() {
	var map = $("#mapping").value;
	if(map == "z^2")
	{
		f = function(z){
			z.pow(new Complex("2"))
			return z;
		};
	}
	else // if nothing, use f(z) = z
	{
		f = function(z){
			return z;
		};
	}
});

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
	wContext.clearRect(0,0,wCanvas.width,wCanvas.height);
	var zplane = zContext.getImageData(0,0,zCanvas.width,zCanvas.height);
	var data = zplane.data;
	var prevx = -1;
	var prevy = -1;
	
	for(var i = 0; i < clickDrag.length; i++)
	{
		var wdata = wContext.createImageData(1,1);
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
		console.log(out_x + " " + out_y);

		wdata.data[0] = red;
		wdata.data[1] = green;
		wdata.data[2] = blue;
		wdata.data[3] = alpha;
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
