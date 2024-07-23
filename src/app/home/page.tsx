// src/app/pages/home/index.tsx

import React from "react";
import RootLayout from "../layout";

const Home: React.FC = () => {
  return (
    <RootLayout>
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of your Next.js app.</p>
      </div>
    </RootLayout>
  );
};

export default Home;
