"use client"
import './page.module.css';
import Home from './routes/Home/Home';
import About from './routes/About/About';
import Contact from './routes/Contact/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewOffer from './routes/NewOffer/NewOffer';
import ListOffers from './routes/ListOffers/ListOffers';
import Settings from './routes/Settings/Settings';
import Historical from './routes/Historical/Historical';
import ListReOffers from './routes/ListReoffers/ListReoffers';
import InitialPage from './routes/InitialPage/InitialPage';

const Page = () => {
  return (
    <BrowserRouter>
      <div className='my-styles'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<InitialPage />} />
          <Route path="/info" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/new-offer" element={<NewOffer />} />
          <Route path="/list-offers" element={<ListOffers />} />
          <Route path="/list-reoffers" element={<ListReOffers />} />
          <Route path="/historical" element={< Historical />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default Page;