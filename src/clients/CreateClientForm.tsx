import classes from "../user/login.module.css"

import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, TextField, Typography, Link, Grid, OutlinedInput, InputAdornment, IconButton, FormHelperText, InputLabel } from "@mui/material";
import { Box, display } from "@mui/system";
import { Visibility, VisibilityOff } from '@mui/icons-material';


const CreateClientSchema = yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    companyName: yup.string().required(),
    companyAddress: yup.string().required(),
    registryNumber: yup.string().required(),
    IBAN: yup.string().required(),
    SWIFT: yup.string().required(),
    VAT: yup.string().required(),

}).required();

export interface CreateClient {

    name: string;
    email: string;
    companyDetails: {
        name: string;
        vatNumber: string
        regNumber: string
        address: string
        iban: string;
        swift: string;
    }

}
type CreateClientValues = yup.InferType<typeof CreateClientSchema>
interface CreateClientFormProps {
    onCreateClientRequest: (data: CreateClientValues) => Promise<void>
    disabled?: boolean
    error?: string
    defaultDetails: CreateClient
}
const CreateClientForm = (props: CreateClientFormProps) => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CreateClientValues>({ resolver: yupResolver(CreateClientSchema) });



    return (
        <Box m={2}>
            <Grid container spacing={2} sx={{ height: "100vh" }} >
                <Grid item sm={12} md={6} >
                    <div className={classes.leftScreen}>


                    </div>

                </Grid>
                <Grid item sm={6} md={6} mt={4} justifyContent="center" >
                    <Typography variant="h5" align="center">
                        Create Client
                    </Typography>

                    {/* isSubmitting--{isSubmitting.toString()} */}
                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

                    {props.error && <FormHelperText data-test='form-error'>{props.error}</FormHelperText>}
                    <form onSubmit={handleSubmit(props.onCreateClientRequest)} style={{
                        padding: 10,
                        display: "flex",
                        flexFlow: 'column',
                        gap: "20px"
                    }}>
                        <InputLabel htmlFor="client-name">Name</InputLabel>
                        <OutlinedInput id="client-name" defaultValue={props.defaultDetails.name} {...register("name")}
                            error={!!errors.name} data-test="client-name"
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.name?.message && <FormHelperText data-test="client-name-error">{errors.name?.message}</FormHelperText>}

                        <InputLabel htmlFor="client-email">Email</InputLabel>
                        <OutlinedInput id="client-email" defaultValue={props.defaultDetails?.email}  {...register("email")}
                            error={!!errors.email} data-test="client-email"
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.email?.message && <FormHelperText data-test="client-email-error">{errors.email?.message}</FormHelperText>}

                        {/* register your input into the hook by invoking the "register" function */}
                        <InputLabel htmlFor="client-company-name">Company Name</InputLabel>
                        <OutlinedInput id="client-company-name" defaultValue={props.defaultDetails.companyDetails.name}  {...register("companyName")}
                            error={!!errors.companyName} data-test="client-company-name"
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.companyName?.message && <FormHelperText data-test="client-company-name-error">{errors.companyName?.message}</FormHelperText>}


                        <InputLabel htmlFor="client-company-address">Company address</InputLabel>
                        <OutlinedInput {...register("companyAddress", { required: true })}
                            id="client-company-address"
                            defaultValue={props.defaultDetails.companyDetails.address}
                            data-test="client-company-address"
                            error={!!errors.companyAddress}
                        />
                        {errors.companyAddress?.message && <FormHelperText data-test="client-company-address-error" id="client-address-error">{errors.companyAddress?.message}</FormHelperText>}
                        {/* errors will return when field validation fails  */}
                        <InputLabel htmlFor="client-company-reg"> Registration Number</InputLabel>
                        <OutlinedInput {...register("registryNumber", { required: true })}
                            id="client-company-reg"
                            data-test='client-company-reg'
                            defaultValue={props.defaultDetails.companyDetails.regNumber}
                            error={!!errors.registryNumber}
                        />
                        {errors.registryNumber?.message && <FormHelperText
                            data-test='client-company-reg'
                            id="client-company-reg-error">{errors.registryNumber?.message}</FormHelperText>}



                        <InputLabel htmlFor="client-company-iban"> IBAN</InputLabel>
                        <OutlinedInput {...register("IBAN", { required: true })}
                            id="client-company-iban"
                            data-test="client-company-iban"
                            error={!!errors.IBAN}
                            defaultValue={props.defaultDetails.companyDetails.iban}

                        />
                        {errors.IBAN?.message &&
                            <FormHelperText
                                data-test='client-company-iban-error'
                                id="cclient-company-iban-error"
                            >
                                {errors.IBAN?.message}
                            </FormHelperText>}


                        <InputLabel htmlFor="client-company-swift"> SWIFT</InputLabel>
                        <OutlinedInput {...register("SWIFT", { required: true })}
                            id="client-company-swift"
                            data-test='client-company-swift'
                            error={!!errors.SWIFT}
                            defaultValue={props.defaultDetails.companyDetails.swift}

                        />
                        {errors.SWIFT?.message && <FormHelperText data-test='client-company-swift-error'
                            id="client-company-swift-error">{errors.SWIFT?.message}</FormHelperText>}


                        <InputLabel htmlFor="client-company-vat">VAT number</InputLabel>
                        <OutlinedInput {...register("VAT", { required: true })}
                            id="client-company-vat"
                            data-test='client-company-vat'
                            error={!!errors.VAT}
                            defaultValue={props.defaultDetails.companyDetails.vatNumber}

                        />
                        {errors.VAT?.message &&
                            <FormHelperText
                                data-test='client-company-vat-error'
                                id="client-company-vat-error"
                            >
                                {errors.VAT?.message}
                            </FormHelperText>}

                        <Button data-test="submit-client" variant="contained" type="submit" disabled={props.disabled}>{props.disabled ? "loading" : "submit"}</Button>
                    </form>

                </Grid >
            </Grid >
        </Box>
    )

}



export default CreateClientForm
