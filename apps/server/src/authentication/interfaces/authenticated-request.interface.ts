import { Request } from 'express';

import { User } from '@/models/users/entities/users.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
