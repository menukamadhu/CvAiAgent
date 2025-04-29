import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

function ChatBox() {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    if (chatInput.trim() === '') return;

    const userMessage = { from: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = { from: 'ai', text: `AI Response to: "${userMessage.text}"` };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'flex-start', 
      p: 2 
    }}>
      
      <Box sx={{ 
        width: '95%',
        maxWidth: '1400px',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        
        <Typography variant="h5" gutterBottom>
          Chat with AI Agent
        </Typography>

        <Paper 
          variant="outlined" 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2, 
            mb: 2, 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '400px'
          }}
        >
          <List>
            {chatMessages.map((msg, idx) => (
              <ListItem 
                key={idx} 
                sx={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Box 
                  sx={{
                    bgcolor: msg.from === 'user' ? '#1976d2' : '#e0e0e0',
                    color: msg.from === 'user' ? '#fff' : '#000',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
          />
          <Button
            variant="contained"
            onClick={handleSendChat}
            disabled={chatInput.trim() === ''}
          >
            Send
          </Button>
        </Box>

      </Box>
    </Box>
  );
}

export default ChatBox;
