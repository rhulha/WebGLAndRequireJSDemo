require(['Camera', "Core", "Utils", "Extensions", "Particles"], function(camera, core, utils, extensions, Particles){

    currentlyPressedKeys = {};
    mouseX=0;
    mouseY=0;

    document.onkeydown = function(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }

    document.onkeyup = function(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    document.onmousemove = function(d) {
        d = d ? d : window.event;
        d.preventDefault();
        mouseX = d.clientX-(window.innerWidth/2);
        mouseY = -(d.clientY-(window.innerHeight/2));
        //document.all.hud.innerText = x + ' ' + y;
    }

    document.onmousedown = function(d) {
        d = d ? d : window.event;
        d.preventDefault();
        var wall = core.programNormal.add(utils.getWall(blueTex, 20));
        mat4.copyPosition( camera.matrix, wall.matrix, -1);
    }

    function tick() {
        requestAnimFrame(tick);
        handleKeys();
        core.animate();
        core.drawScene();
    }

    function handleKeys() {

        if (currentlyPressedKeys[65]) {
            // A
            camera.moveLeft(-3);
        } else if (currentlyPressedKeys[68]) {
            // D
            camera.moveRight(-3);
        }

        if (currentlyPressedKeys[87]) {
            // W
            camera.moveForward(-3);
        } else if (currentlyPressedKeys[83]) {
            // S
            camera.moveBackward(-3);
        }


        if (currentlyPressedKeys[37]) {
            // Left cursor key
            camera.lookLeft(0.03);
        } else if (currentlyPressedKeys[39]) {
            // Right cursor key
            camera.lookRight(0.03);
        }

        if (currentlyPressedKeys[38]) {
            // Up cursor key
            camera.lookUp(0.03);
        } else if (currentlyPressedKeys[40]) {
            // Down cursor key
            camera.lookDown(0.03);
        }
        
        if( mouseY!=0)
            camera.lookUp(mouseY*0.00006);
        if( mouseX!=0)
            camera.lookLeft(-mouseX*0.00003);

    }

    camera.setZ(150); // backwards

    var blueTex = utils.createSolidTexture("rgba(0,0,255,255)");
    core.programNormal.add(utils.getWall(blueTex, 20));

    var particles = new Array(6000); // multiple of 3
    for( var i=0; i < particles.length/3; i+=3)
    {
       particles[i] = Math.random()*1000-500;
       particles[i+1] = Math.random()*1000-500;
       particles[i+2] = Math.random()*1000-500;
    }

    var particlesTexture = utils.textureFromImageURL("particle.bmp");
    core.programPointSprites.add( new Particles(particles, particlesTexture));


    console.log("game starting");
    tick();

});
