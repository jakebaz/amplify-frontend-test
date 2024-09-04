"use client"

import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient, GraphQLResult } from '@aws-amplify/api';
import { getPosts } from "@/graphql/queries";
import { GetPostsQuery, Post } from "@/API";
import { useEffect, useState } from "react";

const API = generateClient({
  authMode: 'iam'
});

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = async () => {
    const result = await API.graphql({
      query: getPosts,
      authMode: "iam"
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
        )) : <p>No blog posts available</p>}
      </div>

      <Authenticator>
          {({signOut, user}) => (
            <>
              <div className="flex justify-between p-8">
                <h1 className="text-xl">Hello {user?.username}</h1>
                <button className="border border-stone-900 cursor-pointer hover:underline p-2 rounded" onClick={signOut}>Sign Out</button>
              </div>
              <p>You must sign in to see this content</p>
            </>
          )}
        </Authenticator>
    </main>
  );
}
