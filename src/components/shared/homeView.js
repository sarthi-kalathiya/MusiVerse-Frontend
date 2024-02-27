import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { backendUrl } from "../../utils/Config";

const HomeViewCard = ({ info, playSound }) => {
    const { currentSong, setCurrentSong } = useContext(songContext);
    const formattedUrl = backendUrl + "/uploads//" + info.thumbnail.toString().slice(8,);

    return (
        <div className='bg-black bg-opacity-40  rounded-lg w-1/5 p-4'
            onClick={() => {
                setCurrentSong(info);
            }}
        >
            <div className='pb-4 pt-2'>
                <img className='w-full rounded-md h-50' 
                    src={formattedUrl}
                    alt="img"
                />             
            </div>
            <div className="text-gray-300 py-2">
                {info.name}
            </div>
        </div>
    );
};

export default HomeViewCard;

// const Card = ({item}) => {
//     const {currentSong, setCurrentSong} = useContext(songContext);
//     return (
//         <div className='bg-black bg-opacity-40  rounded-lg w-1/5 p-4'   onClick={() => {
//             console.log(item);
//             setCurrentSong(item);
//         }}>
//             <div className='pb-4 pt-2'>
//                 <img className='w-full rounded-md h-50'
//                     src={item.imgUrl}
//                     alt="img"
//                 />
//             </div>
//             <div className='text-white font-semibold py-2'>
//                 {item.title}
//             </div>

//         </div>
//     )
// }