import { useEffect, useState } from 'react';
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
import { FormattedDate, FormattedNumber } from 'react-intl';
import { useNavigate } from "react-router-dom";
import { columns } from '../../Models/Column';
import { Data } from '../../Models/Data';


const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#b2a419',
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const fetcher = (url: string) => fetch(url).then(
  (res) => res.json()
);



const Home = () => {
  const latestPage = Number(JSON.parse(localStorage.getItem('page') || ""))

  const [page, setPage] = useState(latestPage);
  const [rows, setRows] = useState<Data[]>([]);
  const [count, setCount] = useState(0);
  const { data, error } = useSWR(`https://swapi.dev/api/starships/?page=${page}`, fetcher)



  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleSelectedRow = (row: Data) => {
    localStorage.setItem("starship", JSON.stringify(row))
    localStorage.setItem("page", page.toString())
    navigate("/detailed_item", { replace: true });
  };
  useEffect(() => {
    if (data) {
      setRows(data.results)
      setCount(Math.ceil(data.count / 10))
    }

  }, [data])

  return (
    <Container className='container' >

      {!data && !error ? <div> <Box sx={{ display: 'flex' }} data-testid="loading">
        <CircularProgress size='30vh' />
      </Box></div> : null}

      {
        data ?
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
                                {column.format === 'number' && value === 'unknown' &&
                                  value
                                }
                                {column.format === 'number' && value != 'unknown' &&
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

          :
          <div>No Data to Show</div>
      }
    </Container>

  );
}

export default Home