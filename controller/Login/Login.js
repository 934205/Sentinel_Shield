const supabase = require("../../config/supabase");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioNumber = process.env.TWILIO_PHONE;

const otpStore = {};

exports.Login = async (req, res) => {
    try {        
        console.log(req.url);
        
        let mobile  = req.query.mobile; // Get mobile number from query
        mobile="+91"+mobile
        console.log(mobile);
        

        // Check if advisor exists
        const { data, error } = await supabase
            .from("advisor")
            .select("mobile_number, dept_year_id, role")
            .eq("mobile_number", mobile)
            .single(); // single() returns object instead of array

        if (error || !data) {
            return res.status(404).json({ message: "Advisor not found", success: false });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[mobile] = otp; // store OTP temporarily

        // Send OTP via Twilio
        try {
            await client.messages.create({
                body: `Your OTP is ${otp}`,
                from: twilioNumber,
                to: mobile
            });

            res.json({ success: true, message: 'OTP sent' });

        } catch (err) {
            console.log(err);
            
            return res.status(500).json({ success: false, message: err.message });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};


// -------------------------
// Verify OTP and generate JWT
exports.VerifyOtp = async (req, res) => {
    try {
        let { mobile, otp } = req.body;
                
        

        if (!otpStore[mobile] || otpStore[mobile] != otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Get user details again
        const { data, error } = await supabase
            .from("advisor")
            .select("mobile_number, dept_year_id, role")
            .eq("mobile_number", mobile)
            .single();
        

        if (error || !data) {
            return res.status(404).json({ success: false, message: "Advisor not found" });
        }

        // Generate JWT with mobile_number, dept_year_id, role
        const payload = {
            mobile_number: data.mobile_number,
            dept_year_id: data.dept_year_id,
            role: data.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        delete otpStore[mobile]; // remove OTP after verification

        return res.json({ success: true, token });

    } catch (err) {
        
        return res.status(500).json({ success: false, message: err.message });
    }
};