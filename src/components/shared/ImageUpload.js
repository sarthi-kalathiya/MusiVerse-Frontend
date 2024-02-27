import upImg from './upload-image-icon.jpg'

const ImageUpload = ({ setImg }) => {
    const handleFileChange = (e) => {
        setImg(e.target.files[0]);
    };

    return (
        <>
            <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label className="bg-white text-black  rounded-full p-4 font-semibold"
                htmlFor="image"
                style={{
                    background: 'white',
                    color: 'black',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    display: 'inline-block',
                }}
            >
                <img src={upImg} alt=""/>
            </label>
        </>
    );
};

export default ImageUpload;
