import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          name: true,
          email: true,
          id: true
        }
      }
    }
    
  })
  return result;
}

const getAllPosts = async ({
  page = 1,
  limit = 10,
  search
}: {
    page?: number,
    limit?: number,
    search?: string
  }) => {
  const skip = (page - 1) * limit

  const where: any = {
    AND: [
      search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      },
      
    ]
  }
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    // include: {
    //   author: true
    // },
    // orderBy: {
    //   createdAt: "desc"
    // }
  });

  const total = await prisma.post.count({ where })

      return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

// get single post by id
const getPostById = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        return await tx.post.findUnique({
            where: { id },
            include: { author: true },
        });
    })
};
// Update post
const updatePost = async (id: number, data: Partial<any>) => {
  return prisma.post.update({ where: { id }, data });
}

// delete Post
const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
}

export const PostServies = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost
  
}