import React from 'react';
import errorStyles from './error-page.module.css'
import errPic from '../../images/err.png'

const ErrorPage = () => {
    return (
        <div className={errorStyles.mainBlock}>
            <p className='text text_type_main-large'>Такой страницы не существует</p>
            <img src={errPic}></img>
        </div>
    );
};

export default ErrorPage;