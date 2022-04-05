class MyWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            'MyWebpackPlugin',
            (compilation, callback) => {
                const source = compilation.assets['main.js'].source();
                compilation.assets['main.js'].source = () => {
                    const banner = [
                      '/**',
                      ' * 이것은 BannerPlugin이 처리한 결과입니다.',
                      ' * Build Date: 2022-04-04',
                      ' */',
                      ''
                    ].join('\n');
                    return banner + '\n\n' + source;
                }
                // console.log(compilation.assets['main.js'].source());
      
                callback();
            }
        );

        compiler.hooks.done.tap('MyWebpackPlugin', stats => {
            console.log('MyPlugin: done');
        });
    }
}

module.exports = MyWebpackPlugin;
