import SignupFormContainer from "../src/user/SignupFormContainer";
import { useAuthContext, UserAuthState } from "../src/user/AuthContext";
import { useRouter } from "next/router";
import NonAuthGuard from "../src/user/NonAuthGaurd";

const SignUpPage = () => {
  const { authState } = useAuthContext();
  const router = useRouter();

  return (
    <NonAuthGuard>
      {authState}
      <SignupFormContainer />
    </NonAuthGuard>
  );
};

export default SignUpPage;
