import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { QuestionCategoryEntity } from './question-categories.entity';

@Entity()
export class QuestionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  question_category_id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => QuestionCategoryEntity,
    (questionCategory) => questionCategory.questions,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'question_categories_id' })
  question_category: QuestionCategoryEntity;
}
