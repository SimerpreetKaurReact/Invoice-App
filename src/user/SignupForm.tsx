import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, TextField, Typography, Link, Grid, OutlinedInput, InputAdornment, IconButton, FormHelperText, InputLabel } from "@mui/material";
import { Box, display } from "@mui/system";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import classes from "./login.module.css"
import CircularProgress from '@mui/material/CircularProgress';


const SignupSchema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().min(5).max(16).required(),
    confirmPassword: yup.string().min(5).max(16).oneOf([yup.ref('password'), null], 'Passwords must match').required(),
}).required();

type SignupValues = yup.InferType<typeof SignupSchema>
interface SignupFormProps {
    onSignupRequest: (data: SignupValues) => React.ReactElement
    disabled?: boolean
    error?: string
}
const SignupForm = (props: SignupFormProps) => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupValues>({ resolver: yupResolver(SignupSchema) });
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword,
        );
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(showPassword => !showPassword,
        );
    };

    return (
        <Box m={2}>
            <Grid container spacing={2} sx={{ height: "100vh" }}>
                <Grid item sm={12} md={6} >


                    <div className={classes.leftScreen}>


                    </div>
                </Grid>
                <Grid item sm={12} md={6} mt={4} justifyContent="center"
                >
                    {/* isSubmitting--{isSubmitting.toString()} */}
                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <Typography variant="h3" align="center" >
                        Invoice managment

                    </Typography>
                    <Typography variant="h5" className={classes.title} align="center" >
                        SignUp to invoicer

                    </Typography>
                    {props.error && <FormHelperText data-test='form-error'>{props.error}</FormHelperText>}
                    <form onSubmit={handleSubmit(props.onSignupRequest)} style={{
                        padding: 10,
                        display: "flex",
                        flexFlow: 'column',
                        gap: "20px"
                    }}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput defaultValue="" {...register("email")}
                            error={!!errors.email} data-test="email"
                            style={{ width: "100%", background: "#ffddbb78" }}
                        />
                        {errors.email?.message && <FormHelperText data-test="email-error" id="email">{errors.email?.message}</FormHelperText>}
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <OutlinedInput defaultValue="" {...register("firstName")}
                            error={!!errors.firstName}
                            data-test="name"
                            style={{ width: "100%", background: "#ffddbb78" }}
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.firstName?.message && <FormHelperText id="firstName" data-test="name-error">{errors.firstName?.message}</FormHelperText>}

                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <OutlinedInput defaultValue="" {...register("lastName")}
                            error={!!errors.lastName}
                            style={{ width: "100%", background: "#ffddbb78" }}
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.lastName?.message && <FormHelperText id="lastName">{errors.lastName?.message}</FormHelperText>}


                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput {...register("password", { required: true })}
                            id="password"
                            error={!!errors.password}
                            style={{ width: "100%", background: "#ffddbb78" }}
                            data-test="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}

                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {errors.password?.message && <FormHelperText id="password"
                            data-test="password-error"
                        >{errors.password?.message}</FormHelperText>}
                        {/* errors will return when field validation fails  */}
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput {...register("confirmPassword", { required: true })}
                            id="confirmPassword"
                            style={{ width: "100%", background: "#ffddbb78" }}
                            data-test="confirm-password"
                            error={!!errors.confirmPassword}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}

                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {errors.confirmPassword?.message && <FormHelperText data-test="confirm-password-error" id="confirmPassword">{errors.confirmPassword?.message}</FormHelperText>}
                        {/* errors will return when field validation fails  */}

                        <Button variant="contained" type="submit" data-test="submit-sign-up" disabled={props.disabled}
                            style={{ background: "#ef9334" }}
                        >
                            {props.disabled ? <CircularProgress /> : "submit"}
                        </Button>
                    </form>

                    <Typography style={{ fontSize: "1.2rem", color: "darkslategray" }} align="center">
                        Already signed Up?
                        <Link href="/login" underline="none">
                            {"Log In"}
                        </Link>
                    </Typography>

                </Grid >
            </Grid >
        </Box>
    )

}

export default SignupForm
