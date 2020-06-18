import React , {Component} from 'react';
// import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/Button';
import './Register.scss';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import {Status} from '../../../components/atoms/Status';

class Register extends Component {
    //inisasi dan menampung datadari inputan
    state = {
        email : '',
        password : '',
       // isLoading : false
    }
    handleChangeText = (e) => {
        // console.log(e.target.id);
        // setState ini akan mengupdate nilai yang ada di state yang nilainya dari iniputan penggunan
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleRegisterSubmit = async () => {
        // setelah state di update lalu dipanggil saat mengclick tombol submit
        const {email,password} = this.state;
        console.log('data sebelum dikirim => ',email , password);
        //props dibawah ini yang akan menerima dat email dan password
        //await menungg data yang ada di halaman action register yaitu promise yang bersifta syncronus
        // mengirimkan data ke halaman action
        const res = await this.props.registerAPI({email,password})
        .catch(err => err);
        if(res){
            //mengosongkan form setelah d submit
            this.setState({
                email : '',
                password : ''
            })
        }
        //simulasi
        // this.setState({
        //     isLoading : true
        // })
        // setTimeout(()=> {
        //     this.setState({
        //         isLoading : false
        //     })
        // },3000);

    }
    render (){
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange= {this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange = {this.handleChangeText} value={this.state.password} />
                    {/* onClick, loading dan title props yang dikrim ke atom button */}
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading}/>
                    {/* status ini dari bawah reduxSate */}
                    {/* status yang di import yaitu yang di terapkan ini(Status) status= */}
                    <Status status={this.props.status} />
                </div>
                {/* <button>Dashboard</button> */}
            </div>
        )
    }
}
// state disini dari initial state yang ada di reducer
const reduxState = (state) => ({
    // ini menggani nilai false menjadi true saat action di jalankan
    // yang mana actionnya berada di halaman action folder redux yang ada i baris 10
    //isloadin yaitu prips yang ada di butto di baris ke 44
    isLoading: state.isLoading,
    status : state.status
})
const reduxDispatch = (dispatch) => ({
    // regisgisterUserAPI dari halaman acton redux yang memanggil fungsi firebase
    // register api di props di fungsi handleRegisterSubmit yang ada diatas dan mengirimkan data yang akan di tangkap  registerUserAPI yang da dibawah ini dan dikirim ke halaman action yang ada di folder redux
    registerAPI: (data) => dispatch(registerUserAPI(data))
})
export default connect(reduxState,reduxDispatch)(Register);