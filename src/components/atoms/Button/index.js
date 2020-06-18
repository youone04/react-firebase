import React from 'react';
// title, onclick dan loading dari register yang kirimkan melalui props
//loading merupakan props yang ada di tombol button pada register halaman 44
const Botton = ({title,onClick, loading}) => {
    if(loading){
        return <button className="btn disable" disabled>Loading ...</button>
    }
    return (
        <button className="btn" onClick={onClick}>{ title }</button>
    )
}
export default Botton;