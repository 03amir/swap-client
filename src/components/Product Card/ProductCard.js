import React from 'react';
import './productCard.css';
import { AiFillDownCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";



const productImage =
"http://res.cloudinary.com/bookleemedia/image/upload/v1641588964/hnxobzjycn575uyx2mqp.jpg"

function ProductCard({item}) {

    const navigate = useNavigate()

    async function sendToDetails(id,tag){
        navigate(`/product/${tag}/${id}`)
    }
    return (
        <div className='productCard'>

        <img src={item.productImage} alt="product image" />

        <div className="smallDetails">
        <h2>₹{item.price}</h2>
        <AiFillDownCircle onClick={()=>{
            sendToDetails(item._id,item.tag)

        }} className='showDetails'/>

        </div>

            
        </div>
    );
}

export default ProductCard;