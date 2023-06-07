
import { WithAuth } from 'components';
function AuthLayout({ children }: any) {
    return children
}

export default WithAuth(AuthLayout);
