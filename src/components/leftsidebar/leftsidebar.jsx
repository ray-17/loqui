import React from 'react'
import './leftsidebar.css'
import assets from '../../assets/assets'

const LeftSideBar = () => {
  return (
    <div className='leftsidebar'>
      <div className="leftsidebar-top">
        <div className="leftsidebar-nav">
          <img src={assets.loqui_logo} className='logo' alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
          </div>
        </div>
        <div className="leftsidebar-search">
          <img src={assets.search_icon} alt=""/>
          <input type="text" placeholder='search...'/>
        </div>
      </div>
      <div className="leftsidebar-list">
        {Array(12).fill("").map((item, index)=>(
          <div key = {index} className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Richard Sanford</p>
            <span>Hello, How are you?</span>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSideBar