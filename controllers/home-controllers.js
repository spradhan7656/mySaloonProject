const mongoose = require('mongoose');
const shopUser = require('../models/shopUser')
const getSanloonShops = async(req,res)=>{

    try {
        const city = req.query.city
        const state = req.query.state

        
        const result = await shopUser.aggregate([
            {
                $match : {
                    state : state,
                    city : city
                }
            },
           {
                $project : {
                    _id : 1,
                    shopname : 1
                }
           }
        ])

        
        
        res.status(200).json({
            success : true,
            data : result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error Occured !'
        })
    }
    
}

module.exports = getSanloonShops
