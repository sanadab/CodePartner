import request from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon'; // Ensure sinon is imported correctly
import bcrypt from 'bcrypt'; // Ensure bcrypt is imported

const { expect } = chai;
chai.use(chaiHttp);

import app from '../src/APP.js'; // Update this path to match your app location
import { User } from '../src/Database/User.js';



describe('POST /Sign-Up', () => {
    let findOneStub;

    before(() => {
        // Stub the User.findOne method
        findOneStub = sinon.stub(User, 'findOne').resolves({
            FirstName: 'ExistingUser',
            password: 'existingpassword',
        });
    });

    after(() => {
        // Restore the original method after the test
        findOneStub.restore();
    });

    it('should not sign up if the user already exists', (done) => {
        request(app)
            .post('/Sign-Up')
            .send({
                FirstName: 'ExistingUser',
                LastName: 'Test',
                id: '123',
                password: 'Test@1234',
                email: 'test@example.com',
                Gender: 'Male',
                Age: 25,
                Phone: '1234567890',
                Roll: 'Student',
                Birthdate: '2000-01-01',
            })
            .expect(302)
            .expect('Location', '/Sign-Up', done);
    });
});
describe('Route Tests', () => {
    it('should respond to /Sign-In with status 200', async() => {
        const res = await request(app).get('/Sign-In');
        expect(res.status).to.equal(200);
    });

    it('should respond to /Sign-Up-Student with status 200', async() => {
        const res = await request(app).get('/Sign-Up-Student');
        expect(res.status).to.equal(200);
    });

    it('should respond to /Sign-Up with status 200', async() => {
        const res = await request(app).get('/Sign-Up');
        expect(res.status).to.equal(200);
    });

    it('should respond to /HomePage with status 200', async() => {
        const res = await request(app).get('/HomePage');
        expect(res.status).to.equal(200);
    });

    it('should respond to /Student-Profile with status 302', async() => {
        const res = await request(app).get('/Student-Profile');
        expect(res.status).to.equal(302);
    });

    it('should respond to /Admin-Profile with status 302', async() => {
        const res = await request(app).get('/Admin-Profile');
        expect(res.status).to.equal(302);
    });

    it('should respond to /ForgotPW with status 200', async() => {
        const res = await request(app).get('/ForgotPW');
        expect(res.status).to.equal(200);
    });

    it('should respond to /Freelancer-Profile with status 302', async() => {
        const res = await request(app).get('/Freelancer-Profile');
        expect(res.status).to.equal(302);
    });

    it('should respond to /HomePage1 with status 200', async() => {
        const res = await request(app).get('/HomePage1');
        expect(res.status).to.equal(200);
    });

    it('should respond to /HomePage2 with status 200', async() => {
        const res = await request(app).get('/HomePage2');
        expect(res.status).to.equal(200);
    });

    it('should respond to /HomePage3 with status 200', async() => {
        const res = await request(app).get('/HomePage3');
        expect(res.status).to.equal(200);
    });

    it('should respond to /AI-ins with status 200', async() => {
        const res = await request(app).get('/AI-ins');
        expect(res.status).to.equal(200);
    });

    it('should respond to /learning with status 200', async() => {
        const res = await request(app).get('/learning');
        expect(res.status).to.equal(200);
    });



});