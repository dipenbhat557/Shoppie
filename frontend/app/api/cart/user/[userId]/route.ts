

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // const session = await getSession();
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const userId = session?.user?.id;

    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop(); // Get userId from the URL path

    // Ensure userId is defined
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }

    console.log("user id is ",userId)
    const cartReq = await req.json();
    console.log("cart req from cart route is ",cartReq)

    const response = await fetch(`${process.env.API_ROOT}/api/cart/user/${userId}`, {
      method: "PUT", // Assuming you want to update the cart
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartReq),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    console.log("-------------------------------")
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop(); // Get userId from the URL path

    // Ensure userId is defined
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }

    console.log("user id is wait for mw ",userId)

    const response = await fetch(`${process.env.API_ROOT}/api/cart/user/${userId}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
