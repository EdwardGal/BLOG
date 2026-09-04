export const sanitizeContent = (content) =>
	content
		.replaceAll('&ndsp;', ' ')
		.replace(/ +/, ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
