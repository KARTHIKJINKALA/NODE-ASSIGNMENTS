function generateOTP() {
    
    return Math.floor(1000 + Math.random() * 9000);
}

const otp = generateOTP();

module.exports=otp
