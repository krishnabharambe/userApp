import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../store/usersSlice';
import Layout from '../components/Layout';
import Slider1 from '../components/HomePage/Slider1';
import LoadingComp from '../components/loadingComp';
import MainServicesView from '../components/HomePage/mainServicesView';
import Slider2 from '../components/HomePage/Slider2';

export default function Home({ data2, MainServices }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState(false);
  const [imgsliderData, setImgSliderData] = useState(null);
  const dispatch = useDispatch();
  console.log('MainServices', MainServices);

  // const images = [
  //   'https://krishnabharambe.pythonanywhere.com/media/SliderImages/shop_banner_43in_x_84in_01_starrr_1.png',
  //   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
  //   'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
  //   'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
  // ];

  let images = [];
  const getSliderdata = () => {
    images = [];
    for (let i = 0; i < data2.length; i++) {
      images.push(data2[i].image);
    }

    setImgSliderData(images);
  };

  useEffect(() => {
    SetIsLoading(true);
    const token = getCookies('token');
    // getsliderImageDetails();
    if (!token.token) {
      signOut({ callbackUrl: '/auth' });
    }

    if (!session) {
      signOut({ callbackUrl: '/auth' });
    }

    if (token.token && status === 'authenticated') {
      axios
        .get('https://krishnabharambe.pythonanywhere.com/api/userAPI/', {
          headers: {
            Authorization: `token ${token.token}`,
          },
        })
        .then((res) => {
          if (session.id == token.token) {
            dispatch(
              updateUserInfo({
                id: res.data.id,
                phone: res.data.phone,
                first_login: res.data.first_login,
              })
            );
            SetIsLoading(false);
            getSliderdata();
          } else {
            //redirect to login
            SetIsLoading(false);
            signOut({ callbackUrl: '/auth' });
          }
        })
        .catch((error) => {
          console.log(error);
          SetIsLoading(false);
          signOut({ callbackUrl: '/auth' });
        });
    }
  }, [status]);

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            {session ? (
              <>
                <Layout>
                  <div className="py-2">
                    <Slider2 data2={data2} />
                    <MainServicesView data2={MainServices} />
                  </div>
                  {/* <h1 className="">Session - {session.id}</h1>
                  <h1 className="">Status-- {status}</h1> */}
                </Layout>
              </>
            ) : (
              'not authenticated'
            )}
          </div>
        </>
      ) : (
        <LoadingComp />
      )}
    </>
  );
}

export async function getStaticProps() {
  const data2 = await axios.get(
    'https://krishnabharambe.pythonanywhere.com/api/allSlidercards'
  );

  const MainServices = await axios.get(
    'https://krishnabharambe.pythonanywhere.com/api/MainServicesList/'
  );
  return {
    props: {
      data2: data2.data ?? {},
      MainServices: MainServices.data ?? {},
    },
  };
}
Home.auth = true;
