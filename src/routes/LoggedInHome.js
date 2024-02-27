import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
// import songContext from "../contexts/songContext";
// import { CloudConfig } from "@cloudinary/url-gen";
// import HomeViewCard from "../components/shared/HomeView";
import HomeViewCard from "../components/shared/homeView";
import { makeUnAuthenticatedGETRequest } from "../utils/ServerHelpers";

const playlistdata = [
    { titleText: "Trending Bollywood" },
    { titleText: "Lofi" },
    { titleText: "Hollywood" }
];

const LoginHome = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeUnAuthenticatedGETRequest(
                "/song/get/admin"
            );
            setSongData(response.data);
        };
        getData();
    }, []);
    return (
        <LoggedInContainer curActiveScreen="home">
            {playlistdata.map((item, index) => {
                const startIndex = index * 5;
                const endIndex = startIndex + 5;
                const slicedCardsData = songData.slice(startIndex, endIndex);

                return <PlaylistView titleText={item.titleText} cardsData={slicedCardsData} />;
            })}
        </LoggedInContainer>
    );
};



const PlaylistView = ({ titleText, cardsData }) => {
    return (
        <div className='text-white'>
            <div className='text-2xl font-semibold mb-5'>
                {titleText}
            </div>
            <div className='w-full flex space-x-4'>

                {cardsData.map((item) => {
                  //  console.log(item);
                    return (
                        <HomeViewCard
                            info={item}
                            key={JSON.stringify(item)}
                            playSound={() => { }}
                        />
                        /* <Card
                        item = {item} playSound={() => {}}
                        /> */
                    );
                })}
            </div>
        </div>)
}



export default LoginHome;