const supabase = require("../../config/supabase")


exports.upload_advisor = (req,res,next)=>{
    const fetchUsers = async () => {
        try{
            const body=req.body                    
            

            const {data,error} = await supabase
            .from("advisor")
            .insert(body)
            .select();

            if(data){
                res.json(
                    {
                        "message" : `${data.length} advisor record was successfully inserted`,
                        "success" : true

                    }
                )
                if(error){
                    res.json({
                        "message" : error.message,
                        "success" : false

                    })
                }
            }
            if(error){
                res.json({
                    "message" : error.message,
                    "success" : false

                })
            }

        }
        catch(error){
            res.json({
                "message" : error.message,
                "success" : false

            })        }

    };
    
    fetchUsers();
}


