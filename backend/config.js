import dotenv from 'dotenv';
export const PORT = 5555;

dotenv.config();
export const mongoDBURL = `mongodb://MichaelGichamu:${process.env.MONGODB_PASSWORD}@ac-eyz7boh-shard-00-00.krdia7f.mongodb.net:27017,ac-eyz7boh-shard-00-01.krdia7f.mongodb.net:27017,ac-eyz7boh-shard-00-02.krdia7f.mongodb.net:27017/?ssl=true&replicaSet=atlas-frwtm9-shard-0&authSource=admin&retryWrites=true&w=majority`;