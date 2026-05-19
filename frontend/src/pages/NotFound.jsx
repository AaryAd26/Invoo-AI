import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className=' min-h-screen flex items-senetr justify-center bg-white '>
        <div className=' text-center p-8'>
            <h1 className=' text-4xl font-bold mb-2 '>
                404
            </h1>
            <p className=' text-grey-800 mb-6'>
                Page Not Found
            </p>
            <link to='/' className=" px-4 py-2 rounded-mb bg-indigo-700 text-white">
                GO to Home 
            </link>
        </div>
    </div>
  )
}

export default NotFound