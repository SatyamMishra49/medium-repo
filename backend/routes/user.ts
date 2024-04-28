import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@lakshaycode22/medium-common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await c.req.json();
    const { success } = signupInput.safeParse(user);
    if (!success) {
      throw new Error("invalid credentials");
    }
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
      },
    });
    const payload = {
      id: newUser.id,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    c.status(200);
    return c.json({
      message: "user created successfully",
      token,
    });
  } catch (error) {
    c.status(411);
    return c.text("There is an error in the signup route :" + error);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = await new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userData = await c.req.json();
    const { success } = signinInput.safeParse(userData);
    if (!success) {
      throw new Error("invalid credentials");
    }
    const user = await prisma.user.findUnique({
      where: {
        username: userData.username,
        password: userData.password,
      },
    });
    if (user) {
      const payload = {
        id: user.id,
      };
      const secret = c.env.JWT_SECRET;
      const token = await sign(payload, secret);
      c.status(200);
      return c.json({
        message: "signed in successfully",
        token,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    c.status(411);
    return c.text("There is an error in the signup route :" + error);
  }
});

export default userRouter;
