import React, { useState, useEffect } from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import { Container, Text, Button, Header, Spinner, Item, Input, Content } from 'native-base'
import styles from '../../styles/common'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import UseFetch from '../../hooks/UseFetch'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HashTags = () => {
    const StatusBarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'

    const url = 'hashtag/hashtags'
    const method = 'GET'
    const { loading, data, error } = UseFetch(url, method)

    useEffect(() => {
        console.log("Hashtags: use effect")
        const res = AsyncStorage.getItem('posts')
        // const jsonValue = JSON.parse(res)
        // console.log(JSON.stringify(data))
    }, [])

    const Tag = ({ name, index }) => (
        <View style={styles.hashTagItem}>
            <Text style={[styles.hashTagText, styles.hashTagIndex]}>{index + 1}.</Text>
            <View>
                <Text style={[styles.hashTagText, styles.hashTagName]}>#{name}</Text>
                <Text style={[styles.hashTagSub]}>3k memes</Text>
            </View>
        </View>
    )

    const renderItem = ({ item, index }) => (
        <Tag name={item.name} index={index} />
    )

    return (
        <View>
            <Header searchBar style={{ backgroundColor: '#fff' }} androidStatusBarColor="#00639c"
                iosBarStyle={StatusBarStyle}>
                <Item>
                    <Ionicon name="ios-search" size={23} />
                    <Input placeholder="Search with #Hash Tag" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>

            <View>
                {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
                {data !== null && data.status === 0 ? <Text style={{ marginTop: 20, alignSelf: 'center' }}>{data.msg}.</Text> :
                    data !== null ?
                            <FlatList style={{ marginBottom: 112, marginTop: 15 }}
                                // data={data.data}
                                data={data.data}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        // height: Dimensions.get('window').height, 
                        // data.data.map((tag, index) => {
                        //     return <View style={styles.hashTagItem}>
                        //         <Text style={[styles.hashTagText, styles.hashTagIndex]}>{index + 1}.</Text>
                        //         <View>
                        //             <Text style={[styles.hashTagText, styles.hashTagName]}>#{tag.name}</Text>
                        //             <Text style={[styles.hashTagSub]}>3k memes</Text>
                        //         </View>
                        //     </View>
                        // })

                        : null}
            </View>
        </View>
    )
}

export default React.memo(HashTags)