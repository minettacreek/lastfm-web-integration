'use client';

import { useState, useEffect } from 'react';
import { Track } from '@/types';
import Soundwave from './Soundwave';

const Player = () => {
  const [track, setTrack] = useState<Track>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      const res = await fetch('/api/track');
      const data = await res.json();
      setTrack(data.track);
      setIsLoading(false);
      console.log(data.track);
    };
    fetchTrack();
    const interval = setInterval(() => {
      fetchTrack();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          className='album-art-container w-full h-96 mb-4 absolute flex flex-col items-center whitespace-nowrap text-center text-overflow-ellipsis'
          style={{
            zIndex: 2,
            color: 'white',
          }}
        >
          <div
            className='album-art'
            style={{
              background: `url(${
                track?.deezer?.album.cover ||
                'https://www.last.fm/static/images/lastfm_avatar_twitter.52a5d69a85ac.png'
              }) no-repeat center center/cover`,
            }}
          ></div>
          <div className='mt-4 flex flex-col items-center gap-y-[2px] px-20'>
            <img src='/lastdotfm.svg' className='w-12 h-12 mt-4' />
            <p className='uppercase text-lg text-white/50 mt-2'>
              Playing from album
            </p>
            <p className='font-bold text-xl'>
              {track?.deezer?.album?.title?.substring(0, 22) ??
                (track?.deezer?.album?.title || 'No album')}
            </p>
          </div>
          <h1 className='font-bold text-[27px] mt-4'>
            {track?.name?.substring(0, 20) ?? track?.name}
          </h1>
          <p className='text-white/50 text-2xl font-bold'>
            {track?.deezer?.artist?.name?.substring(0, 20) ??
              (track?.deezer?.artist?.name || track?.artist)}
          </p>
          <div className='mt-2'>
            <Soundwave />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
