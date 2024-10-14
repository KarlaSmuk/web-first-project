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

    constructor(vatin: string, firstName: string, lastName: string) {
        this.vatin = vatin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = new Date(); //TODO FIX DATE TIME
    }
}