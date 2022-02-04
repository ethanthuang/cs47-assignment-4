import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "./Themes/colors"

export default function Song(props) {
    return (
        <View style={styles.songContainer}>
        <Text style={styles.songText}>{props.index + 1}</Text>
        <Image style={styles.songImage} source={{uri: props.item.album.images[0].url}} />
        <View style={styles.songTitleArtist}>
          <Text style={{color: Colors.white}} numberOfLines={1}>{props.item.name}</Text>
          <Text style={{color: Colors.gray}}>{props.item.artists[0].name}</Text>
        </View>
        <View style={styles.songAlbum}>
          <Text style={{color: Colors.white}} numberOfLines={1}>{props.item.album.name}</Text>
        </View>
        <View style={styles.songDuration}>
          <Text style={{color: Colors.white}}>{props.duration}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
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