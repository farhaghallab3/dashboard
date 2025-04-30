import { createContext, useContext, useState, useEffect } from 'react';
import { CourseContextType, Course } from '../types';


//const CourseContext = createContext<CourseContextType | null>(null);
const CourseContext = createContext<CourseContextType | null>(null);

export const useCourses = () => useContext(CourseContext);

import { ReactNode } from 'react';

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    if (savedCourses) {
      setCourses(savedCourses);
    }
  }, []);

  const saveCourses = (courses: Course[] | ((prevState: Course[]) => Course[])) => {
    localStorage.setItem('courses', JSON.stringify(courses));
    setCourses(courses);
  };

  const deleteCourse = (id: string) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    saveCourses(updatedCourses);
  };

  const addCourse = (newCourse: Course) => {
    const updatedCourses = [...courses, newCourse];
    saveCourses(updatedCourses);
  };

  const updateCourse = (id: string, updatedCourse: Course) => {
    const updatedCourses = courses.map(course =>
      course.id === id ? updatedCourse : course
    );
    saveCourses(updatedCourses);
  };

  const getCourseById = (id: string): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  return (
    <CourseContext.Provider value={{setCourses, courses, addCourse, deleteCourse, updateCourse, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
};