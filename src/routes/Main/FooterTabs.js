import React from 'react'
import {View} from 'react-native'
import { Text, Footer, FooterTab, Button, Badge } from 'native-base'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import Faicon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../styles/common'

export default function FooterTabs(props) {
    const {setSelectedTabIndex, getaActive} = props

    return (
        <>
            <Footer style={styles.common}>
                <FooterTab style={styles.common}>
                    <Button onPress={() => setSelectedTabIndex(0)}>
                        <Ionicon name="home" style={getaActive(0)} />
                    </Button>
                    <Button onPress={() => setSelectedTabIndex(1)}>
                        <Faicon name="hashtag" style={getaActive(1)} />
                    </Button>
                    <Button onPress={() => setSelectedTabIndex(2)}>
                        <Ionicon name="search-outline" style={getaActive(2)} />
                    </Button>
                    <Button
                        badge
                        vertical
                        onPress={() => setSelectedTabIndex(3)}>
                        <View style={{ position: 'absolute', top: 2 }}>
                            <Badge>
                                <Text>52</Text>
                            </Badge>
                        </View>
                        <Ionicon name="notifications-outline" style={getaActive(3)} />
                    </Button>
                    <Button onPress={() => setSelectedTabIndex(4)}>
                        <Ionicon name="person-outline" style={getaActive(4)} />
                    </Button>
                </FooterTab>
            </Footer>
        </>
    )
}