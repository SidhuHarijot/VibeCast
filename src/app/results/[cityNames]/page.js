"use client";
import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useTheme } from "../../ThemeContext";
import LinearProgress from "@mui/material/LinearProgress";
import SmallCardHolder from "../../components/SmallCardHolder";
import TrackCard from "../../components/TrackCard";

const PlaylistComponent = () => {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    labelColor,
    buttonWaitingColor,
    buttonWaitingHoverColor,
    buttonWaitingTextColor,
    nestLabelColor,
    randomColors,
  } = useTheme();

  const searchParams = useSearchParams();
  const [tracks, setTracks] = useState([]);
  const [playlistData, setPlayListData] = useState();
  const [playlistName, setPlaylistName] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const countryCode = searchParams.get("countryCode");
  const city = searchParams.get("cityNames");
  const [moods, setMoods] = useState();
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [weather, setWeather] = useState("");
  const [buttonHover, setButtonHover] = useState(false);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch(
          "https://vibecast-api.onrender.com/get/moods"
        );
        const data = await response.json();
        setMoods(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch moods. Please try again." + error);
      }
    };
    fetchMoods();
  }, []);

  const handleMouseEnter = () => {
    setButtonHover(true);
  };

  const handleMouseLeave = () => {
    setButtonHover(false);
  };

  const fetchTop50 = async (countryCode) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://vibecast-api.onrender.com/top-50/${countryCode}`
      );
      const data = await response.json();
      setPlaylistName(data.name);
      setPlayListData(data);
      setTracks(data.tracks);
    } catch (error) {
      setError("Failed to fetch playlist. Please try again." + error);
      console.error(error);
    }
    setLoading(false);
  };

  const createPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://vibecast-api.onrender.com/spotify-playlist/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistData.name,
            id: playlistData.id,
            tracks: playlistData.tracks,
          }),
        }
      );
      const data = await response.json();
      setSpotifyUrl(data.url);
    } catch (error) {
      setError(
        "Failed to create playlist. Please check the console for more details." +
          error
      );
      console.error("Failed to create playlist:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (countryCode) {
      fetchTop50(countryCode);
    }
  }, []);

  const updateMoods = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const filterMoods = async () => {
    setLoading(true);
    if (selectedMoods.length === 0) {
      fetchTop50(countryCode);
      return;
    }
    try {
      const response = await fetch(
        `https://vibecast-api.onrender.com/moodFiltered/moods`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood: selectedMoods,
            playlist: {
              name: playlistData.name,
              id: playlistData.id,
              tracks: playlistData.tracks,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to filter moods");
      }
      const data = await response.json();
      setTracks(data.playlist.tracks);
      setPlayListData(data.playlist);
      setSelectedMoods(data.moods);
    } catch (error) {
      setError(
        "Failed to filter moods. Please check the console for more details." +
          error
      );
      console.error("Failed to filter moods:", error);
    }
    setLoading(false);
  };

  const filterMoodsByWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://vibecast-api.onrender.com/moodFiltered/${countryCode}/${city}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistData.name,
            id: playlistData.id,
            tracks: playlistData.tracks,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to filter moods");
      }
      const data = await response.json();
      setTracks(data.playlist.tracks);
      setPlayListData(data.playlist);
      setSelectedMoods(data.moods);
      setWeather(data.weatherDescription);
    } catch (error) {
      setError(
        "Failed to filter moods. Please check the console for more details." +
          error
      );
      console.error("Failed to filter moods:", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{ backgroundColor: secondaryColor, color: primaryColor }}
      className="min-h-screen p-20"
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul
        style={{
          color: primaryColor,
          backgroundColor: secondaryColor,
          border: `2px solid ${accentColor}`,
          boxShadow: `0 0 20px ${labelColor}`,
        }}
        className="rounded"
      >
        <div
          style={{
            color: primaryColor,
            backgroundColor: nestLabelColor,
            border: `2px solid ${labelColor}`,
            boxShadow: `0 0 10px ${labelColor}`,
          }}
          className={`rounded-t flex flex-row justify-between p-6   items-center`}
        >
          <h1
            className="text-4xl  rounded-md py-3 w-max grow mr-6 pl-3"
            style={{ backgroundColor: labelColor }}
          >
            <strong>
              {!loading && playlistName ? playlistName : "Getting Playlist"}
            </strong>
          </h1>
          {!spotifyUrl ? (
            <button
              style={{
                backgroundColor: loading
                  ? error && !playlistData
                    ? "red"
                    : buttonHover
                    ? buttonWaitingHoverColor
                    : buttonWaitingColor
                  : error && !playlistData
                  ? "red"
                  : "green",
                onMouseEnter: loading ? handleMouseEnter : null,
                onMouseLeave: loading ? handleMouseLeave : null,
                color: loading || error ? buttonWaitingTextColor : primaryColor,
                borderRadius: "5px",
              }}
              className={`p-3 px-6 text-xl ${
                loading ? "cursor-not-allowed" : ""
              }`}
              onClick={createPlaylist}
            >
              Create Playlist in Spotify
            </button>
          ) : (
            <a
              style={{
                backgroundColor: "green",
                color: loading ? buttonWaitingTextColor : primaryColor,
                borderRadius: "5px",
              }}
              className={`py-4 px-8 text-xl ${
                loading ? "cursor-not-allowed" : ""
              } `}
              href={spotifyUrl}
            >
              {" "}
              Open Playlist in Spotify
            </a>
          )}
        </div>

        {!loading ? (
          <></>
        ) : (
          <LinearProgress style={{ backgroundColor: accentColor }} />
        )}

        <div
          style={{
            color: primaryColor,
            backgroundColor: nestLabelColor,
            borderBottom: `2px solid ${accentColor}`,
          }}
          className={`rounded-t flex flex-row justify-between p-6   items-center`}
        >
          <button
            style={{
              backgroundColor: loading
                ? error
                  ? "red"
                  : buttonHover
                  ? buttonWaitingHoverColor
                  : buttonWaitingColor
                : error
                ? "red"
                : accentColor,
              onMouseEnter: loading ? handleMouseEnter : null,
              onMouseLeave: loading ? handleMouseLeave : null,
              color: loading || error ? buttonWaitingTextColor : primaryColor,
              borderRadius: "9999px",
            }}
            className={`p-3 px-6 text-xl rounded-full ${
              error ? "cursor-not-allowed" : ""
            }`}
            onClick={filterMoodsByWeather}
          >
            Filter for Current Weather
          </button>
          <div className="flex flex-row ">
            {moods ? (
              <SmallCardHolder
                items={moods}
                fontColor={primaryColor}
                bgColorList={[secondaryColor]}
                isToggleButton={true}
                toggledColor={accentColor}
                hoverColor="gray"
                tailwindCSS="border-gray-700"
                onClick={updateMoods}
                setToggled={selectedMoods}
                style={{
                  backgroundColor: labelColor,
                  color: primaryColor,
                  border: `2px solid ${accentColor}`,
                  boxShadow: `0 0 10px ${labelColor}`,
                  borderRadius: "9999px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  Margin: "5px",
                }}
              />
            ) : (
              <h1
                className="text-xl  rounded-md py-3 w-max grow mr-6 pl-3"
                style={{ backgroundColor: labelColor }}
              >
                {"Gettings Moods"}
              </h1>
            )}
            <button
              style={{
                backgroundColor:
                  loading || selectedMoods.length === 0
                    ? error
                      ? "red"
                      : buttonHover
                      ? buttonWaitingHoverColor
                      : buttonWaitingColor
                    : error
                    ? "red"
                    : accentColor,
                onMouseEnter: loading ? handleMouseEnter : null,
                onMouseLeave: loading ? handleMouseLeave : null,
                color: loading || error ? buttonWaitingTextColor : primaryColor,
                borderRadius: "9999px",
                border: `2px solid ${
                  selectedMoods.length === 0 ? accentColor : secondaryColor
                }`,
              }}
              className={`p-3 px-6 text-xl mx-5 rounded-full ${
                error ? "cursor-not-allowed" : ""
              }`}
              onClick={filterMoods}
            >
              Filter Moods
            </button>
          </div>
        </div>

        {moods ? (
          <></>
        ) : (
          <LinearProgress style={{ backgroundColor: accentColor }} />
        )}
        {!loading ? (
          tracks.map((track, index) => (
            <TrackCard
              key={index}
              track={track}
              fontColor={primaryColor}
              bgColor={nestLabelColor}
              accentColor={accentColor}
              randomColors={randomColors}
              labelColor={labelColor}
            />
          ))
        ) : (
          <LinearProgress style={{ backgroundColor: accentColor }} />
        )}
      </ul>
    </div>
  );
};

export default PlaylistComponent;
