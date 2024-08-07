// app/api/adarsh/route.ts

import { NextResponse } from 'next/server';
import {prisma} from '../../../utils/db';

export async function GET() {
  try {
    const adarsh = await prisma.adarsh.findUnique({ where: { id: '301feb70-7e9a-44c0-9a66-1b97b3caf0ee' } });console.log(adarsh);
    return NextResponse.json(adarsh);
    
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching Adarsh details' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { tagline, bio,image, email, resume, github, linkedin } = await request.json();
    const adarsh = await prisma.adarsh.upsert({
      where: { id: '301feb70-7e9a-44c0-9a66-1b97b3caf0ee' },
      update: { tagline, bio,image, email, resume, github, linkedin },
      create: { tagline, bio,image, email, resume, github, linkedin },
    });
    return NextResponse.json(adarsh);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating Adarsh details' }, { status: 500 });
  }
}
