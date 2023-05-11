"use client"
import './page.module.css';
import Home from './routes/Home/Home';
import About from './routes/About/About';
import Contact from './routes/Contact/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNavBar from './components/SideNavbar/SideNavbar';

const Page = () => {
  return (
    <BrowserRouter>
      <div className='my-styles'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {/* <SideNavBar />  */}
    </BrowserRouter>

  );
};

export default Page;