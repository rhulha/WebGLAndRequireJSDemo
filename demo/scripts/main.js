require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	paths: {
        glMatrix: 'gl-matrix-min',
    }
});

require(['main2'], function(main2){

// we use another main file because otherwise the page cache buster above won't take effect

});
