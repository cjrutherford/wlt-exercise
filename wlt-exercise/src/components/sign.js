import React, {Fragment} from 'react';

const Sign = ({type}) => {
    switch(type){
        case 'GBP':
            return <Fragment><i className="fas fa-pound-sign"></i></Fragment>
        case 'EUR':
            return <Fragment><i className="fas fa-euro-sign"></i></Fragment>;
        case 'HKD':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'IDR':
            return <Fragment><i className="fas fa-rupee-sign"></i></Fragment>;
        case 'ILS':
            return <Fragment><i className="fas fa-shekel-sign"></i></Fragment>;
        case 'DKK':
            return <Fragment><strong>kr</strong></Fragment>;
        case 'INR':
            return <Fragment><i className="fas fa-rupee-sign"></i></Fragment>;
        case 'CHF':
            return <Fragment><strong>SFr.</strong></Fragment>;
        case 'MXN':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'CZK':
            return <Fragment><strong>Kč</strong></Fragment>;
        case 'SGD':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'THB':
            return <Fragment><b>฿</b></Fragment>;
        case 'HRK':
            return <Fragment><b>kn</b></Fragment>;
        case 'MYR':
            return <Fragment><b>RM</b></Fragment>;
        case 'NOK':
            return <Fragment><strong>kr</strong></Fragment>;
        case 'CNY':
            return <Fragment><b>¥</b></Fragment>;
        case 'BGN':
            return <Fragment><b>Лв.</b></Fragment>;
        case 'PHP':
            return <Fragment><b>₱</b></Fragment>;
        case 'SEK':
            return <Fragment><strong>kr</strong></Fragment>;
        case 'PLN':
            return <Fragment><b>zł</b></Fragment>;
        case 'ZAR':
            return <Fragment><b>R</b></Fragment>;
        case 'CAD':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'ISK':
            return <Fragment><strong>kr</strong></Fragment>;
        case 'BRL':
            return <Fragment><b>R</b><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'RON':
            return <Fragment><b>lei</b></Fragment>;
        case 'NZD':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'TRY':
            return <Fragment><b>₺</b></Fragment>;
        case 'JPY':
            return <Fragment><i className="fas fa-yen-sign"></i></Fragment>;
        case 'RUB':
            return <Fragment><i className="fas fa-ruble-sign"></i></Fragment>;
        case 'KRW':
            return <Fragment><i className="fas fa-won-sign"></i></Fragment>;
        case 'USD':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        case 'HUF':
            return <Fragment><b>Ft</b></Fragment>;
        case 'AUD':
            return <Fragment><i className="fas fa-dollar-sign"></i></Fragment>;
        default:
            return <Fragment><i className="fas fa-question"></i></Fragment>;
    }
}

export default Sign;