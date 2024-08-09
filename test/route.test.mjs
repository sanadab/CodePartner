import request from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { createRequire } from 'module';
const require = createRequire(
    import.meta.url);

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../src/APP.js');

describe('Route Tests', () => {
    it('responds to /Sign-In', async() => {
        const res = await request(app).get('/Sign-In');
        expect(res).to.have.status(200);
    });

    it('responds to /Sign-Up-Student', async() => {
        const res = await request(app).get('/Sign-Up-Student');
        expect(res).to.have.status(200);
    });
    it('responds to /Sign-Up', async() => {
        const res = await request(app).get('/Sign-Up');
        expect(res).to.have.status(200);
    });
    it('responds to /HomePage', async() => {
        const res = await request(app).get('/HomePage');
        expect(res).to.have.status(200);
    });
    it('responds to /Student-Profile', async() => {
        const res = await request(app).get('/Student-Profile');
        expect(res).to.have.status(302);
    });

    it('responds to /Admin-profile', async() => {
        const res = await request(app).get('/Admin-profile');
        expect(res).to.have.status(302);
    });
    it('responds to /ForgotPW', async() => {
        const res = await request(app).get('/ForgotPW');
        expect(res).to.have.status(200);
    });
    it('responds to /Freelancer-Profile', async() => {
        const res = await request(app).get('/Freelancer-Profile');
        expect(res).to.have.status(302);
    });
    it('responds to /HomePage1', async() => {
        const res = await request(app).get('/HomePage1');
        expect(res).to.have.status(200);
    });
    it('responds to /HomePage2', async() => {
        const res = await request(app).get('/HomePage2');
        expect(res).to.have.status(200);
    });
    it('responds to /HomePage3', async() => {
        const res = await request(app).get('/HomePage3');
        expect(res).to.have.status(200);
    });
    it('responds to /AI-ins', async() => {
        const res = await request(app).get('/AI-ins');
        expect(res).to.have.status(200);
    });
    it('responds to /learning', async() => {
        const res = await request(app).get('/learning');
        expect(res).to.have.status(200);
    });
});