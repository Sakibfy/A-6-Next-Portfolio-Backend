import { Request, Response } from "express";
import { PostServies } from "./post.servies";

const createPost = async (req: Request, res: Response) => {

try {
  const result = await PostServies.createPost(req.body)
  console.log(result);
  res.status(201).json(result);

} catch (error) {
 res.status(500).send(error)
  }
}

// Get All Post

const getAllPosts = async (req: Request, res: Response) => {

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    
    const result = await PostServies.getAllPosts({page, limit, search})
    
    res.status(201).json(result);

} catch (error) {
    res.status(500).json({ error: "Failed to fetch posts", details: err });
    
  }
}

// Get All Post By Id

const getPostById = async (req: Request, res: Response) => {
    const post = await PostService.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
};

export const  PostController = {
  createPost,
  getAllPosts,
  getPostById
}