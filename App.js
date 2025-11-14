import React from 'react';
import 'dotenv/config';
import { StyleSheet, View, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function App() {
  const mapRef = useRef(null);
  const [procura, setProcura] = useState("");
  
  async function Search() {
    if (!search.trim()) return;
    
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: search,
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
        }
      );

      const
    }

  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.55052,
            longitude: -46.633308,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
            title={"São Paulo"}
            description={"Capital financeira do Brasil"}
          />
        </MapView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
