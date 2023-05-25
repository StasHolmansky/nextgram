import React from 'react';
import Photo from '../../components/frame';
import swagPhotos from '../../photos';
import usePhoto from '../../utils/usePhoto';
import router, { useRouter } from 'next/router';


export default function PhotoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [photo, photoIsLoading] = usePhoto(id);
  return (
    <div className="permalink">
      <div className="wrap">
        {!photo ? <p>Loading...</p> : <Photo photo={photo} />}
      </div>
      <style jsx>{`
        .permalink {
          padding: 100px;
          text-align: center;
        }

        .wrap {
          display: inline-block;
          border: 1px solid #999;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
