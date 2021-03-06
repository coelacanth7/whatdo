import React from "react";
import {
	StyleSheet,
	Text,
	ScrollView,
	View,
	ActivityIndicator
} from "react-native";
import { API_KEY } from "./config.json";

const baseURI =
	"https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=15000&type=bar&location=";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			latitude: null,
			longitude: null,
			locations: [],
			arrPos: 0,
			error: null
		};

		this._onTapDo = this._onTapDo.bind(this);
	}

	getThatLocation() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				position => resolve(position),
				error => reject(error),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			);
		});
	}

	componentDidMount() {
		this.getThatLocation()
			.then(({ latitude, longitude }) =>
				fetch(`${baseURI}${latitude},${longitude}&key=${API_KEY}`)
			)
			.then(res => res.json())
			.then(json => {
				let arr = json.results.map(place => place.name);
				this.setState({ locations: arr });
			})
			.catch(e => console.error(e));
	}

	_onTapDo() {
		this.setState((prevState, props) => {
			let arrPos =
				prevState.arrPos === prevState.locations.length - 1
					? 0
					: prevState.arrPos + 1;
			return { arrPos };
		});
	}

	render() {
		let { locations, arrPos } = this.state;

		let thing = locations.length ? (
			<Text style={styles.font}>do {locations[arrPos]}</Text>
		) : (
			<ActivityIndicator size="small" color="#fff" />
		);

		return (
			<View style={styles.container}>
				<Text style={styles.font}>what do?</Text>
				{thing}
				<Text style={styles.font} onPress={this._onTapDo}>
					{locations.length > 0 && "no"}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		padding: 40
	},
	font: {
		color: "#fff",
		fontSize: 50,
		fontWeight: "bold"
	}
});
