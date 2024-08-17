import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  const formData = await request.formData();
    const reqData = formData.get('req');
    const file = formData.get('file');

    const parsedData = reqData ? JSON.parse(reqData as string) : null;

    const backendFormData = new FormData();
    backendFormData.append('req', JSON.stringify(parsedData));
    if (file) {
      backendFormData.append('file', file);
    }

  const res = await axios.post(
        `${process.env.API_ROOT}/auth/signup`,
        backendFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
    )

  if (res.status==201 || res.status == 200) {
    return NextResponse.json(await res.data);
  } else {
    return NextResponse.json({ error: 'Sign up failed' }, { status: res.status });
  }
}
