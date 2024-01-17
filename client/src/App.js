import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import RecipeDisplay from './components/RecipeDisplay';
import RecipeDetails from './components/RecipeDetails';
import Nav from './components/Navbar';
import FrontPage from './components/FrontPage';
import SignIn from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { AuthProvider } from './components/auth/AuthContext'; // Import the AuthProvider
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          {/* Use PrivateRoute for protected routes */}
          <PrivateRoute path="/search-recipe" element={<Homepage />} />
          <Route path="/recipe-display" element={<RecipeDisplay />} />
          <Route path="/recipe-details" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
