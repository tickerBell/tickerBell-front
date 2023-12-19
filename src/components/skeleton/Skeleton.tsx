import React from 'react'

export const SkeletonList = () => {
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto animate-pulse">

        <div className="grid grid-cols-6 gap-36 place-items-center mt-60">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-full">
              <div className="w-full bg-gray-300 rounded-lg h-250"></div>

              <h1 className=" bg-gray-200 rounded-lg mt-10 w-full h-24"></h1>
              <h1 className=" bg-gray-200 rounded-lg mt-4 mb-4 w-[30%] h-21"></h1>
              <h1 className=" bg-gray-200 rounded-lg mt-4 mb-4 w-full h-48"></h1>
              <h1 className=" bg-gray-200 rounded-lg mt-6 mb-6 w-full h-21"></h1>
              <h1 className=" bg-gray-200 rounded-lg mt-6 mb-6 w-full h-48"></h1>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}

