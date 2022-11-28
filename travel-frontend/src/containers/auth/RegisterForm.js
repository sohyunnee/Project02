import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form:auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user:user.user
        }));
    const navigate = useNavigate();

    const onChange = (e) => {
        const {value,name}=e.target;
        dispatch(
            changeField({
                form:'register',
                key:name,
                value
            })
        );
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({form:'register',key:'password',value:''}));
            dispatch(
                changeField({form:'register',key:'passwordConfirm',value:''}),
            );
            return;
        }
        dispatch(register({username, password}));
    };

    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            return;
        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    },[auth,authError,dispatch]);



    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    return(
        <AuthForm
            type={"register"}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}/>
    );
};

export default RegisterForm;