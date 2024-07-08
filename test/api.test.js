const request = require('supertest');
const app = require('../index');

describe('Testes de autenticação (Sign In)', () => {
    it('Deve retornar status 200 e token ao autenticar com credenciais corretas', async () => {
      const response = await request(app)
        .post('/auth')
        .send({
          email: 'alfacetj5@mail.com', 
          password: '4026.Test', 
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    }, 800000);
  
  });