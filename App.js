import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from "./Home";
import Main from "./Main";
import ScrollToTop from "./ScrollToTop";
import { Navigate, Route, Routes } from 'react-router-dom'
import MovieSelector from './MovieSelector';
import Nopagefound from './Nopagefound';
import TheatreMain from './TheatreMain';
import TicketPage from "./TicketPage";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/theatremain' element={<TheatreMain></TheatreMain>} />
          <Route path='/main' element={<Main></Main>} />
          <Route path='/movie' element={<MovieSelector></MovieSelector>} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/header' element={<Header></Header>} />
           <Route path='*' element={<Nopagefound></Nopagefound>} />
        </Routes>
    </div>
  );
}

export default App;
