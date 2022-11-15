import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LoginFormContainer from "../src/user/LoginFormContainer";
import { useAuthContext, UserAuthState } from "../src/user/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NonAuthGuard from "../src/user/NonAuthGaurd";


const LoginPage = () => {


    return (<NonAuthGuard><LoginFormContainer /></NonAuthGuard>)


}

export default LoginPage 