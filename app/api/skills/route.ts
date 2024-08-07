// app/api/skills/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '../../../utils/db';

export async function GET() {
  const skills = await prisma.skills.findMany();
  return NextResponse.json({ skills });
}

export async function POST(request: Request) {
  const data = await request.json();
  const newSkill = await prisma.skills.create({ data });
  return NextResponse.json(newSkill);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const updatedSkill = await prisma.skills.update({
    where: { id: data.id },
    data,
  });
  return NextResponse.json(updatedSkill);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.skills.delete({ where: { id } });
  return NextResponse.json({ message: 'Skill deleted' });
}
