import localforage from 'localforage';
import { CourseFormData } from '../types';





const COURSE_KEY = 'courses';

export async function getCourses(): Promise<CourseFormData[]> {
  return (await localforage.getItem<CourseFormData[]>(COURSE_KEY)) || [];
}

export async function saveCourse(course: CourseFormData): Promise<void> {
  const courses = await getCourses();
  const existingIndex = courses.findIndex(c => c.title === course.title);
  
  if (existingIndex >= 0) {
    courses[existingIndex] = course;
  } else {
    courses.push(course);
  }

  await localforage.setItem(COURSE_KEY, courses);
}

export async function deleteCourse(id: string): Promise<void> {
  const courses = await getCourses();
  const filtered = courses.filter(c => c.title !== id);
  await localforage.setItem(COURSE_KEY, filtered);
}
