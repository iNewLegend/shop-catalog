import {Cookies} from "@nestjsplus/cookies/dist/decorators/get-cookies.decorator";
import {CartService} from "./cart.service";
import {CartItemDTO} from "./dtos/cart-item.dto";
import {Request, Response} from 'express';

import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';

@Controller('cart')
export class CartController {

    /**
     * this cookies is fucked
     *
     * use this:
     *
     * https://docs.nestjs.com/techniques/cookies
     *
     *
     */
    constructor(private readonly cartService: CartService) {
    }

    // private getCart( cookies ) {

    // }

    @Get('index')
    public getCart(@Res() response: Response, @Req() request: Request, @Body() cartItemDto: CartItemDTO, @Cookies() cookies): Response {

        return response.send(cookies.cart);
    }


    @Post('addItem/')
    public addItem(@Res() response: Response, @Cookies() cookies: any, @Body() cartItemDto: CartItemDTO): Response {
        console.log(cookies, cartItemDto);
        // Create common method for reading cart from cookies

        // const cart = this.cartService.getCart( cookies ); ( Should return cart class created from coockies)

        // cart.addItem( id, amount );

        // this.cartService.saveCart( cookies, cart );

        //return cart;

        // cart = this.cartService.addItem( )

        // LEONID:
        // i made it works with 'mock' data.
        response.cookie('cart', JSON.stringify([{


            id: 1,
            amount: 5,
        }])) // Using express res object.
        return response.send('Cookie has been set! :)')

    }
}
