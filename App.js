import { StyleSheet, Text, SafeAreaView, Pressable, View, Image, FlatList } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";
import Colors from "./Themes/colors"
import Song from "./Song"

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    } 
  }, [response]);

  useEffect(() => {
    if (token) {
      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      //albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  const Stack = createStackNavigator();

  function SongDetails ({ navigation, route }) {
    const { externalURL } = route.params;
    return (
      <WebView source={{ uri: externalURL }}/>
    );
  }

  function SongPreview({ navigation, route }) {
    const { previewURL } = route.params;
    return (
      <WebView source={{ uri: previewURL }}/>
    );
  }

  function HomeScreen({ navigation }) {
    const renderSong = ({item, index}) => {
      let duration = millisToMinutesAndSeconds(item.duration_ms);  
      return (
        <Song item={item} index={index} duration={duration} navigation={navigation}></Song>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require("./assets/spotify-logo.png")} style={styles.connectButtonLogo} />
          <Text style={styles.headerText}>My Top Tracks</Text>
        </View>
        <View style={{ flex: 1}}>
          <FlatList
            data={tracks}
            renderItem={renderSong}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </SafeAreaView>
    ); 
  }

  if (token) {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Song Preview" component={SongPreview} 
            options={{
              headerStyle:{
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.white
              }
            }
            }/>
          <Stack.Screen name="Song Details" component={SongDetails} 
            options={{
              headerStyle:{
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.white
              }
            }
            }/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={promptAsync}>
          <View style={styles.connectButton}>
            <Image source={require("./assets/spotify-logo.png")} style={styles.connectButtonLogo} />
            <Text style={styles.connectButtonText}>CONNECT WITH SPOTIFY</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  }
  
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  connectButton: {
    backgroundColor: Colors.spotify,
    width: "55%",
    padding: 8,
    borderRadius: 99999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  connectButtonText: {
    textAlign: "center",
    color: Colors.white,
    flex: 5,
  },
  connectButtonLogo: {
    resizeMode: "contain",
    height: "100%",
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    flex: 2,
    color: Colors.white,
    fontSize: 28,
    fontWeight: "bold",
  },
  headerLogo: {
    resizeMode: "contain",
    height: "100%",
    flex: 1,
  },
});
