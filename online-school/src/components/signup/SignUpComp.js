import React, { useState } from 'react';
import axiosInstance from '../Helpers/axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const [pwdMatch, setPwdMatch]=useState(true)
	const history = useHistory();
	const initialFormData = Object.freeze({
		first_name:'',
		last_name:'',
		username:'',
		email:'',
		password:'',
		confirm_password:'',
		phone_number:'',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		var data={
			user:{
				email: formData.email,
				first_name:formData.first_name,
				last_name:formData.last_name,
				username:formData.username,
				email:formData.email,
				password:formData.password,
				confirm_password:formData.confirm_password,
			},
			phone_number:formData.phone_number,
			groups: []
		}
		formData.password === formData.confirm_password? 
		axiosInstance
			.post(`register/`, data)
			.then((res) => {
				history.push('/login');
				console.log('res ', res);
				console.log('res.data ', res.data);
			})
			:
			(setPwdMatch(false))
	};

	const classes = useStyles();

	return (
		<div className="container pb-4">
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}></Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form onSubmit={handleSubmit} className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="first_name"
									label="First name"
									name="first_name"
									autoComplete="first_name"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="last_name"
									label="Last name"
									name="last_name"
									autoComplete="last_name"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phone_number"
									label="Phone number"
									name="phone_number"
									autoComplete="phone_number"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirm_password"
									label="Confirm password"
									type="password"
									id="confirm_password"
									autoComplete="current-password"
									onChange={handleChange}
								/>
								{!pwdMatch && <p className="text-danger">Passwords don't match</p>}
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
}
