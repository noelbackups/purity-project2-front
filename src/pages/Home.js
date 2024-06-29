import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Typewriter from 'typewriter-effect';
import Marquee from "react-fast-marquee";
import CardCompras, { comprasLoad } from "../components/CardCompras";
import { listSales } from "../services";
const Home = (props) => {
    const [sales, setSales] = useState([]);
    let bounds;
    const inputRef = useRef();
    const rotateToMouse = (e) => {
        bounds = inputRef.current.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        inputRef.current.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `;

    };
    const removeListener = (e) => {
        inputRef.current.style.transform = '';
        inputRef.current.style.background = '';
    };
    useEffect(() => {
        async function getSales() {
            try {
                const get = await listSales({});
                setSales(get.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSales();
     }, []);
    return (
        <>

            <div className="content-home">
                <Header />
                <div className="center-page d-flex align-items-center justify-content-between" style={{ paddingTop: '3rem', minHeight: '70vh' }}>
                    <div className="center-page-text">
                        <div style={{ fontSize: 27, fontWeight: 300, lineHeight: '10px' }}>Os melhores cheats para</div>
                        <div style={{ fontSize: 70, fontWeight: 700 }}><Typewriter
                            options={{
                                strings: ['FiveM', 'Valorant', 'Apex'],
                                autoStart: true,
                                loop: true,
                                pauseFor: 2500
                            }}
                        /></div>
                    </div>
                    <div className="app col-md-6 d-flex justify-content-center">
                        <div
                            ref={inputRef}
                            className="card-cheats"
                            onMouseLeave={removeListener}
                            onMouseMove={rotateToMouse}
                        >
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '3rem' }}>
                <Marquee
                    gradientColor={[21, 22, 27]}
                    gradientWidth={'150px'}
                >
                    {sales.length > 0 ?
                    sales.map((value, index) => (
                    <CardCompras key={index} data={value} />
                    ))
                    :
                    comprasLoad}
                </Marquee>
            </div>
        </>
    );
}

export default Home;
