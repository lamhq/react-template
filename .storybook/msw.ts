import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('api/auth/access-tokens', () => {
    return HttpResponse.json({
      user: {
        id: '123',
        email: 'test@test.com',
      },
    });
  }),
];
