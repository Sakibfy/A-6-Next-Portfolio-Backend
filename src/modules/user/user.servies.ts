import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db"


// Create User
const createUser = async (payload: Prisma.UserCreateInput) : Promise<User> => {

  const createUser = await prisma.user.create({
    data: payload
  })
  return createUser;
}
// Get All User
const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      posts: true
    },
    orderBy: {
      createdAt: "desc"
    },
    
  });
  return result;
}

// Get User By ID
const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      posts: true
    }
  })
  return result;
}
export const UserService = {
  createUser,
  getAllUser,
  getUserById
}
 
