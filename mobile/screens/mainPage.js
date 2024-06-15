import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getLatestTransactions } from "../store/transactions/transactionsActions";
import Icon from "react-native-vector-icons/MaterialIcons";
import Easing from 'react-native/Libraries/Animated/Easing';

const conversionRate = 89000; // Conversion rate from Dollar to LBP

const FadeInUpView = (props) => {
  const fadeAnim = useRef(new Animated.Value(50)).current; // Start position for the slide effect
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: opacityAnim,
        transform: [{ translateY: fadeAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const MainPage = () => {
  const accounts = useSelector((state) => state.accounts.accounts || []);
  const transactions = useSelector((state) => state.transactions.transactions || []);
  const userId = "66577a78511763b4296b4311";
  const dispatch = useDispatch();
  const accountId = "665cd4f1a1fe882d71c8269d";

  useEffect(() => {
    dispatch(getAllAccounts(userId));
    dispatch(getLatestTransactions(accountId));
  }, [dispatch, userId, accountId]);

  useEffect(() => {
    console.log("Accounts:", accounts);
    console.log("Transactions:", transactions);
  }, [accounts, transactions]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [fabOpen, setFabOpen] = useState(false);
  const [currency, setCurrency] = useState('Dollar');

  const toggleFab = () => {
    setFabOpen(!fabOpen);
  };

  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: fabOpen ? 0 : Dimensions.get('window').height,
      duration: 400, // Smooth transition duration
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fabOpen]);

  const handleOptionPress = (currencyType) => {
    setCurrency(currencyType);
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 400, // Smooth transition duration
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setFabOpen(false));
  };

  const slideUpStyle = {
    transform: [{
      translateY: slideAnim,
    }],
  };

  const convertAmount = (amount) => {
    return currency === 'Dollar' ? amount : amount * conversionRate;
  };

  const currencySymbol = currency === 'Dollar' ? '$' : 'LBP';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <FadeInUpView style={styles.balanceSection}>
          <Text style={styles.balanceText}>Your Balance</Text>
          {accounts.map((account) => (
            <Text key={account._id} style={styles.balance}>
              {`${currencySymbol} ${convertAmount(account.balance)}`}
            </Text>
          ))}
        </FadeInUpView>
        <FadeInUpView style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <Card key={transaction._id} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={transaction.sender === accountId ? "send" : "receipt"}
                    size={24}
                    color="#0c7076"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Title>{transaction.receiverName || transaction.senderName}</Title>
                  <Paragraph>{`${currencySymbol} ${convertAmount(transaction.amount)}`}</Paragraph>
                  <Paragraph>{formatDate(transaction.createdAt)}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          ))}
        </FadeInUpView>
      </ScrollView>
      {fabOpen && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayBackground} onPress={toggleFab} />
          <Animated.View style={[styles.fabOptions, slideUpStyle]}>
            <TouchableOpacity style={styles.fabOption} onPress={() => handleOptionPress('LBP')}>
              <Icon name="money" size={24} color="#0c7076" />
              <View style={styles.optionTextContainer}>
                <Text style={styles.fabOptionTitle}>LBP</Text>
                <Text style={styles.fabOptionDescription}>Switch to Lebanese Pounds</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabOption} onPress={() => handleOptionPress('Dollar')}>
              <Icon name="attach-money" size={24} color="#0c7076" />
              <View style={styles.optionTextContainer}>
                <Text style={styles.fabOptionTitle}>Dollar</Text>
                <Text style={styles.fabOptionDescription}>Switch to US Dollars</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleFab}>
        <Icon name="attach-money" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Space for the FAB
  },
  balanceSection: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  balanceText: {
    fontSize: 22,
    color: "#333333",
    marginBottom: 10,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0c7076",
  },
  transactionsSection: {
    marginTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0c7076",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  overlayBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fabOptions: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    width: '100%',
  },
  fabOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionTextContainer: {
    marginLeft: 15,
  },
  fabOptionTitle: {
    color: "#0c7076",
    fontSize: 18,
    fontWeight: "bold",
  },
  fabOptionDescription: {
    color: "#333",
    fontSize: 14,
  },
});

export default MainPage;
