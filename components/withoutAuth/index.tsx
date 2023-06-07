import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserToken } from "utils/lib";
const withoutAuthRoute = (Component: any) => {
    const Authentication = (props: any) => {
        const router = useRouter();
        const [authenticated, setAuthenticated] = useState(false);

        useEffect(() => {
            const checkToken = async () => {
                const token = await getUserToken();
                if (token) {
                    router.push('/')
                } else {
                    setAuthenticated(true);
                }
            }
            checkToken();
        }, []);
        if (authenticated) {
            return <Component {...props} />;
        } else {
            return null
        }
    }
    Authentication.displayName = 'WithoutAuthentication';
    return Authentication;
};
export default withoutAuthRoute;