"use client"

import { generateClient, GraphQLResult } from '@aws-amplify/api';
import { getPosts } from "@/graphql/queries";
import { GetPostsQuery, Post } from "@/API";
import { useEffect, useState } from "react";

const API = generateClient();

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const result = await API.graphql({
      query: getPosts
    }) as GraphQLResult<GetPostsQuery>;

    const newPosts = result.data.getPosts
    setPosts(newPosts ? newPosts : []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h2 className="text-3xl font-bold">Blog</h2>
      {!loading && (
        <div className="flex gap-2 my-2">
          {posts.length ? posts.map((post) => (
            <p key={post.id}>{post.title} written by {post.author}</p>
          )) : <p>No blog posts available</p>}
        </div>
      )}
    </main>
  );
}
