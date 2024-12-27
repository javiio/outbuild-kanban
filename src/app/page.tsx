'use client';
// TODO: remove use client

import Head from 'next/head';
import React from 'react'
import { Page } from '@/core/ui';
import { ProjectBoard, ProjectTabs } from '@/projects';
import { useTasks, TaskForm } from '@/tasks';

export default function ProjectsPage() {
  const { currentProject, setCurrentProject, selected, setSelected } = useTasks();

  return (
    <>
      <Head>
        <title>Outbuild | Kanban</title>
        <link rel="icon" href='/favicon.png' />
      </Head>
      <Page>
        <Page.Header>
          <ProjectTabs
            project={currentProject}
            setProject={setCurrentProject}
          />
        </Page.Header>
  
        <Page.Content>
          {currentProject && <ProjectBoard project={currentProject} />}
        </Page.Content>
  
      {selected && (
        <Page.Panel onClose={() => setSelected(undefined)}>
          {currentProject && <TaskForm task={selected} key={selected.id} />}
        </Page.Panel>
      )}
      </Page>
    </>
  )
}