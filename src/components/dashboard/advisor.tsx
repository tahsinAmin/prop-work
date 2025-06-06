import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';


const contactPerson = {
  name: 'La Dolce Vita',
  company: 'Easy Games Ltd.',
  email: 'eamiladdress@gmail.com',
  phone: '099999999',
  image: '/game-1.jpg'
}

const Advisor = () => {
  
  return (
    <Box sx={{ mb: 6, mt: 8, position: 'relative', pr: '140px' }}>
        <Box sx={{mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 600, 
            fontSize: '32px',
            mb: 0,
            position: 'relative',
            display: 'inline-block'
          }}>
            Meet your Contact Person & Details
          </Typography>
        </Box>

        <Grid container alignItems="center">
          <Grid item xs={12} md={5}>

            <Box sx={{           }}>
              <Image 
                src="/curly.svg" 
                alt="Curly underline" 
                width={416}
                height={268}
              />
            </Box>
              
          </Grid>
          <Grid item xs={12} md={7}></Grid>
        </Grid>
        

        <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
            <Box sx={{ pl: { xs: 0, md: 4 } }}>
              <Typography sx={{ 
                fontWeight: 500,
                fontSize: '48px',
                mb: 2,
                color: 'primary.main'
              }}>
                {contactPerson.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 400, fontSize: '24px', mb: 3 }}>
              Your Game Expert
              </Typography>

              <Box sx={{ fontWeight: 400, mb: 0.5 }}>
                <Typography component="span" sx={{ color: '#666666', fontSize: '24px' }}>
                  Phone:{' '}
                </Typography>
                <Typography component="span" sx={{ color: '#000000', fontSize: '24px' }}>
                  {contactPerson.phone}
                </Typography>
              </Box>

              <Box sx={{ fontWeight: 400, mb: 0.5 }}>
                <Typography component="span" sx={{ color: '#666666', fontSize: '24px' }}>
                  Email:{' '}
                </Typography>
                <Typography component="span" sx={{ color: '#000000', fontSize: '24px' }}>
                  {contactPerson.email}
                </Typography>
              </Box>

              <Box sx={{ fontWeight: 400, mb: 3 }}>
                <Typography component="span" sx={{ color: '#666666', fontSize: '24px' }}>
                  Company:{' '}
                </Typography>
                <Typography component="span" sx={{ color: '#000000', fontSize: '24px' }}>
                  {contactPerson.company}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<WhatsAppIcon />}
                  sx={{ textTransform: 'none', width: '218px', height: '60px' }}
                >
                  Whatsapp
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  startIcon={<PhoneIcon />}
                  sx={{ textTransform: 'none', width: '218px', height: '60px' }}
                >
                  Call
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ 
              position: 'relative',
              width: '100%',
              height: '441px',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <Image
                src="/advisor.jpg"
                alt="Advisor"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          
        </Grid>
      </Box>
  );
};

export default Advisor;
