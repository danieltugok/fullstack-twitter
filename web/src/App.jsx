import {HeartIcon} from '@heroicons/react/outline'




function Tweet({ name, username, avatar, children}){
  return (
    <div className="flex space-x-3 p-4 border-b border-silver ">
      <div>
        <img src={avatar} class="tweet_img" alt="" />
      </div>
      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span>{' '}
        <span className="font-bold text-silver">@{username}</span>

        <p>{children}</p>
        <div className='flex space-x-1 text-silver text-sm items-center'>
        <HeartIcon className='w-6 stroke-1'/>
        <span>1.2k</span>
        </div>
      </div>
    </div>
  )
}


export const App = () => {
  return (
    <>
    <Tweet name="Elon Musk" username="elonmusk" avatar="/src/imgs/avatar.png" >
      Let make Twitter maximum fun!
    </Tweet>
    <Tweet name="Daniel Kogut" username="danielkogut" avatar="/src/imgs/avatar.png" >
      Let make Twitter maximum awesome!
    </Tweet>
    </>
  )
}
