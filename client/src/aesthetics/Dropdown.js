import { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  const hanldeisOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMenuMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setIsOpen(false);
  };
  const [cookies, removeCookie] = useCookies(['token']);
  const {logout}=useAuth();

  return (
    <div className="relative inline-block text-left">
      <div
        id="dropdownDefaultButton"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={hanldeisOpen}
        className="flex text-sm bg-purple-800 rounded-full md:me-0 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
      >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="user photo"/>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="z-10 absolute  space-y-1 bg-white divide-y self-center  divide-purple-100 rounded-lg shadow w-44 dark:bg-purple-700 "
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <ul className="py-2 text-sm text-purple-700 dark:text-purple-200">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-600 dark:hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-600 dark:hover:text-white">
                Settings
              </a>
            </li>
            <li>
                    <div onClick={()=>{
                     removeCookie('token');
                      logout();
                      navigate('/signin');
                    }} className="block px-4 py-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-600 dark:hover:text-white">Logout</div>
                </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
