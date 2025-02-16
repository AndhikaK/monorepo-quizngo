import { Request } from 'express';

import { User } from '@/client/users/entities/users.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
