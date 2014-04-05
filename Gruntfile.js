/**
 * 自动打包压缩
 * @param grunt
 */
module.exports = function(grunt) {
    /**
     * 与文件名对应
     * @type {string}
     */
    var packageName = 'package',
        version = '<%= '+ packageName +'.version %>',
        name = '<%= '+ packageName +'.name %>',
        author = '<%= '+ packageName +'.author %>',
        page = '<%= '+ packageName +'.page %>',
        description = '<%= '+ packageName +'.description %>',
        buildPath = 'build',
        libPath = 'lib',
        binPath = 'bin',
        cfgFile = packageName + '.json',
        jsSuffix = '.js',
        buildTime = grunt.template.today("yyyy-mm-dd H:MM:ss"),
        banner = [
            '/* ================================================================\n',
                ' * '+ name +'.js v'+ version +'\n',
                ' *\n',
                ' * '+ description +'\n',
                ' * Latest build : '+ buildTime +'\n',
                ' *\n',
                ' * ' + page + '\n',
                ' * ================================================================\n',
                ' * Copyright 2013 '+ author +'\n',
                ' *\n',
                ' * Licensed under the MIT License\n',
                ' * You may not use this file except in compliance with the License.\n',
                ' *\n',
                ' * ================================================================ */\n\n'
        ].join(''),
        tinyBanner = '/*! '+name + ' v' + version + ' ' + author + ' ' + buildTime + ' */\n';
    /**
     * 创建配置
     */
    function fileQuery(){
        var a = [];
        'intro static base notify data util outro'.split(' ').forEach(function(i){
            a.push(libPath + '/' + i + jsSuffix);
        })
        return a;
    }
    var config = {
        /**
         *  导入配置文件
         */
        package: grunt.file.readJSON(cfgFile),
        banner: banner,
        replace: {
            version: {
                src: [libPath + '/' + name + jsSuffix],
                overwrite: true,
                replacements: [{
                    from: /exports.version\s*=\s*"\S*"/g,
                    to: 'exports.version = "' + version + '"'
                }]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner,
            },
            build: {
                src: fileQuery(),
                dest : buildPath + '/' + name + jsSuffix
            },
            bin:{
                src :[buildPath + '/' + name + jsSuffix],
                dest : binPath + '/' + name + jsSuffix
            }
        },
        uglify: {
            options: {
                banner: tinyBanner,
                sourceMap: buildPath + '/' + name + ".map"
            },
            build: {
                src: buildPath + '/' + name + jsSuffix,
                dest: buildPath + '/' + name +'.min' + jsSuffix
            }
        }
    };
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['replace','concat','uglify']);
};
/* vim: set sw=4 ts=4 et tw=80 : */
