// SINGLETON
define(["GetCanvas", "GetGL", "Camera", "ProgramNormal", "ProgramPointSprites", "ProgramColor"], function(canvas, gl, camera, programNormal, programPointSprites, programColor){
    "use strict";

	return new function()
	{
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);

		this.programNormal = programNormal;
		this.programPointSprites = programPointSprites;
		this.programColor = programColor;

		this.pMatrix = mat4.create();

		this.lastTime = 0;
		this.animate = function () {
			var timeNow = new Date().getTime();
	        if (this.lastTime != 0) {
	            var elapsed = timeNow - this.lastTime;
       			programNormal.animate(elapsed);
				programColor.animate(elapsed);
				programPointSprites.animate(elapsed);
	        }
	        this.lastTime = timeNow;
		}

		this.lastWidth = 0;
		this.lastHeight = 0;

		this.drawScene = function() {
			if( this.lastWidth != canvas.width || this.lastHeight != canvas.height)
			{
				console.log("setting viewport");
				gl.viewport(0, 0, canvas.width, canvas.height);
				mat4.perspective(50, canvas.width / canvas.height, 0.1, 2020.0, this.pMatrix);
				this.lastWidth = canvas.width;
				this.lastHeight = canvas.height;
			}

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			programNormal.draw(this.pMatrix);
			programPointSprites.draw(this.pMatrix);
			programColor.draw(this.pMatrix);

		}
	};

});