import React , {Component,Fragment} from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import {addDataToAPI, getDataFromAPI , upadateDataAPI , deleteDataAPI} from '../../../config/redux/action';
class Dashboard extends Component {
    state = {
        title : '',
        content : '',
        date : '',
        textButton: 'SIMPAN',
        noteId: ''
    }
    //mengambil data
    componentDidMount(){
        //data id yang akan dikirmkan ke database diambil dr localstorage
        const {history} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        // fungsi diambil dari bawah fungsi di baris 152
        if(userData === null){
            history.push('/');
        }else{
            this.props.getNotes(userData.uid);
        }
    }
    // data akan di tampilkan setelah render selasai
    handleSaveNotes = () => {
        // menerima data dari staete diatas
        const {title,content , textButton , noteId} = this.state;
        // menerima data dari props redux dibawah
        const {saveNotes , updateNotes} = this.props;
        //userData dari datanya di panggil dari localstorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        // simpan data dalam bentuk obejek
        const data = {
            title: title,
            content: content,
            date : new Date().getTime(),
            userId : userData.uid
        }
        if(textButton === 'SIMPAN'){
            // savenotes merupakan fungsi redux yan ada di bawah, yang akan mengirimkan data ke halaman action di fungsi addToAPI yang di panggil leat redux yang fungsinya berada di bawah
          if(title && content){
            saveNotes(data)
          }else{
              alert('gagal')
          }
        }else{
            // sama kaya yang diatas
            data.noteId = noteId; //cara mensisipkan data
            updateNotes(data);

        }
        console.log('nilai data => ',data);
    }
    onInputChange = (e,type) => {
        this.setState({
            [type] : e.target.value
        })
    }
    //update notes
    updateNotes  = (note) => {
        console.log(note);
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }
    //cancel update
    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }
    // hapus note
    // delete note yang ini dari onlclick di baris ke 116
    // mengirimkan e agar data si child tidak ikut parent
    deleteNote = (e ,note) => {
        e.stopPropagation();
        const confirmasi =  window.confirm('Data Akan di Hapus Permanaen!!');
        //deleteNote yang ini dari fungsi redux di halaman 145
        if(confirmasi){
            const {deleteNote} = this.props;
            const userData = JSON.parse(localStorage.getItem('userData'));
            const data = {
                userId: userData.uid,
                noteId: note.id
            }
            // deleteNote akan mngirimkan data ke halaman action melalui redux di bawah bari ke 143
            // data berupa id data yang akan di hapus
            deleteNote(data);
        }
    }
    // keluar note
    keluarNote = () => {
        const {history} = this.props;
        localStorage.removeItem("userData");
        history.push('/');
    }
    render (){
        const { title , content , textButton} = this.state;
        const {notes,loadingContent} = this.props;
        const {updateNotes,cancelUpdate , deleteNote ,keluarNote}  = this;
        console.log('data notes : ' ,notes);
        console.log('loading content => ',loadingContent);
        return (
            <div className="container">              
                {/* removeItem = () => localStorage.removeItem("name") */}
                {/* e sebagai penanda seperti id atau name */}
                <div className="keluar-note" onClick={keluarNote}><p className="text-keluar">Keluar</p></div>
                <div className="input-form" >
                    <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e,'title')} />
                    <textarea placeholder="content" className="input-title" value={content} onChange={(e) => this.onInputChange(e,'content')}>
                    </textarea>
                    <div className="action-wrap">
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-btn cancel" onClick={this.handleSaveNotes} onClick={cancelUpdate} >Cancel</button>
                            ) : <div/>
                        }
                    <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr/>
                {/* meloping nilai dari firebase */}
                {
                    loadingContent?
                    <div>
                        <h2>loading ...</h2>
                    </div>
                    :// sama dengan percabangan
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={ () => updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={ (e) => deleteNote(e ,note)}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                        ) : <p>kosong ..</p>
                }
            </div>
        )
    }
}
//menggunakan redux
// untuk mendaptakn data hasil login
const reduxState = (state) => ({
    //nilai state.user dari reducer
    userData : state.user,
    //nilai state.notes dari reducer yang telah diubah dari halaman action di baris ke 93 dan dapnngikl dari state global redux di halaman reducer
    notes : state.notes,
    loadingContent: state.loadingContent
})
const reduxDispatch = (dispatch) => ({
    // fungsi addDataToAPI dari halaman action yang dikirim lwat redux
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    // mnerima data dari halaman action dengan redux
    // mengirimkan data yaitu userId dari localstroge yang diambil dari fungsi diatas
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(upadateDataAPI(data)),
    // deleteNote di panggil diatas dan deleteDataAPI dari halaman action
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})
export default connect(reduxState,reduxDispatch)(Dashboard);