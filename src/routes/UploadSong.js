import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";
import { makeAuthenticatedImageUpload } from "../utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import ImageUpload from '../components/shared/ImageUpload';
import LoggedInContainer from '../containers/LoggedInContainer';

const UploadSong = () => {

    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const [duration, setDuration] = useState("");
    const navigate = useNavigate();


    const submitSong = async () => {
        let imgPath = "";
        if (!playlistUrl || !name || !thumbnail || !duration) {
            alert('Please fill all the details');
            return;
        }
        try {
            const response = await makeAuthenticatedImageUpload('/upload/img', thumbnail);
            console.log(response.path);
            imgPath = response.path;
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }

        const data = { name, "thumbnail": imgPath, track: playlistUrl, "file": thumbnail, duration: duration };
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Success");
        navigate("/home");
    };

    return (

        <LoggedInContainer curActiveScreen="UploadSong">
            <div className='content-center p-8 overflow-auto my-10'>

                <div className='flex items-center justify-center'>
                    <div>
                        <div className='flex text-2xl font-semibold mb-5 text-white mt-8 justify-center'>
                            Upload Your Music
                        </div>
                        <div className="w-full">
                            <div className="flex space-x-16 w-full my-8">
                                <span className=' text-white my-4'>Name:
                                </span>
                                <TextInput
                                    labelClassName={"text-white"}
                                    placeholder="Name"
                                    value={name}
                                    setValue={setName}
                                />
                            </div>
                        </div>
                        <div className='items-center space-y-5'>
                            <div className="flex space-x-5 mr-5 items-center">
                                    <label className="text-white">Thumbnail:</label>
                                    <ImageUpload setImg={setThumbnail} />
                            </div>
                            <div className='flex space-x-5 items-center'>
                                <label className="text-white flex items-center">Select Track:</label>
                                {uploadedSongFileName ? (
                                    <div className="bg-white rounded-full p-3 flex items-center">
                                        {uploadedSongFileName.substring(0, 23)}...
                                    </div>
                                ) : (
                                    <CloudinaryUpload
                                        setUrl={setPlaylistUrl}
                                        setName={setUploadedSongFileName}
                                        setTime={setDuration}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div
                                className="bg-white my-5 w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
                                onClick={submitSong}
                            >
                                Submit Song
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoggedInContainer>

    );

}


export default UploadSong;