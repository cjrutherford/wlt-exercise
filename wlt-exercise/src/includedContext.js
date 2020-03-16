import React, {createContext, useReducer, useState, useEffect} from 'react';

export const ExcludedContext = createContext();

export const ExcludedProvider = (props) => {
    const states = {
        GBP:true,
        EUR:true,
        HKD:true,
        IDR:true,
        ILS:true,
        DKK:true,
        INR:true,
        CHF:true,
        MXN:true,
        CZK:true,
        SGD:true,
        THB:true,
        HRK:true,
        MYR:true,
        NOK:true,
        CNY:true,
        BGN:true,
        PHP:true,
        SEK:true,
        PLN:true,
        ZAR:true,
        CAD:true,
        ISK:true,
        BRL:true,
        RON:true,
        NZD:true,
        TRY:true,
        JPY:true,
        RUB:true,
        KRW:true,
        USD:true,
        HUF:true,
        AUD:true
      };
    
      const reducer = (itemStates, { type, payload }) => {
        if (type === "toggle") {
            return {...itemStates, [payload]: !itemStates[payload]};
        }
        
      };
    
      const [state, dispatch] = useReducer(reducer, states);

      const [excluded, setExcluded] = useState([]);
      useEffect(() => {
          const keys = Object.keys(state);
          for(let k of keys){
              if(state[k]){
                  setExcluded(excluded => [...excluded, k])
              } else if(!state[k]){
                  setExcluded(excluded => [...excluded.splice(excluded.indexOf(k))]);
    
              }
          }
      }, [state]);

      return(<ExcludedContext.Provider value={{state, excluded, dispatch}}> 
          {props.children}
      </ExcludedContext.Provider>)
}