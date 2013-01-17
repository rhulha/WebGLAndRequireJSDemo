// SINGLETON
define(["GetGL", "Mesh", "Core"], function(gl, Mesh, core){

	return {
	
		getWall: function(texture, size)
		{
			var verts = [
				-1.0*size, -1.0*size,  0.0,
				 1.0*size, -1.0*size,  0.0,
				 1.0*size,  1.0*size,  0.0,
				-1.0*size,  1.0*size,  0.0,
			];
			
			var textureCoords = [
			  0.0, 0.0,
			  1.0, 0.0,
			  1.0, 1.0,
			  0.0, 1.0,
			];
			
			 var vertexIndices = [
				0, 1, 2,
				0, 2, 3
			];
			return new Mesh( {vertices:verts, textureCoords:textureCoords, vertexIndices:vertexIndices, texture:texture});
		},


		createSolidTexture: function(fillStyle) {
			return this.textureFromCanvas( this.createDynamicImage(fillStyle));
		},

		// doesn't seem to work...
		createSolidTexture2: function(r, g, b, a) {
			var data = new Uint8Array([r, g, b, a]);
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			texture.ready = true;
			return texture;
		},
		
		textureFromCanvas: function(canvas) {
			//var dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // _MIPMAP_NEAREST
			texture.ready = true;
			return texture;
		},

		handleLoadedTexture: function(texture) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // _MIPMAP_NEAREST
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // this fixes glitch on skybox seams
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			//gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);
			texture.ready = true;
		},
	
		textureFromImageURL: function(src) {
			that = this;
			var tex = gl.createTexture();
			tex.image = new Image();
			tex.ready = false;
			tex.image.onload = function () {
				that.handleLoadedTexture(tex)
			}
			tex.image.src = src;
			return tex;
		},

		createDynamicImage: function(fillStyle, opt_width, opt_height)
		{
			var canvas = document.createElement("canvas");
			canvas.width = opt_width || 1;
			canvas.height = opt_height || 1;
			var ctx = canvas.getContext('2d');
			ctx.fillStyle = fillStyle;
			ctx.fillRect(0,0,canvas.width,canvas.height);
			return canvas;
		}
	};
});
