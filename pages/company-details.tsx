import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CompanyDetailsFormContainer from "../src/company/CompanyDetailsFormContainer";
import { useAuthContext, UserAuthState } from "../src/user/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NonAuthGuard from "../src/user/NonAuthGaurd";
import AuthGuard from "../src/user/AuthGaurd";


const CompanyDetailsPage = () => {


    return (<AuthGuard><CompanyDetailsFormContainer /></AuthGuard>)


}

export default CompanyDetailsPage 