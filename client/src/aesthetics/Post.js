import React from 'react';

const Post = () => {
  return (
    <form>
      <div className="w-96  mb-4 border border-white rounded-lg bg-white dark:bg-white dark:border-gray-600">
        <div className="px-2 py-2 bg-white rounded-t-lg dark:bg-white">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="5"
            className="w-full px-0 text-sm bg-white dark:bg-white dark:text-black dark:placeholder-gray-400"
            placeholder="Share your cooking adventures..."
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
          >
            Post comment
          </button>
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                />
              </svg>
              <span className="sr-only">Attach file</span>
            </button>
            {/* Add other buttons as needed */}
          </div>
        </div>
      </div>
    </form>
  );
};

const Guidelines = () => {
  return (
    <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
      Remember, contributions to this topic should follow our{' '}
      <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
        Community Guidelines
      </a>
      .
    </p>
  );
};

export { Post, Guidelines };
