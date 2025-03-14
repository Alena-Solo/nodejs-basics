import { StudentsCollection } from '../db/models/students.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllStudents = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();
  const studentsCount = await StudentsCollection.find()
    .merge(studentsQuery)
    .countDocuments();

  const students = await studentsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId) => {
  return await StudentsCollection.findById(studentId);
};

export const createStudent = async (payload) => {
  return await StudentsCollection.create(payload);
};

export const updateStudent = async (studentId, payload) => {
  const rawResult = await StudentsCollection.findByIdAndUpdate(
    studentId,
    payload,
    { new: true },
  );

  return rawResult || null;
};

export const deleteStudent = async (studentId) => {
  return await StudentsCollection.findOneAndDelete({
    _id: studentId,
  });
};
