module.exports = {
    configureWebpack:{
        performance: {
          hints: false
        },
        optimization: {
          splitChunks: {
            minSize: 8192,
            maxSize: 16384,
          }
        }
    }
}