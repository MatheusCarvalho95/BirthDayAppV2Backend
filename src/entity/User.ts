import {Entity, PrimaryGeneratedColumn, Column,OneToMany} from "typeorm";
import { Birthday } from "./Birthdays";



@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Birthday, birthday => birthday.user)
    birthdays: Birthday[]

}
