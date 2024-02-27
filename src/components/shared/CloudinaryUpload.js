import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../Config";
import upImg from './upload-audio-icon.png'
const CloudinaryUpload = ({ setUrl, setName, setTime }) => {

    function convertSecondsToMinutesAndSeconds(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        let t = minutes + ":" + remainingSeconds;
        console.log("time" + t);
        return t.slice(0, 4);
    }



    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "du2hskvwo",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"],
            },
            function (error, result) {

                if (!error && result.event === "success") {
                    const totalSeconds = result.info.duration; // Example: 125 seconds
                    let t = convertSecondsToMinutesAndSeconds(totalSeconds);
                    setTime(t);
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black rounded-full p-2 font-semibold flex items-center justify-center"
            onClick={uploadImageWidget}
        >
            <img src={upImg} style={{
                background: 'white',
                color: 'black',
                border: 'none',
                padding: '3px 3px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-block',
            }}
                alt="upload audio" />
        </button>
    );
};

export default CloudinaryUpload;
