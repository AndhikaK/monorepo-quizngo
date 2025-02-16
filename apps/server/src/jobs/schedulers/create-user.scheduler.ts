import { fakerID_ID as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ICreateUser } from '@/client/users/interfaces/create-user.interface';
import { UsersService } from '@/client/users/users.service';
import { AppLogger } from '@/common/logger/app.logger';
import { EnvService } from '@/config/env/env.service';

@Injectable()
export class CreateUserJobScheduler {
  private readonly logger = new AppLogger();

  constructor(
    private usersService: UsersService,
    private envService: EnvService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCreateUserJob() {
    const envJobsCreateUser = this.envService.get('FLAGS_JOBS_CREATE_USER');
    if (envJobsCreateUser !== 'ON') {
      this.logger.info(
        `JOBS: handleCreateUserJob not executed (env: FLAGS_JOBS_CREATE_USER, ${envJobsCreateUser})`
      );
      return;
    }

    const fullName = faker.person.fullName();

    const userData: ICreateUser = {
      name: fullName,
      email: fullName.toLowerCase().replace(' ', '.') + '@gmail.com',
      password: '123456',
    };

    this.logger.info('JOBS: User created' + JSON.stringify(userData));

    this.usersService.createUser(userData);
  }
}
