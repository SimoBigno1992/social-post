import Header from "@/components/header"
import AccountInfo from "./fragments/AccountInfo"
import PostCreation from "./fragments/PostCreation"
import { useAtom } from 'jotai'
import storeAtom from '../../utils/store/index'
import { useEffect, useState } from "react"
import axios from "axios"
import { Post } from "@/utils/models"
import PostCard from "./fragments/PostCard"

const Home = () => {
	const [store] = useAtom(storeAtom)
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		axios.get(`https://gorest.co.in/public/v2/users/${store.user!.id}/posts`)
			.then(response => {
				setPosts(response.data)
			})
	}, [store.user])

	return (
		<>
			<Header username={store.user!.name}/>
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<AccountInfo user={store.user!} postsNumber={posts.length}/>
          <div className="grid gap-6">
						<PostCreation/>
						{posts && posts.length > 0 ? 
							posts.map((post, index) => {
								return <PostCard post={post} key={index} userMail={store.user?.email}/>
							}) : 
							<p>Any Posts here</p>}
          </div>

        </div>
      </main>
		</>
	)
}

export default Home