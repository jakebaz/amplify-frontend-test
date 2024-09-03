/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Post = {
  __typename: "Post",
  id: string,
  title: string,
  author: string,
  body: string,
};

export type CreatePostMutationVariables = {
  title?: string | null,
  body?: string | null,
  author?: string | null,
};

export type CreatePostMutation = {
  createPost:  {
    __typename: "Post",
    id: string,
    title: string,
    author: string,
    body: string,
  },
};

export type GetPostsQueryVariables = {
};

export type GetPostsQuery = {
  getPosts?:  Array< {
    __typename: "Post",
    id: string,
    title: string,
    author: string,
    body: string,
  } > | null,
};
