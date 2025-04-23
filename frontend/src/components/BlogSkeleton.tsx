export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
   <div className="bg-neutral-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
     

      {/* Content Skeleton 
       <div className="w-full h-48 bg-gray-200"></div>
       */}
       
      <div className="p-6">
        {/* Author and Date Skeleton */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Content Preview Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Read Time Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
      </div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
}