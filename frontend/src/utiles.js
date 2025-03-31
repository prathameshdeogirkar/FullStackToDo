

const loaddToken = ()=>{
    const TOKEN = JSON.parse(localStorage.getItem('allInfo'))?.token;
    return TOKEN ? TOKEN : null;
}

const logout = () =>{
    localStorage.removeItem('allInfo');
    window.location.href = '/';
}

const getCurrentUser = () =>{
    const userInfo = JSON.parse(localStorage.getItem('allInfo'))?.userInfo;
    return userInfo? userInfo : null;
}

export{loaddToken ,logout, getCurrentUser}