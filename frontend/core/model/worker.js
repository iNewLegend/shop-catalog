/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import ObjectHash from "object-hash";

/**
 * @memberOf core.model
 */
class Worker {
	static WORK_UPDATE_LOOP_INTERVAL = 100;

	isLocked = false;

	snapshots = {};
	models = {};
	prevModels = {};

	constructor() {
		setInterval( this.updateLoop.bind( this, Worker.WORK_UPDATE_LOOP_INTERVAL ) );
	}

	look() {
		this.isLocked = true;
	}

	unlock() {
		this.isLocked = false;
	}

	takeSnapshot( model ) {
		return ObjectHash( model );
	}

	handleSnapshot( model ) {
		const modelId = model.virtualId;

		if ( ! modelId ) {
			throw new RangeError( 'model.virtualId is required' );
		}

		const currentSnapshot = this.takeSnapshot( model );

		// Save current snapshot.
		const isDifference = this.snapshots[ modelId ] !== currentSnapshot;

		this.snapshots[ modelId ] = currentSnapshot;

		if ( model instanceof Object ) {
			Object.entries( model ).forEach( ( [ key, value ] ) => {
				if ( Array.isArray( value ) ) {
					value.__currentSnapshot = this.takeSnapshot( value );
					model[ key ] = value;
				}
			} );
		}

		if ( this.models[ modelId ] ) {
			this.prevModels[ modelId ] = this.models[ modelId ];
		}

		this.models[ modelId ] = model;

		if ( isDifference ) {
			// Update changed.
			let prevModel = null,
				currentModel = null;

			if ( this.prevModels[ modelId ] ) {
				prevModel = this.prevModels[ modelId ];
			}

			if ( this.models[ modelId ] ) {
				currentModel = this.models[ modelId ];
			}

			console.log({ modelOnChange: modelId, prevModel, currentModel })
			self.postMessage( { modelOnChange: modelId, prevModel, currentModel } );
		}
	}

	updateLoop() {
		if ( ! this.isLocked ) {
			Object.values( this.models ).forEach( ( model ) => {
				this.handleSnapshot( model );
			} );
		}
	}

	parseMessage( message ) {
		const { data } = message;

		this.look();

		if ( data.set ) {
			this.handleSnapshot( data.set );

		} else if ( data.delete ) {
			const id = data.delete;

			delete this.models[ id ];
			delete this.snapshots[ id ]
			delete this.prevModels[ id ];
		}

		this.unlock();
	}
}

if ( ! globalThis.worker ) {
	globalThis.worker = new Worker();
}

onmessage = (e)=>{
	worker.parseMessage( e );
}
