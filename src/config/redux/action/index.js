import firebase,{database} from '../../firebase/';
export const actionUsername = () => (dispatch) => {
    // asyncronus
        setTimeout(()=> {
            return dispatch({type: 'CHANGE_USER',value: 'Yudi Gunawan'});
        },2000);
}
// akan di panggil di halaman register
export const registerUserAPI = (data) => (dispatch) => {
    dispatch({type: 'CHANGE_STATUS', value: null})
    // code yang ada di bawah mengubah value dan melakukan action yang ada dihalaman register
    // parameter disini di tangkap oleh fungsi yanga ada di register dengan reduxstate dan reduxdispatch
    //promise ini akan di tunggu data peniriman data oleh halaman register
    return new Promise((berhasil,gagal) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        // menerima data dari halaman register dan menfirimkan ke firebase
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('Berhasil => ',res);
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_STATUS', value: true})
            berhasil(true);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_STATUS', value: false})
            gagal(false)
            // ...
        })
    })
}
// akan di panggil di halaman login
export const loginUserAPI = (data) => (dispatch) => {
    dispatch({type: 'CHANGE_STATUS', value: null})
    // code yang ada di bawah mengubah value dan melakukan action yang ada dihalaman register
    // parameter disini di tangkap oleh fungsi yanga ada di register dengan reduxstate dan reduxdispatch
    //promise ini untuk fungsi asyncronus yang akan diterima di hhalaman loginn
    return new Promise((berhasil, gagal) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                // console.log('Berhasil => ',res);
                // data yang akan disimpan dari firebase pada saat login
                //menyimpand data kembalian firebase saat login
                const dataUser = {
                    email : res.user.email,
                    uid : res.user.uid,
                    emailVerified : res.user.emailVerified,
                    refreshToken : res.user.refreshToken
                }
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_LOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser })
                // berhasil ini akan mengrim data ke halaman login di baris ke 35 ,ke variable res/hasilnya
                berhasil(dataUser)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode , errorMessage);
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_LOGIN', value: false})
                dispatch({type: 'CHANGE_STATUS', value: true})
                gagal(false)
                // ...
            })
    })
}
// mengirim data ke firebase
export const addDataToAPI = (data) => (dispatch) => {
    return new Promise((berhasil ,gagal) => {
        database.ref('notes/' + data.userId).push({
            title: data.title,
            content: data.content,
            date: data.date
        })
        .then(data => {
            berhasil(true);
        })
        .catch(err => {
            gagal(false);
        })
    })
}
//mengambil data dari firebase
//fungsi ini akan di panggil di halaman dasboar dan didalam fungdi didmount
export const getDataFromAPI = (userId) => (dispatch) =>  {
    const urlNotes = firebase.database().ref('notes/' + userId);
    // menggunakan fungsi asycncronus
    return new Promise((berhasil,gagal) => {
        dispatch({type:'LOADING_CONTENT' , value: true})
        urlNotes.on('value', function(snapshot) {
            // updateStarCount(postElement, snapshot.val());
            if(snapshot.val()===null){
            const data = {

                }
                dispatch({type: 'SET_NOTES' ,value: data})
                dispatch({type:'LOADING_CONTENT' , value: false})
            }else{
                // membuat sebuah objek menjadi array
                const data = [];
                // snapshot dari fungsi firebase yang berisi data yang di panggil
                Object.keys(snapshot.val()).map(key =>{
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                });
                // menyimpan di redux dan dikirim ke reducer
                dispatch({type: 'SET_NOTES' ,value: data})
                // mengirim lewat fungs promise
                berhasil(snapshot.val());
                dispatch({type:'LOADING_CONTENT' , value: false})
            }
        });
    })
}
//update data
export const upadateDataAPI = (data) => (dispatch) =>  {
    const urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`);
    // menggunakan fungsi asycncronus
    return new Promise((berhasil,gagal) => {
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if(err){
                gagal(false);
            }else{
                berhasil(true);
            }
        });
    })
}
//hapus data API
export const deleteDataAPI = (data) => (dispatch) =>  {
    const urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`);
    // menggunakan fungsi asycncronus
    return new Promise((berhasil,gagal) => {
        urlNotes.remove();
    })
}

// update count di halaman redux
export const updateCount = () => (dispatch) => {
    dispatch({type:'UPDATE_COUNT', value: 1})
}

// update min halaman redux
export const updateMin = () => (dispatch) => {
    dispatch({type: 'UPDATE_MIN', value: 1})
}