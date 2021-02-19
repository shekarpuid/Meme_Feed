import React, {useState, useEffect} from 'react';
import {Content,Text,Thumbnail,Icon,Header,Right,Left,Body,Button,List} from 'native-base'
import {Image,View,TouchableHighlight,TouchableOpacity,Modal} from 'react-native'
import tempFeed from '../../../assets/tempFeed.png';
import Up from '../../../assets/Up_Arrow.png';
import UpColor from '../../../assets/Up_Arrow_Colour.png';
import Down from '../../../assets/Down_Arrow.png';
import DownColor from '../../../assets/Down_Arrow_Colour.png';
import Comment from '../../../assets/Comment.png';
import CommentColor from '../../../assets/Comment_Colour.png';
import Share from '../../../assets/Share.png';
import ShareColour from '../../../assets/Share_Colour.png';
import {env} from '../../env'

const FeedBox = (props) =>  {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedFooter, setSelectedFooter] = useState('')

  // Render description
  function renderItemContent(item) {
    const contentLen = item.post_description.length;
    if (isExpanded)
      if (contentLen <= 94) {
        return (
          <View
            style={{
              padding: 14,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>{item.post_description}</Text>
          </View>
        );
      }
    let contentInfo = item.post_description;
    let seeOption = '...See Less';
    if (!isExpanded) {
      seeOption = '...See More';
      contentInfo = item.post_description.slice(0, 94);
    }

    return (
      <View
        style={{
          padding: 14,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>{contentInfo}</Text>
        <TouchableHighlight
          onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={{fontSize: 15, color: '#808080'}}>{seeOption}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  // Post footer
  function renderFooterContent(item) {
    return (
      <View
        style={{
          height: 70,
          backgroundColor: '#ffffff',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderTopWidth: 0.8,
          borderBottomWidth: 0.8,
        }}>
        <TouchableOpacity
          onPress={() => setSelectedFooter('like')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              selectedFooter !== '' && selectedFooter === 'like' ? UpColor : Up
            }
            resizeMode="stretch"
            style={{width: 30, height: 30}}
          />
          <View>
            <Text style={{marginLeft: 2}}>{item.up_vote.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFooter('dislike')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              selectedFooter !== '' && selectedFooter === 'dislike'
                ? DownColor
                : Down
            }
            resizeMode="stretch"
            style={{width: 30, height: 30}}
          />
          <View>
            <Text style={{marginLeft: 2}}>{item.down_vote.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFooter('comment')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              selectedFooter !== '' && selectedFooter === 'comment'
                ? CommentColor
                : Comment
            }
            resizeMode="stretch"
            style={{width: 30, height: 30}}
          />
          <View>
            <Text style={{marginLeft: 2}}>{item.commentids.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFooter('share')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              selectedFooter !== '' && selectedFooter === 'share'
                ? ShareColour
                : Share
            }
            resizeMode="stretch"
            style={{width: 30, height: 30}}
          />
          <View>
            <Text style={{marginLeft: 2}}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Comment modal
  function renderModal() {
    let isVisible = false;
    if (isExpanded === 'comment') isVisible = true;
    const commentList = [
      {
        title: 'Swetha Yadav',
        subTitle: '@sycreator',
        description: 'Lorem ipsum dolor sit amet steup of',
        time: '25min ago',
        like: '25',
        dislike: '5',
        share: '23',
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
      },
      {
        title: 'Alisa Yadav',
        subTitle: '@tvcreator',
        description: 'Lorem ipsum Test coment',
        time: '34min ago',
        like: '777',
        dislike: '20',
        share: '200',
        image:
          'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
      },
    ];
    return (
      <Modal
        animationType="slide"
        // transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <Header style={{backgroundColor: '#fff', borderBottomWidth: 2}}>
          <Left style={{flex: 0.3}}>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body></Body>
          <Right style={{flex: 0.3}}>
            <Button
              transparent
              onPress={() => setSelectedFooter('')}>
              <Icon name="menu" style={{color: 'red'}} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>{renderSpecificComment(commentList)}</List>
        </Content>
      </Modal>
    );
  }

  // Comment render
  function renderSpecificComment(commentList) {
    if (commentList.length) {
      return commentList.map((item, key) => {
        return (
          <View
            key
            style={{
              width: '100%',
              alignSelf: 'center',
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Thumbnail
                source={{
                  uri:
                    'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
                }}
              />
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#f7f7f7',
                  borderRadius: 5,
                  width: '80%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  <Text style={{fontSize: 12, color: '#808080'}}>
                    {item.time}
                  </Text>
                </View>
                <Text style={{color: '#039bd4', fontSize: 13}}>
                  {item.subTitle}
                </Text>
                <Text style={{fontSize: 14}}> {item.description}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 40,
                paddingLeft: 40,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedFooter('dislike')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Image
                  source={UpColor}
                  resizeMode="stretch"
                  style={{width: 25, height: 25}}
                />
                <View>
                  <Text style={{marginLeft: 2}}>{item.like}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedFooter('dislike')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Image
                  source={Down}
                  resizeMode="stretch"
                  style={{width: 25, height: 25}}
                />
                <View>
                  <Text style={{marginLeft: 2}}>{item.dislike}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedFooter('dislike')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Image
                  source={Share}
                  resizeMode="stretch"
                  style={{width: 25, height: 25}}
                />
                <View>
                  <Text style={{marginLeft: 2}}>{item.share}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      });
    }
    return null;
  }

    const {style, item} = props;
    const imageUrl = `${env.baseUrl}static/images/${item.post_image}`
    return (
      <View style={{width: '100%'}}>
        {/* Post header */}
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            paddingLeft: 2,
            paddingRight: 2,
            backgroundColor: '#ffffff',
          }}>
          <View
            style={{
              flex: 0.3,
              paddingLeft: 4,
              justifyContent: 'center',
            }}>
            <Thumbnail
              source={{
                uri:
                  'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
              }}
            />
          </View>
          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>item.title</Text>
            <Text style={{fontSize: 12, color: '#808080'}}>item.subTitle</Text>
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 10,
            }}>
            <Icon name="home" />
            <Text style={{fontSize: 12, color: '#808080'}}>{item.cdate}</Text>
          </View>
        </View>
        
        {/* Post image */}
        <View style={{height: 400}}>
          <Image
            source={{uri: imageUrl}}
            resizeMode="stretch"
            style={{width: '100%', height: '100%'}}
          />
        </View>
        
        {/* Post content */}
        {renderItemContent(item)}

        {/* Post footer */}
        {renderFooterContent(item)}

        {/* Comment modal */}
        {renderModal()}
      </View>
    )
}

export default FeedBox;
