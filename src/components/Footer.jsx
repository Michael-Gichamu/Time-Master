import React from 'react'
import { FooterLinks } from '../constants'

const Footer = () => {
  const logo = 'TIMECRAFT';

  return (
    <footer className='bg-[#0B0A10]'>
      <nav className="hidden md:flex h-14 mx-2 p-2 justify-between items-center rounded-lg">
        <div className="font-bold">{logo}</div>
        <ul className='flex basis-1/6 justify-between'>
          {FooterLinks.map((item, index) => (
              <li key={index} className="hover:text-[#A7426D]">
                <a href={item.href}>{item.label}</a>
              </li>
          ))}
        </ul>
        <div className='flex gap-3 items-center'>
          <p>Follow Us:</p>
          <span class="icon-[skill-icons--instagram]"></span>
          <span class="icon-[devicon--twitter]"></span>
          <span class="icon-[skill-icons--linkedin]"></span>
          <span class="icon-[logos--facebook]"></span>
        </div>
      </nav>
      <div className='h-2 bg-gradient-to-r from-[#201563] from-50% to-[#0B0A10]'></div>
    </footer>
  )
}

export default Footer