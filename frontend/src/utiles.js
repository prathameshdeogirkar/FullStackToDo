

const loaddToken = ()=>{
    const TOKEN = JSON.parse(localStorage.getItem('allInfo'))?.token;
    return TOKEN;
}

export{loaddToken}