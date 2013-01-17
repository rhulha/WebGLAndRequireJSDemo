// A spatial in this context shall mean an object that encapsulates a 4 dimensional matrix
// It is designed to be inherited from Camera and Mesh
// for a camera the matrix used here is inverted, as we need to do the opposite movements and translations to objects to place them correctly.
// So we need to access the data in the matrix in a different (inverted) way.
// SINGLETON

define(["glMatrix"],function(glmat)
{

   return function(isCamera)
   {

   		this.isCamera = isCamera;

   		this.translate=function( vec)
   		{
   			mat4.translate_alt( this.matrix, vec, isCamera ? -1 : 1);
   		}
   		

		this.getPos=function()
		{
			return [this.getX(),this.getY(),this.getZ()];
		}

		this.getX=function()
		{
			return (isCamera ? -1 : 1 ) * this.matrix[12];
		}

		this.getY=function()
		{
			return (isCamera ? -1 : 1 ) * this.matrix[13];
		}

		this.getZ=function()
		{
			return (isCamera ? -1 : 1 ) * this.matrix[14];
		}

		this.setX = function(val)
		{
			this.matrix[12] = (isCamera ? -1 : 1 ) * val;
		}

		this.setY = function(val)
		{
			this.matrix[13] = (isCamera ? -1 : 1 ) * val;
		}

		this.setZ = function(val)
		{
			this.matrix[14] = (isCamera ? -1 : 1 ) * val;
		}

		this.rotX = function(angle)
		{
			mat4.rotateX(this.matrix, angle);
		}

		this.rotY = function(angle)
		{
			mat4.rotateY(this.matrix, angle);
		}

		this.rotZ = function(angle)
		{
			mat4.rotateZ(this.matrix, angle);
		}

		// get the values from column 2. They represent the direction of this matrx
		// I am not sure why I need to negate the values for non camera objects too, but if I dont, weird stuff happens with rotation
		// update: removed the negation again, stuff is still weird. check the comments in Game.js
		this.getDir = function()
		{
		  var mat = this.matrix;
		  var a02 = isCamera ? -mat[2] : mat[2],
			  a12 = isCamera ? -mat[6]:  mat[6],
			  a22 = isCamera ? -mat[10]: mat[10];
		  return vec3.createFrom( a02, a12, a22);
		}

		// get the values from column 1. They represent the up vector of this matrx
		this.getUp = function()
		{
		  var mat = this.matrix;
		  var a01 = isCamera ? mat[1] : mat[1],
			  a11 = isCamera ? mat[5] : mat[5],
			  a21 = isCamera ? mat[9] : mat[9];
		  return vec3.createFrom( a01, a11, a21);
		}

		// get the values from column 0. They represent the left vector of this matrx
		this.getLeft = function()
		{
		  var mat = this.matrix;
		  var a00 = isCamera ? -mat[0]:mat[0],
			  a10 = isCamera ? -mat[4]:mat[4],
			  a20 = isCamera ? -mat[8]:mat[8];
		  return vec3.createFrom( a00, a10, a20);
		}

		this.moveForward = function(amount)
		{
		  var dir = this.getDir();
		  vec3.scale(dir, amount);
		  mat4.translate_alt( this.matrix, dir);
		}

		this.moveBackward = function(amount)
		{
			this.moveForward(-amount);
		}

		this.moveLeft = function(amount)
		{
		  var dir = this.getLeft();
		  vec3.scale(dir, amount);
		  mat4.translate_alt( this.matrix, dir);
		}

		this.moveRight = function(amount)
		{
			this.moveLeft(-amount);
		}

		this.lookUp = function(amount)
		{
		  mat4.rotate( this.matrix, amount, this.getLeft());
		}
		this.lookDown = function(amount)
		{
		  mat4.rotate( this.matrix, -amount, this.getLeft());
		}
		this.lookLeft = function(amount)
		{
		  mat4.rotate( this.matrix, -amount, this.getUp());
		}
		this.lookRight = function(amount)
		{
		  mat4.rotate( this.matrix, amount, this.getUp());
		}
	}
   
});

