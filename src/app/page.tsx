"use client"

import Image from "next/image";
import { generateClient, GraphQLResult } from '@aws-amplify/api';
import { useEffect, useState } from "react";
import { getPosts } from "@/graphql/queries";
import { GetPostsQuery, Post } from "@/API";

const API = generateClient();

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = async () => {
    const result = await API.graphql({
      query: getPosts
    }) as GraphQLResult<GetPostsQuery>;
    console.log(result);
    const newPosts = result.data.getPosts
    setPosts(newPosts ? newPosts : []);
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h2 className="text-3xl font-bold">Blog</h2>
      <div className="flex gap-2 my-2">
        {posts.length ? posts.map((post) => (
          <p key={post.id}>{post.title} written by {post.author}</p>
        )) : "No blog posts available"}
      </div>
    </main>
  );
}
