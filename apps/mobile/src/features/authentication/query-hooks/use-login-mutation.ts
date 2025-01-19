import { useMutation } from '@tanstack/react-query';

import { apiPostLogin } from '@/apis/internal-api';
import { PostLoginPayload } from '@/apis/internal-api.type';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: PostLoginPayload) => apiPostLogin(payload),
  });
};
