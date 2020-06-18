import React from 'react';

export const Status = ({status}) => {
    console.log('status => ',status )
    if(status){
        return (
            <div className="alert"><p>Berhsil Daftar</p></div>
        )
    }else if(status===false){
        return (
            <div className="gagal"><p>Gagal Daftar</p></div>
        )
    }else{
        return (
            <div></div>
        )
    }
}

// status dari props login
export const StatusLogin = ({status}) => {
    if(status){
        return (
            <div className='login'><p>Login Gagal</p></div>
        )
    }else{
        return (
            <div></div>
        )
    }
}