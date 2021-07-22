import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { select } = wp.data;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { SelectControl, PanelBody } = wp.components;
const { Fragment, useEffect } = wp.element;

const names = [
	{ slug: 'padding-left', variable: 'paddingLeft' },
	{ slug: 'padding-right', variable: 'paddingRight' },
	{ slug: 'padding-top', variable: 'paddingTop' },
	{ slug: 'padding-bottom', variable: 'paddingBottom' },
	{ slug: 'margin-left', variable: 'marginLeft' },
	{ slug: 'margin-right', variable: 'marginRight' },
	{ slug: 'margin-top', variable: 'marginTop' },
	{ slug: 'margin-bottom', variable: 'marginBottom' },
];

function getVariablesFromClass( o, word = 'margin/padding' ) {
	const regexp = ( word === 'margin/padding' ) ?
		/u-(margin|padding)-([a-z]+)-([a-z]+)/ :
		new RegExp( 'u-(' + word + ')-([a-z]+)' );
	const words = o.match( regexp );

	if ( words ) {
		// Default:
		// 0: u-margin-top-small
		// 1: margin
		// 2: top
		// 3: small

		// Custom word:
		// 0: u-margin-top-small
		// 1: u-margin-top
		// 2: small
		return words;
	}
	return null;
}

function checkIfClassExist( className, setAttributes ) {
	// check if class with padding/margin already exist
	names.forEach( ( name ) => {
		if ( className.includes( 'u-' + name.slug ) ) {
			const param = getVariablesFromClass( className, name.slug );
			if ( param ) {
				setAttributes( { [ name.variable ]: param[ 2 ] } );
			}
		}
	} );
}

function changeClassName( key, value, props ) {
	const { className } = props.attributes;
	const element = names.find( ( name ) => name.variable === key );

	if ( element ) {
		const newParam = ( value ) ? 'u-' + element.slug + '-' + value : '';
		let newClassName = ( typeof className === 'undefined' ) ? '' : className;

		if ( className && className.includes( element.slug ) ) {
			// find string with eg. 'u-margin-right-*' and then remove it
			const params = getVariablesFromClass( className, element.slug );
			if ( params ) {
				newClassName = className.replace( params[ 0 ], '' );
			}
		}
		newClassName = newClassName + ' ' + newParam;

		return props.setAttributes( { [ key ]: value, className: newClassName } );
	}

	return props.setAttributes( { [ key ]: value } );
}

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { paddingLeft, paddingRight, paddingTop, paddingBottom,
			marginLeft, marginRight, marginTop, marginBottom, className } = props.attributes;
		const isAdmin = select( 'core' ).canUser( 'create', 'users' );
		const options = [
			{ label: '-', value: '' },
			{ label: 'None', value: 'none' },
			{ label: 'XXSmall', value: 'xxsmall' },
			{ label: 'XSmall', value: 'xsmall' },
			{ label: 'Small', value: 'small' },
			{ label: 'Regular', value: 'regular' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Large', value: 'large' },
			{ label: 'XLarge', value: 'xlarge' },
			{ label: 'XXLarge', value: 'xxlarge' },
		];

		useEffect( () => {
			// Do when the block editor is initialized.
			if ( className ) {
				checkIfClassExist( className, props.setAttributes );
			}
		}, [] );

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isAdmin ?
					<InspectorControls key="inspector">
						<PanelBody title={ __( 'Spacings' ) }>
							<h3>Paddings</h3>
							<SelectControl
								label={ __( 'Padding left:' ) }
								labelPosition={ 'side' }
								value={ paddingLeft }
								onChange={ padding => changeClassName( 'paddingLeft', padding, props ) }
								options={ options }
							/>
							<SelectControl
								label={ __( 'Padding right:' ) }
								labelPosition={ 'side' }
								value={ paddingRight }
								onChange={ padding => changeClassName( 'paddingRight', padding, props ) }
								options={ options }
							/>
							<SelectControl
								label={ __( 'Padding top:' ) }
								labelPosition={ 'side' }
								value={ paddingTop }
								onChange={ padding => changeClassName( 'paddingTop', padding, props ) }
								options={ options }
							/>
							<SelectControl
								label={ __( 'Padding bottom:' ) }
								labelPosition={ 'side' }
								value={ paddingBottom }
								onChange={ padding => changeClassName( 'paddingBottom', padding, props ) }
								options={ options }
							/>

							<h3>Margins</h3>
							<SelectControl
								label={ __( 'Margin left:' ) }
								labelPosition={ 'side' }
								value={ marginLeft }
								onChange={ margin => changeClassName( 'marginLeft', margin, props ) }
								options={ options }
							/>
							<SelectControl
								label={ __( 'Margin right:' ) }
								labelPosition={ 'side' }
								value={ marginRight }
								onChange={ margin => changeClassName( 'marginRight', margin, props ) }
								options={ options }
							/>
							<SelectControl
								label={ __( 'Margin top:' ) }
								labelPosition={ 'side' }
								value={ marginTop }
								onChange={ margin => changeClassName( 'marginTop', margin, props ) }
								options={ options }
							/>
							<SelectControl
								label={ __( 'Margin bottom:' ) }
								labelPosition={ 'side' }
								value={ marginBottom }
								onChange={ margin => changeClassName( 'marginBottom', margin, props ) }
								options={ options }
							/>
						</PanelBody>
					</InspectorControls> :
					'' }
			</Fragment>
		);
	};
}, 'withInspectorControl' );

wp.hooks.addFilter( 'editor.BlockEdit', 'custom-blocks/inline-style/inspector', withInspectorControls );
