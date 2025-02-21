

const isShopUser= (req,res,next)=>{
    if(req.userInfo.role !== 'shop'){
        return res.status(403).json({
            success : false,
            message : 'Access denind ! Admin right required.'
        })
    }
    next();
}

module.exports=isShopUser;