import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDisplay from './components/RecipeDisplay';
import RecipeDetails from "./components/RecipeDetails";
import Nav from "./components/Navbar";
import FrontPage from "./components/FrontPage";
import SignIn from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/search-recipe" element={<Homepage />} />
        <Route path="/recipe-display" element={<RecipeDisplay />} />
        <Route path="/recipe-details" element={<RecipeDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

