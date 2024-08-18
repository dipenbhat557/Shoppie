import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.API_ROOT;

export async function DELETE(req: NextRequest, { params }: { params: { userId: string, productId: string } }) {
  const { userId, productId } = params;
  console.log("user id is ",userId," product id is ",productId)

  try {
    // Forward the request to the backend
    const response = await fetch(`${apiUrl}/api/cart/user/${userId}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete item from cart');
    }

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: response.status });
  } catch (error: any) {
    console.error('Error forwarding request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
