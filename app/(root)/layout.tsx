import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Toaster } from "react-hot-toast";
import SearchBar from "@/components/search/SearchBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <Hero />
      <div className='container mx-auto'>
        <SearchBar />
      </div>
      <div className='container mx-auto py-10 flex-1'>{children}</div>
      <Footer />

      <Toaster
        position='top-right'
        toastOptions={{
          success: {
            style: {
              background: "#22bb33",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#bb2124",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
