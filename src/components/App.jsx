import HomePage from 'pages/HomePages';
import { NavLink, Routes, Route } from 'react-router-dom';
import PostDetails from '../pages/PostDetails';
import SearchPage from '../pages/SearchPage';

export const App = () => {
  return (
    <div>
      <p>React</p>
      <header>
        <nav>
          <NavLink to="/">Home Page</NavLink>
          <NavLink to="/search">Search</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/post/:postId/*" element={<PostDetails />} />
        </Routes>
      </main>
    </div>
  );
};
