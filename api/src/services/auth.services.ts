
import { ApiError } from "../utils/ApiError";
import { hashedPassword, verifyPassword } from "../utils/hash";
import prisma from "./prisma";
import { z } from "zod";



export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

type SignupInput = z.infer<typeof signupSchema>;
type LoginInput=z.infer<typeof loginSchema>;

export const signup = async (data:SignupInput)=>{
 const parsed = signupSchema.safeParse(data);


     if (!parsed.success) {
    const errors = parsed.error.flatten();
    throw new ApiError(400,"Email or Password is not valid", [JSON.stringify(errors)]);
  }

    const {name,email,username,password}=parsed.data;

    const existingUser= await prisma.user.findFirst({
        where:{OR:[{email},{username}]},
    });

    if(existingUser){
        throw new ApiError(409,"Email already in use");
    }

  
const hash = await hashedPassword(password);
const user = await prisma.user.create(
    {data:{
        username,
        email,
        name,
        password:hash,
    },
    select:{
        id:true,
        email:true,
        name:true,
        username:true
    }}
);

return user;
};

export const login = async (data:LoginInput)=>{

  const parsed=loginSchema.safeParse(data);

  
 if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
  
     throw new ApiError(400,"Email or Password is not valid", [JSON.stringify(errors)]);
  }

const { email, password } = parsed.data;

  const user= await prisma.user.findUnique({where:{email}});

  if (!user) {
      throw new ApiError(401,"Invalid email or password");
  }

  const isValid = await verifyPassword(user.password, password);

  if (!isValid) {
    throw new ApiError(401,"Invalid email or password");
  }

  return user;

};
