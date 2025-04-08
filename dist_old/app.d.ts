import 'reflect-metadata';
import express from 'express';
declare class App {
    app: express.Application;
    env: string;
    port: string | number;
    private cronService;
    constructor();
    listen(): void;
    getServer(): express.Application;
    private connectToDatabase;
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
    private initializeResponseHandler;
}
export default App;
