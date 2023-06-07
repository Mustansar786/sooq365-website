import React, { useEffect, useState } from 'react'
import HomeLayout from 'Layouts/homeLayout';
import styles from '../home.module.css';
import SearchBox from '../../components/Header/SearchBox'
// import HeaderText from '../../components/Header/HeaderText'
// import Vehicles from 'pages/vehicles';
import { Footer, ReactLoader } from 'components';
// import { useUserAgent } from 'next-useragent'
//import vehicleStyles from '../vehicles/vehicles.module.css';
import { VehicleCard } from 'components';
// import { slide as FilterMenu } from 'react-burger-menu';
import Spinner from '../../utils.js/Loader'
//import { useRouter } from 'next/router';
//Aslam testing
//import { useLazyQuery} from '@apollo/client';
import { RECENT_VEHICLES, FEATURE_VEHICLES, GET_VEHICLES, CATEGORIES, TOPRATEDHOSTS } from 'graphql/query';
import { ReactCarousel } from 'components';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
//import { FilterBox } from 'components';
//import client from 'graphql/apollo-client';
import Icon from "../../utils.js/icon";
import localforage from "localforage";
import StarRating from "react-svg-star-rating";
import { ImagePrefix, display_image } from 'constants/constants';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';
import { analytic_first_open } from 'utils/seo_functions';

//import { Grid,Image } from 'semantic-ui-react';





