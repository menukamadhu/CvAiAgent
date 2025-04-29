import React from 'react';
import { Box } from '@mui/material';
import ChatBox from './ChatBox';
import InputFileUpload from './InputFileUpload';
import JobDescription from './JobDescription';
import AiTypingAnimation from './AiTypingAnimation';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100%',
        p: 2,
        gap: 2,
      }}
    >
      {/* Left side: File Upload and Job Description */}
      <Box
        sx={{
          width: '300px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          gap: 3,
        }}
      >
        {/* File Upload Component */}
        <InputFileUpload />

        {/* Job Description Component */}
        <JobDescription />
      </Box>

      {/* Right side: Chat Area */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        {/* AI Typing Animation */}
        <AiTypingAnimation />

        {/* ChatBox */}
        <ChatBox />
      </Box>
    </Box>
  );
}

export default App;
