import { prisma } from "../../config/db"

const createUser = async (payload: any) => {

  console.log('userservies', payload)
  
  const createUser = await prisma.user.create({
    data: payload
  })
  return createUser;
}

export const UserService = {
  createUser,
}
 
