

const Footer = () => {
  return (
    <footer className="w-full bg-[#DFDFD8] px-6 py-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
      {/* Left side - Links */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cookies</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Legal</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Recalls</a>
      </div>
      <div className="text-gray-600 text-sm">
        © 2024 Copyright FinWise
      </div>
      <div className="flex gap-6 items-center">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L13.1 12.3C12.4 12.7 11.6 12.7 10.9 12.3L4.4 8.25C4.2 8.15 4 7.95 4 7.7C4 7.25 4.5 7 4.9 7.2L11.4 11.2C11.8 11.4 12.3 11.4 12.7 11.2L19.2 7.2C19.6 7 20.1 7.25 20.1 7.7C20 7.95 19.8 8.15 19.6 8.25Z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.64 8.9 16.64 9 16.64 9.1C16.64 12.5 14.04 16.5 9.24 16.5C7.74 16.5 6.34 16.1 5.14 15.3C5.34 15.3 5.54 15.4 5.84 15.4C7.14 15.4 8.24 14.9 9.24 14.2C8.04 14.2 7.04 13.4 6.64 12.4C6.84 12.4 7.04 12.5 7.24 12.5C7.54 12.5 7.84 12.4 8.04 12.4C6.74 12.1 5.84 11 5.84 9.7V9.6C6.24 9.8 6.74 10 7.24 10C6.54 9.5 6.04 8.6 6.04 7.6C6.04 7.1 6.14 6.6 6.44 6.2C7.84 8 9.94 9.2 12.24 9.3C12.14 9.1 12.14 8.9 12.14 8.7C12.14 7.1 13.44 5.8 15.04 5.8C15.84 5.8 16.54 6.1 17.14 6.7C17.84 6.6 18.54 6.3 19.14 5.9C18.94 6.7 18.44 7.3 17.74 7.7C18.44 7.6 19.04 7.4 19.64 7.1C19.14 7.7 18.54 8.3 17.94 8.7C16.64 15.4 8.74 19.3 4.04 16.1C6.74 17.8 10.04 17.9 12.74 16.3C10.24 16.3 8.04 14.1 8.04 11.5"/>
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H6.5V10H9V17ZM7.7 8.7C7 8.7 6.4 8.1 6.4 7.4C6.4 6.7 7 6.1 7.7 6.1C8.4 6.1 9 6.7 9 7.4C9 8.1 8.4 8.7 7.7 8.7ZM18 17H15.5V13.9C15.5 12.7 15 12 14.1 12C13.2 12 12.7 12.7 12.7 13.9V17H10.2V10H12.7V11C13.1 10.3 14 9.8 15.2 9.8C16.8 9.8 18 10.9 18 13.1V17Z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7ZM12 20C9.33 20 7 18.67 7 16C7 14.69 7.67 13.59 9 13.17C9.87 14.27 10.84 15 12 15C13.16 15 14.13 14.27 15 13.17C16.33 13.59 17 14.69 17 16C17 18.67 14.67 20 12 20Z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 12.05C20 7.51996 16.37 3.91996 11.83 4.00996C7.73 4.08996 4.43 7.46996 4.44 11.57C4.44 13.45 5.09 15.19 6.23 16.57L4.5 19.5L7.55 17.82C8.87 18.82 10.47 19.39 12.17 19.39H12.19C16.72 19.39 20 15.72 20 12.05ZM12.19 18.19C10.69 18.19 9.23 17.66 8 16.71L7.77 16.57L5.99 17.5L6.94 15.79L6.78 15.53C5.73 14.24 5.16 12.65 5.16 11C5.16 7.87996 8.04 4.99996 11.17 4.99996C15.07 4.99996 18 7.92996 18 11.82C18 14.96 15.33 18.19 12.19 18.19ZM15.83 13.34C15.67 13.26 14.71 12.79 14.57 12.73C14.42 12.68 14.32 12.65 14.21 12.82C14.11 12.98 13.73 13.42 13.64 13.53C13.55 13.63 13.46 13.65 13.3 13.56C13.14 13.48 12.5 13.28 11.75 12.61C11.16 12.09 10.76 11.45 10.67 11.29C10.58 11.13 10.66 11.04 10.74 10.96C10.81 10.89 10.9 10.77 10.98 10.68C11.06 10.59 11.09 10.52 11.14 10.42C11.19 10.31 11.16 10.22 11.13 10.14C11.1 10.06 10.71 9.09996 10.58 8.76996C10.45 8.44996 10.32 8.48996 10.22 8.47996H9.91C9.8 8.47996 9.63 8.50996 9.48 8.66996C9.34 8.82996 8.83 9.29996 8.83 10.26C8.83 11.22 9.51 12.15 9.6 12.25C9.69 12.36 10.76 14.02 12.4 14.87C12.82 15.05 13.15 15.17 13.41 15.25C13.83 15.39 14.22 15.37 14.52 15.34C14.86 15.31 15.64 14.89 15.77 14.51C15.91 14.13 15.91 13.8 15.87 13.74C15.83 13.68 15.74 13.64 15.58 13.57L15.83 13.34Z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer