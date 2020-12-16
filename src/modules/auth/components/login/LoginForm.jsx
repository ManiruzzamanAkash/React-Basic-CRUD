import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { handleChangeLoginInput, loginSubmitAction } from '../../redux/actions/AuthAction';

const LoginForm = withRouter(({history}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.auth.isLoading);
    const loginMessage = useSelector((state) => state.auth.loginMessage);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const loginData = useSelector((state) => state.auth.loginData);

    const submitHandler = () => {
        dispatch(loginSubmitAction(loginData));
    }

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeLoginInput(name, value));
    };

    useEffect(() => {
        if (typeof loginMessage !== 'undefined' || loginMessage !== null) {
            if (isLoggedIn && loginMessage.length > 0) {
                history.push("/dashboard");
            }
        }
    }, [isLoggedIn, loginMessage, history]);
    return (
        <form className="user" onSubmit={handleSubmit(submitHandler)} method="POST">
            <div className="form-group">
                <input className="form-control form-control-user"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email Address..."
                    required=""
                    aria-required="true"
                    ref={register({
                        required: 'Please give your email'
                    })}
                    onChange={(e) => handleChangeTextInput('email', e.target.value)}
                    value={loginData.email}
                    autoComplete="name"
                />
                {
                    errors.email &&
                    <div className="text-danger text-sm ml-4">{errors.email.message}</div>
                }
            </div>
            <div className="form-group">
                <input className="form-control form-control-user"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    required=""
                    aria-required="true"
                    ref={register({
                        required: 'Please give your password'
                    })}
                    onChange={(e) => handleChangeTextInput('password', e.target.value)}
                    value={loginData.password}
                    autoComplete="name"
                />
                {
                    errors.password &&
                    <div className="text-danger text-sm ml-4">{errors.password.message}</div>
                }
            </div>

            {
                !isLoading && 
                <button className="btn btn-primary btn-user btn-block" type="submit">
                    Login
                </button>
            }
            {
                isLoading && 
                <button className="btn btn-primary btn-user btn-block" type="button" disabled>
                    Logging In {"  "}
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
            }
        </form>
    );
})

export default LoginForm;