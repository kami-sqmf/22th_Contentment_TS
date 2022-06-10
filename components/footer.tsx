import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { InstaProfile, DiscordInviteCode, GithubRepo, websiteMap, usefulLink } from './globals';
import { FollowInstaPlugin } from './instagram-follow-plugin';

function Footer() {
  return (
    <footer className='w-screen sticky top-[100vh] bg-white-light z-50'>
      <div className='flex flex-col md:flex-row justify-around items-center pt-8 pb-4 xl:mx-32 lg:mx-8'>
        {/* Left */}
        <div>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className="mb-4 md:mr-4 md:my-0 h-12 w-12 p-0.5 ring-2 ring-blue-light rounded-sm object-cover shadow-lg">
              <img className="fill-blue" src="/footer/logo.png" alt="S11 班級圖示" />
            </div>
            <img className="h-10  fill-blue" src="/navbar/v2_mobile.svg" alt="S11 班級圖示" />
          </div>
          <div className='w-72 mt-6'>
            <p className='text-center md:text-left text-blue-light'>口愛的S11一起跟著杜總帶著戴著口{<br></br>}愛的S11！期不期待下次杜總的Slogan</p>
          </div>
          <div className='hidden md:block mt-8 mb-4'>
            <p className='text-blue-light'>© 2022 22ᴛʜ班網改造組</p>
          </div>
        </div>
        {/* Middle */}
        <div className="invisible"></div>
        {/* Right */}
        <div className='flex'>
          <div className='hidden md:block mx-8'>
            <p className='hidden md:flex text-xl text-blue'>網站地圖</p>
            <div className='mt-8 mb-4 md:my-4 flex flex-col'>
              {websiteMap.map((data, index) => (
                <Link href={data.url}>
                  <a className='text-blue-light'>{data.name}</a>
                </Link>
              ))}
            </div>
          </div>        
          <div className='hidden md:block mx-8'>
            <p className='hidden md:flex text-xl text-blue'>實用連結</p>
            <div className='mt-8 mb-4 md:my-4 flex flex-col'>
              {usefulLink.map((data, index) => (
                <Link href={data.url}>
                  <a className='text-blue-light'>{data.name}</a>
                </Link>
              ))}
            </div>
          </div>
          <div className='ml-8'>
            <p className='hidden md:flex text-xl ml-2 text-blue'>社群</p>
            <div className='mt-8 mb-4 md:my-4 flex flex-row'>
              <Link href={`http://discord.gg/${DiscordInviteCode}/`}>
                <FontAwesomeIcon className="text-blue-light h-8 w-auto mx-2 cursor-pointer hover:scale-105" icon={faDiscord} />
              </Link>
              <Link href={`https://www.instagram.com/${InstaProfile}/`}>
                <FontAwesomeIcon className="text-blue-light h-8 w-auto mx-2 cursor-pointer hover:scale-105" icon={faInstagram} />
              </Link>
              <Link href={`https://github.com/${GithubRepo}/`}>
                <FontAwesomeIcon className="text-blue-light h-8 w-auto mx-2 cursor-pointer hover:scale-105" icon={faGithub} />
              </Link>
            </div>
            <FollowInstaPlugin color='blue-light' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;