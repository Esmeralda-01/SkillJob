import mongoose from "mongoose";
import colors from 'colors'


export const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)      
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.cyan.bold(`MongoDB conectado en: ${url}`))
    } catch (error) {
        console.log(colors.bgRed.bold('Error al conectar con MongoDB'))
        process.exit(1)
    }
}