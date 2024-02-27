import {useState} from "react";
import TextInput from "../components/shared/TextInput";
import {makeAuthenticatedPOSTRequest,makeAuthenticatedImageUpload} from "../utils/ServerHelpers";
import ImageUpload from "../components/shared/ImageUpload";


const CreatePlaylistModal = ({closeModal}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState();

    const createPlaylist = async () => {
        let imgPath = "";
        if (!playlistName || !playlistThumbnail) {
            alert('Please fill all the details');
            return;
        }
        try {
            const response = await makeAuthenticatedImageUpload('/upload/img', playlistThumbnail);
            console.log(response.path);
            imgPath = response.path;
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }

        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            {name: playlistName, thumbnail: imgPath, songs: []}
        );
        if (response._id) {
            closeModal();
        }
    };

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-1/3 rounded-md p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Create Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Name"
                        labelClassName={"text-white"}
                        placeholder="Playlist Name"
                        value={playlistName}
                        setValue={setPlaylistName}
                    />
                    
                    <ImageUpload setImg={setPlaylistThumbnail} />
                    {/* <TextInput
                        label="Thumbnail"
                        labelClassName={"text-white"}
                        placeholder="Thumbnail"
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                    /> */}
                    <div
                        className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                        onClick={createPlaylist}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;