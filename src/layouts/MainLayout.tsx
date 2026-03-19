import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AIChatBubble } from "../components/chat/AIChatBubble";

function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <AIChatBubble />

      <Footer />
    </>
  );
}

export default MainLayout;
