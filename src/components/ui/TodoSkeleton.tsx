
const TodoSkeleton = () => {
    return (
        <div className="animate-pulse flex gap-4 mt-10">
            <div className='space-y-5 basis-3/4'>
                <div className="h-5 w-1/2 bg-gray-200 rounded-lg"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex justify-between gap-4 basis-1/4">
                <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
            </div> 
        </div>
    )
}

export default TodoSkeleton