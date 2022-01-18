import React, { useState } from 'react'
import { Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  root: {
    maxWidth: 150,
    marginTop: 10
  }
})

export const DIFFICULTIES = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
}

interface SelectDifficultyProps {
  onChange: (difficulty: string) => void  
}

export default function SelectDifficulty(props: SelectDifficultyProps) {
  const { onChange } = props 
  const classes = useStyles()
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.EASY)
  return (
    <Box className={classes.root}>
      <FormControl fullWidth>
        <InputLabel>Difficulty</InputLabel>
        <Select
          value={difficulty}
          label="Difficulty"
          onChange={(e) => {
            setDifficulty(e.target.value)
            onChange(e.target.value)
          }}
        >
          {Object.entries(DIFFICULTIES)
            .map(([_, val]) => (
              <MenuItem key={val} value={val}>{val}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}
