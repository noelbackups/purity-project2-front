import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { getTerms } from "../services";
const Terms = (props) => {
    const [text, setText] = useState(null);
    useEffect(() => {
        async function loadTerms() {
            try {
                const get = await getTerms({});
                setText(get.data.text);
            } catch (error) {
                console.log(error);
            }
        }
        loadTerms();
     }, []);
    return (
        <>

            <div className="content-home">
                <Header />
                <div className="center-page d-flex align-items-center justify-content-between" style={{ margin: '3rem 5rem', background: '#15161b', padding: '1rem', borderRadius: 5 }}>
                    <div dangerouslySetInnerHTML={{__html: text}} />
                </div>
            </div>

        </>
    );
}

export default Terms;
