import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://suganyars2004_db_user:quizapp12@cluster0.khczq5o.mongodb.net/QuizApp1')
    .then(()=>{console.log("DB connected")})
}