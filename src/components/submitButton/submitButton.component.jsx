import React from 'react';

import './submitButton.styles.css';

// import buttonLoader from './../../assets/image/buttonloader.gif';

const SubmitButton = (props) => {
    const {className, onButtonClickHandle, isLoaderVisible, children, dataloading, theme} = props;
    return (
        <button className={`btn-lg ${theme === 'white' ? '' : 'btn-orange'} ${className ? className : ''} `} disabled={isLoaderVisible ? true : false} type="submit" onClick={onButtonClickHandle}>
            {
                isLoaderVisible ? 
                dataloading
                :
                children
            }
            
        </button>
    )
}

export default SubmitButton
