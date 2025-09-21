const supabase = require("../../config/supabase")


exports.upload_student = (req,res,next)=>{
    const fetchUsers = async () => {
        try{
            const body=req.body    
            const dept_year_id=req.user.dept_year_id
            
            const updatedBody = body.map(obj => ({
                ...obj,
                dept_year_id: dept_year_id,
                mobile_number:"+91"+obj.mobile_number,
                emergency_mobile_number:"+91"+obj.emergency_mobile_number
            }));


            const {data,error} = await supabase
            .from("student")
            .insert(updatedBody)
            .select();


            if(data){
                res.json(
                    {
                        "message" : `${data.length} student record was successfully inserted`,
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