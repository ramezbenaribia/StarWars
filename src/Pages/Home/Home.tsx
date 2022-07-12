import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, Container, Pagination } from '@mui/material';
import './Home.css'
import styled from '@emotion/styled';
import useSWR from 'swr'
import { columns, Data } from './Models';
import { FormattedDate, FormattedNumber, useIntl } from 'react-intl';



const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#b2a419',
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const fetcher = (url: string) => fetch(url).then(
  (res) => res.json()
);



const Home = () => {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(`https://swapi.dev/api/starships/?page=${page}`, fetcher)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectedRow = (row: Data) => {
    console.log(row)
  };



  if (error) return <>"An error has occurred."</>;
  if (!data) return <Box sx={{ display: 'flex' }}>
    <CircularProgress size='30vh' />
  </Box>;

  let rows: Data[] = data.results;


  let count = Math.ceil(data.count / 10)

  return (
    <Container className='container' >
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer >
          <Table >
            {/* this is the Header of the Table */}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* the rows and our that we are going to fetch will be represented here */}
              {rows
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} onClick={() => handleSelectedRow(row)} key={row.name}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format === 'Date' &&
                              <FormattedDate
                                value={value}
                              />
                            }
                            {column.format === 'number' &&
                              < FormattedNumber value={Number(value)} />
                            }

                            {column.format != 'number' && column.format != 'Date' &&
                              value
                            }

                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          page={page}
          count={count}
          onChange={handleChangePage}
        />
      </Paper>
    </Container>
  );
}

export default Home