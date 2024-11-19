import React from 'react'
import './contactListFooterStyles.css'
import { useGlobalContext } from '../GlobalContext/GlobalContext';

const ContactListFooter = ({ activeSite }) => {

  const { setNavigationState } = useGlobalContext()
  const sitesNavigation = [
    {
      icon: "bi bi-chat-left-text-fill",
      site: 'contacts'

    },
    {
      icon: "bi bi-people-fill",
      site: 'community'
    }
  ]
  const handleChangeSite = (site) => {
    setNavigationState(site)
  }

  return (
    <footer className='contactListfooter'>
      {sitesNavigation.map(categoria => {
          return (
            <button key={categoria.site} 
                    className={`btn-contactFooter ${activeSite == categoria.site ? 'active' : ''}`} 
                    onClick={() => handleChangeSite(categoria.site)}>
              <i className={categoria.icon}></i>
              <span className='btn-footerText'>{categoria.site}</span>
            </button>
          )
        })
      }
    </footer>
  )
}

export default ContactListFooter
