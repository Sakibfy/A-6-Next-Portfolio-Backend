// user.routes.ts
import { Router } from 'express';
import { UserController } from './user.controller';


const router = Router();

router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const userRoute = router;