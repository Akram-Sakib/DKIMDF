import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import httpStatus from "http-status";

const handler = withErrorHandler(async (request, context) => {
  const { id } = context.params;

  const result = {
    id,
    name: "John Doe ",
    email: "john@gmail.com ",
  };

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users created successfully!",
    data: result,
  };

  return sendResponse(data);
});

export { handler as GET, handler as POST };

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   console.log(params.id);
//   return NextResponse.json({ msg: "Hello World" });
// }