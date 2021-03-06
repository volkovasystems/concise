define( "Component", 
	[ 
		"angular", 
		"jquery",
		"underscore",
		"string",
		"extend"
	],
	function( extend ){
		function Component( name, id ){
			this.id = id;
			this.name = name;
		}

		Component.prototype.integrate = function integrate( parent ){
			if( typeof parent == "string" ){
				parent = $( parent );
			}
			this.parent = parent;

			return this;
		};

		Component.prototype.bootstrap = function bootstrap( module ){
			if( "parent" in this ){
				var modules = _.filter( _.flatten( [ module ] ),
					function( moduleData ){
						return typeof moduleData == "string";
					} );
				this.module = angular.bootstrap( this.parent[ 0 ], modules );	
			}
			
			return this;
		};

		Component.prototype.build = function build( ){

			if( "directive" in this ){
				var directiveName = S( this.name ).camelize( ).toString( );
				this.module.directive( directiveName, this.directive );
			}else{
				throw new Error( "missing directive" );
			}

			if( "controller" in this ){
				var controllerName = S( this.name ).camelize( ).toString( ) + "Controller";
				this.module.controller( controllerName, this.controller );
			}

			if( "service" in this ){
				var serviceName = S( this.name ).camelize( ).toString( );
				this.module.service( serviceName, this.service );
			}

			if( "factory" in this ){
				var factoryName = S( this.name ).camelize( ).toString( );
				this.module.factory( serviceName, this.factory );
			}

			if( "provider" in this ){
				var providerName = S( this.name ).camelize( ).toString( );
				this.module.provider( providerName, this.provider );
			}
		};

		return extend( Component );
	} );

define( "extendComponent", 
	[ 
		"Component"
	],
	function( Component ){
		var extendComponent = function extendComponent( component ){
			return Component.extend( component );
		};

		return extendComponent; 
	} );
