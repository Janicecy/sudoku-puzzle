import _ from 'lodash'
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { ReactElement } from 'react'

interface IProps {
  numberOnClick: (num: number) => void
}

const StyledButton = styled(Button)({
  backgroundColor: '#eaeef4',
  marginTop: 10,
  '&:hover': {
    backgroundColor: '#d2dae7',
  },
  width: '31%',
  fontSize: 30,
  fontWeight: 'bold',
  height: 100
})

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
})

export default function InputBoard(props: IProps): ReactElement {
  const { numberOnClick } = props
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {(_.range(1, 10).map((n, idx) => (
        <StyledButton key={idx} onClick={() => numberOnClick(n)}>{n}</StyledButton>
      )))}
    </Box>
  )
}

