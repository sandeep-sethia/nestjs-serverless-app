import { Entity } from "typeorm";

import {
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity({ schema: 'users', name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'int' })
    org_id: number;

    @Column({ type: 'text' })
    name: string;
  
    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'timestamptz'})
    created_at: Date;

    @Column({ type: 'timestamptz' })
    updated_at: Date;
}