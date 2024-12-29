import React, { useState, useEffect } from 'react';
import { TitleForm, Textarea, IconPicker, ColorPicker, Text, type IconName, type ColorName } from '@/core/ui';
import { useProject, type Project } from '@/projects';

interface ProjectFormProps {
	project: Project;
};

export const ProjectForm = ({ project }: ProjectFormProps) => {
	const projectActions = useProject(project, { realtime: true });
	const [icon, setIcon] = useState<IconName>();
	const [color, setColor] = useState<ColorName>();

	useEffect(() => {
		projectActions.view();
		const unload = () => {
			projectActions.unview();
		};
		return unload;
	}, []);

	useEffect(() => {
		if (project) {
			setIcon(project.icon);
			setColor(project.color);
		}
	}, [project]);

	const handleIconChange = (value: IconName) => {
		setIcon(value);
		projectActions.update({ icon: value });
	}

	const handleColorChange = (value: ColorName) => {
		setColor(value);
		projectActions.update({ color: value });
	}

	if (!projectActions.item && !projectActions.isLoading) {
		return (
			<>
				<Text.H2>ERROR</Text.H2>
				<Text>Project not found. Maybe it was deleted by someone else.</Text>
			</>
		);
	}

	return (
		<div className="flex flex-col space-y-6">
			<TitleForm itemActions={projectActions} />

			<div className="flex space-x-2">
				<IconPicker value={icon} onChange={handleIconChange} size="xs" />
				<ColorPicker value={color} onChange={handleColorChange}  size="xs" />
			</div>

			<Textarea itemActions={projectActions} />
		</div>
	);
};
