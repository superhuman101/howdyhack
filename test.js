const { MongoClient } = require('mongodb');
const readline = require('readline');

// Replace the URI with your MongoDB connection string
const uri = "mongodb://localhost:27017"; // Adjust the URI to your MongoDB instance
const dbName = "howdyhackdb"; // Name of the database you want to test
const collectionName = "photos"; // Name of the collection

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function runTest() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Connect to the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Prompt the user for input
        const name = await getUserInput("Enter name for the document: ");
        const success = await getUserInput("Enter success status (true/false): ");
        
        // Insert a document with user input
        const testDocument = { 
            name: name, 
            success: success.toLowerCase() === 'true', 
            date: new Date() 
        };
        
        const insertResult = await collection.insertOne(testDocument);
        console.log("Document inserted:", insertResult.insertedId);

        // Find and display the inserted document
        const findResult = await collection.findOne({ _id: insertResult.insertedId });
        console.log("Document found:", findResult);

        // Ask if the user wants to delete the document
        const deleteConfirmation = await getUserInput("Do you want to delete the document? (yes/no): ");
        if (deleteConfirmation.toLowerCase() === 'yes') {
            const deleteResult = await collection.deleteOne({ _id: insertResult.insertedId });
            console.log("Document deleted:", deleteResult.deletedCount);
        } else {
            console.log("Document retained in the database.");
        }

    } catch (error) {
        console.error("Error during MongoDB test:", error);
    } finally {
        // Close the connection and readline interface
        await client.close();
        rl.close();
        console.log("Connection to MongoDB closed");
    }
}

// Run the test
runTest();
