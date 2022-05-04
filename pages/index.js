import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookies } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../store/usersSlice';
import Layout from '../components/Layout';
import LoadingComp from '../components/loadingComp';
import MainServicesView from '../components/HomePage/mainServicesView';
import Slider2 from '../components/HomePage/Slider2';
import AllservicesView from '../components/HomePage/allservicesView';
export default function Home({ data2, MainServices,allMainServices }) {
  const { data: session, status } = useSession();
  const [isLoading, SetIsLoading] = useState(false);
  const [imgsliderData, setImgSliderData] = useState(null);
  const dispatch = useDispatch();
  console.log('MainServices', MainServices);
  console.log('allMainServices', allMainServices);


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
                    <AllservicesView data2={allMainServices} /> 
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

  const allMainServices = await axios.get(
    'http://127.0.0.1:8000/api/allServicesList/'
  );
  return {
    props: {
      data2: data2.data ?? {},
      MainServices: MainServices.data ?? {},
      allMainServices: allMainServices.data ?? {},
    },
  };
}
Home.auth = true;
