import { useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useState, useEffect } from 'react';
import { Pen, Book, Trash, Plus , Calendar, ArrowBigRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Course } from '../types';

const CourseList = () => {
  const navigate = useNavigate();
  const courseContext = useCourses(); 
  const courses = courseContext?.courses || [];
  const setCourses = courseContext?.setCourses || (() => {});
  const [search, setSearch] = useState('');
  const { email } = useAuth();
  const getStorageKey = (email: string) => `courses_${email}`;
  const saveCourses = (courses: Course[]) => {
    localStorage.setItem(getStorageKey(email), JSON.stringify(courses));
  };

 
  

  useEffect(() => {
    loadCourses(); 
  }, []);

  if (!courses) {
    return <div>Loading...</div>; 
  }

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );


  


  const handleDeleteCourse = (id: string) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    saveCourses(updatedCourses);
    setCourses(updatedCourses);
  };



  const loadCourses = () => {
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    if (savedCourses.length > 0) {
      setCourses(savedCourses);
    } else {
      setCourses([]); 
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">Courses</h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full md:w-1/2 border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{course.description.slice(0, 60)}...</p>
              <p className="text-sm text-gray-500 flex items-center gap-2"> <Calendar /> {course.startDate} <ArrowBigRight/> {course.endDate}</p>
              <p className="text-green-600 font-semibold mt-1">${course.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/edit-course/${course.id}`)}
                  className="text-orange-600 hover:underline text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Pen /> Edit
                  </div>
                </button>
                <button
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="text-purple-600 hover:underline text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Book /> View
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Trash /> Delete
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button

          onClick={() => navigate('/add-course')}
          className="bg-orange-700 text-white px-6 py-2 rounded hover:bg-orange-800 rounded-[8px]"
        >
          <div className="flex items-center gap-2">
            <Plus /> Add New Course
          </div>
        </button>
      </div>
    </div>
  );
};

export default CourseList;
