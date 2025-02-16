import { Module } from '@nestjs/common';

import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [QuestionsModule, UsersModule],
  exports: [QuestionsModule, UsersModule],
})
export class ClientModule {}
