import classes from "./login.module.css"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, TextField, Typography, Link, Grid, OutlinedInput, InputAdornment, IconButton, FormHelperText, InputLabel } from "@mui/material";
import { Box, display } from "@mui/system";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';



const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(16).required(),
}).required();

type LoginValues = yup.InferType<typeof loginSchema>
interface LoginFormProps {
    onLoginRequest: (data: LoginValues) => Promise<void>
    disabled?: boolean
    error?: string
}
const LoginForm = (props: LoginFormProps) => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: yupResolver(loginSchema) });
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword,
        );
    };

    return (
        <Box m={2}  >
            <Grid container spacing={2} sx={{ height: "100vh" }}>
                <Grid item sm={12} md={6}>

                    <div className={classes.leftScreen}>


                    </div>
                </Grid>
                <Grid item sm={12} md={6} mt={4} justifyContent="center" >
                    {/* isSubmitting--{isSubmitting.toString()} */}
                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <Typography variant="h3" align="center" >
                        Invoice managment

                    </Typography>
                    <Typography variant="h5" className={classes.title} align="center" >
                        Login to invoicer

                    </Typography>
                    {props.error && <FormHelperText data-test='form-error'>{props.error}</FormHelperText>}
                    <form onSubmit={handleSubmit(props.onLoginRequest)} style={{
                        padding: 10,
                        display: "flex",
                        flexFlow: 'column',
                        gap: "20px"
                    }}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput defaultValue="" {...register("email")}
                            error={!!errors.email}
                            data-test="email"
                            style={{ width: "100%", background: "#ffddbb78" }}
                        />
                        {/* include validation with required or other standðrd HTML validation rules */}
                        {errors.email?.message && <FormHelperText id="email" data-test="email-error">{errors.email?.message}</FormHelperText>}
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput {...register("password", { required: true })}
                            id="password"
                            data-test="password"
                            error={!!errors.password}
                            type={showPassword ? 'text' : 'password'}
                            style={{ width: "100%", background: "#ffddbb78" }}
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
                        {errors.password?.message && <FormHelperText id="password" data-test="password-error">{errors.password?.message}</FormHelperText>}
                        {/* errors will return when field validation fails  */}


                        <Button variant="contained"
                            data-test='submit-login'
                            type="submit"
                            style={{ background: "#ef9334" }}
                            disabled={props.disabled}>
                            {props.disabled ? <CircularProgress /> : "submit"}
                        </Button>
                    </form>

                    <Typography style={{ fontSize: "1.2rem", color: "darkslategray" }} align="center">
                        New to Invoicer?
                        <Link href="/signup" underline="none">
                            {"Sign up"}
                        </Link>
                    </Typography>

                </Grid >
            </Grid >
        </Box>
    )

}

export default LoginForm
//add enque snackbars for login success
