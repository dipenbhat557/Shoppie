import { NextRequest, NextResponse } from "next/server";

// Handles PUT requests to update the cart for a specific user
export async function PUT(req: NextRequest) {
  try {
    // Extract userId from the URL path
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop(); // Get userId from the URL path

    // Ensure userId is defined
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }

    // Parse the request body
    const cartReq = await req.json();

    // Forward the request to the backend API
    const response = await fetch(`${process.env.API_ROOT}/api/cart/user/${userId}`, {
      method: "PUT", // Update the cart
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartReq),
    });

    // Parse and return the response
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// Handles GET requests to retrieve the cart for a specific user
export async function GET(req: NextRequest) {
  try {
    // Extract userId from the URL path
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop(); // Get userId from the URL path

    // Ensure userId is defined
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
    }

    // Forward the request to the backend API
    const response = await fetch(`${process.env.API_ROOT}/api/cart/user/${userId}`);

    // Parse and return the response
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
