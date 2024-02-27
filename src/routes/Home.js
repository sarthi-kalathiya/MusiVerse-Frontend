import logo from '../logo.png'
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWitHover';
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import { makeUnAuthenticatedGETRequest } from "../utils/ServerHelpers";
import { useState, useEffect } from 'react';
import { backendUrl } from '../utils/Config';



const playlistdata = [
    { titleText: "Trending Bollywood" },
    { titleText: "Lofi" },
    { titleText: "Hollywood" }
];

const Home = () => {

    const [song, setSong] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeUnAuthenticatedGETRequest(
                "/song/get/admin"
            );
            setSong(response.data);
            console.log(song);
        };
        getData();
    }, []);
    return (<div className="h-full w-full flex">
        {/* left panel */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
            <div>

                {/* logo */}
                <div className="logo p-5 w-full flex items-center justify-center">
                    <img src={logo} width="50" height="50" className="mr-2" alt="logo" />
                    <h1 className="text-2xl font-semibold text-center text-white">Musiverse</h1>

                </div>
                <div className='pt-5'>

                    <IconText
                        iconName={"material-symbols:home"}
                        displayText={"Home"}
                        active
                    />
                    <IconText
                        iconName={"material-symbols:search-rounded"}
                        displayText={"Search"}
                    />
                    <IconText
                        iconName={"icomoon-free:books"}
                        displayText={"Library"}
                    />
                </div>
                <div className="pt-5">
                    <IconText
                        iconName={"material-symbols:add-box"}
                        displayText={"Create Playlist"}
                    />
                    <IconText
                        iconName={"mdi:cards-heart"}
                        displayText={"Liked Songs"}
                    />
                </div>
            </div>
            <div className="px-5">
                <div className="border border-gray-400 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                    <Icon icon="carbon:earth-europe-africa" />
                    <div className="ml-2 text-sm font-semibold">
                        English
                    </div>
                </div>
            </div>
        </div>
        {/* right panel */}
        <div className='h-full w-4/5 bg-app-black overflow-auto'>
            <div className='navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end'>
                <div className='w-1/2 flex h-full'>
                    <div className='w-3/5 flex justify-around items-center'>
                        <TextWithHover displayText={"Premium"} />
                        <TextWithHover displayText={"Support"} />
                        <TextWithHover displayText={"Download"} />
                        <div className='h-1/2 border border-white'></div>
                    </div>
                    <div className='w-2/5 flex justify-around h-full items-center'>
                        <TextWithHover displayText={"Sign up"} />
                        <div className='bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer' >
                        <Link to="/login">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content p-8 overflow-auto'>
            {playlistdata.map((item, index) => {
                const startIndex = index * 5;
                const endIndex = startIndex + 5;
                const slicedCardsData = song.slice(startIndex, endIndex);

                return <PlaylistView titleText={item.titleText} cardsData={slicedCardsData} />;
            })}
            </div>
        </div>
    </div>);
}

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className='text-white'>
            <div className='text-2xl font-semibold mb-5'>
                {titleText}
            </div>
            <div className='w-full flex justify-between space-x-4'>
           { cardsData.map((item) => {
                        return (
                            <Card
                                title={item.name}
                               
                                imgUrl={item.thumbnail}
                            />
                        );
                    })}
            </div>
        </div>)
}

const Card = ({ title, description, imgUrl }) => {

const formattedUrl = backendUrl + "/uploads//" + imgUrl.toString().slice(8,);

    return (
        <div className='bg-black bg-opacity-40  rounded-lg w-1/5 p-4'>
            <div className='pb-4 pt-2'>
                <img className='w-full rounded-md h-50'
                    src={formattedUrl}
                    alt="img"
                />
            </div>
            <div className='text-white font-semibold py-2'>
                {title}
            </div>
            

        </div>
    )
}
export default Home;