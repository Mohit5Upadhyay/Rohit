import { Client, Databases,Storage, Account, Functions } from "appwrite";
import conf from "../config/conf";
export const client = new Client();
client
    .setEndpoint(conf.appwriteEndpoint) // Your API Endpoint
    .setProject(conf.appwriteProjectId) // Your project ID
    
export const account = new Account(client);
export const functions = new Functions(client);
export const databases = new Databases(client);
export const storages = new Storage(client);


