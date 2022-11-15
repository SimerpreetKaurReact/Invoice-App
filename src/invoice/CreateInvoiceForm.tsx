import classes from "../user/login.module.css"
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect, useMemo } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, TextField, Typography, Link, Grid, OutlinedInput, InputAdornment, IconButton, FormHelperText, InputLabel } from "@mui/material";
import { Box, display } from "@mui/system";
import { PropaneSharp, Visibility, VisibilityOff } from '@mui/icons-material';
import { Add, Delete } from "@mui/icons-material";
import { Client } from "../api/base"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function parseDateString(value, originalValue) {
    console.log(value, originalValue, originalValue.ts)
    const parsedDate = originalValue.ts

    return parsedDate;
}
const CreateInvoiceSchema = yup.object({
    date: yup.number().transform(parseDateString).required(),
    dueDate: yup.number().transform(parseDateString).required(),
    invoiceNumber: yup.string().min(3).required(),
    projectCode: yup.string().min(3),
    items: yup.array().of(yup.object().shape({
        price: yup.number().positive().required(),
        description: yup.string().min(3).required(),
    })),
    client: yup.string().required(),


}).required();

export interface CreateInvoice {

    invoiceNumber: string;
    client: string;
    date: Date;
    dueDate: Date;
    projectCode: string;
    items: {
        price: number;
        description: string;
    }[];
    id: string | undefined


}
type CreateInvoiceValues = yup.InferType<typeof CreateInvoiceSchema>
interface CreateInvoiceFormProps {
    onCreateinvoiceRequest: (data: CreateInvoiceValues) => Promise<void>
    disabled?: boolean
    error?: string
    success?: boolean
    disableItems?: boolean
    defaultDetails: CreateInvoice
    selectBoxDetails: Client[]
    type?: string
}
const CreateInvoiceForm = (props: CreateInvoiceFormProps) => {

    const { register, control, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<CreateInvoice>({
        resolver: yupResolver(CreateInvoiceSchema), defaultValues: useMemo(() => {
            return props.defaultDetails;
        }, [props])
    });
    // useEffect(() => {
    //     reset(props.defaultDetails);
    // }, [props.defaultDetails]);
    const { fields, append, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "items", // unique name for your Field Array
    });



    return (
        <Box m={2}>
            <Grid container spacing={2} sx={{ height: "100vh" }} >
                <Grid item sm={12} md={6} >
                    <div className={classes.leftScreen}>


                    </div>

                </Grid>
                <Grid item sm={6} md={6} mt={4} justifyContent="center" >
                    <Typography variant="h5" align="center">
                        {props.type ? props.type : "Create"} Invoice
                    </Typography>

                    {/* isSubmitting--{isSubmitting.toString()} */}
                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

                    {props.error && <FormHelperText data-test='form-error'>{props.error}</FormHelperText>}
                    <form onSubmit={handleSubmit(props.onCreateinvoiceRequest)} style={{
                        padding: 10,
                        display: "flex",
                        flexFlow: 'column',
                        gap: "20px"
                    }}>
                        <InputLabel htmlFor="invoice-date">Date</InputLabel>
                        <Controller
                            name={"date"}
                            // defaultValue={props.defaultDetails?.date || Date.now()}
                            control={control}

                            render={({ field }) =>

                                <DateTimePicker
                                    inputProps={{
                                        readOnly: props.disableItems ? true : false
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}

                                        />}
                                    {...field}
                                />

                            }
                        />

                        {/* <DateTimePicker
                            id="invoice-date"


                            mask=""

                            data-test="invoice-date"
                            renderInput={(params) => <TextField {...params}   {...register("date")} error={!!errors.date} defaultValue={props.defaultDetails?.date || Date.now()} />}
                        /> */}

                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.date?.message && <FormHelperText data-test="invoice-date-error">{errors.date?.message}</FormHelperText>}

                        <InputLabel htmlFor="invoice-due-date">Due Date</InputLabel>
                        <Controller
                            name={"dueDate"}
                            // defaultValue={props.defaultDetails?.date || Date.now()}
                            control={control}
                            render={({ field }) =>

                                <DateTimePicker
                                    // disabled={props.disableItems ? true : false}
                                    inputProps={{
                                        readOnly: props.disableItems ? true : false
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}

                                        />}
                                    {...field}
                                />

                            }
                        />
                        {/* <DateTimePicker
                            id="invoice-due-date"

                            {...register("dueDate")}
                            mask=""

                            data-test="invoice-due-date"
                            renderInput={(params) => <TextField {...params} error={!!errors.date} defaultValue={props.defaultDetails.dueDate} />}
                        /> */}

                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.dueDate?.message && <FormHelperText data-test="invoice-due-date-error">{errors.dueDate?.message}</FormHelperText>}

                        {/* register your input into the hook by invoking the "register" function */}
                        <InputLabel htmlFor="invoice-number">Invoice Number</InputLabel>
                        <OutlinedInput id="invoice-number"  {...register("invoiceNumber")}
                            // disabled={props.disableItems ? true : false}
                            inputProps={{
                                readOnly: props.disableItems ? true : false
                            }}
                            error={!!errors.invoiceNumber} data-test="invoice-number"
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.invoiceNumber?.message &&
                            <FormHelperText data-test="invoice-number-error">{errors.invoiceNumber?.message}</FormHelperText>}


                        <InputLabel htmlFor="invoice-project-code">Project Code</InputLabel>
                        <OutlinedInput {...register("projectCode", { required: true })}
                            inputProps={{
                                readOnly: props.disableItems ? true : false
                            }}
                            id="invoice-project-code"

                            data-test="invoice-project-code"
                            error={!!errors.projectCode}
                        />
                        {errors.projectCode?.message &&
                            <FormHelperText data-test="invoice-project-code-error" id="invoice-address-error">{errors.projectCode?.message}</FormHelperText>}
                        <IconButton
                            disabled={props.disableItems ? true : false}
                            onClick={() => append({
                                description: "",
                                price: 0,
                            })}
                        >
                            Add Item   <Add />
                        </IconButton>
                        {fields.map((field, index) => (
                            <div key={field.id}
                                data-test={`invoice-item-${index}`}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "25rem",
                                }}
                            >
                                <div>
                                    <InputLabel htmlFor="invoice-item-value">Price</InputLabel>
                                    <OutlinedInput {...register(`items.${index}.price` as const, { required: true })}
                                        id="invoice-item-value"
                                        inputProps={{
                                            readOnly: props.disableItems ? true : false
                                        }}
                                        data-test="invoice-item-value"
                                        error={!!errors.projectCode}
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="invoice-item-description">Description</InputLabel>
                                    <OutlinedInput {...register(`items.${index}.description` as const, { required: true })}
                                        id="invoice-item-description"
                                        inputProps={{
                                            readOnly: props.disableItems ? true : false
                                        }}
                                        data-test="invoice-item-description"
                                        error={!!errors.projectCode}
                                    />

                                </div>
                                <IconButton
                                    onClick={() => remove(index)}
                                >
                                    <Delete />
                                </IconButton>
                            </div>

                        ))}

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            // disabled={props.disableItems ? true : false}
                            readOnly
                            defaultValue={props.defaultDetails.client.length > 0 ? props.selectBoxDetails[Number(props.defaultDetails.client)] : null}
                            options={props.selectBoxDetails}
                            getOptionLabel={(option) => option.name}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Client" {...register("client")} />}
                        />

                        <Button data-test="submit-invoice" variant="contained" type="submit" disabled={props.disabled}>{props.disabled ? "loading" : props.type === "View" ? "Print Page" : "submit"}</Button>
                    </form>

                </Grid >
            </Grid >
        </Box >
    )

}



export default CreateInvoiceForm
