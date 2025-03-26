const jwtConfig = {
	access: {
		type: "accessToken",
		expiresIn: `${1000 * 10 * 100}`,
	},
	refresh: {
		type: "refreshToken",
		expiresIn: `${1000 * 60 * 60 * 120}`,
	},
};

module.exports = jwtConfig;
