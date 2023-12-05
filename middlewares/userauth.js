
const islogin= async function(req,res,next){
    try{
        if(req.cookies.user){

            next()
            
        }else{
            res.redirect('/')

        }
    }catch(err){
    console.log(err.message)
    }
}


const islogout = async function(req , res , next){
    try{

        if(req.cookies.user){
            res.redirect('/')
        }else{
            next()
        }


    } catch(err){
        console.log(err);
    }
} 




module.exports = {
    islogin,
    islogout
}