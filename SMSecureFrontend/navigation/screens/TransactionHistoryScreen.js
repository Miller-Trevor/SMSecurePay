import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Table, Row, Rows } from 'react-native-table-component';
import { useGlobalState } from '../../Globals';

export default function TransactionHistoryScreen({navigation}) {
    const [transactions, setTransactions] = useState([]);
    const db = SQLite.openDatabase('main.db');
    const [tableHead, setTableHead] = useState(['Sender', 'Receiver', 'Amount']);
    const [userEmail] = useGlobalState('loggedInUser');

    useEffect(() => {
        console.log('The user\'s email is: ' + userEmail);
        db.transaction((tx) => {
          console.log('Entering db transaction');
          tx.executeSql(
            'SELECT Sender, Receiver, Amount FROM Transactions WHERE Sender = ?',
            [userEmail],
            (_, { rows }) => {
              console.log('Retrieving rows from query');
              const transactionData = rows._array; // Use the _array property to get the actual data
              console.log('Saved rows into transactionData');
              console.log('Fetched Transactions:', transactionData);
              
              // Check if transactionData is an array
              if (Array.isArray(transactionData)) {
                console.log("fetched data is an array");
                setTransactions(transactionData.map(transaction => [transaction.Sender, transaction.Receiver, transaction.Amount.toString()])); // Convert each transaction to an array
                console.log('Used setTransactions');
              } else {
                console.error('Fetched data is not an array');
              }
              console.log('Transactions updated');
              
            },
            (_, error) => {
              console.error('Error retrieving transactions: ', error);
            }
          );
        });
      }, [userEmail]); // userEmail is a dependency

      return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction History</Text>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={transactions} style={styles.row} textStyle={styles.text}/>
            </Table>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { borderColor: '#c8e1ff', borderWidth: 1 },
});
