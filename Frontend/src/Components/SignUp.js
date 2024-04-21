import React, { useState } from "react";
import "./Sign_Up.css";
import images from "../images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    });

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const handle_submit = async (event) => {
        event.preventDefault();
        let formIsValid = true;

        // Validating First Name
        if (!values.firstname) {
            setErrors(prevState => ({ ...prevState, firstname: 'Please Enter First name' }));
            formIsValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, firstname: '' }));
        }

        // Validating Last Name
        if (!values.lastname) {
            setErrors(prevState => ({ ...prevState, lastname: 'Please Enter Last Name' }));
            formIsValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, lastname: '' }));
        }

        // Validating Email
        if (!/\S+@\S+\.\S+/.test(values.email)) {
            setErrors(prevState => ({ ...prevState, email: 'Please enter a valid email address' }));
            formIsValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, email: '' }));
        }

        // Validating Username
        if (!values.username) {
            setErrors(prevState => ({ ...prevState, username: 'Please Enter Username' }));
            formIsValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, username: '' }));
        }

        // Validating Password and Confirm Password
        if (!values.password) {
            setErrors(prevState => ({ ...prevState, password: 'Please Enter Password' }));
            formIsValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, password: '' }));
        }

        if (!values.confirmpassword) {
            setErrors(prevState => ({ ...prevState, confirmpassword: 'Please Confirm Password' }));
            formIsValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, confirmpassword: '' }));
        }

        if (values.password !== values.confirmpassword) {
            setPasswordMatchError('Passwords do not match');
            formIsValid = false;
        }

        if (formIsValid) {
            try {
                const response = await axios.post('http://localhost:8081/signup', values);
                console.log('Response:', response.data);
                if (response.data.status === "Success") {
                    // Redirect to the home page or another appropriate page
                    navigate("/login");
                }
                // Redirect to a success page or perform any other actions
            } catch (error) {
                if (error.response.data.error) {
                    setErrors(prevState => ({ ...prevState, global: error.response.data.error }));
                } else {
                    setErrors(prevState => ({ ...prevState, global: 'An unexpected error occurred. Please try again.' }));
                }
            }
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    return (
        <div className="bg-[#edebf5] h-[1000px] ">
        <form onSubmit={handle_submit} className="flex px-20 py-10">
            <div className="section-A">
                <div className="w-[100%]">
                    <img src={images} alt="" className="h-[600px] w-[100%]"/>
                </div>
                
            </div>
            <div className="w-[50%] bg-white px-10 pb-10">

                <div className="mt-7 flex justify-end mr-2 ">
                    <Link to="/login" className="btn px-6 py-4 rounded-md">SIGN IN</Link>
                </div>

                

                <div className=" px-16">
                <div className="mt-5 mb-4 text-[#0000ff]">
                    <h1>Explore & Experience</h1>
                    <p>Get onto your most comfortable journey yet. All the way up.</p>
                </div>
                <div className="Name flex gap-10">
                    <div className="w-[50%]">
                    <input className="F border py-2 px-5 w-full" name="firstname" placeholder="First Name" onChange={handleInputChange} />
                    {errors.firstname && <h1 style={{ color: 'red' }} className="">{errors.firstname}</h1>}
                    </div>

                    <div className="w-[50%]">
                    <input className="L border py-2 px-5 w-full" name="lastname" placeholder="Last Name" onChange={handleInputChange} />
                    {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}
                    </div>
                </div>
               

                <div className="">
                    <input className="border py-2 px-5 w-full mt-4" name="email" placeholder="Email" onChange={handleInputChange} />
                </div>

                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                {errors.global && <p style={{ color: 'red' }}>{errors.global}</p>}


                <div>
                    <input className="border py-2 px-5 w-full mt-4" name="username" placeholder="Username" onChange={handleInputChange} />
                </div>
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

                <div>
                    <input className="border py-2 px-5 w-full mt-4" name="password" type="password" placeholder="Password" onChange={handleInputChange} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <div>
                    <input className="border py-2 px-5 w-full mt-4" name="confirmpassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} />
                </div>
                {errors.confirmpassword && <p style={{ color: 'red' }}>{errors.confirmpassword}</p>}
                {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
                </div>
                <button type="submit" className="btn-2">GET START</button>
            </div>
        </form>
        </div>
    );
}

export default SignUp;




// import React, { useState } from "react";
// import "./Sign_Up.css";
// import images from "../images/Wings.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// const SignUp = () => {
//     const [values, setValues] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         username: '',
//         password: '',
//         confirmpassword: ''
//     });
//     const [errors, setErrors] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         username: '',
//         password: '',
//         confirmpassword: ''
//     });
//     const navigate = useNavigate();
//     const [passwordMatchError, setPasswordMatchError] = useState('');

//     const handle_submit = async (event) => {
//         event.preventDefault();
//         let formIsValid = true;

//         // Validating First Name
//         if (!values.firstname) {
//             setErrors(prevState => ({ ...prevState, firstname: 'Please Enter First name' }));
//             formIsValid = false;
//         } else {
//             setErrors(prevState => ({ ...prevState, firstname: '' }));
//         }

//         // Validating Last Name
//         if (!values.lastname) {
//             setErrors(prevState => ({ ...prevState, lastname: 'Please Enter Last Name' }));
//             formIsValid = false;
//         } else {
//             setErrors(prevState => ({ ...prevState, lastname: '' }));
//         }

//         // Validating Email
//         if (!/\S+@\S+\.\S+/.test(values.email)) {
//             setErrors(prevState => ({ ...prevState, email: 'Please enter a valid email address' }));
//             formIsValid = false;
//         } else {
//             setErrors(prevState => ({ ...prevState, email: '' }));
//         }

//         // Validating Username
//         if (!values.username) {
//             setErrors(prevState => ({ ...prevState, username: 'Please Enter Username' }));
//             formIsValid = false;
//         } else {
//             setErrors(prevState => ({ ...prevState, username: '' }));
//         }

//         // Validating Password
//         if (values.password !== values.confirmpassword) {
//             setPasswordMatchError('Passwords do not match');
//             formIsValid = false;
//         } else {
//             setPasswordMatchError('');
//         }

//         if (formIsValid) {
//             try {
//                 const response = await axios.post('http://localhost:8081/signup', values);
//                 console.log('Response:', response.data);
//                 if (response.data.status === "Success") {
//                     // Redirect to the home page or another appropriate page
//                     navigate("/login");
//                 }
//                 // Redirect to a success page or perform any other actions
//             } catch (error) {
//                 if (error.response.data.error) {
//                     setErrors(prevState => ({ ...prevState, global: error.response.data.error }));
//                 } else {
//                     setErrors(prevState => ({ ...prevState, global: 'An unexpected error occurred. Please try again.' }));
//                 }
//             }
//         }
//     }

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setValues({ ...values, [name]: value });
//     }

//     return (
//         <form onSubmit={handle_submit} className="Main">
//             <div className="section-A">
//                 {/* Your existing code for section A */}
//             </div>
//             <div className="section-B">
//                 {/* Your existing code for section B */}
//                 <div className="Name">
                    
//                     <input className="F" name="firstname" placeholder="First Name" onChange={handleInputChange} />
                   
//                     <input className="L" name="lastname" placeholder="Last Name" onChange={handleInputChange} />
                   
//                 </div>
//                 {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}
//                 {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}

//                 <div><input name="email" placeholder="Email" onChange={handleInputChange} /></div>

//                 {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//                 {errors.global && <p style={{ color: 'red' }}>{errors.global}</p>}
                
//                 <div><input name="username" placeholder="Username" onChange={handleInputChange} /></div>
//                 {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
//                 <div><input name="password" placeholder="Password" onChange={handleInputChange} /></div>
//                 <div><input name="confirmpassword" placeholder="Confirm Password" onChange={handleInputChange} /></div>
//                 {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
//                 <button type="submit" className="btn-2">GET START</button>
//             </div>
//         </form>
//     );
// }

// export default SignUp;

