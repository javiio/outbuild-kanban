import React, { useEffect, useState } from 'react';
import { Input, Modal, Button } from '@/core/ui';
import { useProjects } from '@/projects';

export interface NewProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
	const [name, setName] = useState('');
	const [key, setKey] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { add } = useProjects();

	useEffect(() => {
		setKey((prev) => prev + 1);
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setIsLoading(true);
    e.preventDefault();

		add({ name });
		onClose();
		setName('');
		setIsLoading(false);
  };

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="New Project">
			<form onSubmit={handleSubmit}>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="text-xl font-light px-4"
					placeholder="Name..."
					autoFocus
					key={key} // Hack to re-render the input and focus it
				/>

				<div className="flex flex-row-reverse justify-start space-x-4 space-x-reverse mt-6 text-white">
					<Button type="submit" disabled={name === ''} isLoading={isLoading}>
						Create Project
					</Button>
					<Button onClick={onClose} variant="link">
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
};
