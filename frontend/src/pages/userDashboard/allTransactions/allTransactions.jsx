import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, CircularProgress, TextField, Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAllTransactions } from '../../../store/Transactions/transactionActions';
import Sidebar from '../../../components/layout/hero/Sidebar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: '#4727eb', 
    color: theme.palette.common.white,
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const AllTransactionsPage = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(getAllTransactions('66368f2c4a2af0ab45a53625'));
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: 20, flexGrow: 1 }}
      >
        <Typography variant="h4" component="h1" gutterBottom className="font-bold" color="white">
          All Transactions
        </Typography>
   
       
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <TableContainer component={Paper} style={{ width: '100%' }}>
            <Table style={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <StyledTableRow key={transaction._id}>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{`$${transaction.amount}`}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>
    </div>
  );
};

export default AllTransactionsPage;
