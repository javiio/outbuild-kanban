'use client';

import React from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { useRightPanel } from '@/core/data';
import { PageHeader, FormPanel } from '@/core/ui';

export const Page = ({ children }: { children: React.ReactNode }) => {
  const { showing } = useRightPanel();

	return (
    <main className="-mt-12 ml-[368px] h-[calc(100vh-5.1rem)] relative">
      <PageHeader />
      <PanelGroup direction="horizontal" autoSaveId="page-layout">
        <Panel
          defaultSize={showing ? 60 : 100}
          minSize={30}
          id="page-content"
          className='pr-0.5'
        >
          <div className="h-full overflow-auto">
            {children}
          </div>
        </Panel>

        {showing && (
          <>
            <PanelResizeHandle className="bg-slate-600 cursor-col-resize w-1 hover:bg-slate-500 hover:shadow-xl" />
            <Panel minSize={20} id="page-form" className="bg-slate-800 transition-all">
              <FormPanel />
            </Panel>
          </>
        )}
      </PanelGroup>
    </main>
  );
};
