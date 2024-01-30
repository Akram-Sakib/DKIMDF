// import { NextFunction, Request, Response } from 'express';
import { type NextRequest } from "next/server";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequest = async (
  schema: AnyZodObject | ZodEffects<AnyZodObject>,
  req: NextRequest
) => {
  "use server"
  try {
    
    const body = await req.json()
    await schema.parseAsync({
      body,
      // query: req.query,
      // params: req.params,
      // cookies: req.cookies,
    });
  } catch (error) {
    console.log({ error, requestBody: req });
  }
};

export default validateRequest;
