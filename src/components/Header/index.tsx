import React, { ReactElement, } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'rgb(54 74 99)',
    marginBottom: 10,
    display: 'flex'
  },
  githubIcon: {
    marginLeft: 'auto',
    cursor: 'pointer',
    color: 'black'
  }
})

export default function Header(): ReactElement {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <div>Sudoku</div>
      <a
        rel="noopener noreferrer"
        target='_blank'
        className={classes.githubIcon}
        href='https://github.com/Janicecy/sudoku-puzzle'>
        <GitHubIcon />
      </a>
    </Box>
  )
}