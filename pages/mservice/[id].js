import axios from "axios";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Scrollbar } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";
import Navbar from "../../components/NavFooter/Navbar"
import {
  ArrowLeftIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";

export default function MServiceFun({ data }) {
  const router = useRouter();
  const mserviceId2 = router.query.id;
  console.log("props->", data);

  return (
    <div>
      <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:hidden">
        <div className="border-b border-gray-200">
          <div className="h-16 flex items-center">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
              onClick={() => router.back()}
            >
              <span className="sr-only">Open menu</span>
              <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
              <h2 className="text-xl font-medium tracking-tight text-gray-900">
                {data.title}
              </h2>
            </div>
          </div>
        </div>
      </nav>

      <div className="hidden md:block">
      <Navbar />
      </div>

      <div className="bg-white">
        <div className="max-w-full mx-auto px-4 sm:py-8 sm:px-6 lg:max-w-screen-2xl lg:px-8">
          <div className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            {data.mservice.map((product) => (
              <Link key={product.id} href={'/mservice/service/'+product.id}>
                <div key={product.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={
                        "https://krishnabharambe.pythonanywhere.com/" +
                        product.TileImage
                      }
                      alt={product.imageAlt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("http://127.0.0.1:8000/api/allServicesList/");
  const data = await res.data;

  const paths = data.map((dataitem) => ({
    params: { id: dataitem.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `http://127.0.0.1:8000/api/allServicesList/${params.id}`
  );
  const data = await res.data;

  return { props: { data } };
}
