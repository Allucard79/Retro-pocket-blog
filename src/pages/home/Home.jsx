import { useEffect } from "react";
import MainContent from "../../components/mainContent/MainContent";
import Header from "../../components/header/Header";
import PostCard from "../../components/post/PostCard";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainContent>
      <Header />
      <PostCard />
    </MainContent>
  );
}
