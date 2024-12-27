'use client';

import React, { useState } from 'react'
import { Page, Button, Icons, Text } from '@/core/ui';
import { useProjects, ProjectList, ProjectForm, NewProjectModal } from '@/projects';

export default function ProjectsPage() {
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const { selected, setSelected } = useProjects();

  return (
    <Page>
      <Page.Header>
        <div className="px-6 flex items-center space-x-16">
          <Text.H1>Projects</Text.H1>
          <Button
            size='sm'
            icon={Icons.Plus}
            onClick={() => setIsNewFormOpen(true)}
          >
            New
          </Button>
        </div>
      </Page.Header>

      <Page.Content>
        <div className="p-4">
          <ProjectList />
        </div>

        <NewProjectModal
          isOpen={isNewFormOpen}
          onClose={() => setIsNewFormOpen(false)}
        />
      </Page.Content>

      {selected && (
        <Page.Panel onClose={() => setSelected(undefined)}>
          <ProjectForm project={selected} key={selected.id} />
        </Page.Panel>
      )}
      </Page>
    );
};
