import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from "typeorm";

@Entity()
export class Products extends BaseEntity{
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imageURL: string;

    @Column()
    price: number;

    @Column({default: Date.now})
    createdAt: Date;
    }
