import React from 'react'
import { ProjectBoard } from '@/projects/components/board/Board';

export default async function BoardPage({ params }: { params: Promise<{ id: string }>}) {
  const id = (await params).id;

  return (
    <div className="pt-4">
      <ProjectBoard projectId={id} />
    </div>
  );
}
