"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'next/navigation';

const PlaylistComponent = () => {
  const { primaryColor, secondaryColor, accentColor } = useTheme();
  const searchParams = useSearchParams();
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const countryCode = searchParams.get('countryCode');

  const fetchTop50 = async (countryCode) => {
    setLoading(true);
    try {
      const response = await fetch(`https://vibecast-api.onrender.com/top-50/${countryCode}`);
      const data = await response.json();
      setPlaylistName(data.name);
      setTracks(data.tracks);
    } catch (error) {
      setError('Failed to fetch playlist. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  const createPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://vibecast-api.onrender.com/spotify-playlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          tracks: tracks,
        }),
      });
      const data = await response.json();
      setSpotifyUrl(data.url);
      alert('Playlist created successfully! + ' + data);
    } catch (error) {
      setError('Failed to create playlist. Please check the console for more details.' + error);
      console.error("Failed to create playlist:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (countryCode) {
      fetchTop50(countryCode);
    }
  }, [countryCode]);

  if (loading) return <p className='min-h-screen'>Loading...</p>;

  return (
    <div style={{ backgroundColor: secondaryColor, color: primaryColor }} className='min-h-screen p-20'>
      <h1 style={{ backgroundColor: accentColor, padding: '10px', borderRadius: '5px' }}>{playlistName}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px' }} onClick={createPlaylist}>Create Playlist in Spotify</button>
      </div>
      <ul style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        {tracks.map((track, index) => (
          <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>{track.name}</li>
        ))}
      </ul>
      {spotifyUrl && <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">Open Playlist in Spotify</a>}
    </div>
  );
};

export default PlaylistComponent;
