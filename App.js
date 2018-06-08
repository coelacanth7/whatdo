import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

export default class App extends React.Component {
	render() {
		console.log(navigator.geolocation.getCurrentPosition());
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.font}>what do?</Text>
				<Text style={styles.font}>{JSON.stringify(this.props, 0, 2)}</Text>
				{/* <Text style={styles.font}>{JSON.stringify(this.state,0,2)}</Text> */}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		// alignItems: "center",
		// justifyContent: "flex-start",
		padding: 40
	},
	font: {
		color: "#fff",
		fontSize: 30,
		fontWeight: "bold"
	}
});
