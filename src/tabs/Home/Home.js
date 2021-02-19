import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Container, Content, List, Text, Spinner } from 'native-base'
import { Image, View } from 'react-native'
import { FeedBox, CreatePost } from '../../components/index'
import { env } from '../../env'

function Home(props) {
  const res = useFetch(`${env.baseUrl}posts/postlist`, { method: 'GET' })
  const posts = useMemo(() => {
    return res.response
  }, [res])

  const renderListItems = useCallback(() => {
    if (!res.response) {
      return <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} />
    }

    return (
      posts.map((item, i) => {
        return <FeedBox item={item} key={i} />
      })
    )
  }, [posts])

  
  const { style } = props
  if (props.showPost)
    return (
      <CreatePost
        onPostSend={(data) => props.onHomePostSend(data)}
        postTypes={props.postTypes}
        postLoading={props.postLoading}
      />
    )
  return <List>{renderListItems()}</List>
}

// const Home = ({showPost,
//   posts,onHomePostSend,
//   postTypes,
//   loading,
//   postLoading, memes}) => {
//     useEffect(() => {

//     }, [memes])
//   function renderListItems() {
//     // console.log(posts)
//     if (!loading || memes === 'null')
//       return <Text style={{ alignSelf: 'center' }}>No Meme's available</Text>
//     if (memes.length > 0) {
//       return memes.map((item, i) => {
//         return <FeedBox item={item} key={i} />
//       })
//     }
//   }

//   // const { style } = props
//   if (showPost)
//     return (
//       <CreatePost
//         onPostSend={(data) => onHomePostSend(data)}
//         postTypes={postTypes}
//         postLoading={postLoading}
//       />
//     )
//   return <List>{renderListItems()}</List>
// }

export default Home