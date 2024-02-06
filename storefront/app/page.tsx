import Image from "next/image";
import NavBar from "./components/NavBar";
import NavBarItem from "./components/NavBarItem";
import Container from "./Container";
import introductionImage from "../public/HeadPhone.png";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Slider from "./components/Slider";
import { products } from "./data/products";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-gray-900 to-gray-600">
        <Container>
          <NavBar>
            <NavBarItem value="Home" />
            <NavBarItem value="Products" />
            <NavBarItem value="Cart" />
            <NavBarItem value="Login" />
          </NavBar>
        </Container>
        <Container>
          <div className="hero min-h-screen bg-gradient-to-tr from-gray-900 to-gray-600 p-4 text-base-100">
            <div className="hero-content flex-col sm:flex-row-reverse ">
              <Image
                src={introductionImage}
                className="w-full max-w-sm rounded-lg shadow-2xl sm:w-[50%]"
                alt="HeadPhone"
              />
              <div className="flex flex-col items-center sm:w-[50%]">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-secondary">Get Started</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-base-200">
        <Container>
          <main>
            <div className="grid grid-cols-1 items-center justify-center gap-8 bg-base-200 p-8 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 items-center justify-center gap-12 bg-base-200 p-8 sm:grid-cols-2 2xl:grid-cols-4">
              <div className="category-card category-card-shadow"></div>
              <div className="category-card category-card-shadow"></div>
              <div className="category-card category-card-shadow"></div>
              <div className="category-card category-card-shadow"></div>
            </div>

            <div className="slider-shadow my-12 rounded-lg px-4">
              <Slider title="最近熱銷" />
            </div>
          </main>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
