'use client';

import { useParams } from 'next/navigation';
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import SimilarGames from '@/components/dashboard/similar-games';
import Advisor from '@/components/dashboard/advisor';

export default function DetailView() {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const gameData = {
    id,
    title: 'Ajmon Brokers Event',
    category: 'REAL ESTATE EVENTS',
    subCategory: 'Property Showcases & Launches',
    status: 'approved',
    gameType: 'Online',
    startDate: '2025-03-21',
    endDate: '2025-03-21',
    startTime: '10:00',
    endTime: '19:00',
    location: 'Online',
    locationLink: 'https://example.com/join-game',
    videoLink: 'https://youtube.com/embed/example',
    description: 'A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a large private marina pen in the heart of Pittwater',
    coverImage: '/game-1.jpg',
    admin_comment: 'RAK Properties',
    city: 'Al Ain',
    country: 'Dubai'
  };

  return (
    <Box>
      {/* Banner Image - Full Width */}
      <Box sx={{
        width: '100%',
        height: '419px',
        borderRadius: 2,
        pr: '140px'
      }}>
        <Image
          src={gameData.coverImage}
          alt={gameData.title}
          width={1300}
          height={391}
        />
      </Box>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap', justifyContent: 'space-between', pr: '140px' }}
      >
        <Box>
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: '500', fontSize: '32px' }}>
              {gameData.title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  {new Date(`1970-01-01T${gameData.startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - {new Date(`1970-01-01T${gameData.endTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} at {new Date(gameData.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Powered by {gameData.admin_comment}</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 0 }}>
              <Typography sx={{ fontWeight: '600', fontSize: '20px' }}>
                {gameData.category}
              </Typography>
              <Typography sx={{ fontWeight: '400', fontSize: '18px', color: 'primary.main' }}>
                {gameData.subCategory}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 1 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" sx={{ fontSize: '20px', color: 'primary.main' }}>{gameData.city}</Box>
            <Box>{gameData.country}</Box>
            <Image
              src="/send.jpg"
              alt="send"
              width={20}
              height={20}
            />
          </Typography>
          <Typography>
            Another District or anything name need
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            endIcon={<ShareIcon />}
            sx={{ backgroundColor: '#F4F8EE', textTransform: 'none', width: '218px', height: '60px' }}
          >
            Share Game
          </Button>
        </Box>
      </Stack>
      <Typography sx={{ mb: 5, pr: '140px' }}>
        {gameData.description}
      </Typography>

      {/* Video and Map Section */}
      <Grid container spacing={4} sx={{ mb: 4, pr: '140px' }}>
        {/* Video Section */}
        <Grid item xs={12} md={6}>

          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: '500', fontSize: '32px', lineHeight: 1 }}>
              Event Videos
            </Typography>
            <Typography sx={{ fontWeight: '400', fontSize: '16px', lineHeight: 1 }}>
              For Better Understand
            </Typography>
          </Box>
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
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: '500', fontSize: '32px', lineHeight: 1 }}>
              Game Location
            </Typography>
            <Typography sx={{ fontWeight: '400', fontSize: '16px', lineHeight: 1 }}>
              Find our place easly
            </Typography>
          </Box>
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
      <Grid container spacing={4} sx={{ pr: '140px' }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" sx={{ fontSize: '20px' }}>Game</Typography>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontSize: '32px', lineHeight: 1 }}>Meeting Link</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{
            display: 'flex',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            overflow: 'hidden',
            height: '65px',
            width: '100%',
            backgroundColor: 'background.paper'
          }}>
            <Box sx={{
              px: 2,
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              backgroundColor: 'background.paper',
              color: 'primary.main'
            }}>
              meet.google.com/abc/defg/hij
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"

            sx={{
              px: 4,
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 600,
              width: '100%',
              height: '60px'
              // mt: { xs: 2, sm: '28px' }
            }}
          >
            Register Now
          </Button>
        </Grid>
      </Grid>
      <SimilarGames />
      {/* Meet Our Advisor Section */}
      <Advisor/>
    </Box>
  );
}