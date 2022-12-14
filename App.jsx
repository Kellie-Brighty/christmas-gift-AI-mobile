import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import loadingGif from "./assets/loading.gif";

export default function App() {
  const [gender, setGender] = useState("man");
  const [age, setAge] = useState(25);
  const [priceMin, setPriceMin] = useState(30);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const API_URL = "https://christmas-gift-ideas.vercel.app/api";

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/generate-gift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      Alert.alert("Failed to generate gift ideas. Please try later.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loading_container}>
        <Text style={styles.title}>Looking for the best gift ideas 🎁 💡</Text>
        <Image
          source={loadingGif}
          style={styles.loading}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }

  const onTryAgain = () => {
    setResult("");
  };

  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.title}>
            Here are some great Christmas gift ideas 🎁 💡
          </Text>
          <Text style={styles.result}>{result}</Text>
          <Pressable onPress={onTryAgain} style={styles.button}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.label}>Who's the gift for?</Text>
        <View style={styles.selector_container}>
          <Text
            onPress={() => setGender("man")}
            style={[
              styles.selector,
              gender === "man" && { backgroundColor: "#10a37f", color: "#fff" },
            ]}
          >
            Man
          </Text>
          <Text
            onPress={() => setGender("woman")}
            style={[
              styles.selector,
              gender === "woman" && {
                backgroundColor: "#10a37f",
                color: "#fff",
              },
            ]}
          >
            Woman
          </Text>
        </View>

        <Text style={styles.label}>Age</Text>
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          value={age.toString()}
          onChangeText={(s) => setAge(Number.parseInt(s) || "0")}
        />

        <Text style={styles.label}>Price from ($)</Text>
        <TextInput
          placeholder="Price from"
          keyboardType="numeric"
          style={styles.input}
          value={priceMin.toString()}
          onChangeText={(s) => setPriceMin(Number.parseInt(s) || "0")}
        />

        <Text style={styles.label}>Price to ($)</Text>
        <TextInput
          placeholder="Price to"
          keyboardType="numeric"
          style={styles.input}
          value={priceMax.toString()}
          onChangeText={(s) => setPriceMax(Number.parseInt(s) || "0")}
        />

        <Text style={styles.label}>Hobbies</Text>
        <TextInput
          placeholder="Hobbies"
          style={styles.input}
          value={hobbies}
          onChangeText={setHobbies}
        />

        <Pressable onPress={() => onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Generate Gift Ideas</Text>
        </Pressable>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    fontSize: 16,
    color: "#353740",
    borderWidth: 1,
    padding: 16,
    marginTop: 6,
    marginBottom: 12,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  scrollview: {
    padding: 10,
    paddingTop: 30,
  },
  selector_container: {
    flexDirection: "row",
  },
  selector: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loading_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  loading: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  result: {
    fontSize: 18
  }
});
