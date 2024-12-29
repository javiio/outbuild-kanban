import React, {
	useState,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import type { Project } from '@/projects';
import type { Task } from '@/tasks';

type ItemType = 'projects' | 'tasks';
type Item = Project | Task;
type Showing = {
	type: ItemType,
	item: Item | undefined,
} | undefined;

interface RightPanelContextProps {
	showing: Showing;
	showPanel: (type: ItemType, item: Item | undefined) => void;
	hidePanel: () => void;
}

const RightPanelContext = createContext<RightPanelContextProps>({
	showing: undefined,
	showPanel: () => {},
	hidePanel: () => {},
});

export const ProvideRightPanel = ({ children }: { children: ReactNode }) => {
  const [showing, setShowing] = useState<Showing>();

	const showPanel = (type: ItemType, item: Item | undefined) => {
		setShowing({ type, item });
	};

	const hidePanel = () => {
		setShowing(undefined);
	}

  const value = {
		showing,
    showPanel,
		hidePanel,
  }

  return (
    <RightPanelContext.Provider value={value}>
      {children}
    </RightPanelContext.Provider>
  );
};

export const useRightPanel = () => useContext(RightPanelContext);
