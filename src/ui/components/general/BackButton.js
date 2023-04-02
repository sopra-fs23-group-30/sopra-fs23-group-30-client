import React from 'react';

function BackButton({ className }) {
  const handleClick = () => {
    window.location.href = '/main';
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute top-0 right-0 ${className}`}
        onClick={handleClick}
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
    </div>
  );
}

export default BackButton;
