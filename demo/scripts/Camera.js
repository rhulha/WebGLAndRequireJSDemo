// A camera for a FPS space ship
// keep in mind, that the matrix used here is inverted, as we need to do the opposite movements and translations to objects to place them correctly.
// SINGLETON
define(["glMatrix", "Spatial"],function(glmat, Spatial)
{
   function Camera()
   {
		// position and rotation
		this.matrix = mat4.create();
		mat4.identity(this.matrix);

	   this.getMVMatrix = function(mat, translate)
	   {
		  mat4.toRotationMat( this.matrix, mat);
		  if( translate) {
			mat4.translate( mat, [this.matrix[12], this.matrix[13], this.matrix[14]]);
		  }
	   }

	   console.log('Camera created');

   }
   
   Camera.prototype = new Spatial(true);

   return new Camera();
   
   
});

