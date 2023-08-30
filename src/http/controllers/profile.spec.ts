import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

test('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456'
            })

        const authReponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'johndoe@example.com',
                password: '123456'
            })

        const { token } = authReponse.body

        const profileReponse = await request(app.server)
            .get('/me')
            .set('Authorizxation', `Bearer ${token}`)
            .send()

        expect(profileReponse.statusCode).toEqual(200)
        expect(profileReponse.body.user).toEqual(expect.objectContaining({
            email: 'johndoe@example.com'
        }))
    })
})