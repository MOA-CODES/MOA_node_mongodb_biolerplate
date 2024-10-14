const {User_M} = require('../models')

const SuperAdmin = async ()=>{

    const SuperAdmin = {name:'SuperAdmin', email:'Super@Admin.com', role:'SuperAdmin', phone: '+234-0000000000', password:'admin@SUPER00'}

    try{

        const checkAdmin = await User_M.findOne({role:'SuperAdmin'})

        if (!checkAdmin){    
            await User_M.create(SuperAdmin)
    
            console.log("Seeded SuperAdmin")
        }

        console.log("SuperAdmin Exists")

    }catch(e){
        console.log(e)
        console.log("error seeding SuperAdmin")
    }
}

module.exports = SuperAdmin