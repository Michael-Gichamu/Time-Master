import { NavLinks } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Nav = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const logo = 'TIMECRAFT';

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

  return (
    <header className="fixed mx-auto left-0 right-0 xl:w-[1366px] top-0 w-full backdrop-blur-lg z-50">
      <nav >
        <div className="flex justify-between items-center p-2 md:hidden">
          <div className="font-medium">{logo}</div>
          <button className="text-white" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={isDropdownOpen ? faTimes : faBars}/>
          </button>
        </div>
        {isDropdownOpen && (
          <ul className='bg-[rgba(25,27,27,0.4)] backdrop-blur-sm text-center rounded-md mx-2 py-2 md:hidden' >
            {NavLinks.map((item, index) => (
            <li key={index} className="py-1 rounded-sm hover:bg-[rgba(36,42,47,0.2)]">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          </ul>
        )}
      </nav>
      <nav className="hidden md:flex mx-2 p-2 justify-between items-center rounded-lg">
        <div className="font-bold">{logo}</div>
        <ul className='flex basis-1/2 justify-between'>
          {NavLinks.map((item, index) => (
              <li key={index} className="hover:text-[#A7426D]">
                {item.label == 'Profile' ? 
                ( <a href='profile' className="fontSize"><FontAwesomeIcon icon={ faUser} className="text-xl text-[#545454]"/></a> ) : ( <a href={item.href}>{item.label}</a> )}
              </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Nav;