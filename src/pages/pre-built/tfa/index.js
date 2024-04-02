import { useParams } from "react-router-dom/cjs/react-router-dom"

import React, { useState } from "react";
import Logo from "../../../images/logo.png";
import LogoDark from "../../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { setAdmin } from "../../../actions"
import { useLocation } from 'react-router-dom';
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,

} from "../../../components/Component";
import PageContainer from "../../../layout/page-container/PageContainer";
import Head from "../../../layout/head/Head";
import { useEffect } from "react";
const TFAVerificationCode = () => {

    const location = useLocation();
    // Accessing search parameters
    const searchParams = new URLSearchParams(location.search);
    const secret = searchParams.get('secret');
    const token = searchParams.get('token');

    useEffect(() => {
        localStorage.setItem('accessToken', token);
    }, [token])
    return (
        <>

            <Head title="Login" />
            <PageContainer>
                <Block className="nk-block-middle nk-auth-body  wide-xs">
                    <div className="brand-logo pb-4 text-center">
                        <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                        </Link>
                    </div>

                    <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                        <BlockHead>
                            <BlockContent>
                                <p>
                                    Turn on two factor authentication. Use Google Authenticator app from GooglePlay (Android) or AppStore(iOS). Install app on your phone and then scan QR Code and type TOTP (time-based one-time password) into input
                                </p>
                                <BlockTitle tag="h4">Secret Code</BlockTitle>
                                <BlockDes>
                                    <p>{secret}</p>
                                </BlockDes>
                            </BlockContent>
                        </BlockHead>
                        <div className="d-flex justify-content-center">
                            <iframe
                                src={`https://chart.googleapis.com/chart?chs=150x150&chld=M|0&cht=qr&chl=otpauth://totp:Issuer%3AAccount?secret=${secret}&issuer=Issuer&algorithm=SHA1&digits=6&period=30`}
                                width="160"
                                height="160"
                                className="border-0"
                            >
                            </iframe>
                        </div>
                    </PreviewCard>
                </Block>
            </PageContainer>

        </>
    )
}
export default TFAVerificationCode; 