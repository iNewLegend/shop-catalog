import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2,
    } )
    price;
}
