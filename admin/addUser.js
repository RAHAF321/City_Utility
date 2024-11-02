require('dotenv').config(); // Load environment variables from .env
const { MongoClient, ObjectId } = require('mongodb');

async function addUser(role, name, email, password) {
    // Get MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const database = client.db('test'); // Access the 'test' database
        const usersCollection = database.collection('users'); // Access the 'users' collection

        // Define the user document with all specified fields
        const user = {
            _id: new ObjectId(), // Generates a MongoDB ObjectId
            role: role,
            name: name,
            email: email,
            password: password, // In a real app, hash this password
            createdAt: new Date(), // Current date for createdAt
            updatedAt: new Date(), // Current date for updatedAt
            __v: 0, // Initialize version field to 0
        };

        // Insert the document into the collection
        const result = await usersCollection.insertOne(user);
        console.log(`User added with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Example usage
addUser('admin', 'Yogendra Sharma', 'yogendra@admin.com', 'yogendra@admin.com');
