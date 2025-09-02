import axios from "axios";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = res.data;

  return (
    <div className="m-10 bg-blue-600 p-10 rounded-2xl">
      <h1 className="font-bold pb-5 text-black text-3xl">{data.title}</h1>
      <p className="text-white">{data.body}</p>
    </div>
  );
};

export default page;
