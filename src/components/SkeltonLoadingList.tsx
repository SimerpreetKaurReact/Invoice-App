import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useAuthContext } from '../user/AuthContext';

export default function SkeltonLoadingList() {
  const authContext = useAuthContext()
  console.log(authContext)
  return (
    <Box sx={{ width: 300 }}>
         <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}