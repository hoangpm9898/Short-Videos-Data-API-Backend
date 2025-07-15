/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Short {
  
  @PrimaryColumn()
  short_id: string;

  @Column()
  user_id: string;

  @Column()
  username: string;

  @Column()
  description: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  created_at: Date;

  @Column()
  url: string;
}
