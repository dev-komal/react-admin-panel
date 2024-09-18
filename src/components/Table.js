import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Paper } from '@mui/material'

export default function TableComponent({ rows, columns }) {
  return (
    <TableContainer
    component={Paper}
      sx={{
        borderRadius: '16px',
        mt: 4,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((o, i) => {
              return <TableCell key={i}>{o}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.category}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
