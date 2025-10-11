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

const getAllPosts = async () => {
  const result = await prisma.post.findMany();
  console.log(result);
    return result;
};

// get single post by id
const getPostById = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: { id },
        include: { author: true },
    });

    return result;
};

// Update post
const updatePost = async (id: number, data: Partial<any>) => {
    return prisma.post.update({ where: { id }, data });
};

// delete Post
const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

export const PostServies = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost
  
}