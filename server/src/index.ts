import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import "reflect-metadata";
import microConfig from "./mikro-orm.config"
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { userResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from "./types";



const main = async () => {
  const orm = await MikroORM.init(microConfig);
  
  orm.getMigrator().up();
  const app = express(); 

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ 
        client: redisClient,
        disableTouch: true,
        disableTTL:true,
       }),
       cookie:{
         maxAge: 1000 * 3600 * 24 * 365,
         httpOnly: true,
         sameSite: "lax",
         secure: __prod__,
       },
      saveUninitialized: false,
      secret: '------------------->',
      resave: false,
    })
  );
  
  const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver,userResolver],
            validate: false,
        }),
        context: ({req,res}) : MyContext => ({em: orm.em,req,res}),
    });
    apolloServer.applyMiddleware({app});
    app.get('/',(_,res) => {
        res.send("Hello");
    });
    app.listen(4000, () => {console.log("server stared on 4000")});
}

main().catch(e => {console.error(e)}) 
;