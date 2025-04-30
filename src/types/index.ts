export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
}



export interface CourseContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Course) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
}

export interface CourseFormData {
  title: string;
  description: string;
  duration: number;
}

