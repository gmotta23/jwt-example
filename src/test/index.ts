import { expect } from 'chai'
import app from '../app'
import request from 'supertest'

describe('UNIT tests', () => {
  it('should run a test', () => {
    expect(true).to.be.eq(true)
  })
  it('should run make a GET request to /test', async () => {
    let response = await request(app)
    .get('/test')

    expect(response.statusCode).to.eq(200)
  })  
})