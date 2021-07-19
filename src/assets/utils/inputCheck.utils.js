import publicEmailsProvider from "./domain-excluder.constants";

export const CheckIsValidDomain = (domain) => { 
    //eslint-disable-next-line
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
    return domain.match(re);
} 



export const validateEmail = (email) => {
    //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const  isEmailBusiness = (email) => {
    return email !== '' && email ? !publicEmailsProvider.includes(email.split('@')[1]) : false
  }