const responder=(res,message="all ohkk",data=null,status=200,success=true)=>{
     return res.json({
         message,
         data,
         status,
         success
     });
}


export default responder;