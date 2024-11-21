import { useEffect, useState } from 'react';
import Button from '../components/Button';
import style from './Home.module.scss';

const Home = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = async () => {
    setLoading(true);
    const data = await( await fetch('https://dog.ceo/api/breeds/image/random')).json();
    setImageUrl(() => data.message);
    setLoading(false);
  }

  useEffect(() => {
    fetchRandomImage();
  }, []);

    return (
      <div className={style.home}>
        { !loading ? <div className={style.thumb_wrap}>
          <img src={`${imageUrl}`} className={style.thumb} alt="random breed"/>
        </div> : "Loading..."}
        <Button text="Next Random Image" onClick={fetchRandomImage} />
      </div>
    )
}

export default Home;