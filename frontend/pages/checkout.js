import modules from 'MODULES';

export default class Checkout extends modules.Page {
    static getNamespace() {
        return 'Pages'
    }

    static getName() {
        return 'Pages/Checkout';
    }

    initialize( options ) {
        super.initialize( options );

        this.logger.name = Checkout.getName();
        this.logger.startWith( { options } );
    }

    _render() {
        return (`
            <div class="checkout">
                <h1 style="text-align: center">Checkout</h1>
            </div>
    `);
    }
}
