import React from 'react';
import { connect } from 'react-redux';
import ChildSatu from './ChildSatu';
import { updateCount , updateMin} from '../../../config/redux/action/index'

const Redux = ({updateCount,count,updateMin}) => {
    const handleKlik = (e) => {
       if(e){
        updateCount()
       }else if(count > 0){
        updateMin()
       }
     

    }
    return(
        <>
        <ChildSatu/>
        <button onClick={() => handleKlik(true)} >tambah</button>
        <br/>
        <button onClick={() => handleKlik(false)} >kurang</button>
        </>
    )
}

const reduxState = (state) => ({
    count: state.count
    
})

const reduxDispatch = (dispatch) => ({
    updateCount: () => dispatch(updateCount()),
    updateMin: () => dispatch(updateMin())
    
})
export default connect(reduxState , reduxDispatch)(Redux);