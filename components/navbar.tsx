import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Navs, navs } from './globals';
import { FollowInstaPlugin } from './instagram-follow-plugin';

const LiItem = ({ nav, Current, device }: { nav: navs, Current: string, device: "Mobile" | "Desktop" }) => {
  if (device == "Desktop") {
    return (
      <Link href={nav.link}>
        <a className={`${Current == nav.link ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
          {nav.emoji ? <FontAwesomeIcon className='h-5 mr-2 my-auto' icon={nav.emoji} /> : ''}
          <p className="text-lg text-gray-500">{`${nav.nameEn.length < 7 ? nav.nameEn : ""} ${nav.nameCh}`}</p>
        </a>
      </Link>
    )
  } else {
    return (
      <Link href={nav.link}>
        <a className={`${Current == nav.link ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
          {nav.emoji ? <FontAwesomeIcon className='w-6 mr-2 my-auto' icon={nav.emoji} /> : ''}
          <p className="text-xl text-gray-500">{`${nav.nameEn} ${nav.nameCh}`}</p>
        </a>
      </Link>
    )
  }
}

function Navbar({ Current }: { Current: string }) {
  const showMobileMenu = (e) => {
    const nav = document.querySelector("#nav-mobile")
    if (nav.classList.contains("hidden")) {
      nav.classList.remove("hidden")
      nav.classList.add("fadeIn")
      setTimeout(function () {
        nav.classList.remove("fadeIn")
      }, 250);
    } else {
      nav.classList.add("fadeOut")
      setTimeout(function () {
        nav.classList.remove("fadeOut")
        nav.classList.add("hidden")
      }, 250);
    }
  }
  const showChild = (name) => {
    const next = document.querySelector(`[id="${name}"]`)
    console.log(next)
    if (next.classList.contains("hidden")) {
      next.classList.remove("hidden")
      next.classList.add("fadeIn")
      setTimeout(function () {
        next.classList.remove("fadeIn")
      }, 250);
    } else {
      next.classList.add("fadeOut")
      setTimeout(function () {
        next.classList.remove("fadeOut")
        next.classList.add("hidden")
      }, 250);
    }
  }
  const showDesktop = (name) => {
    const next = document.querySelector(`#${name}`)
    if (next.classList.contains("hidden")) {
      next.classList.remove("hidden")
      next.classList.add("dropIn")
      setTimeout(function () {
        next.classList.remove("dropIn")
      }, 150);
    } else {
      next.classList.add("dropOut")
      setTimeout(function () {
        next.classList.remove("dropOut")
        next.classList.add("hidden")
      }, 150);
    }
      const hide = setTimeout(function () {
        next.classList.add("dropOut")
        setTimeout(function () {
          next.classList.remove("dropOut")
          next.classList.add("hidden")
        }, 150);
      }, 800);
      next.addEventListener("mouseenter", (e) => {
        console.log(e)
        clearTimeout(hide);
      })
    next.addEventListener("mouseleave", (e) => {
      const hide = setTimeout(function () {
        next.classList.add("dropOut")
        setTimeout(function () {
          next.classList.remove("dropOut")
          next.classList.add("hidden")
        }, 150);
      }, 650);
      next.addEventListener("mouseenter", (e) => {
        clearTimeout(hide);
      })
    })
  }
  return (
    <nav className="relative bg-white-light">
      <div className='w-screen mx-auto b-grayLow'>
        <div className='flex items-center justify-around md:justify-between xl:mx-48 lg:mx-16 md:mx-8 py-2'>
          {/* Left */}
          <div className="hidden md:inline-flex">
            <Link href="/">
              <a className=''><img className="h-14 w-auto" src="/navbar/v1_mobile.png" alt="S11 班級圖示" /></a>
            </Link>
            <ul className='ml-8 inline-flex h-full my-auto'>
              {Navs.map((nav, index) => (
                <div>
                  <li id={nav.child ? "navChildButton" : ""} key={index} className={`mx-2 lg:mx-4 transition-transform hover:scale-105 ${Current.includes(nav.link) ? 'text-blue-light scale-105' : ''}`}>
                    {!nav.child ? <LiItem nav={nav} Current={Current} device="Desktop" /> :
                      <button onClick={(e) => showDesktop(`${nav.nameEn}`)} className={`${ Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                        {nav.emoji ? <FontAwesomeIcon className='h-5 mr-2 my-auto' icon={nav.emoji} /> : ''}
                        <p className="text-lg text-gray-500">{`${nav.nameCh}`}</p>
                        <FontAwesomeIcon className='h-5 ml-4 my-auto' icon={faCaretDown} />
                      </button>
                    }
                  </li>
                  {!nav.child ? "" :
                    <div id={nav.nameEn} className='hidden absolute top-20 w-max p-4 bg-white-light z-50 rounded-lg ring-2 ring-blue ring-opacity-40'>
                      <ul className='mx-auto'>
                        {nav.child.map((nav, index) => (
                          <li className='mt-1'>
                            {!nav.child ?
                              <Link href={nav.link}>
                                <a className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                                  <p className="text-lg text-gray-500">{`${nav.name}`}</p>
                                </a>
                              </Link>
                              :
                              <div>
                                <button onClick={(e) => showChild(`${nav.name}`)} className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                                  <p className="text-lg text-gray-500">{`${nav.name}`}</p>
                                  <FontAwesomeIcon className='h-5 ml-4 my-auto' icon={faCaretDown} />
                                </button>
                                <div id={nav.name} className='my-2 hidden'>
                                  <ul className='mx-auto w-fit'>
                                    {nav.child.map((nav, index) => (
                                      <li className='mt-1'>
                                        <Link href={nav.link}>
                                          <a className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                                            <p className="text-lg text-gray-500">{`${nav.name}`}</p>
                                          </a>
                                        </Link>
                                      </li>))}
                                  </ul>
                                </div>
                              </div>
                            }
                          </li>))}
                      </ul>
                    </div>
                  }
                </div>
              ))}
            </ul>
          </div>
          <button type="button" onClick={(e) => showMobileMenu(e)} className="md:hidden bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <span className="sr-only">打開選單</span>
            <a><FontAwesomeIcon className="text-blue h-7 w-auto" icon={faBars} /></a>
          </button>
          {/* Middle */}
          <div className='md:hidden'>
            <Link href="/">
              <a>
                <img className="h-8 w-auto md:h-16 text-blue" src="/navbar/v2_mobile.svg" alt="S11 班級圖示" />
              </a>
            </Link>
          </div>
          {/* Right */}
          <div>
            {/* Mobile */}
            <div className='inline-flex md:hidden p-2 items-center justify-center'>
              <Link href="https://www.instagram.com/s11_the_best/">
                <a><FontAwesomeIcon color='#7f636e' className='h-9 w-auto' icon={faInstagram} /></a>
              </Link>
            </div>
            {/* Desktop */}
            <div className='hidden md:inline'>
              <FollowInstaPlugin color='insta' />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="nav-mobile" className='hidden z-50 top-0 m-6 rounded-lg ring-2 ring-blue ring-opacity-5 bg-white-light drop-shadow-2xl md:hidden'>
        <ul className='mx-auto w-fit'>
          {Navs.map((nav, index) => (
            <li key={index} className={`p-3 ${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'}`}>
              {!nav.child ? <LiItem nav={nav} Current={Current} device="Mobile" /> :
                <div>
                  <button id="childNavMobile" onClick={(e) => showChild(`${nav.nameEn}-mobile`)} className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                    {nav.emoji ? <FontAwesomeIcon className='w-6 mr-2 my-auto' icon={nav.emoji} /> : ''}
                    <p className="text-xl text-gray-500">{`${nav.nameEn} ${nav.nameCh}`}</p>
                    <FontAwesomeIcon className='h-5 ml-4 my-auto' icon={faCaretDown} />
                  </button>
                  <div id={`${nav.nameEn}-mobile`} className='my-2 hidden'>
                    <ul className='mx-auto w-fit'>
                      {nav.child.map((nav, index) => (
                        <li className='mt-1'>
                          {!nav.child ?
                            <Link href={nav.link}>
                              <a className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                                <p className="text-lg text-gray-500">{`${nav.name}`}</p>
                              </a>
                            </Link>
                            :
                            <div>
                              <button id="childNavMobile" onClick={(e) => showChild(`${nav.name}-mobile`)} className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                                <p className="text-lg text-gray-500">{`${nav.name}`}</p>
                                <FontAwesomeIcon className='h-5 ml-4 my-auto' icon={faCaretDown} />
                              </button>
                              <div id={`${nav.name}-mobile`} className='my-2 hidden'>
                                <ul className='mx-auto w-fit'>
                                  {nav.child.map((nav, index) => (
                                    <li className='mt-1'>
                                      <Link href={nav.link}>
                                        <a className={`${Current.includes(nav.link) ? 'text-blue-light' : 'text-blue'} inline-flex my-auto hover:text-blue-light`}>
                                          <p className="text-lg text-gray-500">{`${nav.name}`}</p>
                                        </a>
                                      </Link>
                                    </li>))}
                                </ul>
                              </div>
                            </div>
                          }
                        </li>))}
                    </ul>
                  </div>
                </div>
              }
            </li>
          ))}
        </ul>
      </div>
    </nav >
  );
}

export default Navbar;