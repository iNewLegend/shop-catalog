import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';

@Module( {
    imports: [],
    providers: [],
    controllers: [ CartController ],
} )

export class CartModule {
}
