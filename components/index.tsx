import SEO from './SEO';
import PriceRange from './price-range';
import ReactSelect from './react-select';
import ReactCarousel from './React-Carousel';
import ReactFancy from './ReactFancy';
import Footer from './Footer';
import ReactToast from './ReactToast';
import ReactPhone from './ReactPhone';
import ReactCheckBox from './React-Checkbox';
import ReactOTP from './ReactOTP';
import WithAuth from './withAuth';
import ProfileInfo from './ProfileInfo';
import ProfileAccount from './ProfileAccount';
import InviteFriend from './inviteFriend';
import SocialButton from './SocialButton';
import ReactMap from './ReactMap';
import GMap from './ReactMap/googlemap';
import Sidebar from './sidebar';
import ProfileModal from './ProfileModal';

import AlertModal from './Modals/AlertModal';
import ReactLoader from './ReactLoader';
import CancelRenterBookingModal from './Modals/CancelRenterBookingModal';
import CancelHostBookingModal from './Modals/CancelHostBookingModal';
import WithoutAuthRoute from './withoutAuth';
import NotificationModal from './NotificationModal';
import SmartAppBanner from './smart-app-banner'
import dynamic from 'next/dynamic';
import CheckAvailabilityModal from './Modals/CheckAvailabilityModal';
import CheckEuropcarAvailabilityModal from './Modals/CheckEuropcarAvailabilityModal';
import Steps from './steps';
import ReactMultiSelect from './ReactMultiSelect'
import UTab from './Tab';


const ReactTimeSlider: any = dynamic(() => import('react-dynamic-time-slider'), {
    ssr: false
})
export {
    SEO,
    Steps,
    PriceRange,
    ReactSelect,
    ReactCarousel,
    ReactFancy,
    Footer,
    ReactToast,
    ReactPhone,
    ReactCheckBox,
    ReactOTP,
    WithAuth,
    ProfileInfo,
    ProfileAccount,
    InviteFriend,
    SocialButton,
    ReactMap,
    Sidebar,
    AlertModal,
    ReactLoader,
    CancelRenterBookingModal,
    CancelHostBookingModal,
    GMap,
    ProfileModal,
    WithoutAuthRoute,
    NotificationModal,
    SmartAppBanner,
    ReactTimeSlider,
    CheckAvailabilityModal,
    CheckEuropcarAvailabilityModal,
    ReactMultiSelect,
    UTab,
}