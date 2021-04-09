import {Module} from '@nestjs/common';
import {CartController} from './cart.controller';
import {CartService} from './cart.service';

@Module({
    imports: [],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule {
}
