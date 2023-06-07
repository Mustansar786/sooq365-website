import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserToken } from "utils/lib";
const authRoute = (Component: any) => {
  const Authentication = (props: any) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const checkToken = async () => {
        const token = await getUserToken();
        if (token && props.authenticate) {
          setAuthenticated(true);
        } else {
          router.push('/')
          setAuthenticated(false);
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
  Authentication.displayName = 'Authentication';
  return Authentication;
};
export default authRoute;