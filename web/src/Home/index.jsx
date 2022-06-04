import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";

import axios from "axios";

const MAX_TWITTER_CHAR = 250;

function TweetForm({ loggedUser, onSuccess }) {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios.post(
        `${import.meta.env.VITE_API_HOST}/tweets`,
        { text: values.text },
        {
          headers: {
            authorization: `Bearer ${loggedUser.accessToken}`,
          },
        }
      );

      form.setFieldValue('text', '');
      onSuccess();
    },
    initialValues: {
      text: "",
    },
  });

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

      <form
        onSubmit={formik.handleSubmit}
        className="pl-12 text-lg flex flex-col"
      >
        <textarea
          placeholder="What's happening?"
          type="text"
          name="text"
          value={formik.values.text}
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> /{" "}
            <span className="text-birdBlue"> {MAX_TWITTER_CHAR}</span>
          </span>
          <button
            type="submit"
            disabled={
              formik.values.text.length > MAX_TWITTER_CHAR ||
              formik.isSubmitting
            }
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

function Tweet({ name, username, avatar, children }) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver ">
      <div>
        <img src={avatar} className="tweet_img" alt="" />
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

export const Home = ({ loggedUser }) => {
  const [data, setData] = useState([]);

  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        authorization: `Bearer ${loggedUser.accessToken}`,
      },
    });
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TweetForm loggedUser={loggedUser} onSuccess={getData} />
      <div>
        {data.length &&
          data.map((tweet) => (
            <Tweet
              name={tweet.user.name}
              username={tweet.user.username}
              avatar="/src/imgs/avatar.png"
              key={tweet.id}
            >
              {tweet.text}
            </Tweet>
          ))}
      </div>
    </>
  );
};
