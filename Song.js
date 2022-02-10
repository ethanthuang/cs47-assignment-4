import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import Colors from "./Themes/colors"

export default function Song(props) {
    return (
      <View style={styles.songContainer}>
        {/* <Text style={styles.songText}>{props.index + 1}</Text> */}
        <Pressable onPress={() => props.navigation.navigate("Song Preview", {previewURL: props.item.preview_url})}>
          <View style={styles.songPlay}>
            <AntDesign name="play" size={20} color={Colors.spotify} />
          </View>
        </Pressable>
        <Pressable flex={1} onPress={() => props.navigation.navigate("Song Details", {externalURL: props.item.external_urls.spotify})}>
          <Image style={styles.songImage} source={{uri: props.item.album.images[0].url}} />
        </Pressable>
        <Pressable flex={2} justifyContent={"center"} onPress={() => props.navigation.navigate("Song Details", {externalURL: props.item.external_urls.spotify})}>
          <View style={styles.songTitleArtist}>
            <Text style={{color: Colors.white}} numberOfLines={1}>{props.item.name}</Text>
            <Text style={{color: Colors.gray}}>{props.item.artists[0].name}</Text>
          </View>
        </Pressable>
        <Pressable flex={2} justifyContent={"center"} onPress={() => props.navigation.navigate("Song Details", {externalURL: props.item.external_urls.spotify})}>
          <View style={styles.songAlbum}>
            <Text style={{color: Colors.white}} numberOfLines={1}>{props.item.album.name}</Text>
          </View>
        </Pressable>
        <Pressable flex={0.75} alignItems={"center"} justifyContent={"center"} onPress={() => props.navigation.navigate("Song Details", {externalURL: props.item.external_urls.spotify})}>
          <View style={styles.songDuration}>
            <Text style={{color: Colors.white}}>{props.duration}</Text>
          </View>
        </Pressable>
        
      </View>
    );
}

const styles = StyleSheet.create({
    songPlay: {
      flex: 0.5,
      padding: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    songText: {
        color: Colors.gray,
        flex: 0.5,
        textAlign: "center"
      },
    songContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
        paddingVertical: 5,
    },
    songImage: {
        flex: 1,
        aspectRatio: 1,
    },
    songTitleArtist: {
        flexDirection: "column",
        flex: 2,
        paddingHorizontal: 7
    },
    songAlbum: {
        flex: 2,
        paddingHorizontal: 7,
        textAlign: "center"
    },
    songDuration: {
        flex: 0.75,
        textAlign: "center"
    }
})