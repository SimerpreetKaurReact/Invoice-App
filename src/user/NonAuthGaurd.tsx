import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext, UserAuthState } from "./AuthContext";

const NonAuthGuard = (props: { children: React.ReactNode }) => {
  const { authState } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authState === UserAuthState.AUTH) {
      router.push("/");
    }
  }, [authState]);
  if (
    authState === UserAuthState.UNDECIDED ||
    authState === UserAuthState.AUTH
  ) {
    return null;
  }
  return (
    <>
      {authState}
      {props.children}
    </>
  );
};

export default NonAuthGuard;

//add one error boundary on every page
