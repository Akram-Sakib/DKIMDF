import { dataConfig, sslConfig } from "@/config/sslConfig";
import { generateTransactionId } from "@/utils/generateTransactionId";
import { NextResponse } from "next/server";

export async function GET() {
    let transactionId = generateTransactionId();
    const data = dataConfig({
        total_amount: 200,
        tran_id: transactionId,
        success_url: `http://localhost:3000/api/payment/success?tran_id=${transactionId}`,
        fail_url: "http://localhost:3000/api/payment/fail?tran_id=${transactionId}",
        cancel_url: "http://localhost:3000/api/payment/cancel",
        product_name: "Samsung Galaxy S23 ultra",
        product_category: "mobile",
        cus_name: "Kajol Roy",
        cus_email: "shrikajol@gmail.com",
        cus_add1: "Lalmonirhat",
        cus_phone: "01705956055",
    });
    try {
        const result = await sslConfig.init(data);
        if (!result.GatewayPageURL || result.status === "FAILED") {
            return NextResponse.json({ message: result.failedreason });
        } else if (result.status === "SUCCESS") {
            // const newData = {
            //   paid: false,
            //   totalAmount: 256,
            //   name: "Kajol",
            //   address: "Lalmoni",
            //   trans_id: transactionId,
            // };
            // mongoDB.payment.create(newData)
            // Add new payment but ( paid: false )
            // if redirect to success route then change ( paid: true ) in success route
            // console.log(result);

            return NextResponse.redirect(result.GatewayPageURL);
        }

        // return new NextResponse(JSON.stringify(result));
    } catch (error) {
        return new NextResponse(JSON.stringify("Error: " + error));
    }
}

export async function POST() {
    return new NextResponse(JSON.stringify("This is a POST request"));
}