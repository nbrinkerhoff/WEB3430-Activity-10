const LocalStrategy = require('passport-local').Strategy
import { User } from '../models/user'
export const strategy = new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}, (err, user) => {
            if(err){
                console.log(err)
                return done(err)
            }else{
                if(!user){
                    console.log("User Not Found")
                    return done(null, false, {message: "User not found"})
                }else{
                    if(!user.isValidPassword(password)){
                        console.log("Invalid Password")
                        return done(null, false, {message: "Incorrect password"})
                    }else{
                        console.log("Logging In...")
                        return done(null, user)
                    }
                }
            }
        })
    }
)