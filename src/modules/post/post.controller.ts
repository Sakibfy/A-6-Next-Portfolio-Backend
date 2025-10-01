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
        const result = await PostServies.getAllPosts();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts", details: err });
    }
};

// Get All Post By Id
const getPostById = async (req: Request, res: Response) => {
    const post = await PostServies.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
};

// update post
const updatePost = async (req: Request, res: Response) => {
    const post = await PostServies.updatePost(Number(req.params.id), req.body);
    res.json(post);
};

// delete Post
const deletePost = async (req: Request, res: Response) => {
    await PostServies.deletePost(Number(req.params.id));
    res.json({ message: "Post deleted" });
};


export const  PostController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost 
}