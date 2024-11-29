import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@akki2216/medium-zod";


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

// all routes of blog need to be authenticated 
// so here is middleware for all of this following routes
// middleware
blogRouter.use('/*', async (c, next) => {
    // it extracct the userId 
    // & pass it down to the route handler
    const authHeader = c.req.header("authorization") || ""; //removing the typeError
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
    
    if(user) {
        // @ts-ignore
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    } catch (e) {   
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})


// Create a new blog
blogRouter.post('/', async (c) => {

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }


    const authorId = c.get("userId");
    // here need to add zod validation
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // creating new blog
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
})
  

// Updating the blog by getting id and updating the title & content of the blog
blogRouter.put('/', async (c) => {
    
    const body = await c.req.json();
    // here need to add zod validation
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }


  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // creating new blog
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})


// here we need the add pagination 
// we shouldn't return all the blogs 
// but we should return first ten/10 blogs to the user
// And user can ask for more as he scroll down the window

// left => Todo: add pagination

// returing all the blogs  
blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // return all blogs to the user
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})



// getting/returnig a blog of particular blog of particular id 
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    // here need to add zod validation
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        //  getting paticular blog
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        });
    } catch (error) {
        c.status(411)
        return c.json({
            message : "Error while fetching blog post"
        })
    }


})
