"use client";
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { primaryColor, secondaryColor, accentColor } = useTheme();
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    async function fetchCities() {
      const response = await fetch('https://vibecast-api.onrender.com/cities');
      const data = await response.json();
      setCities(data);
    }

    fetchCities();
  }, []);

  // Filter cities based on search input and limit results to top three
  const filteredCities = search.length === 0 ? [] : cities.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 3);  // Only take the first three matches

  // Function to handle city click and navigate
  const handleCityClick = (cityName, countryCode) => {
    router.push(`/results/${cityName}?cityNames=${cityName}&countryCode=${countryCode}`);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-60" style={{ backgroundColor: secondaryColor }}>
      
      <div className="text-center mt-15 mb-5" style={{backgroundColor: secondaryColor}}>
        <h1 className="text-6xl font-bold" style={{ color: primaryColor }}>
          Welcome to <span style={{ fontWeight: 'bold', color: accentColor }}>vibe cast</span><br />
          <span style={{ fontSize: '2rem' }}>Find the right music wherever you go</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl mt-5 mb-40">
        <input
          type="text"
          className="w-full p-4 text-lg rounded"
          placeholder="Search cities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            color: primaryColor,
            backgroundColor: secondaryColor,
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 10px ${accentColor}`
          }}
        />
        <ul className="list-none p-4">
          {filteredCities.map((city, index) => (
            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleCityClick(city.name, city.iso2)}>
              <div className="block" style={{ color: primaryColor }}>{`${city.name}, ${city.iso2}`}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
