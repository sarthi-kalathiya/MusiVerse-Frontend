import { useState, useEffect } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen="myMusic">
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Songs
            </div>
            <div className="space-y-3 overflow-auto">
                {songData.length == 0 ? (
                    <div className="my-4">
                    <h4 className="text-white text-lg">There is no song.</h4>
                    </div>
                )
                :(
                        songData.map((item) => {
                    return <SingleSongCard info={item} playSound={() => { }} />;
                })
                )}
            </div>
        </LoggedInContainer>
    );
};

export default MyMusic;
