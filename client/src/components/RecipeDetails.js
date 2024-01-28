import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Nav from './Navbar';

export default function RecipeDetails() {
    const location = useLocation();
    const { recipeData,NER,title,searchOption } = location.state;
    const navigate=useNavigate();
    useEffect(()=>{
        console.log(recipeData);
        return () => {
          if (window.location.pathname === '/') {
            localStorage.removeItem('recipeData');
          }
        };
      },[recipeData])
    
    const handleBackClick=()=>{       
         navigate('/recipe-display', { state: { NER:NER,title:title,searchOption:searchOption} });   
    }
    return (
      <>
  <Nav/>
<div className="max-w-device p-6  border border-gray-200 rounded-lg scroll-smooth ">
<div
          className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
  </div>    
<button type="button"  onClick={()=>{handleBackClick()}} className="text-white mb-5 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="white"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg></button>
          <div className="px-4 sm:px-0">
            <h3 className="text-4xl font-bold leading-10 text-gray-900 ">Recipe Details</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Follow these details and make yourself a delicious treat.</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
          <div className="mt-3 text-5xl text-center font-bold ">{recipeData.title}</div>
          <div className="mt-6 border-t border-gray-100">
        </div>
        <div
            className="relative  right-[calc(40%-11rem)] aspect-[11052/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(100%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
          
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Ingredients</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                {recipeData.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                </ul>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Directions</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
                    {recipeData.directions.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                        <span>{ingredient}</span>
                    </li>
                ))}
                </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        </>
      )
}
