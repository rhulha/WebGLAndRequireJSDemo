require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	paths: {
        glMatrix: 'gl-matrix-min',
    }
});

require(['main2'], function(main2){


});
