import { useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";

const MAX_TWITTER_CHAR = 250;

function TweetForm() {

  const [text, setText] = useState("");

  function changeText(e) {
    setText(e.target.value);
  }

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex p-4 space-x-5">
        <img src="/src/imgs/avatar.png" className="w-7" alt="" />
        <h1 className="font-bold text-xl">Inicial Page</h1>
      </div>

      <form action="" className="pl-12 text-lg flex flex-col">
        <textarea
          placeholder="What's happening?"
          type="text"
          name="text"
          value={text}
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={changeText}
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span> /{" "}
            <span className="text-birdBlue"> {MAX_TWITTER_CHAR}</span>
          </span>
          <button 
            disabled={text.length > MAX_TWITTER_CHAR}
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
          >Tweet</button>
        </div>
      </form>
    </div>
  );
}

function Tweet({ name, username, avatar, children }) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver ">
      <div>
        <img src={avatar} class="tweet_img" alt="" />
      </div>
      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span>{" "}
        <span className="font-bold text-silver">@{username}</span>
        <p>{children}</p>
        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-6 stroke-1" />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}

export const Home = () => {
  return (
    <>
      <TweetForm />
      <div>
        <Tweet
          name="Elon Musk"
          username="elonmusk"
          avatar="/src/imgs/avatar.png"
        >
          Let make Twitter maximum fun!
        </Tweet>
        <Tweet
          name="Daniel Kogut"
          username="danielkogut"
          avatar="/src/imgs/avatar.png"
        >
          Let make Twitter maximum awesome!
        </Tweet>
      </div>
    </>
  );
};
