'use client'

import React from 'react'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset'
}

const PrimaryButton = ({children, onClick, type = 'submit'} : ButtonProps) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className="m-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-small rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
     > 
     {children}
     </button>
  )
}

export default PrimaryButton
