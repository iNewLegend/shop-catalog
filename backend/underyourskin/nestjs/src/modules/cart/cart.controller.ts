import { Cookies } from "@nestjsplus/cookies/dist/decorators/get-cookies.decorator";
import { CartItemDTO } from "./dtos/cart-item.dto";
import { Request, Response } from 'express';

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller( 'cart' )
export class CartController {

    @Get( 'index' )
    public getCart( @Res() response: Response, @Req() request: Request, @Body() cartItemDto: CartItemDTO, @Cookies() cookies ): Response {
        cookies.cart = cookies.cart || [];
        return response.send( cookies.cart );
    }

    @Post( 'addItem/' )
    public addItem( @Res() response: Response, @Cookies() cookies: any, @Body() cartItemDto: CartItemDTO ): Response {
        const currentCart = JSON.parse( cookies.cart );

        currentCart.push( cartItemDto );

        response.cookie( 'cart', JSON.stringify( currentCart ) );

        return response.send();
    }

    @Post( 'removeItem/' )
    public removeItem( @Res() response: Response, @Cookies() cookies: any, @Body() cartItemDto: CartItemDTO ): Response {
        const currentCart = JSON.parse( cookies.cart ).filter(
            ( currentItem ) => ! cartItemDto.id === currentItem.id,
        );

        response.cookie( 'cart', JSON.stringify( currentCart ) );

        return response.send( cartItemDto  );
    }
}
