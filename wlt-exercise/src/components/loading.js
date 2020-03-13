import React from 'react';

import spinner from './spinner.jpg';
import './loading.css';

const Loading = () => {
    return(
        <div className="spinner"><img src={spinner}/></div>
    )
};

export default Loading;