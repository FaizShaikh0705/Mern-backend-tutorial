import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate()

  return (
    <main>
    <div>
      <div className="text-yellow-300 mb-10">
        <h1 className="text-5xl text-bold font-bold sm:w-1/3">
          The Page you were looking for does not exist! <div onClick={()=>{
            navigate(-1)
          }} className='m-3 cursor-pointer'>Go Back {'<<'}</div>
        </h1>
      </div>
      
    </div>
  </main>
  )
}

export default NotFound