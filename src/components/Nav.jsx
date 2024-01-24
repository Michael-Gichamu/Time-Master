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
    <header>
      <nav >
        <div className="flex justify-between items-center p-2 md:hidden">
          <div className="font-medium">{logo}</div>
          <button className="text-white" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={isDropdownOpen ? faTimes : faBars}/>
          </button>
        </div>
        {isDropdownOpen && (
          <ul className='bg-[#191B1B] text-center rounded-md mx-2 py-2 mb-3 md:hidden'>
            {NavLinks.map((item, index) => (
            <li key={index} className="py-1 hover:bg-[#242A2F]">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          </ul>
        )}
      </nav>
      <nav className="hidden md:flex m-2 p-2 justify-between items-center rounded-lg">
        <div className="font-bold">TIMECRAFT</div>
        <ul className='flex space-x-8 basis-1/2 justify-between'>
          {NavLinks.map((item, index) => (
              <li key={index}>
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