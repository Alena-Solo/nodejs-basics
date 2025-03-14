import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  return await StudentsCollection.find();
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
