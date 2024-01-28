import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import axios from 'axios';
import RecipeNotFound from "./RecpieNotFound";
import Nav from "./Navbar";

  export default function RecipeDisplay() {
    const location = useLocation();
    const { NER,title,searchOption } = location.state;
    const [skeleton,setSkeleton]=useState(true);  
    const [recipeData, setRecipeData] = useState([]);
    const [noRecipes,setNoRecipes]=useState(false);
    const { pathname } = location;
    const isFromRecipeDetails = pathname.includes('/recipe-details');
    const navigate = useNavigate(); 
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (searchOption === "Ingredients") {
            const shouldFetchFreshData = !isFromRecipeDetails && !localStorage.getItem('recipeData');
    
            if (shouldFetchFreshData) {
              const response = await axios.post('http://localhost:8080/suggestTop5Recipes', { NER });
    
              if (response.data && response.data.length > 0) {
                setRecipeData(response.data);
                setNoRecipes(false);
                setSkeleton(false);
                localStorage.setItem('recipeData', JSON.stringify(response.data));
              } else {
                setNoRecipes(true);
                setSkeleton(false);
              }
            } else {
              const storedData = localStorage.getItem('recipeData');
              if (storedData) {
                setRecipeData(JSON.parse(storedData));
                setSkeleton(false);
              } else {
                setNoRecipes(true);
                setSkeleton(false);
              }
            }
          } else if (searchOption === "Title") {
            const shouldFetchFreshData = !isFromRecipeDetails && !localStorage.getItem('recipeData');
    
            if (shouldFetchFreshData) {
              const response = await axios.post('http://localhost:8080/suggestTop5RecipesbyTitle', { title });
    
              if (response.data && response.data.length > 0) {
                setRecipeData(response.data);
                setNoRecipes(false);
                setSkeleton(false);
                localStorage.setItem('recipeData', JSON.stringify(response.data));
              } else {
                setNoRecipes(true);
                setSkeleton(false);
              }
            } else {
              const storedData = localStorage.getItem('recipeData');
              if (storedData) {
                setRecipeData(JSON.parse(storedData));
                setSkeleton(false);
              } else {
                setNoRecipes(true);
                setSkeleton(false);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setNoRecipes(true);
          setSkeleton(false);
        }
      };
    
      fetchData();
    
      if (!isFromRecipeDetails) {
        localStorage.removeItem('recipeData');
      }
    
      return () => {
        if (window.location.pathname === '/search-recipe') {
          localStorage.removeItem('recipeData');
        }
      };
    }, [isFromRecipeDetails, navigate, NER, title, searchOption]);
    
    
    const handleDetails =(data)=>{
        if(recipeData.length>0){
        navigate('/recipe-details', { state: { recipeData: data,NER:NER,title:title,searchOption:searchOption} });
        }
    }
    const handleBackClick=()=>{       
        navigate('/search-recipe');
       
}
    return (
    skeleton ? (
      <>
        <Nav/>
        <SkeletonLoader/>
        </>
    ):(
        <>
        {noRecipes?(
        <>
        <Nav/>
        <RecipeNotFound/>
        </>
        ):(
            <>
            <Nav/>
            <button type="button"  onClick={()=>{handleBackClick()}} className="text-white mt-5 ml-5 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="white"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
        </button>
             <div
             className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 scroll-smooth"
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
               <div className=" py-20 sm:py-30">
               <div className="mx-auto max-w-7xl px-6 lg:px-8">
                   <div className="mx-auto max-w-2xl lg:mx-0 ">
                   <h2 className="text-3xl  font-bold tracking-tight text-gray-900 sm:text-4xl">Top Recipes</h2>
                   <p className="mt-2 text-lg leading-8 text-gray-600">
                       its a perfect match
                   </p>
                   </div>
                   <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
     {recipeData.map((post) => (
      post && post._id &&
       <article
         key={post._id}
         className="flex max-w-xl flex-col items-start justify-between group"
         onClick={() => {
           handleDetails(post);
         }}
       >
         <div className="relative cursor-pointer">
         {post&&post.title&&
           <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
             <span className="absolute inset-0" />
               {post.title} 
           </h3>
        
        } 
          {post&&post.directions&&
           <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
           {post.directions}
         </p>
        
        } 
          
         </div>
       </article>
      
     ))}
   </div>
               </div>
               </div>  
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
        </>
        )}

       
         </>
    )
    )
  }
  