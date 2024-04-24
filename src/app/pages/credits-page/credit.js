export default function Credit({name, skills, image}) {
    return (
        <div className = "p-2 m-4 bg-slate-800 max-w-sm" >
            <h2 className = "font-bold text-2xl">{name}</h2>
            <p>Skills: <span className="font-bold text-green-400">{skills}</span></p> 
            <img src={image} alt={"image of" + name} style={{ width: '400px', }}/>
        </div>
    );
}