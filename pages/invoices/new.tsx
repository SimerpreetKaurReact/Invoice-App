

import ResponsiveAppBar from "../../src/components/AppBar";
import CreateInvoiceFormContainer from "../../src/invoice/CreateInvoiceFormContainer";
import AuthGuard from "../../src/user/AuthGaurd";


const CreateInvoicePage = () => {


    return (<AuthGuard> <ResponsiveAppBar /><CreateInvoiceFormContainer /></AuthGuard>)


}

export default CreateInvoicePage 