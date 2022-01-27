import React, { ReactElement, } from 'react';
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 20
  },
  circle: {
    height: 60,
    width: 60,
    backgroundColor: '#eaeef4',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    cursor: 'pointer'
  },
})

interface CircularButtonProps {
  children: React.ReactNode
  underText: string,
  onClick?: () => void
}

export default function CircularButton(props: CircularButtonProps): ReactElement {
  const classes = useStyles()
  const { children, underText, onClick } = props
  return (
    <Box className={classes.root}>
      <Box onClick={onClick} className={classes.circle}>
        {children}
      </Box>
      <Typography color='primary'>{underText}</Typography>
    </Box>
  )
}