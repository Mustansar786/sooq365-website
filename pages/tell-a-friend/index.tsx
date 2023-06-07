import AuthLayout from 'Layouts/AuthLayout'
import GeneralLayout from 'Layouts/GeneralLayout'
import { InviteFriend } from 'components';
export default function TellAFriend(){
    return(
        <AuthLayout authenticate={true}>
            <GeneralLayout title={"Tell A Friend"} description='Tell A Friend'>
                <InviteFriend></InviteFriend>
            </GeneralLayout>
        </AuthLayout>
    )
}