'use client';

import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  editTooltip?: string;
  deleteTooltip?: string;
  viewTooltip?: string;
}

/**
 * ActionButtons component that displays action icons side by side
 * Maintains horizontal layout even on smaller screens
 */
export default function ActionButtons({
  onEdit,
  onDelete,
  onView,
  editTooltip = 'Edit',
  deleteTooltip = 'Delete',
  viewTooltip = 'View Details'
}: ActionButtonsProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        // This ensures buttons stay side by side even on smaller screens
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        minWidth: 'fit-content'
      }}
    >
      {onEdit && (
        <Tooltip title={editTooltip}>
          <IconButton 
            onClick={onEdit} 
            size="small" 
            color="primary"
            sx={{ p: 0.5 }}
          >
            <Icon icon="ic:baseline-edit" width={20} height={20} />
          </IconButton>
        </Tooltip>
      )}
      
      {onView && (
        <Tooltip title={viewTooltip}>
          <IconButton 
            onClick={onView} 
            size="small" 
            color="info"
            sx={{ p: 0.5 }}
          >
            <Icon icon="ic:baseline-visibility" width={20} height={20} />
          </IconButton>
        </Tooltip>
      )}
      
      {onDelete && (
        <Tooltip title={deleteTooltip}>
          <IconButton 
            onClick={onDelete} 
            size="small" 
            color="error"
            sx={{ p: 0.5 }}
          >
            <Icon icon="ic:baseline-delete" width={20} height={20} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
