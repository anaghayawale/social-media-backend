const DB_NAME = "socialmedia"
const PORT = process.env.PORT || 5000
const cookieOptions = {
    httpOnly: true,
    secure:true
    }

export { DB_NAME, PORT , cookieOptions}
