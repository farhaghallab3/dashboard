interface CourseCardProps {
  course: {
    imageUrl: string;
    title: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    price: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              <span>{new Date(course.startDate).toDateString()}</span>
              <span className="mx-1">-</span>
              <span>{new Date(course.endDate).toDateString()}</span>
            </div>
            <span className="text-lg font-semibold text-blue-600">
              ${course.price.toFixed(2)}
            </span>
          </div>
  
          <div className="flex gap-3">
            <button 
              onClick={onEdit}
              className="btn-secondary flex-1"
            >
              Edit
            </button>
            <button 
              onClick={onDelete}
              className="btn-danger flex-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  