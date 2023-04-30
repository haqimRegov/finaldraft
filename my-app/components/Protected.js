import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../config/Context";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user.uid) {
      router.push("/session");
    }
  }, [router, user]);
  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;