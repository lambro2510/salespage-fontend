import { useState, Fragment, useEffect } from 'react';
import defaultImage from '../../assets/img/product-default-image.png'

export interface LazyImageProps {
  src: string;
  [key: string]: string | React.ReactNode | undefined;
}

const LazyImage = ({ src, ...rest }: LazyImageProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;

    imageToLoad.onload = () => {
      setLoading(false);
    };
  }, [src]);

  return (
    <Fragment>{loading ? <img src={defaultImage} /> : <img src={src} {...rest}/>}</Fragment>
  );
};

export default LazyImage;
