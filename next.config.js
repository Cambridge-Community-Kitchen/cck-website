module.exports = {
	webpack(config) {
		config.resolve.modules.push(__dirname);
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.graphassets.com',
				port: '',
			},
		],
	},
};
