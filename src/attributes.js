wp.hooks.addFilter( 'blocks.registerBlockType', 'custom-blocks/inline-style/attributes', function( settings, name ) {
	settings = window.lodash.assign( {}, settings, {
		attributes: window.lodash.assign( {}, settings.attributes, {
			paddingLeft: {
				type: 'string',
				default: '',
			},
			paddingRight: {
				type: 'string',
				default: '',
			},
			paddingTop: {
				type: 'string',
				default: '',
			},
			paddingBottom: {
				type: 'string',
				default: '',
			},
			marginLeft: {
				type: 'string',
				default: '',
			},
			marginRight: {
				type: 'string',
				default: '',
			},
			marginTop: {
				type: 'string',
				default: '',
			},
			marginBottom: {
				type: 'string',
				default: '',
			},
		} ),
	} );
	return settings;
} );
