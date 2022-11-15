

import CreateClientFormContainer from "../../src/clients/CreateClientFormContainer";
import ResponsiveAppBar from "../../src/components/AppBar";
import AuthGuard from "../../src/user/AuthGaurd";


const CreateClientPage = () => {


    return (<AuthGuard> <ResponsiveAppBar /><CreateClientFormContainer /></AuthGuard>)


}

export default CreateClientPage 