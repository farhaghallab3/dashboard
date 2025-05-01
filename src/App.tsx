import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import AddEditCourse from './pages/AddEditCourse';
import CourseDetails from './pages/CourseDetails';
import { CourseProvider } from './context/CourseContext';
import CourseList from './pages/CoursesList';





function App() {
  const toast = useRef<Toast>(null);

  return (
    <CourseProvider>
      <BrowserRouter basename=''>
        <Toast ref={toast} />
        <Routes>
          <Route path="/" element={<Login toast={toast} />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/add-course" element={<AddEditCourse toast={toast} />} />
          <Route path="/edit-course/:id" element={<AddEditCourse toast={toast} />} />
          <Route path="/course/:id" element={<CourseDetails />} />
        </Routes>
      </BrowserRouter>
    </CourseProvider>
  );
}

export default App;
