import React, {Component} from 'react';
import {Container, Content, Text, List, Thumbnail} from 'native-base';
import {Image, View} from 'react-native';
import Logo from '../../../assets/logo.png';

class Notification extends Component {
  renderListItems() {
    const items = [
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '25min ago',
        active: true,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Updated your meme.',
        time: '20min ago',
        active: false,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Replied to you.',
        time: '19min ago',
        active: true,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '22min ago',
        active: false,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '24min ago',
        active: false,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '24min ago',
        active: false,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '24min ago',
        active: false,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '24min ago',
        active: false,
      },
      {
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
        desc: 'Aravind Commented your meme.',
        time: '24min ago',
        active: false,
      },
    ];

    return items.map((item, i) => {
      return (
        <View
          key={i}
          style={{
            width: '100%',
            height: 110,
            flexDirection: 'row',
            backgroundColor: item.active ? '#e7f0f7' : 'transparent',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Thumbnail
              large
              source={{
                uri: item.image,
              }}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              padding: 10,
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.desc}</Text>
          </View>
          <View
            style={{
              flex: 0.2,
            }}>
            <Text
              style={{
                marginTop: 20,
                paddingLeft: 4,
                fontSize: 12,
                color: '#808080',
              }}>
              {item.time}
            </Text>
          </View>
        </View>
      );
    });
  }

  render() {
    const {style} = this.props;

    return <List>{this.renderListItems()}</List>;
  }
}

export default Notification;
