import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserPreferences } from './user-preferences.entity';

const CLOUNDINARY_IMAGE_PATH = process.env.CLOUNDINARY_IMAGE_PATH;

@Entity('users') // Table name
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Transform(({ value }) =>
    value ? `${CLOUNDINARY_IMAGE_PATH}${value}` : null
  )
  display_picture_url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => UserPreferences, (preferences) => preferences.user, {
    cascade: true,
  })
  preferences: UserPreferences;
}
