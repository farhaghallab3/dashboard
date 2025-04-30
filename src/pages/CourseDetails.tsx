import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { ArrowBigRight, Calendar } from 'lucide-react';


const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseContext = useCourses();
  const getCourseById = courseContext?.getCourseById;

  const course = getCourseById?.(id!);

  if (!course) {
    return <div className="text-center mt-10 text-red-500">Course not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <button
        onClick={() => navigate('/courses')}
        className="mb-4 text-orange-500 hover:underline"
      >
        ← Back to Courses
      </button>
      <img src={course.image} alt={course.title} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <p className="text-sm text-gray-500 flex items-center gap-2"> <Calendar /> {course.startDate} <ArrowBigRight/> {course.endDate}</p>
      <p className="text-lg font-semibold text-green-600 mt-2">${course.price}</p>
    </div>
  );
};

export default CourseDetails;
