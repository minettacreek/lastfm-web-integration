import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&api_key=${process.env.LASTFM_API_KEY}&format=json`,
    {
      next: { revalidate: 1 },
    }
  );
  const data = await res.json();

  const track = data.recenttracks.track[0];
  const deezerRes = await fetch(
    `https://api.deezer.com/search?q=${track.name} ${track.artist['#text']}`
  );
  const deezerData = await deezerRes.json();
  const deezerTrack = deezerData.data[0];

  return new NextResponse(
    JSON.stringify({
      track: {
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        image: track.image[3]['#text'],
        deezer: deezerTrack,
      },
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
