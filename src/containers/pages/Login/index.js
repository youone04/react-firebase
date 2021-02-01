import React , {Component} from 'react';
import { connect } from 'react-redux';
// import { actionUsername } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';
import { loginUserAPI } from '../../../config/redux/action';
import './Login.scss';
import { StatusLogin } from '../../../components/atoms/Status';
import { Link } from 'react-router-dom'

class Login extends Component {
    // changeUser =() => {
    //     this.props.changeUserName()
    // }
    componentDidMount(){
        const user = localStorage.getItem('userData');
        const {history} = this.props;
        if(user != null){
            history.push('/dashboard');
        }else{
            history.push('/');
        }
    }
        
    state = {
        email : '',
        password : '',
       // isLoading : false
    }
    //menerima inputan otomatis dari user
    handleChangeText = (e) => {
        // console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    //pada saat tombol di tekan
    handleLoginSubmit = async () => {
        const {email,password} = this.state;
        const {history} = this.props;
        //props dibawah ini yang akan menerima dat email dan password
        //await disini menunggu promse dari halaman login
        const res = await this.props.loginAPI({email,password}).catch(err => err);
        //mengosongkan form setelah di submit
        if(res){
            // menyimpan data kedalam localStorage
            localStorage.setItem('userData', JSON.stringify(res));
            this.setState({
                email : '',
                password : ''
            })
            //history bawaan react rooter, data akan dikirm/di redirect kan ke dashboard
            history.push('/dashboard');
        }else{
            console.log('login gagal');
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
                    <p className="auth-title">Halaman Masuk</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange= {this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange = {this.handleChangeText} value={this.state.password} />
                    {/* onClick, loading dan title props yang dikrim ke atom button */}
                    <StatusLogin status={this.props.status} />
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                    <Link style={{textDecoration:'none'}} to="/register"><p className="text-registrasi">REGISTRASI</p></Link>
                </div>
                {/* <button>Dashboard</button> */}
            </div>
        )
    }
}
// const reduxState = (state) => ({
//     popupProps : state.popup,
//     userName : state.user
// })
// const reduxDispatch = (dispatch) => ({
//     changeUserName : () => dispatch(actionUsername())
// })
// menerim data dari state reducer
const reduxState = (state) => ({
    isLoading: state.isLoading,
    status : state.status
})
const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})
export default connect(reduxState , reduxDispatch)(Login);