import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("Request: GET Called");

    const trans_id = req.nextUrl.searchParams.get("tran_id")

    if (!trans_id) {
        return new NextResponse(
            JSON.stringify({
                message: "Transaction ID is required",
            }),
            {
                status: 400,
            }
        );
    }
    // const data = await req.json();
    return redirect(`/payments/failed?trans_id=${trans_id}`);
    // return new NextResponse(JSON.stringify("GET: " + data));
}
export async function POST(req: NextRequest) {

    console.log("Request: POST Called");

    const trans_id = req.nextUrl.searchParams.get("tran_id")

    if (!trans_id) {
        return new NextResponse(
            JSON.stringify({
                message: "Transaction ID is required",
            }),
            {
                status: 400,
            }
        );
    }
    // const data = await req.json();
    return redirect(`/payments/failed?trans_id=${trans_id}`);

    // return new NextResponse(
    //     JSON.stringify({
    //         message: "Payment Cenceled",
    //     })
    // );
}