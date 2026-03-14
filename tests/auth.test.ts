import request from 'supertest';
import app from '../src/index';

describe('Authentication API', () => {
    describe('POST /api/auth/login', () => {
        it('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'wrong@example.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message');
        });

        it('should return 400 if email or password is missing', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({});

            expect(response.status).toBe(400);
        });
    });

    describe('GET /health', () => {
        it('should return 200 and status ok', async () => {
            const response = await request(app).get('/health');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ok');
        });
    });
});
