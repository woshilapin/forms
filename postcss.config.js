module.exports = (context) => ({
	"plugins": {
		// Must be first to have the complete CSS file before applying other rules
		"postcss-import": {},
		// Must be processed on the raw files, before transformations
		"stylelint": {},
		// Give the 'correct' default CSS values (IE doesn't always respect that for example)
		"postcss-normalize": {},
		// Check for the coherence of colors in your CSS
		"colorguard": {},
		// Rewrite URLs to be correct
		"postcss-url": {},
		// To use variables in CSS
		"postcss-custom-properties": {},
		// To have the 'gray()' function in CSS
		"postcss-color-gray": {},
		// Include neet function to create colors
		"postcss-color-function": {},
		// Allow the use of nesting
		"postcss-nesting": {},
		// Use 'Can I Use' website to add or remove vendor prefix in CSS rules
		"autoprefixer": {},
		// Minify the CSS file
		"cssnano": context.env === 'production' ? {} : false,
		// Display Warning/Errors from previous plugins in a nice way
		"postcss-reporter": {}
	},
});
