import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Grid, Typography, TextField, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'; // Import SignalR

import ResponsiveAppBar from './ResponsiveAppBar';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [isConnected, setIsConnected] = useState(false);

  const connectionRef = useRef(null);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setCvFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Connect to SignalR server
  const connectToSignalR = async () => {
    if (isConnected) return; // Don't attempt to reconnect if already connected

    const connection = new HubConnectionBuilder()
      .withUrl('wss://localhost:44344/chat-sample-hub') // WebSocket endpoint
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveMessage', (message) => {
      setChatMessages((prev) => [...prev, { from: 'ai', text: message }]);
    });

    try {
      await connection.start();
      setIsConnected(true);
      setConnectionStatus('Connected');
      connectionRef.current = connection;
      console.log('Connected to SignalR');
    } catch (err) {
      console.error('Connection failed:', err);
      setConnectionStatus('Connection failed');
    }
  };

  // Send chat message
  const handleSendChat = async () => {
    if (chatInput.trim() === '') return;

    // If not connected, connect first
    if (!isConnected) {
      await connectToSignalR();
    }

    if (connectionRef.current) {
      setChatMessages((prev) => [...prev, { from: 'user', text: chatInput }]);
      setChatInput('');

      // Send message via SignalR
      try {
        await connectionRef.current.invoke('SendMessage', chatInput);
      } catch (err) {
        console.error('Message sending failed:', err);
      }
    }
  };

  useEffect(() => {
    // Connect to SignalR automatically on mount if needed
    if (!isConnected) {
      connectToSignalR();
    }
  }, [isConnected]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ResponsiveAppBar />
      <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Left Side */}
        <Grid item xs={12} md={6} sx={{ p: 2, overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Job Description</Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Upload Your CV</Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                padding: 3,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isDragActive ? '#f0f0f0' : 'transparent',
              }}
            >
              <input {...getInputProps()} />
              {cvFile ? (
                <Typography>{cvFile.name}</Typography>
              ) : (
                <Typography>Drag & drop your CV here, or click to select file</Typography>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right Side (Chat) */}
        <Grid item xs={12} md={6} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h6" gutterBottom>Chat with AI Agent</Typography>
          <Paper variant="outlined" sx={{ flex: 1, overflowY: 'auto', p: 1, mb: 2 }}>
            <List>
              {chatMessages.map((msg, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={msg.text}
                    primaryTypographyProps={{ align: msg.from === 'user' ? 'right' : 'left' }}
                  />
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
            <Button variant="contained" onClick={handleSendChat} disabled={!isConnected || connectionStatus === 'Connection failed'}>
              Send
            </Button>
          </Box>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
            {connectionStatus}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
