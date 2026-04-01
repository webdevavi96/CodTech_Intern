import React from 'react'

function CardSkeleton() {
    return (
        <div className="mx-auto bg-white shadow-md rounded-xl overflow-hidden mb-6 animate-pulse">

            <div className="flex flex-col md:flex-row">

                <div className="md:w-1/3">
                    <div className="w-full h-48 md:h-full bg-gray-300"></div>
                </div>

                <div className="p-4 md:w-2/3 flex flex-col justify-between">

                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>

                    <div className="flex justify-between items-center">

                        <div className="h-4 bg-gray-300 rounded w-20"></div>

                        <div className="space-y-2 text-right">
                            <div className="h-3 bg-gray-300 rounded w-16"></div>
                            <div className="h-3 bg-gray-300 rounded w-20"></div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardSkeleton