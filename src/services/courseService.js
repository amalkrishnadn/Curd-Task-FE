import axios from "axios";
import { COURSES_API } from "./api";

export const getCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const createCourse = (course) => axios.post(COURSES_API, course);

export const updateCourse = (id, course) =>
  axios.patch(`${COURSES_API}/${id}`, course);

export const deleteCourse = (id) => axios.delete(`${COURSES_API}/${id}`);
