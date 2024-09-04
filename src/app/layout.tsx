"use client";

import "./globals.css";
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from "aws-amplify";
import { Inter } from "next/font/google";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT as string,
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
      allowGuestAccess: true
    }
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
      region: process.env.NEXT_PUBLIC_REGION,
      defaultAuthMode: 'iam'
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
        {children}
      </body>
    </html>
  );
}
