"use client";

import "./globals.css";
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { Inter } from "next/font/google";


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT as string
    },
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
      region: process.env.NEXT_PUBLIC_REGION,
      defaultAuthMode: 'userPool'
    }
  }
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator>
          {({signOut, user}) => (
            <div className="flex flex-col">
              <div className="flex justify-between p-8">
                <h1 className="text-xl">Hello {user?.username}</h1>
                <button onClick={signOut}>Sign Out</button>
              </div>
              {children}
            </div>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
