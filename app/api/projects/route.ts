// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '../../../utils/db';

export async function GET() {
  const projects = await prisma.projects.findMany();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const data = await request.json();
  const newProject = await prisma.projects.create({ data });
  return NextResponse.json(newProject);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const updatedProject = await prisma.projects.update({
    where: { id: data.id },
    data,
  });
  return NextResponse.json(updatedProject);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.projects.delete({ where: { id } });
  return NextResponse.json({ message: 'Project deleted' });
}
