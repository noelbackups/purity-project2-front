import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { getFeedbacks, getTerms } from "../services";
import { Rating } from "@mui/material";
const Feedbacks = (props) => {
    const [feedbacks, setFeedbacks] = useState([
        {nickname: 'Fulano1', description: 'Muito massa asdasdass', stars: 3}, 
        {nickname: 'Fulano1', description: 'Muito massa', stars: 3},
        {nickname: 'Fulano1', description: 'Muito massa', stars: 3}
    ]);
    useEffect(() => {
        async function loadFeedbacks() {
            try {
                const get = await getFeedbacks({});
                setFeedbacks(get.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadFeedbacks();
     }, []);
    return (
        <>

            <div className="content-home">
                <Header />
                <div className="d-flex align-items-center gap-3" style={{ marginTop: '3rem', flexWrap: 'wrap'}}>
                    {feedbacks.map((value) => (
                        <div style={{width: '24%', textAlign: 'center', background: '#15161b', padding: '1rem', borderRadius: 5 }}>
                         <div style={{fontWeight: 700}}>{value.product}</div>
                         <Rating
                         readOnly={true}
  name="simple-controlled"
  sx={{
    '& .MuiRating-iconEmpty': {
        color: '#FFF',
      }
  }}
  defaultValue={1}
  value={value.stars}
/>
<div style={{padding: 10}}>
                        <div style={{fontWeight: 500}}>{value.nickname}</div>
                        <div style={{fontSize: 12}}>{value.description.length > 36 ?
    `${value.description.substring(0, 36)}...` : value.description
  }</div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}

export default Feedbacks;
