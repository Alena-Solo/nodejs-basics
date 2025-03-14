import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getStudentsController,
  getStudentsByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from '../controllers/students.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));
router.get('/students/:studentId', ctrlWrapper(getStudentsByIdController));
router.post('/students', ctrlWrapper(createStudentController));
router.patch('/students/:studentId', ctrlWrapper(updateStudentController));
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

export default router;
