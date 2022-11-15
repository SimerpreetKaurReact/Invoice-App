import classes from "../user/login.module.css"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, TextField, Typography, Link, Grid, OutlinedInput, InputAdornment, IconButton, FormHelperText, InputLabel } from "@mui/material";
import { Box, display } from "@mui/system";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useCompanyAuthContext } from "./CompanyDetailsAuth";

const CompanySchema = yup.object({
    name: yup.string().min(3).max(16).required(),
    address: yup.string().required(),
    vatNumber: yup.string().required(),
    regNumber: yup.string().required(),
    iban: yup.string(),
    swift: yup.string()
}).required();

type CompanyValues = yup.InferType<typeof CompanySchema>
interface CompanyFormProps {
    onCompanyRequest: (data: CompanyValues) => Promise<void>
    disabled?: boolean
    error?: string
}
const CompanyForm = (props: CompanyFormProps) => {
    const { companyDetails, persistCompanyDetails } = useCompanyAuthContext()
    console.log(companyDetails)
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CompanyValues>({ resolver: yupResolver(CompanySchema), defaultValues: companyDetails });


    return (
        <Box m={2}>
            <Grid container spacing={2} sx={{ height: "100vh" }} >
                <Grid item sm={12} md={6} >
                    <div className={classes.leftScreen}>
                    </div>
                </Grid>
                <Grid item sm={6} md={6} mt={4} justifyContent="center" >
                    <Typography variant="h5" align="center">
                        Lets get started
                    </Typography>
                    <Typography variant="h5" className={classes.title} align="center">
                        first we need some information
                    </Typography>
                    {/* isSubmitting--{isSubmitting.toString()} */}
                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

                    {props.error && <FormHelperText data-test='company-form-error'>{props.error}</FormHelperText>}
                    <form onSubmit={handleSubmit(props.onCompanyRequest)} style={{
                        padding: 10,
                        display: "flex",
                        flexFlow: 'column',
                        gap: "20px"
                    }}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <InputLabel htmlFor="company-name">Company Name</InputLabel>
                        <OutlinedInput id="company-name" defaultValue="" {...register("name")}
                            error={!!errors.name} data-test="company-name"
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.name?.message && <FormHelperText data-test="company-name-error">{errors.name?.message}</FormHelperText>}


                        <InputLabel htmlFor="company-address">Company address</InputLabel>
                        <OutlinedInput {...register("address", { required: true })}
                            id="company-address"
                            data-test="company-address"
                            error={!!errors.address}
                        />
                        {errors.address?.message && <FormHelperText data-test="company-address-error" id="company-address-error">{errors.address?.message}</FormHelperText>}
                        {/* errors will return when field validation fails  */}

                        <InputLabel htmlFor="company-vat">VAT</InputLabel>
                        <OutlinedInput {...register("vatNumber", { required: true })}
                            id="company-vat"
                            data-test="company-vat"
                            error={!!errors.vatNumber}
                        />
                        {errors.vatNumber?.message && <FormHelperText
                            data-test="company-vat-error"
                            id="company-vat-error">{errors.vatNumber?.message}</FormHelperText>}


                        <InputLabel htmlFor="company-reg-number">Company Registration Number</InputLabel>
                        <OutlinedInput {...register("regNumber", { required: true })}
                            id="company-reg-number"
                            data-test='company-reg-number'
                            error={!!errors.regNumber}
                        />
                        {errors.regNumber?.message && <FormHelperText
                            data-test='company-reg-error'
                            id="company-reg-error">{errors.regNumber?.message}</FormHelperText>}


                        <InputLabel htmlFor="company-iban">Company IBAN</InputLabel>
                        <OutlinedInput {...register("iban", { required: true })}
                            id="company-iban"
                            data-test='company-iban'
                            error={!!errors.iban}
                        />
                        {errors.iban?.message &&
                            <FormHelperText
                                data-test='company-iban-error'
                                id="company-iban-error"
                            >
                                {errors.iban?.message}
                            </FormHelperText>}


                        <InputLabel htmlFor="company-swift">Company SWIFT</InputLabel>
                        <OutlinedInput {...register("swift", { required: true })}
                            id="company-swift"
                            data-test='company-swift'
                            error={!!errors.swift}
                        />
                        {errors.swift?.message && <FormHelperText data-test='company-swift-error'
                            id="company-swift-error">{errors.swift?.message}</FormHelperText>}

                        <Button variant="contained" type="submit" disabled={props.disabled}>{props.disabled ? "loading" : "submit"}</Button>
                    </form>

                </Grid >
            </Grid >
        </Box>
    )

}

export default CompanyForm


//todo
//create seperate UI folder with styled button component, text field component