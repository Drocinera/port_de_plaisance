import chai from'chai';
import chaiHttp from'chai-http';
import app from'../app'; 
import User from'../models/User';

chai.use(chaiHttp);
chai.should();

describe('Auth API', () => {
  before(async () => {
    await User.deleteMany({});
  });

  it('should sign up a user', done => {
    chai.request(app)
      .post('/signup')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Utilisateur créé');
        done();
      });
  });

  it('should login a user', done => {
    chai.request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
