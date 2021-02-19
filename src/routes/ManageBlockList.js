import React, { useState, useEffect } from 'react'
import { Container, Content, H1 } from 'native-base'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Button, TextInput, Item } from '../components/index'
import styles from '../styles/common'

export default function ManageBlockList(props) {
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        if (value.length === 0) {
            alert('Please enter name')
            return
        } else {
            alert(value)
        }
    }

    return (
        <>
            <Container style={styles.blueBg}>
                <Content style={styles.content}>
                    <H1 style={styles.h1}>Manage Block List</H1>
                    {/* <Item regular>
                        <TextInput light placeholder="Name*" onChangeText={(value) => setValue(value)} />
                    </Item>
                    <Button full rounded textLight style={styles.mt10} onPress={() => handleSubmit()}>SUBMIT</Button> */}
                </Content>
            </Container>
        </>
    )
}
