import { NextRequest, NextResponse } from 'next/server';

// Base URL for API requests
const apiUrl = process.env.API_ROOT;

// Handles DELETE requests to remove an item from the cart
export async function DELETE(req: NextRequest, { params }: { params: { userId: string, productId: string } }) {
  const { userId, productId } = params;

  try {
    // Forward the request to the backend API
    const response = await fetch(`${apiUrl}/api/cart/user/${userId}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete item from cart');
    }

    // Return success response
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: response.status });
  } catch (error: any) {
    // Log the error and return error response
    console.error('Error forwarding request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
