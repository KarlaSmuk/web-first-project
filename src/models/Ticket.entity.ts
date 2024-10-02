import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    vatin: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}