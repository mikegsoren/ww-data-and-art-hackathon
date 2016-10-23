// var bourbon = require('node-bourbon');

// bourbon.with('src/styles')


module.exports = {
    options: {
        // compass: true,
        force: true,
        quiet: false,
        trace: true,
        noCache: false,
        includePaths: require('node-bourbon').includePaths
    },
    dev: {
        options: {
            style: 'expanded',
            sourceMap: true
        },
        files: [{
            expand: true,
            src: ['**/*.scss', '!**/_*.scss'],
            cwd: 'src/styles',
            dest: 'dist/css',
            ext: '.css'
        }]
    },
    prod: {
        options: {
            style: 'compressed',
            sourceMap: false
        },
        files: [{
            expand: true,
            src: ['**/*.scss', '!**/_*.scss'],
            cwd: 'src/styles',
            dest: 'dist/css',
            ext: '.css'
        }]
    }
};
