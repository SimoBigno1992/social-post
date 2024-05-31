import Header from "@/components/header"
import AccountInfo from "./fragments/AccountInfo"
import PostCreation from "./fragments/PostCreation"
import { useAtom } from 'jotai'
import storeAtom from '../../utils/store/index'
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Post } from "@/utils/models"
import PostCard from "./fragments/PostCard"
import React from "react"
import { useResizeObserver } from "@/utils/hooks/useResizeObserver"

const Home = () => {
	const [store] = useAtom(storeAtom)
	const [posts, setPosts] = useState<Post[]>([])
	const headerRef = useRef()
  const postCreationRef = useRef()
	const [headerHeight, setHeaderHeight] = useState(0)
	const [postCreationHeight, setPostCreationHeight] = useState(0)

	const updateSizes = () => {
		setHeaderHeight(headerRef.current?.offsetHeight || 0)
		setPostCreationHeight(postCreationRef.current?.offsetHeight || 0)
	}

	const observeHeader = useResizeObserver(updateSizes)
	const observePostCreation = useResizeObserver(updateSizes)
	
	useEffect(() => {
		axios.get(`https://gorest.co.in/public/v2/users/${store.user!.id}/posts`)
			.then(response => {
				setPosts(response.data)
			})
	}, [store.user])

	useEffect(() => {
		if (headerRef.current) {
			observeHeader(headerRef.current)
		}

		if (postCreationRef.current) {
			observePostCreation(postCreationRef.current)
		}
	}, [observeHeader, observePostCreation])

	return (
		<>
			<Header ref={headerRef} username={store.user!.name}/>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[300px_1fr]">
					<AccountInfo user={store.user!} postsNumber={posts.length}/>
          <div className="grid gap-6">
						<PostCreation ref={postCreationRef}/>
						<div style={{overflow: 'auto', height: `calc(100vh - ${headerHeight}px - ${postCreationHeight}px - 104px `}}>
						{posts && posts.length > 0 ? 
							posts.map((post, index) => {
								return <PostCard post={post} key={index} userMail={store.user?.email}/>
							}) : 
							<p>Any Posts here</p>}
							</div>
          </div>

        </div>
      </main>
		</>
	)
}

export default Home