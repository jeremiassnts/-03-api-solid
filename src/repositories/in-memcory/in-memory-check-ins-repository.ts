import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../prisma/check-ins-repository'
import { randomUUID } from 'crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkin)
    return checkin
  }
}
