import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  const { name,username, password } = await request.json();

  const res = await axios.post(
        'http://localhost:8080/auth/signup',
        {
            name:name,
            username:username,
            password:password
        },
        {
            headers: {
                'Content-Type': 'application/json',
      
            }
        }
    )

  if (res.status==200) {
    return NextResponse.json(await res.data);
  } else {
    return NextResponse.json({ error: 'Sign up failed' }, { status: res.status });
  }
}
