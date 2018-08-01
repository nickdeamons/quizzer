module.exports = {
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .test('/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/')
      .use('url-loader?limit=10000&minetype=application/font-woff')
      .loader('url-loader')
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  } 
}

/*{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" } */