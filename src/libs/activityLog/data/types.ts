import { ActionType } from '@/core/data';
import { Icons } from '@/core/ui/Icons';
import { Colors } from '@/core/ui/Colors';

export const ActionTypeData = {
  [ActionType.View]: { name: 'viewing', icon: Icons.Eye, color: Colors.blue },
  [ActionType.Edit]: { name: 'editing', icon: Icons.Pencil, color: Colors.green },
  [ActionType.Move]: { name: 'moving', icon: Icons.Move, color: Colors.yellow },
};
