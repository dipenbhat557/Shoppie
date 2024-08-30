import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// Handles POST requests for signup
export async function POST(request: NextRequest) {
  // Extract form data from the request
  const formData = await request.formData();
  const reqData = formData.get('req');
  const file = formData.get('file');

  // Parse the request data if available
  const parsedData = reqData ? JSON.parse(reqData as string) : null;

  // Prepare data to be sent to the backend
  const backendFormData = new FormData();
  backendFormData.append('req', JSON.stringify(parsedData));
  if (file) {
    backendFormData.append('file', file);
  }

  // Send POST request to the backend
  const res = await axios.post(
    `${process.env.API_ROOT}/auth/signup`,
    backendFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  // Return appropriate response based on the status
  if (res.status === 201 || res.status === 200) {
    return NextResponse.json(await res.data);
  } else {
    return NextResponse.json({ error: 'Sign up failed' }, { status: res.status });
  }
}
