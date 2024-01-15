function SkeletonLoader(){

return(
<>
<div role="status" class="max-w-device mt-10 p-4  border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
    <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg class="w-10 h-80 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
        </svg>
    </div>
    <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg class="w-10 h-80 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
        </svg>
    </div>
<div role="status" class="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
    <span class="sr-only">Loading...</span>
</div>
    <span class="sr-only">Loading...</span>
</div>
</>
)
}

export default SkeletonLoader;