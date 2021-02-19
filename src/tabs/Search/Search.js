import React, { Component } from 'react';
import { Container, Content, List, Text, ListItem, Thumbnail, Left, Body, Right } from 'native-base';
import { Image, View, TouchableOpacity } from 'react-native';
import { FeedBox, CreatePost } from '../../components/index';

class Search extends Component {

	state = {
		selectedIndex: 0
	}

	getActive(active) {
		if (active)
			return "Following"
		return "Follow"
	}
	renderListItems() {
		const items = [
			{
				title: 'MachaMemeMacha',
				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '25min ago',
				active: true,
			},
			{
				title: 'MachaMeme',

				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '20min ago',
				active: false,
			},
			{
				title: 'MachaMeme',
				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '19min ago',
				active: true,
			},
			{
				title: 'MachaMeme',

				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '22min ago',
				active: false,
			},
			{
				title: 'MachaMeme',

				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '24min ago',
				active: false,
			},
			{
				title: 'MachaMeme',

				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '24min ago',
				active: false,
			},
			{
				title: 'MachaMeme',

				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@sycreator',
				time: '24min ago',
				active: false,
			},
		];
		const items2 = [
			{
				title: 'Aravind',
				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@aravindrock',
				time: '25min ago',
				active: true,
			},
			{
				title: 'Aravind',
				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@aravindrock',
				time: '25min ago',
				active: false,
			},
			{
				title: 'Aravind',
				image:
					'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
				desc: '@aravindrock',
				time: '25min ago',
				active: true,
			},
		];
		let selected_item = [...items]
		if (this.state.selectedIndex === 1)
			selected_item = [...items2]

		return selected_item.map((item, i) => {
			return (
				<ListItem avatar key={i} >
					<Left>
						<Thumbnail source={{ uri: item.image }} />
					</Left>
					<Body>
						<Text>{item.title}</Text>
						<Text note>{item.desc}</Text>
					</Body>
					<Right>
						<TouchableOpacity style={this.loadFollowStyle(item.active)}>
							<Text style={{ color: !item.active ? '#000000' : '#fff', fontWeight: 'bold' }}>{this.getActive(item.active)}</Text>
						</TouchableOpacity>
					</Right>
				</ListItem>
			)
		});
	}

	loadFollowStyle(active) {
		let buttonStyle = {
			backgroundColor: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
			width: 120,
			height: 40,
			marginRight: 4,
			borderWidth: 1,
			borderColor: 'gray'
		}
		if (active) {
			buttonStyle.backgroundColor = '#00639c',
				buttonStyle.borderWidth = 0
		}
		return buttonStyle

	}

	loadSegmentStyle(index) {
		let buttonStyle = {
			backgroundColor: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
			width: 150,
			height: 40,
			marginRight: 4,
			borderWidth: 1,
			borderColor: 'gray'
		}
		if (index === this.state.selectedIndex) {
			buttonStyle.borderRadius = 15
			buttonStyle.backgroundColor = '#00639c',
				buttonStyle.borderWidth = 0
		}
		return buttonStyle

	}
	renderSegment() {
		return (
			<View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<TouchableOpacity onPress={() => this.setState({ selectedIndex: 0 })} style={this.loadSegmentStyle(0)}>
					<Text style={{ color: this.state.selectedIndex != 0 ? '#000000' : '#fff', fontWeight: 'bold' }}>Creators</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.setState({ selectedIndex: 1 })} style={this.loadSegmentStyle(1)}>
					<Text style={{ color: this.state.selectedIndex != 1 ? '#000000' : '#fff', fontWeight: 'bold' }}>People</Text>

				</TouchableOpacity>
			</View>
		)
	}

	render() {
		const { style } = this.props;

		return (
			<View>
				{this.renderSegment()}
				<List>{this.renderListItems()}</List>
			</View>
		)
	}
}

export default Search;
