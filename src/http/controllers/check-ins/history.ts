import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserCheckInsUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(req.body)
    const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsUseCase()
    await fetchUserCheckInHistoryUseCase.execute({
        page,
        userId: req.user.sub
    })

    return res.status(200).send()
}
