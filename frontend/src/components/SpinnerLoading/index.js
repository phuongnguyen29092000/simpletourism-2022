import React from 'react';
import { css } from "@emotion/react";
import { PropagateLoader} from "react-spinners";

const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 2000,
}
const loadingIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
`;
function SpinnerLoading(props) {
    return (
        <div className='loading-screen' style={style}>
            <PropagateLoader color={"#5584AC"} loading={true} css={loadingIcon} />
        </div>
    );
}

export default SpinnerLoading;