import { Modal,Grid,TransitionablePortal,Image,Header,List} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { localforageClear } from 'utils/lib';
import { useDispatch,useSelector } from 'react-redux';
import * as types from 'redux/action/type/user';
import { useApolloClient } from '@apollo/client';
import { RootStateI } from '../../redux/reducer';
import { ImagePrefix,display_image } from 'constants/constants';
import CustomIcon from 'utils.js/icon';
import { useTranslation } from 'react-i18next';




export default function ProfileModal({visible,closeModal} : ProfileModalComponentType){
    const router       = useRouter();
    const dispatch     = useDispatch(); 
    const appoloClient = useApolloClient();
    const userSelector = useSelector((state: RootStateI) => state.user);
    const data         = userSelector.user;
    const { i18n ,t}     = useTranslation();
    
    let imgSrc         = "/assets/hosts/no_image_circle.png";
    if(data.selfie_image){
        imgSrc         = display_image(ImagePrefix+data.selfie_image);
    }
    

    const goTopage = (page:string) => {

        if(page == 'logout'){
            localforageClear();
            dispatch({
                type: types.LOGOUT__
            });
            appoloClient.cache.reset().then(() => {
                router.push('/');
            });
        } else {
            router.push('/'+page);  
        }
        closeModal();
    }
    return (
        <>
            <style>{`
           
           .profile-modal .ui.dimmer {
                z-index:99999;
                padding:0px;
            }
            .profile-modal .ui.dimmer {
                height:${screen.height - 53}px;
                background-color:transparent;
            }
            .profile-modal .item {
                padding-top:0.8em !important;
                padding-bottom:0.8em !important;
            }
            
        `}</style>
            
            <TransitionablePortal
                transition={{animation:'slide up',duration:300}}
                open={visible}
                onOpen={() => setTimeout(() => document.body.classList.add('profile-modal'), 0)}
                onClose={() => setTimeout(() => document.body.classList.remove('profile-modal'), 0)}>

                <Modal
                    centered={false}
                    open={true}
                    style={{width:'100%',borderRadius:'0px',margin:'0px',height:`${screen.height - 54}px`}}>
                    
                    <Modal.Header style={{borderBottom:'0px'}}>
                        <Grid>
                            <Grid.Row columns="equal" style={{paddingBottom:0}}>
                                <Grid.Column textAlign={i18n.dir() === 'rtl' ? 'right' : 'left'}>
                                   <CustomIcon icon="delete" size={20} onClick={closeModal}></CustomIcon>
                                </Grid.Column>
                                <Grid.Column width={4} style={{padding:'0px'}}>
                                    <Image src={imgSrc} size="tiny" circular floated="right"/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{paddingTop:0}}>
                                <Grid.Column>
                                     <Header as = "h2" style={{color:'grey'}}>{data.first_name+" "+data.last_name}</Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>        
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <Grid>
                                

                                <Grid.Row>
                                    <Grid.Column>
                                    <List divided >
                                        <List.Item onClick={() => goTopage('profile')} style={{display:'flex'}}>
                                            {/* <List.Icon name='user outline' size='large' verticalAlign='middle' color="grey"/>
                                            <List.Content>
                                                <List.Header as="h3" style={{fontWeight:'normal',color:'grey'}}>Account</List.Header>
                                            </List.Content> */}
                                            <CustomIcon icon = "user" size={20} color="grey"></CustomIcon>
                                            <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t('Account')}</Header>
                                        </List.Item>

                                        <List.Item onClick={() => goTopage('saved')} style={{display:'flex'}}>
                                            <CustomIcon icon = "favorite-heart-outline-button" size={20} color="grey"></CustomIcon>
                                            <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t('Favorites')}</Header>
                                        </List.Item>

                                      


                                        <List.Item onClick={() => goTopage('tell-a-friend')} style={{display:'flex'}}>
                                            <CustomIcon icon = "share" size={20} color="grey"></CustomIcon>
                                            <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t("Tell a Friend")}</Header>
                                        </List.Item>

                                        {
                                            data.userType !== 'NORMAL' ? 
                                            <List.Item onClick={() => goTopage('insurance-categories')} style={{display:'flex'}}>
                                                <CustomIcon icon = "plus" size={20} color="grey"></CustomIcon>
                                                <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t("Insurance Categories")}</Header>
                                            </List.Item> : null
                                        }

                                        {
                                            data.userType !== 'NORMAL' ? 
                                            <List.Item onClick={() => goTopage('preferences')} style={{display:'flex'}}>
                                                <CustomIcon icon = "plus" size={20} color="grey"></CustomIcon>
                                                <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t('Preferences')}</Header>
                                            </List.Item> : null
                                        }

                                        {/* {
                                            data.userType !== 'NORMAL' ? 
                                            <List.Item onClick={() => goTopage('garage')} style={{display:'flex'}}>
                                                <CustomIcon icon = "indoor-parking" size={20} color="grey"></CustomIcon>
                                                <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t('Garage')}</Header>
                                            </List.Item> : null
                                        } */}

                                        {/* {
                                            data.userType !== 'NORMAL' ? 
                                            <List.Item onClick={() => goTopage('host-activity')} style={{display:'flex'}}>
                                                <CustomIcon icon = "inbox" size={20} color="grey"></CustomIcon>
                                                <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:'grey',fontWeight:'normal'}}>{t('Host Activity')}</Header>
                                            </List.Item> : null
                                        } */}
                                        

                                        {/* <List.Item onClick={() => goTopage('contact-us')}>
                                            <List.Icon name='comments outline' size='large' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as="h3" style={{fontWeight:'normal'}}>Contact Us</List.Header>
                                            </List.Content>
                                        </List.Item> */}

                                        {/* <List.Item onClick={() => goTopage('about')}>
                                            <List.Icon name='info circle' size='large' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as="h3" style={{fontWeight:'normal'}}>About</List.Header>
                                            </List.Content>
                                        </List.Item> */}

                                        {/* <List.Item onClick={() => goTopage('how-it-works')}>
                                            <List.Icon name='github' size='large' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as="h3" style={{fontWeight:'normal'}}>How it Works</List.Header>
                                            </List.Content>
                                        </List.Item> */}

                                        <List.Item onClick={() => goTopage('logout')} style={{display:'flex'}}>
                                            <CustomIcon icon = "enter" size={20} color="grey"></CustomIcon>
                                            <Header as="h3" style={{flex:1,paddingLeft:10,paddingRight:10,color:"grey",fontWeight:'normal'}}>{t('Logout')}</Header>
                                        </List.Item>
                                        
   
                                    </List>
                                        
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>  

                    
                </Modal>     

            </TransitionablePortal>
            
        </>
    )
}


type ProfileModalComponentType = {
    visible : boolean,
    closeModal : () => void
}

