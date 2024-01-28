import React from "react";

function BestRatedRecipes() {
  // Array of recipes with details
  const recipes = [
    {
      title: "Best Recipe I've ever tried!",
      rating: 5,
      description:
        "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
    },
    {
      title: "Best UI library I've ever tried!",
      rating: 4,
      description:
        "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
    },
    {
        title: "Best UI library I've ever tried!",
        rating: 4,
        description:
          "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
      },
      {
        title: "Best UI library I've ever tried!",
        rating: 4,
        description:
          "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
      },
      {
        title: "Best UI library I've ever tried!",
        rating: 4,
        description:
          "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
      },
    // Add more recipes as needed
  ];

  return (
    <div className="relative">
      {/* <!-- Component: Rating Card Brand List Detailed --> */}
      <div className=" font-secondary text-2xl mb-10 mt-5 text-center">Top 5 Recipes</div>
      <div className="max-w-lg">
        {/* <!-- Detailed list category rating  --> */}
        <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
          <div className="p-6">
            <div className="flex w-full flex-col divide-y divide-slate-200">
              {/* Iterate over recipes using map */}
              {recipes.map((recipe, index) => (
                <div key={index} className="flex flex-col gap-2 py-4">
                  {/* Title */}
                  <h4 className="flex w-full flex-1 gap-4 text-base font-medium text-slate-700">
                    <span className="w-0 flex-1 truncate">{recipe.title}</span>
                    {/* Rating */}
                    <span className="flex shrink-0 items-center gap-4 rounded text-sm text-slate-500">
                      {/* Use recipe.rating to determine the number of stars */}
                      {Array.from({ length: recipe.rating }).map((_, i) => (
                        <span key={i} className="flex text-amber-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ))}
                    </span>
                  </h4>
                  <p className="text-sm leading-6 text-slate-500">
                    {recipe.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Rating Card Brand List Detailed --> */}
    </div>
  );
}

export default BestRatedRecipes;
