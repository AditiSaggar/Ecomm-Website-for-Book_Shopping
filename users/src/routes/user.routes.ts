import express, { Response, Request } from 'express';
//import Store from "../model/store.model";
import { userController } from '../controllers/user.controller';
import auth from '../utilis/auth/user.middleware';
const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const newStore = new Store(req.body);
//     const store = await newStore.save();
//     res.json(store);
//   } catch (error) {
//     res.status(400).json({ error: "failed to create store" });
//   }
// });

//Register User
router.post('/create', userController.createNewUser);

//Login User
router.post('/login', userController.login);

//find all User
router.get('/', auth, userController.findAllUser);

// find a specific user
router.get('/:id', userController.findUserById);

// update a specific user
router.put('/:id', auth, userController.updateUser);

// deletes a specific user
router.delete('/:id', auth, userController.deleteUser);

export default router;