/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */
// import WebFont from 'webfontloader';

export async function loadFonts() {
	const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')
	// return url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap');
	
	webFontLoader.load({
		google: {
			families: [
				'Work Sans:400,500,600,700,800',
				'Courgette',
				'Montserrat']
		}
	});
}