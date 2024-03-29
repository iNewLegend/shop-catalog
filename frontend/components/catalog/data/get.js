/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Get specific items from catalog.
 */
import $flow from "@appsflow/core";

export class Get extends $flow.commandBases().CommandData {
	static getName() {
		return 'Components/Catalog/Data/Get';
	}

	getEndpoint() {
		return 'catalog/get/{ids}';
	}
}
