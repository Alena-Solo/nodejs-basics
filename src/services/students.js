import { StudentsCollection } from '../db/models/students.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();

  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }

  if (filter.maxAge) {
    studentsQuery.where('age').lte(filter.maxAge);
  }

  if (filter.minAge) {
    studentsQuery.where('age').gte(filter.minAge);
  }

  if (filter.maxAvgMark) {
    studentsQuery.where('avgMark').lte(filter.maxAvgMark);
  }

  if (filter.minAvgMark) {
    studentsQuery.where('avgMark').gte(filter.minAvgMark);
  }

  const [studentsCount, students] = await Promise.all([
    StudentsCollection.find().merge(studentsQuery).countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

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
