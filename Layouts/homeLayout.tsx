import React from 'react'
import { Footer, SEO } from 'components';
import { Container } from 'semantic-ui-react'
import Header from 'components/Header';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { isMobile } from 'react-device-detect';

const mainBanner = '/assets/home/banner.svg'

export default function HomeLayout({ downShiftIsOpen,isMobile,children, ...rest }: any) {
    return (
        <>
            <div className="main-container"
            style={{marginTop: 70}}
                // style={{ backgroundImage: `url(${mainBanner})`,height:downShiftIsOpen&&isMobile&&"90vh"}}
                >
                    <Carousel autoPlay={true} centerMode={true} centerSlidePercentage={80} selectedItem={1}>
                <div>
                    <img src={mainBanner} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={mainBanner} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={mainBanner} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
                <SEO {...rest} />
                <Header  />
                <div className="main-body-container">{children}</div>
            </div>
            {/* <Footer /> */}
        </>
    )
}
