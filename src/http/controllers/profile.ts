import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {

  return res.status(200).send()
}
