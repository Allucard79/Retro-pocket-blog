import React from "react";
import MainContent from "../../components/mainContent/MainContent";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";

export default function Home() {
  return (
    <MainContent>
      <Header />
      <Post />
    </MainContent>
  );
}
