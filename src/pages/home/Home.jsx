import React from "react";
import MainContent from "../../components/mainContent/MainContent";
import Header from "../../components/header/Header";
import PostCard from "../../components/post/PostCard";

export default function Home() {
  return (
    <MainContent>
      <Header />
      <PostCard />
    </MainContent>
  );
}
