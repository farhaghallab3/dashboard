import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { Toast } from 'primereact/toast';

interface Props {
    toast: React.RefObject<Toast | null>;
  }
function AddEditCourse({ toast }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseContext = useCourses();
  if (!courseContext) {
    throw new Error('CourseContext is not available');
  }
  const { addCourse, updateCourse, getCourseById } = courseContext;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (id) {
      const course = getCourseById(id);
      if (course) {
        setTitle(course.title);
        setDescription(course.description);
        setImage(course.image);
        setStartDate(course.startDate);
        setEndDate(course.endDate);
        setPrice(String(course.price));
        setPreview(course.image);
      }
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image || !startDate || !endDate || !price) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Missing Fields',
        detail: 'Please fill in all fields.',
        life: 3000,
        className: 'bg-orange-800 text-white',
      });
      return;
    }

    const courseData = {
      title,
      description,
      image,
      startDate,
      endDate,
      price: parseFloat(price),
    };

    if (id) {
      updateCourse(id, { ...courseData, id });
      toast.current?.show({
        severity: 'success',
        summary: 'Course Updated',
        detail: 'The course was updated successfully.',
        life: 2000,
      });
    } else {
      addCourse({ ...courseData, id: crypto.randomUUID() });
      toast.current?.show({
        severity: 'success',
        summary: 'Course Added',
        detail: 'The course was added successfully.',
        life: 2000,
        className: 'bg-orange-800 text-white',
      });
    }

    setTimeout(() => navigate('/courses'), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-800">
        {id ? 'Edit Course' : 'Add New Course'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-8 rounded-xl shadow-lg border"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold  text-orange-800">Course Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-orange-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-orange-800">Description</label>
          <textarea
            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-orange-700"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

       {/* Image Upload */}
       <div className="space-y-2 mt-6">
  <label className="block text-sm font-semibold text-orange-800"> Course Image</label>

  {!preview && (
    <div
      className="flex items-center justify-center w-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
          const event = {
            target: {
              files: [file],
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          handleImageChange(event);
        }
      }}
    >
      <label className="flex flex-col w-full h-36 border-2 border-dashed border-orange-400 hover:bg-orange-50 hover:border-orange-600 transition cursor-pointer rounded-lg items-center justify-center text-orange-600 text-sm font-medium">
        <span className="mb-1">Click to upload or drag & drop</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  )}

  {preview && (
    <div className="relative mt-4">
      <img
        src={preview}
        alt="Preview"
        className="w-full h-48 object-cover rounded-lg shadow border"
      />
    </div>
  )}
</div>



        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-orange-800">Start Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-orange-700"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-orange-800">End Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-orange-700"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-orange-800">Price (USD)</label>
          <input
            type="number"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-orange-700"
            step="1"
            min="0"
            placeholder="0-300"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-700 text-white py-3 px-6 rounded-lg text-lg hover:bg-orange-800 transition"
          >
            {id ? 'Update Course' : 'Add Course'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCourse;
