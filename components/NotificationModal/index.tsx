import { Grid, Header, Item ,Label,Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { LISTNOTIFICATIONS } from 'graphql/query';
import {UPDATECOUNTERSEEN , UPDATENOTIFICATIONSEEN} from 'graphql/mutation';
import { ImagePrefix, display_image } from 'constants/constants';
import moment from 'moment';
import { ReactLoader } from 'components';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getLocalDateTime, timeDiffCalc } from 'utils/lib';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function NotificationModal({ isOpen, lang_code }: NotificationModalT) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [notifyData, setnotifyData] = useState<any>([]);
    const [page, setpage] = useState(0);
    const [limit]=useState(10)
    const [isloading, setisloading] = useState(true);
    const [hasMore,setHasMore]=useState(true)


    const fetchMoreData = () =>{
        if(hasMore){
            getnotis({
                variables: {
                    skip: page  + 1,
                    limit : limit
                }
            })
            setpage(page + 1);
        }
            
    }


    const [updateCounterSeen] = useMutation(UPDATECOUNTERSEEN)

    const [updateNotiSeen] = useMutation(UPDATENOTIFICATIONSEEN)
    
    const [getnotis] = useLazyQuery(LISTNOTIFICATIONS, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data : any) => {
            setnotifyData(data.getNotifications)
            // dispatch({
            //     type: notificationtypes.SET_NOTIFICATION_COUNT,
            //     payload: {
            //        count : 0
            //     }
            // })
            setisloading(false);
                if(page === 0){
                    setnotifyData(data.getNotifications)
                }
                else{
                    setnotifyData([...notifyData,...data.getNotifications]);
                }
             
                const filt = data.getNotifications.map((it:any)=>{
                    const temp = it.id
                    return temp
                })
                updateCounterSeen({variables : {
                    data : filt
                }})

            
            if (data.getNotifications.length < limit) {
                setHasMore(false)
            }
            else {
                setHasMore(true)
            }
        }
    });


    const resetState = () => {
        setisloading(true);
        setnotifyData([]);
        setpage(0);
    }

    useEffect(() => {
        if(isOpen){
            document.body.style.overflow = 'hidden';
            getnotis({
                variables: {
                    skip: page,
                    limit : limit
                }
            })
        }
        else {
            document.body.style.overflow = 'unset';
        }
       
      return () => {
        resetState
      }
    }, [isOpen])

    const handleMessageRedirection = (item:any) => {
        updateNotiSeen({
            variables : {
                id : item.id
            }
        })
        router.push({
            pathname: '/messages',
            query: { convId: item.conversation.id }
        })
    }
    
    
    return (

        <>
            {isOpen ?
           
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={lang_code === "ar" ? {
                    width: screen.width / 4,
                    height: window.innerHeight - 160,
                    backgroundColor: '#FEFEFE',
                    position: 'fixed',
                    border: '1px solid #eee',
                    top: '7em',
                    borderRadius: '10px',
                    overflow: 'auto',
                    zIndex: 2,
                }
            :
            {
                width: screen.width / 4,
                height: window.innerHeight - 160,
                backgroundColor: '#FEFEFE',
                position: 'fixed',
                border: '1px solid #eee',
                right: '8rem',
                top: '7em',
                borderRadius: '10px',
                overflow: 'auto',
                zIndex: 2,
            }}
                id='scrollableDiv'
                >
                <InfiniteScroll
                    dataLength={notifyData.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<ReactLoader loading={isloading} />}
                    scrollableTarget='scrollableDiv'
                >
                    <Grid style={{ margin: 0 }}>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Header as="h5"> Notifications</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {
                                        <Item.Group>
                                            {
                                                notifyData.map((item: any) => {
                                                    const todayDate = getLocalDateTime()
                                                    const bookingDate = new Date(item.booking?.start_at);
                                                    let imgsrc = "/assets/hosts/no_image_circle.png";
                                                    if (item.type !== 'BOOKING') {
                                                        if(item?.from?.profile.selfie_image){
                                                            imgsrc = display_image(ImagePrefix + item?.from?.profile?.selfie_image);
                                                        }
                                                        else{
                                                            imgsrc = "/assets/user/avatar.png";
                                                        }
                                                        
                                                    }
                                                    else if(item.type === 'BOOKING' && item?.vehicle?.thumb) {
                                                        imgsrc = item?.vehicle?.thumb?.includes("https://")?item?.vehicle?.thumb:display_image(ImagePrefix + item?.vehicle?.thumb);
                                                    }

                                                    return (
                                                        
                                                            <Item style={{backgroundColor : item.is_counter_seen ? "fff" : "#edf6f6" , paddingTop:10,paddingBottom :10,margin :0}} key={item.id}>
                                                               {!item.is_seen ? <Label circular color={"teal"} empty style={{alignSelf:"center",marginLeft : "15px",fontSize:"6px"}}/> : <span style={{marginLeft : "24px"}}/>}
                                                                {item.type !== 'BOOKING' ?<img src={item.from ?imgsrc:"/assets/app-logo/admin_chat_logo.jpg"} alt="User"  style={{width:"50px",height:"50px",borderRadius:"50%",marginRight:"20px",objectFit:"cover",alignSelf:"center" , marginLeft:8}} /> : <Item.Image src={imgsrc} style={{alignSelf:"center",marginLeft:5,width:60}}/>}
                                                                <Item.Content verticalAlign='middle'>
                                                                    {item.type === "BOOKING" ?  <Item.Description>
                                                                        {
                                                                            item.status === "INSTANCE_APPROVED" ?
                                                                                <>
                                                                                    <span>You‘ve got a instant approved booking for <b>
                                                                                        {/* {item?.vehicle?.brand?.name} */}
                                                                                        {item?.vehicle?.brand?.name && !item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                          {item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                          }
                                          {!item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                            item?.vehicle?.attributes?.Name.length > 40 ? `${item?.vehicle?.attributes?.Name.substring(0,40)}...` : item?.vehicle?.attributes?.Name
                                          }
                                                                                        </b> from <b>{item.from.profile.first_name}</b></span>
                                                                                </>
                                                                                :

                                                                                item.status == "PENDING" ?
                                                                                    <>
                                                                                        <span>You‘ve got a booking request for <b>
                                                                                            {/* {item?.vehicle?.brand?.name} */}
                                                                                            {item?.vehicle?.brand?.name && !item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                                                                             {item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                                                                             {!item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                              item?.vehicle?.attributes?.Name.length > 40 ? `${item?.vehicle?.attributes?.Name.substring(0,40)}...` : item?.vehicle?.attributes?.Name
                                                                                              }
                                                                                            </b> from <b>{item?.from?.profile.first_name}</b></span><br/>
                                                                                        
                                                                                    </>
                                                                                    : item.status == "RENTER_CANCEL" ?
                                                                                        <>
                                                                                            <span>Booking request for <b>
                                                                                                {/* {item?.vehicle?.brand?.name} */}
                                                                                                {item?.vehicle?.brand?.name && !item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                          {item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                          }
                                          {!item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                            item?.vehicle?.attributes?.Name.length > 40 ? `${item?.vehicle?.attributes?.Name.substring(0,40)}...` : item?.vehicle?.attributes?.Name
                                          }
                                                                                                </b> cancelled by <b>{item?.from.profile.first_name}</b></span>
                                                                                        </>
                                                                                        : item.status == "RENTER_CANCEL_AFTER_CONFIRM" ?
                                                                                            <>
                                                                                                <span>Your guest <b>{item.renter_name}</b> has cancelled their booking for <b>{item?.vehicle?.brand?.name}</b></span>
                                                                                            </>
                                                                                            : item.status == "APPROVED" ?
                                                                                                <>
                                                                                                    <span>Your booking request for <b>
                                                                                                        {/* {item?.vehicle?.brand?.name} */}
                                                                                                        {item?.vehicle?.brand?.name && !item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                          {item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                          }
                                          {!item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                            item?.vehicle?.attributes?.Name.length > 40 ? `${item?.vehicle?.attributes?.Name.substring(0,40)}...` : item?.vehicle?.attributes?.Name
                                          }
                                                                                                        </b> is approved by <b>{item.from.profile.first_name}</b></span>
                                                                                                </>
                                                                                                : item.status == "REJECTED" ?
                                                                                                    <>
                                                                                                        <span>Your booking request for <b>
                                                                                                            {/* {item?.vehicle?.brand?.name} */}
                                                                                                            {item?.vehicle?.brand?.name && !item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                          {item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                          }
                                          {!item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                            item?.vehicle?.attributes?.Name.length > 40 ? `${item?.vehicle?.attributes?.Name.substring(0,40)}...` : item?.vehicle?.attributes?.Name
                                          }
                                                                                                            </b> is cancelled by <b>{item.from.profile.first_name}</b></span>
                                                                                                    </>
                                                                                                    : item.status == "HOST_CANCEL_AFTER_CONFIRM" ?
                                                                                                        <>
                                                                                                            <span>Your booking for <b>
                                                                                                                {/* {item?.vehicle?.brand?.name} */}
                                                                                                                {item?.vehicle?.brand?.name && !item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                                                                             }
                                          {item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                                                                             item?.vehicle?.brand?.name+ " "+ item?.vehicle?.model?.name 
                                          }
                                          {!item?.vehicle?.brand?.name && item?.vehicle?.attributes?.Name &&
                                            item?.vehicle?.attributes?.Name.length > 40 ? `${item?.vehicle?.attributes?.Name.substring(0,40)}...` : item?.vehicle?.attributes?.Name
                                          }
                                                                                                                </b> is cancelled by <b>{item.from.profile.first_name}</b></span>
                                                                                                        </>
                                                                                                        : null
                                                                        }
                                                                
                                                                    <div style={{color:"teal",cursor:'pointer'}}
                                                                     onClick={()=>{
                                                                        updateNotiSeen({
                                                                            variables : {
                                                                                id : item.id
                                                                            }
                                                                        })
                                                                        router.push(`/trips?index=${(item.status === "APPROVED" || item.status === "INSTANCE_APPROVED") &&  !timeDiffCalc(bookingDate, todayDate) ? 0 : item.status === "PENDING" ? 0 : (item.status === "RENTER_CANCEL" || item.status === "RENTER_CANCEL_AFTER_CONFIRM" || item.status === "REJECTED" || item.status === "HOST_CANCEL_AFTER_CONFIRM") ? 1 :  (item.status === "APPROVED" || item.status === "INSTANCE_APPROVED") &&  timeDiffCalc(bookingDate, todayDate) ? 1 : 0}`)
                                                                     }}>Go to trips</div>
                                                                    
                                                                    </Item.Description> : 
                                                                    <Item.Description>
                                                                        You have a message from <b>{item?.from === null ? 'Support Team' : `${item?.from?.profile.first_name}  ${item?.from?.profile.last_name}`}</b><br/>
                                                                        <div style={{color:"teal",cursor:"pointer"}} onClick={()=>handleMessageRedirection(item)}><Icon name='reply'/>Reply back</div>
                                                                </Item.Description>}
                                                                <Item.Extra content={moment(item.createdAt).fromNow()}/>
                                                                </Item.Content>
                                                            </Item>
                                                    )
                                                })
                                            }
                                        </Item.Group>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </InfiniteScroll>
                </div>
            </div>
       
              
                : null
            }
        </>

    )
}



type NotificationModalT = {
    isOpen: boolean,
    lang_code: string
}