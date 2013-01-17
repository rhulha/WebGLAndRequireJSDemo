// CLASS
define(["glMatrix", "Spatial"], function(glmat, Spatial){

	// a Node is a Spatial without Mesh data
	function Node(child)
	{
		this.name ="";
		this.type ="";
		this.enabled = true;

		// position and rotation
		this.matrix = mat4.create();
		mat4.identity(this.matrix);
		//mat4.lookAt([0,0,0], [0,0,1], [0,1,0], this.mat);

		// children inheret the parent matrix for its rotation and position
		this.children = [];

		if( child)
			this.children.push(child);

		this.add = function(obj) {
			this.children.push(obj);
			return obj;
		}

		// overwrite to animate this object
		this.animate = function(elapsed)
		{

		}
		
		this.mvMatrix = mat4.create();

		this.draw = function(program, parentMVMatrix)
		{
			mat4.set( parentMVMatrix, this.mvMatrix); // copy the mvMatrix, so we don't change the original

 			mat4.multiply( this.mvMatrix, this.matrix);

			for (var i = 0; i < this.children.length; i++)
			{
				this.children[i].draw( program, this.mvMatrix);
			}
		}
	}
	Node.prototype = new Spatial(false);
	return Node;

});
