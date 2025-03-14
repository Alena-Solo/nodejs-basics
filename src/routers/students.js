import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getStudentsController,
  getStudentsByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from '../controllers/students.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentsByIdController));
router.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.patch(
  '/students/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(updateStudentController),
);
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

export default router;
