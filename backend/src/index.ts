import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// Hono is the library that excatly works in cloud-fare workers & not express


// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
        JWT_SECRET: string;
	}
}>();
app.use(cors({ origin: "https://blog-sphere-ten.vercel.app", credentials: true }));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app





// app.post('/api/v1/user/signup', async (c) => {

//   const body = await c.req.json();
//   // here need to add zod validation

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   try {
//      // we havn't do zod, hashed th password
//     const user = await prisma.user.create({
//       data: {
//         username: body.username,
//         password: body.password,
//         name: body.name 
//       }
//     })

//     const jwt = await sign({id: user.id}, c.env.JWT_SECRET )

//     // return c.text('User Successfully Signup') 
//     return c.text(jwt) 
//   } catch (e) {
//     // console.log(e);
    
//     c.status(411);
//     return c.text('User already exists with this email')
//   }
// })

// app.post('/api/v1/user/signin', async (c) => {
//   const body = await c.req.json();
//   // here need to add zod validation

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   try {
//      // we havn't do zod, hashed th password
//     const user = await prisma.user.findFirst({
//       where: {
//         username: body.username,
//         password: body.password,
//       }
//     })
//     // if user doesnot exist
//     if(!user) {
//       c.status(403); //unauthorized
//       // return c.text('User not exist')
//       return c.json({
//         message: "Incorrect Credentilas"
//       })
//     }

//     // jwt authentication
//     const jwt = await sign({id: user.id}, c.env.JWT_SECRET )

//     // return c.text('User Successfully Signup') 
//     return c.text(jwt) 
//   } catch (e) {
//     // console.log(e);
    
//     c.status(411);
//     return c.text('User already exists with this email')
//   }
// })

// app.post('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })

// app.put('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })

// app.get('/api/v1/blog/:id', (c) => {
//   return c.text('Hello Hono2!')
// })

// app.get('/api/v1/blog/bulk', (c) => {
//   return c.text('Hello Hono2!')
// })




