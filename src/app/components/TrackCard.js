import SmallCardHolder from "./SmallCardHolder";

const TrackCard = ({ track, fontColor, bgColor, accentColor, randomColors, labelColor}) => {

    
  return (
    <div style={
        {
            backgroundColor: bgColor,
            color: fontColor,
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 10px ${labelColor}`,
            borderRadius: "5px",
            padding: "8px 16px",
        }
    } className="m-3"
    >
      <div
        id="track-header"
        className="flex flex-row justify-between items-center p-2 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold">{track.name}</h1>
        <a
          style={{
            backgroundColor: bgColor,
            color: fontColor,
            borderRadius: "9999px",
            border: `2px solid ${
              accentColor
            }`,
          }}
          className={`p-3 px-6 text-xl mx-5 rounded-full`}
          href={track.external_url}
        >
          Open in Spotify
        </a>
      </div>
      <div className="flex flex-row justify-between items-center p-1">
        <div className="px-1 w-2/6">
            <SmallCardHolder items={track.artists} fontColor={fontColor} bgColorList={[bgColor]} borderColors={randomColors} overflowHidden={true} tailwindCSS="transition-transform duration-300 text-nowrap hover:scale-110" 
            style={{
                backgroundColor: labelColor,
                color: fontColor,
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 10px ${labelColor}`,
                borderRadius: "9999px",
                padding: "8px 16px",
                cursor: "pointer",
                Margin: "5px",
            }}/>
        </div>
        <div className="px-6 w-4/6">
            <SmallCardHolder items={!(track.genre.length === 0) ? track.genre: ["No Tags"]} fontColor={fontColor} bgColorList={[bgColor]} borderColors={randomColors} overflowHidden={true} tailwindCSS="transition-transform text-nowrap duration-300 hover:scale-110" 
            style={{
                backgroundColor: labelColor,
                color: fontColor,
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 10px ${labelColor}`,
                borderRadius: "9999px",
                padding: "8px 16px",
                cursor: "pointer",
                Margin: "5px",
            }}/>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