export interface IHome {
    i18n: any
}
export default function Home({ i18n }: IHome) {
    const { t } = useTranslation();

    useEffect(() => {
        document.body.dir = i18n.dir()
    }, [i18n, i18n.language])

    //const router = useRouter();
    const [vehicleData, setVehicleData] = useState([])
    const [featuredvehicleData, setfeaturedvehicleData] = useState([])
    const [budgetvehicleData, setbudgetvehicleData] = useState([])
    const [monthlydealsData, setmonthlydealsData] = useState([])
    const [lifestyleData, setlifestyleData] = useState([])
    const [familychoicesData, setfamilychoicesData] = useState([]);
    const [supercarsData, setsupercarsData] = useState([]);
    const [businesscarsData, setbusinesscarsData] = useState([]);
    const [topratedhostsData, settopratedhostsData] = useState([]);
    const [topratedVehiclesData, settopratedVehiclesData] = useState([]);

    const [categoryData, setCategoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [carouselNo, setcarouselNo] = useState(3);
    const [catcarouselNo, setcatcarouselNo] = useState(10);

    const [selectedCategory, setselectedCategory] = useState('');
    const [selectedCategoryIcon, setselectedCategoryIcon] = useState('');

    const [tophostcarouselno, settophostcarouselno] = useState(9);

    const [showArrows, setshowArrows] = useState(true);
    const [showCatArrows, setshowCatArrows] = useState(true);
    const [showArrowsRecent, setshowArrowsRecent] = useState(true);
    const [showArrowsFeature, setshowArrowsFeature] = useState(true);
    const [showArrowsBudget, setshowArrowsBudget] = useState(true);
    const [showArrowsMonthly, setshowArrowsMonthly] = useState(true);
    const [showArrowsLife, setshowArrowsLife] = useState(true);
    const [showArrowsFamily, setshowArrowsFamily] = useState(true);
    const [showArrowsSuper, setshowArrowsSuper] = useState(true);
    const [showArrowsBusiness, setshowArrowsBusiness] = useState(true);

    const [device, setDevice] = useState<any>()
    const [isMobile, setIsMobile] = useState(false)

    // ----------------------------------------------------QUERIES----------------------------------------------------
    useQuery(CATEGORIES(i18n.language, 'id name image icon active whatsapp_number'), {
        onCompleted: (data) => {
            setCategoryData(data.categories);
            if (data.categories.length > 0) {

                localforage.getItem("category", function (err, value: any) {
                    if (err) {
                        //Nothing to do
                    }
                    else {
                        if (value) {
                            setselectedCategory(value.id);
                            setselectedCategoryIcon(value.icon)
                        }
                        else {
                            localforage.setItem("category", data.categories[0], function () {
                                setselectedCategory(data.categories[0].id);
                                setselectedCategoryIcon(data.categories[0].icon)
                            });
                        }
                    }

                })


            }
        },
    });

    /***************** Recent Vehicles ************/
    useQuery(RECENT_VEHICLES, {
        skip: selectedCategory === '' ? true : false,
        variables: {
            page: 0,
            limit: 5,
            categoryId: selectedCategory,
        },
        onCompleted: (data) => {
            setVehicleData(data.vehicles)
            setIsLoading(false);

            if (!isMobile && data.vehicles.length > 0 && data.vehicles.length < 3) {
                setshowArrowsRecent(false);
            }


        },
    });
    /***************** Recent Vehicles ************/

    /***************** Feature Vehicles ************/
    useQuery(FEATURE_VEHICLES, {
        skip: selectedCategory === '' ? true : false,
        variables: {
            limit: 5,
            category: selectedCategory
        },
        onCompleted: (data) => {
            setfeaturedvehicleData(data.featuredHostVehicle.vehicles);
            setIsLoading(false);
            if (!isMobile && data.featuredHostVehicle.vehicles.length > 0 && data.featuredHostVehicle.vehicles.length < 3) {
                setshowArrowsFeature(false);
            }

        },
    });
    /***************** Feature Vehicles ************/

    /***************** Budget Vehicles ************/
    useQuery(GET_VEHICLES, {
        skip: selectedCategory === '' ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
            random: true,
            where: {
                price_gte: 39,
                price_lte: 150
            }
        },
        onCompleted: (data) => {
            setbudgetvehicleData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsBudget(false);
            }

        },
    });
    /***************** Budget Vehicles ************/

    /***************** Monthly Deals Vehicles ************/
    useQuery(GET_VEHICLES, {
        skip: selectedCategory === '' ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
            random: true,
            monthlyDeal: {
                min: 34,
                max: 70
            }
        },
        onCompleted: (data) => {
            setmonthlydealsData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsMonthly(false);
            }

        },
    });
    /***************** Monthly Deals Vehicles ************/

    /***************** Life Style Choices ************/
    useQuery(GET_VEHICLES, {
        skip: (selectedCategoryIcon !== 'car') ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
            random: true,
            where: {
                price_gte: 500,
                price_lte: 7000
            }
        },
        onCompleted: (data) => {
            setlifestyleData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsLife(false);
            }

        },
    });
    /***************** Life Style Choices ************/

    /***************** Family Choices ************/
    useQuery(GET_VEHICLES, {
        skip: selectedCategory === '' ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
            random: true,
            where: {
                attributes: {
                    Seats: {
                        id: "5dc2bf63ec77d8464027a714"
                    }
                }
            }
        },
        onCompleted: (data) => {
            setfamilychoicesData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsFamily(false);
            }

        },
    });
    /***************** Family Choices ************/

    /***************** Super Cars ************/
    const makes = [
        { make: "Ferrari" },
        { make: "Lamborghini" },
        { make: "Aston Martin" },
        { make: "McLaren" },
        { make: "Maserati", model: "GranTurismo" },
        { make: "Audi", model: "R8" },
        { make: "Porsche", model: "Carrera / 911" },
        { make: "Porsche", model: "Cayman" },
        { make: "Porsche", model: "Boxster" },
    ];

    useQuery(GET_VEHICLES, {
        skip: (selectedCategoryIcon !== 'car') ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
            random: true,
            input: {
                super_budget_vehicle: makes
            }
        },
        onCompleted: (data) => {
            setsupercarsData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsSuper(false);
            }

        },
    });
    /***************** Super Cars ************/

    /***************** Business Cars ************/
    const bmakes = [
        { make: "Mercedes-Benz" },
        { make: "BMW" },
        { make: "Bentley" },
        { make: "Rolls Royce" },
        { make: "Land Rover" },
        { make: "Cadillac" },
        { make: "GMC" },
        { make: "Tesla" },
        { make: "Maserati", model: "Ghibli" },
        { make: "Maserati", model: "Levante" }
    ];

    useQuery(GET_VEHICLES, {
        skip: ( selectedCategoryIcon !== "car") ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
            random: true,
            input: {
                super_budget_vehicle: bmakes
            }
        },
        onCompleted: (data) => {
            setbusinesscarsData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsBusiness(false);
            }

        },
    });
    /***************** Business Cars ************/

    /***************** Top Rated Hosts *********/
    useQuery(TOPRATEDHOSTS, {
        skip: selectedCategory === '' ? true : false,
        variables: {
            skip: 0,
            limit: 20,
            categoryId: selectedCategory
        },
        onCompleted: (data: any) => {
            const hosts = data.topHost;
            settopratedhostsData(hosts);
            setIsLoading(false);
        },

    })
    /***************** Top Rated Hosts *********/


    /***************** Top Rated Vehicles ************/
    useQuery(GET_VEHICLES, {
        skip: ( selectedCategoryIcon === "car") ? true : false,
        variables: {
            orderBy: 'rate_avg_DESC',
            skip: 0,
            limit: 5,
            categoryId: selectedCategory,
        },
        onCompleted: (data) => {
            settopratedVehiclesData(data.vehiclesQuery.vehicles);
            setIsLoading(false);
            if (!isMobile && data.vehiclesQuery.vehicles.length > 0 && data.vehiclesQuery.vehicles.length < 3) {
                setshowArrowsBusiness(false);
            }

        },
    });
    /***************** Top Rated Vehicles ************/

    // ----------------------------------------------------QUERIES----------------------------------------------------


    useEffect(() => {
        setDevice(require("current-device").default);
        analytic_first_open(window);
    }, [])

    useEffect(() => {
        (device != undefined) && setIsMobile(device?.mobile() || device?.ipad())
        if ((device != undefined) && device?.mobile()) {
            setcarouselNo(1);
            setcatcarouselNo(3);
            settophostcarouselno(3);
            setshowArrows(false);
            setshowArrowsRecent(false);
            setshowArrowsFeature(false);
            setshowArrowsBudget(false);
            setshowArrowsMonthly(false);
            setshowArrowsLife(false);
            setshowArrowsFamily(false);
            setshowArrowsSuper(false);
            setshowArrowsBusiness(false);
            setshowCatArrows(false);
        }
        if ((device != undefined) && device?.ipad()) {
            setcarouselNo(2);
            setcatcarouselNo(4);
            settophostcarouselno(5);
            setshowArrows(false);
            setshowArrowsRecent(false);
            setshowArrowsFeature(false);
            setshowArrowsBudget(false);
            setshowArrowsMonthly(false);
            setshowArrowsLife(false);
            setshowArrowsFamily(false);
            setshowArrowsSuper(false);
            setshowArrowsBusiness(false);
            setshowCatArrows(false);
        }
    }, [device])


    // const gotoMessages = () => {
    //     router.push('/messages')
    // }

    const setCategoryandRedirect = (categoryData: any) => {
        if (!categoryData.active) {
            swal({
                icon: 'info',
                text: t('This cateogry will be available soon.'),

            })
            return;
        }
        else {
            if (selectedCategory != categoryData.id) {
                setIsLoading(true);
                setselectedCategory(categoryData.id);
                setselectedCategoryIcon(categoryData.icon)
                localforage.setItem("category", categoryData, function () {
                    //Nothing to do;
                })
            }
        }
    }


    return (
        <>
            {/* <ChatOption label={"Live Chat"} onClick={gotoMessages} /> */}
            <HomeLayout title="Home" category={selectedCategory}>
                <SearchBox category={selectedCategory} />
                

            </HomeLayout>
            <div className="main-body-container">


                {/* Recent On Urent */}
                <div className={styles.list_block}>
                    {/* For Categories */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5%' }} className="carousel_listing">
                        {isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <h2 className={styles.slider_title} style={{ marginBottom: '0.5rem' }}>{t(`Categories`)}</h2>
                            </div>
                            <div style={{ marginRight: '2rem' }}></div>
                        </div> : <h2 className={styles.slider_title}>{t(`Categories`)}</h2>
                        }

                        <ReactCarousel showArrows={showCatArrows} itemsToShow={catcarouselNo} enableTilt={false} pagination={false}>
                            {
                                categoryData.length > 0 ? categoryData.map((item: any) => {
                                    const selected = item.id === selectedCategory ? true : false;
                                    return (

                                        <a onClick={() => setCategoryandRedirect(item)} style={selected ? {
                                            cursor: 'pointer', border: '1px solid rgb(86, 195, 197)',
                                            backgroundColor: 'rgb(86, 195, 197)', width: isMobile ? '80%' : '90%'
                                        } : { cursor: 'pointer', width: isMobile ? '80%' : '90%' }} key={item.id}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #eee', padding: '20px' }}>
                                                <Icon icon={item.icon} size={device?.mobile() ? 36 : device?.ipad() ? 40 : 46} color={selected ? "white" : "black"} />
                                                <p style={{ color: selected ? 'white' : 'black', fontSize: device?.mobile() ? '4vw' : device?.ipad() ? '2vw' : '0.9vw' }}>{item.name}</p>
                                            </div>
                                        </a>

                                    )
                                }) : []
                            }
                        </ReactCarousel>
                    </div>

                    <div className={styles.block_container + ' carousel_listing'}
                        style={{
                            marginTop: isMobile ? 7 : 10,
                            justifyContent: isMobile ? 'unset' : 'center',
                            height: isLoading ? 500 : 'auto',
                            alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                        }}
                    >
                        {isLoading ?
                            <ReactLoader loading={isLoading} />
                            : vehicleData.length > 0 ?
                                <>
                                    {
                                        isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <h2 className={styles.slider_title}>{t(`Recent on`)}{" "} <span className={styles.ucolor}>U</span>rent</h2>
                                            </div>
                                            <Link href={"/vehicles?slug=recent-cars"} passHref>
                                                <a><div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                    <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                </div></a>
                                            </Link>
                                        </div> :
                                         <h2 className={styles.slider_title}>{t(`Latest Car Rental Offers`)}</h2>
                                        //  <h2 className={styles.slider_title}>{t(`Recent on`)}{" "}<span className={styles.ucolor}>U</span>rent</h2>
                                    }

                                    <ReactCarousel showArrows={showArrowsRecent} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                        {
                                            vehicleData.map((item, key: number) => {
                                                return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                            })
                                        }
                                    </ReactCarousel>

                                    {isMobile ? [] : <Link href={"/vehicles?slug=recent-cars"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                </>
                                : []
                        }
                    </div>
                    {/*Recent on Urent Ends here*/}

                    {/* Featured On Urent */}
                    <div className={styles.block_container + ' carousel_listing'}
                        style={{
                            marginTop: isMobile ? 7 : 10,
                            justifyContent: 'center',
                            height: isLoading ? 500 : 'auto',
                            alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                        }}
                    >
                        {isLoading ?
                            <Spinner loading={isLoading} />
                            :
                            featuredvehicleData.length > 0 ?
                                <>
                                    {
                                        isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <h2 className={styles.slider_title}>{t(`Featured on`)} {" "}<span className={styles.ucolor}>U</span>rent</h2>
                                            </div>

                                            <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}></div>

                                        </div> : <h2 className={styles.slider_title}>{t(`Featured on`)}{' '} <span className={styles.ucolor}>U</span>rent</h2>
                                    }

                                    <ReactCarousel showArrows={showArrowsFeature} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                        {
                                            featuredvehicleData.map((item, key: number) => {
                                                return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                            })
                                        }
                                    </ReactCarousel>
                                    {/* {isMobile ? [] : <Link href={"/vehicles?slug=featured-cars"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>View More</div></a></Link>} */}
                                </>
                                : []
                        }
                    </div>


                    {/*Featured on Urent Ends here*/}

                    {/* Budget Choices */}
                    {
                        selectedCategoryIcon === "car" ?
                            <div className={styles.block_container + ' carousel_listing'}
                                style={{
                                    marginTop: isMobile ? 7 : 10,
                                    justifyContent: 'center',
                                    height: isLoading ? 500 : 'auto',
                                    alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                                }}
                            >
                                {isLoading ?
                                    <Spinner loading={isLoading} />
                                    : budgetvehicleData.length > 0 ?
                                        <>
                                            {
                                                isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h2 className={styles.slider_title}>{t(`Budget Choices`)}</h2>
                                                    </div>
                                                    <Link href={"/vehicles?slug=budget-cars"}>
                                                        <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                            <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                        </div>
                                                    </Link>
                                                </div> : <h2 className={styles.slider_title}>{t(`Budget Choices`)}</h2>
                                            }
                                            <ReactCarousel showArrows={showArrowsBudget} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                                {
                                                    budgetvehicleData.map((item: any, key: number) => {
                                                        return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                                    })
                                                }
                                            </ReactCarousel>
                                            {isMobile ? [] : <Link href={"/vehicles?slug=budget-cars"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                        </>
                                        : []
                                }
                            </div>
                            : null
                    }

                    {/*Budget choices Ends here*/}


                    {/* Top Rated Vehicles */}
                    {
                        selectedCategoryIcon !== 'car' ?
                            <div className={styles.block_container + ' carousel_listing'}
                                style={{
                                    marginTop: isMobile ? 7 : 10,
                                    justifyContent: 'center',
                                    height: isLoading ? 500 : 'auto',
                                    alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                                }}
                            >
                                {isLoading ?
                                    <Spinner loading={isLoading} />
                                    : topratedVehiclesData.length > 0 ?
                                        <>
                                            {
                                                isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h2 className={styles.slider_title}>{t(`Top Rated Vehicles`)}</h2>
                                                    </div>
                                                    <Link href={"/vehicles?slug=top-rated-vehicles"}>
                                                        <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                            <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                        </div>
                                                    </Link>
                                                </div> : <h2 className={styles.slider_title}>{t(`Top Rated Vehicles`)}</h2>
                                            }
                                            <ReactCarousel showArrows={showArrowsBudget} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                                {
                                                    topratedVehiclesData.map((item: any, key: number) => {
                                                        return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon} />
                                                    })
                                                }
                                            </ReactCarousel>
                                            {isMobile ? [] : <Link href={"/vehicles?slug=top-rated-vehicles"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                        </>
                                        : []
                                }
                            </div>
                            :
                            null
                    }
                    {/*Top Rated Vehicles Ends here*/}


                    {/* Monthly deals */}
                    {
                        selectedCategoryIcon === "car" ?

                            <div className={styles.block_container + ' carousel_listing'}
                                style={{
                                    marginTop: isMobile ? 7 : 10,
                                    justifyContent: 'center',
                                    height: isLoading ? 500 : 'auto',
                                    alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                                }}
                            >
                                {isLoading ?
                                    <Spinner loading={isLoading} />
                                    : monthlydealsData.length > 0 ?
                                        <>
                                            {
                                                isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h2 className={styles.slider_title}>{t(`Monthly Deals`)}</h2>
                                                    </div>
                                                    <Link href={"/vehicles?slug=monthly-deals"}>
                                                        <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                            <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                        </div>
                                                    </Link>
                                                </div> : <h2 className={styles.slider_title}>{t(`Monthly Deals`)}</h2>
                                            }
                                            <ReactCarousel showArrows={showArrowsMonthly} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                                {
                                                    monthlydealsData.map((item: any, key: number) => {
                                                        item = { ...item, monthly: true };
                                                        return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                                    })
                                                }
                                            </ReactCarousel>
                                            {isMobile ? [] : <Link href={"/vehicles?slug=monthly-deals"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                        </>
                                        : []
                                }
                            </div>
                            :
                            null}
                    {/*Monthly deals Ends here*/}

                    {/* Lifestyle choices */}

                    {
                        selectedCategoryIcon === 'car' ?
                            <div className={styles.block_container + ' carousel_listing'}
                                style={{
                                    marginTop: isMobile ? 7 : 10,
                                    justifyContent: 'center',
                                    height: isLoading ? 500 : 'auto',
                                    alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                                }}
                            >
                                {isLoading ?
                                    <Spinner loading={isLoading} />
                                    : lifestyleData.length > 0 ?
                                        <>
                                            {
                                                isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h2 className={styles.slider_title}>{t(`Lifestyle Choices`)}</h2>
                                                    </div>
                                                    <Link href={"/vehicles?slug=lifestyle"}>
                                                        <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                            <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                        </div>
                                                    </Link>
                                                </div> : <h2 className={styles.slider_title}>{t(`Lifestyle Choices`)}</h2>
                                            }
                                            <ReactCarousel showArrows={showArrowsLife} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                                {
                                                    lifestyleData.map((item: any, key: number) => {
                                                        return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                                    })
                                                }
                                            </ReactCarousel>
                                            {isMobile ? [] : <Link href={"/vehicles?slug=lifestyle"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                        </>
                                        : []
                                }
                            </div>

                            : null
                    }


                    {/*Lifestyle choices Ends here*/}

                    {/* Family choices */}
                    {selectedCategoryIcon === "car" ?

                        <div className={styles.block_container + ' carousel_listing'}
                            style={{
                                marginTop: isMobile ? 7 : 10,
                                justifyContent: 'center',
                                height: isLoading ? 500 : 'auto',
                                alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                            }}
                        >
                            {isLoading ?
                                <Spinner loading={isLoading} />
                                : familychoicesData.length > 0 ?
                                    <>
                                        {
                                            isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                <div style={{ flex: 1 }}>
                                                    <h2 className={styles.slider_title}>{t(`Family Choices`)}</h2>
                                                </div>
                                                <Link href={"/vehicles?slug=familychoices"}>
                                                    <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                        <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                    </div>
                                                </Link>
                                            </div> : <h2 className={styles.slider_title}>{t(`Family Choices`)}</h2>
                                        }
                                        <ReactCarousel showArrows={showArrowsFamily} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                            {
                                                familychoicesData.map((item: any, key: number) => {
                                                    return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                                })
                                            }
                                        </ReactCarousel>
                                        {isMobile ? [] : <Link href={"/vehicles?slug=familychoices"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                    </>
                                    : []
                            }
                        </div>
                        : null}
                    {/*Family choices Ends here*/}

                    {/* SuperCar */}

                    {
                        selectedCategoryIcon === "car" ?
                            <div className={styles.block_container + ' carousel_listing'}
                                style={{
                                    marginTop: isMobile ? 7 : 10,
                                    justifyContent: 'center',
                                    height: isLoading ? 500 : 'auto',
                                    alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                                }}
                            >
                                {isLoading ?
                                    <Spinner loading={isLoading} />
                                    : supercarsData.length > 0 ?
                                        <>
                                            {
                                                isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h2 className={styles.slider_title}>{t(`SuperCars`)}</h2>
                                                    </div>
                                                    <Link href={"/vehicles?slug=supercars"}>
                                                        <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                            <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                        </div>
                                                    </Link>
                                                </div> : <h2 className={styles.slider_title}>{t(`Supercars`)}</h2>
                                            }
                                            <ReactCarousel showArrows={showArrowsSuper} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                                {
                                                    supercarsData.map((item: any, key: number) => {
                                                        return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                                    })
                                                }
                                            </ReactCarousel>
                                            {isMobile ? [] : <Link href={"/vehicles?slug=supercars"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                        </>
                                        : []
                                }
                            </div>
                            : null
                    }

                    {/*SuperCar Ends here*/}

                    {/* Business Car */}
                    {
                        selectedCategoryIcon === 'car' ?
                            <div className={styles.block_container + ' carousel_listing'}
                                style={{
                                    marginTop: isMobile ? 7 : 10,
                                    justifyContent: 'center',
                                    height: isLoading ? 500 : 'auto',
                                    alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                                }}
                            >
                                {isLoading ?
                                    <Spinner loading={isLoading} />
                                    : businesscarsData.length > 0 ?
                                        <>
                                            {
                                                isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h2 className={styles.slider_title}>{t(`Business`)}</h2>
                                                    </div>
                                                    <Link href={"/vehicles?slug=businesscars"}>
                                                        <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                            <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                        </div>
                                                    </Link>
                                                </div> : <h2 className={styles.slider_title}>{t(`Business`)}</h2>
                                            }
                                            <ReactCarousel showArrows={showArrowsBusiness} itemsToShow={carouselNo} enableTilt={false} pagination={false}>
                                                {
                                                    businesscarsData.map((item: any, key: number) => {
                                                        return <VehicleCard vehicle={item} key={key} carousel={true} categoryName={selectedCategoryIcon}/>
                                                    })
                                                }
                                            </ReactCarousel>
                                            {isMobile ? [] : <Link href={"/vehicles?slug=businesscars"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                        </>
                                        : []
                                }
                            </div>
                            : null
                    }

                    {/*Business Car Ends here*/}

                    {/* Top Rates Host */}

                    <div className={styles.block_container + ' carousel_listing'}
                        style={{
                            marginTop: isMobile ? 7 : 10,
                            justifyContent: 'center',
                            height: isLoading ? 500 : 'auto',
                            alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                        }}
                    >
                        {isLoading ?
                            <Spinner loading={isLoading} />
                            : topratedhostsData.length > 0 ?
                                <>
                                    {
                                        isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <h2 className={styles.slider_title}>{t(`Top Rated Hosts`)}</h2>
                                            </div>
                                            <Link href={"/hosts"}>
                                                <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                                    <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                                </div>
                                            </Link>
                                        </div> : <h2 className={styles.slider_title}>{t(`Top Rated Hosts`)}</h2>
                                    }
                                    <ReactCarousel showArrows={showArrows} itemsToShow={tophostcarouselno} enableTilt={false} pagination={false}>
                                        {
                                            topratedhostsData.map((item: any) => {
                                               
                                                let srcFile = "/assets/hosts/no_image.png";
                                                if (item.profile.selfie_image) {
                                                    srcFile = display_image(ImagePrefix + item.profile.selfie_image);
                                                }
                                                return (
                                                    <Link href={"/hosts/profile?host=" + item.id} passHref key={item.id}>
                                                        <a><div className={styles.top_rated_items} >
                                                            <img className="" src={srcFile}></img>
                                                            <span>{item.profile.first_name}</span>
                                                            <span>{item.adminId.profile.companyName}</span>
                                                            <span>
                                                                <StarRating
                                                                    initialRating={item.rate_avg} unit="half" size={12} />
                                                            </span>
                                                        </div></a>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </ReactCarousel>
                                    {isMobile ? [] : <Link href={"/hosts"}><a><div className={styles.list_btn + ' ' + 'ui submit button'}>{t(`View More`)}</div></a></Link>}
                                </>
                                : []
                        }
                    </div>
                    {/*Top Rated Host Ends here*/}



                    {/* Partners */}
                    <div className={styles.block_container + ' carousel_listing'}
                        style={{
                            marginTop: isMobile ? 7 : 10,
                            justifyContent: 'center',
                            height: isLoading ? 500 : 'auto',
                            alignContent: isLoading ? (isMobile ? 'center' : 'end') : 'unset'
                        }}
                    >
                        {/* {
                            isMobile ? <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <h2 className={styles.slider_title}>{t(`Our Partners`)}</h2>
                                </div>
                                <Link href={"/hosts"}>
                                    <div style={i18n.dir() === 'rtl' ? { marginLeft: '2rem' } : { marginRight: '2rem' }}>
                                        <span className={styles.ucolor + " " + styles.show_all}>{t(`Show All`)}</span>
                                    </div>
                                </Link>
                            </div> : <h2 className={styles.slider_title}>{t(`Our Partners`)}</h2>
                        } */}
                        {isMobile}     <ReactCarousel showArrows={isMobile ?true :false} itemsToShow={isMobile ? 1 :5} enableTilt={false} pagination={false}>
                            <div className="partners"> 
                            <a href="https://www.awrostamani.com/p" target="_blank" rel="noreferrer"><img className="part_1" height="70px" src="/assets/partners/Awr.jpeg" alt="AW Rostamani Group" title="AW Rostamani Group"/></a>
                            </div>
                            <div className="partners">
                              <a href='https://www.huawei.com/' target="_blank" rel="noreferrer"> <img className="part_2" height="80px" src="/assets/partners/huawei.png" alt="Huawei" title="Huawei" /></a>
                            </div>

                            <div className="partners">
                            <a  href='https://cafu.ae/' target="_blank" rel="noreferrer"><img className="part_3" height="80px" src="/assets/partners/cafu.png" alt="CAFU" title="CAFU" /></a>
                            </div>
                            <div className="partners">
                            <a href='https://hub.misk.org.sa/programs/entrepreneurship/misk-accelerator/'  target="_blank" rel="noreferrer"><img className="part_4" height="60px" src="/assets/partners/misk.png" alt="MISK Accelerator" title="MISK Accelerator"  style={{marginTop:20}} /></a> 
                            </div>
                            <div className="partners">
                            <a href='https://www.upgrade-now.com/digital-growth-agency' target="_blank" rel="noreferrer"><img className="part_5" height="80px" src="/assets/partners/upgrade.png" alt="Upgrade" title="Upgrade" /></a>  
                            </div>
                        </ReactCarousel>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
