module.exports = {
    dev: {
        options: {
            hostname: '*',
            // hostname: '<%= grunt.config.get("ip") %>',
            port: 3000,
            base: 'dist/',
            appName: 'open',
            open: true,
            livereload: false
        }
    }
};
