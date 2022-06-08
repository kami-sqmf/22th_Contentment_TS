import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Navs } from './globals';

function BreadCrumb({ className, current, Right} : {className: string; current: string; Right?: JSX.Element}) {
    const path = current.split("/").filter(Boolean)
    let location: Array<any> = [Navs.find(obj => obj.link.includes(path[0]))]
    if (path.length > 1) {
        for (let i = 0; i < path.length - 1; i++) {
            location.push(location[i].child.find(obj => obj.link.includes(path[i + 1])))
        }
    }
    return (
        <div className={`${className} flex items-start justify-around md:justify-between xl:mx-48 lg:mx-16 md:mx-8`}>
            <div className={`flex flex-row justify-start`}>
                {location.map((data, index) => (
                    <div className={`${index != location.length - 1 ? "hidden" : "flex" } md:flex flex-row items-center`}>
                        <Link href={data.link}>
                            <div className={`flex flex-row items-center ring-blue-light rounded-md px-1.5 py-0.5 cursor-pointer ${data.link != current ? "text-blue-light hover:border " : "text-blue cursor-text"}`}>
                                {data.emoji ? <FontAwesomeIcon className='h-4 mr-2 my-auto' icon={data.emoji} /> : ''}
                                <a className="text">{data.name ? data.name : `${data.nameCh} ${data.nameEn}`}</a>
                            </div>
                        </Link>
                        <FontAwesomeIcon className={`mx-2 h-4 my-auto opacity-50 hover:opacity-100`} icon={faAngleRight} />
                    </div>
                ))}
            </div>
            <div className="invisible"></div>
            {Right ? Right : <div className="invisible"></div>}
            
        </div>
    )
}

export default BreadCrumb;