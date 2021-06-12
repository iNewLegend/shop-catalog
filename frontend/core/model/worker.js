/**
 * @file: core/model/worker.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import ObjectHash from "object-hash";

/**
 * @memberOf core.model
 */
class Worker {
	static WORK_UPDATE_LOOP_INTERVAL = 500;

	isLocked = false;

	snapshots = {};
	models = {};

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

		if ( this.snapshots[ modelId ] !== currentSnapshot ) {
			// Update changed.
			console.log( { modelOnChange: modelId }  );
			self.postMessage( { modelOnChange: modelId } );
		}

		// Save current snapshot.
		this.snapshots[ modelId ] = currentSnapshot;
		this.models[ modelId ] = model;
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
			delete this.models[ data.delete.virtualId ];
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
