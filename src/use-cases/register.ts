import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-alrady-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
