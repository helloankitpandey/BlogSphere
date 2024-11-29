import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@akki2216/medium-zod";
// import z from "zod"

// const signupInput = z.object({
//     username: z.string().email(),
//     password: z.string().min(6),
//     name: z.string().optional()
// })
// // learn type inference in zod
// // export type SignupInput = z.infer<typeof signupInput> // it will good for frontend


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
}>();


userRouter.post('/signup', async (c) => {

    const body = await c.req.json();
    // here need to add zod validation
    // zod lets u do input validation
    const { success } = signupInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
  
    try {
       // we havn't do zod, hashed th password
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name 
        }
      })
  
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET )
  
      // return c.text('User Successfully Signup') 
      return c.text(jwt) 

    } catch (e) {
      // console.log(e);
      c.status(411);
      return c.text('User already exists with this email')
    }
  })
  
  // signin routes
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    // here need to add zod validation
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
       // we havn't do zod, hashed th password
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        }
      })
      // if user doesnot exist
      if(!user) {
        c.status(403); //unauthorized
        // return c.text('User not exist')
        return c.json({
          message: "Incorrect Credentilas"
        })
      }
  
      // jwt authentication
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET )
  
      // return c.text('User Successfully Signup') 
      return c.text(jwt) 

    } catch (e) {
      // console.log(e);
      
      c.status(411);
      return c.text('User already exists with this email')
    }
  })