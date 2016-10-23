module.exports = {
    options: {
        browsers: ['last 2 version', '> 1%', 'ff 17', 'ie 8']
    },
    dev: {
        options: {
            map: true
        },
        files: [{
            expand: true,
            src: ['css/**/*.css', '!css/**/*.min.css'],
            cwd: 'dist/',
            dest: 'dist/',
            ext: '.css'
        }]
    },
    prod: {
        options: {
            map: false
        },
        files: [{
            expand: true,
            src: ['css/**/*.css', '!css/**/*.min.css'],
            cwd: 'dist/',
            dest: 'dist/',
            ext: '.css'
        }]
    },

};
