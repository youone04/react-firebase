import React from 'react';
import { connect } from 'react-redux'

const ChildSatu = ({count}) => {
    return(
        <>
        <p>jumlah : {count}</p>
        </>
    )
}
const reduxState = (state) => ({
    count: state.count
});
export default connect(reduxState , null)(ChildSatu);
