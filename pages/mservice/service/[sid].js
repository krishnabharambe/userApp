import axios from "axios";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Scrollbar } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";
import Navbar from "../../../components/NavFooter/Navbar";
import {
  ArrowLeftIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";

export default function ServiceFun({ data }) {
  const router = useRouter();
  const mserviceId2 = router.query.id;
  console.log("props->", data);

  return (
    <div>
      <nav
        aria-label="Top"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:hidden"
      >
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
          <div className="aspect-w-16 aspect-h-7 md:aspect-h-4 ">
            <img
              src={
                "https://krishnabharambe.pythonanywhere.com/" + data.TileImage
              }
            />
          </div>

          <p className="text-2xl font-bold tracking-tight text-gray-900 my-3">{data.title}</p>
          <p className="text-xl font-medium tracking-tight text-gray-900 my-3">{data.shortdescription}</p>
          <p className="font-medium">{data.description}</p>
<Link href="#">
          <a
              className="inline-flex mt-5 items-center w-full justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Book a service
            </a></Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("https://krishnabharambe.pythonanywhere.com/api/allsubSubService/");
  const data = await res.data;

  const paths = data.map((dataitem) => ({
    params: { sid: dataitem.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `https://krishnabharambe.pythonanywhere.com/api/SubService/${params.sid}`
  );
  const data = await res.data;

  return { props: { data } };
}
