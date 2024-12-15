function generateOTP() {
    // Generates a 4-digit random number between 1000 and 9999
    return Math.floor(1000 + Math.random() * 9000);
}

// Usage example
const otp = generateOTP();

module.exports=otp
