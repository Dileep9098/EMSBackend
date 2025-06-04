// import app from "./app.js"; // 👈 Make sure to include the `.js` extension if using ESM
// import connectDB from "./database/database.js";
// import ngrok from "ngrok"
// const PORT = 5001;

// connectDB()

// app.listen(PORT, async() => {
//     console.log(`Server is working on http://localhost:${PORT}`);
//     const url = await ngrok.connect(PORT);
//     console.log(`Ngrok URL: ${url}`); 
// });


import app from "./app.js";  
import connectDB from "./database/database.js";

const PORT = 5000; 

connectDB()

app.listen(PORT, async () => {
    console.log(`Server is working on http://localhost:${PORT}`);

    
});
