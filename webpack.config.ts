const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path2 = require( 'path' );
module.exports = {
	entry: [
		'./src/index.tsx'
	],
	mode: 'production',
	// mode: "development",
	watch: false,
	output: {
		path: __dirname + "/dist",
		filename: 'build.js',
		// publicPath: __dirname + '/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			CallbackButton: path2.resolve(__dirname, 'src/ui/CallbackButton'),
		  }
	  },
	devServer: {
		historyApiFallback: true,
   		hot: false
	},
	optimization: {
		minimize: true,
		minimizer: [
		  new TerserPlugin({
			cache: true,
		  }),
		],
	},
	
	module: {
		rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
			},
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: '/dist/assets/',
          			publicPath: '/dist/assets/',
				}
			  },
			{
				test: /(\.ts|\.tsx)$/, 
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
				  'style-loader',
				  'css-loader',
				  'sass-loader',
				],
			  },
		]
	},
};