import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './users.entity';

@Entity('user_preferences')
export class UserPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ enum: 'en', default: 'en' })
  language: string;

  @Column({ enum: ['dark', 'light'], default: 'light' })
  display_preferences: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.preferences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' }) // Specify `user_id` as the foreign key
  user: User;
}
