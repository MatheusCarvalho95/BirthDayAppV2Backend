import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

import {User} from './User'

@Entity ({name: "birthdays"})
export class Birthday {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    where: string;

    @Column()
    gifts: string;

    @ManyToOne(type => User, user => user.birthdays)
    userId: User
}