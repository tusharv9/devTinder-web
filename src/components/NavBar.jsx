import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(err) {
      // Error handling
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-gray-900 border-b border-purple-500/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg 
                className="w-8 h-8 mr-2 text-purple-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
              </svg>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">DevTinder</span>
            </Link>
          </div>

          {/* User Info & Menu */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <span className="text-purple-300">Welcome, <span className="font-semibold text-white">{user.firstName}</span></span>
              </div>
              
              <div className="relative group">
                <button className="flex items-center focus:outline-none">
                  <div className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden transition-all duration-300 group-hover:border-pink-500">
                    <img
                      alt="User Photo"
                      src={user.photoUrl || "/images/default-avatar.png"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                
                <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                  <div className="bg-gray-800 rounded-lg shadow-xl border border-purple-500/30 overflow-hidden">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-gray-300 text-sm">Signed in as</p>
                      <p className="text-white font-medium truncate">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Profile
                        <span className="ml-auto bg-pink-600 text-xs text-white px-2 py-0.5 rounded-full">New</span>
                      </Link>
                      <Link 
                        to="/connections" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        Connections
                      </Link>
                      <Link 
                        to="/requests" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                        Requests
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-700">
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar