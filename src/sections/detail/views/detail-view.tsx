'use client';

import { useParams } from 'next/navigation';
import { Box, Typography, Paper, Grid, Button, Divider, Chip, Avatar, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LinkIcon from '@mui/icons-material/Link';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(4),
}));

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

const DetailSection = ({ title, children }: DetailSectionProps) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Box>
);

export default function DetailView() {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const gameData = {
    id,
    title: 'Epic Battle Royale',
    category: 'Action',
    subCategory: 'Battle Royale',
    status: 'Upcoming',
    gameType: 'Online',
    startDate: '2023-12-15',
    endDate: '2023-12-17',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Online',
    locationLink: 'https://example.com/join-game',
    videoLink: 'https://youtube.com/embed/example',
    description: 'Join the ultimate battle royale experience with players from around the world. Last player standing wins!',
    rules: '1. No cheating\n2. Respect other players\n3. Have fun!',
    prizes: '1st Place: $1000\n2nd Place: $500\n3rd Place: $250',
    terms: 'By participating, you agree to our terms and conditions.',
    coverImage: '/game-1.jpg',
    contactPerson: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      image: '/game-1.jpg'
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Banner Image - Full Width */}
      <Box sx={{ 
        position: 'relative', 
        width: '100%',
        height: 400,
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4
      }}>
        <Image
          src={gameData.coverImage}
          alt={gameData.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      {/* Game Title and Status */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {gameData.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon color="action" sx={{ mr: 1 }} />
            <Typography>
              {gameData.startTime} - {gameData.endTime} at {new Date(gameData.startDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography>•</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon color="action" sx={{ mr: 1 }} />
            <Typography>{gameData.location}</Typography>
          </Box>
        </Box>
        <Chip 
          label={gameData.category} 
          color="primary"
          variant="outlined"
          sx={{ mr: 1, mb: 2 }}
        />
        <Chip 
          label={gameData.subCategory}
          color="secondary"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Typography sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          {gameData.description}
        </Typography>
      </Box>

      {/* Video and Map Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Video Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Game Videos</Typography>
          <Box sx={{ 
            position: 'relative', 
            width: '100%',
            height: 300,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover .play-button': {
              transform: 'scale(1.1)'
            }
          }}>
            <Image
              src="/video-1.PNG"
              alt="Game Trailer"
              fill
              style={{ objectFit: 'cover' }}
            />
            <Box
              className="play-button"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.3s',
              }}
              onClick={() => window.open(gameData.videoLink, '_blank')}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 30, color: 'primary.main' }} />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Map Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Game Location</Typography>
          <Box sx={{ 
            width: '100%',
            height: 300,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0e0e0'
          }}>
            {/* Replace with your map component */}
            <Typography color="text.secondary">Map will be displayed here</Typography>
          </Box>
        </Grid>
      </Grid>
      

      {/* Meeting Link and Register Button */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>Game Meeting Link</Typography>
          <Box sx={{ 
            display: 'flex',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            overflow: 'hidden',
            height: 56
          }}>
            <Box sx={{ 
              px: 2, 
              display: 'flex', 
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              borderRight: '1px solid #e0e0e0'
            }}>
              <LinkIcon />
            </Box>
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center',
              px: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <Typography noWrap>meet.google.com/abc/defg/hij</Typography>
            </Box>
            <Button 
              variant="text" 
              color="primary"
              onClick={() => {
                navigator.clipboard.writeText('meet.google.com/abc/defg/hij');
                // Add toast/snackbar here
              }}
            >
              Copy
            </Button>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ 
            minWidth: 200,
            height: 56,
            alignSelf: { xs: 'stretch', sm: 'flex-end' }
          }}
        >
          Register Now
        </Button>
      </Box>
    </Box>
  );
}