import React from 'react';
import { Stack, Typography, TextareaAutosize } from '@mui/material';

function JobDescription() {
  return (
    <Stack
      spacing={2}
      sx={{
        width: '300px',
        alignItems: 'center',
        p: 2 
      }}
    >
      {/* Job Description Topic */}
      <Typography variant="h6" gutterBottom>
        Job Description
      </Typography>

      {/* Job Description Input (Text Area) */}
      <TextareaAutosize
        minRows={4}
        maxRows={20}
        placeholder="Enter the job description here"
        style={{
          width: '100%',
          height: '137px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          resize: 'none',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
        }}
      />
    </Stack>
  );
}

export default JobDescription;
