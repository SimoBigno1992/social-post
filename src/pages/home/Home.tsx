import Header from "@/components/header"
import AccountInfo from "./fragments/AccountInfo"
import PostCreation from "./fragments/PostCreation"
import { useAtom } from 'jotai'
import { user } from '../../utils/store/index'
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Post } from "@/utils/models"
import PostCard from "./fragments/PostCard"
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import { useResizeObserver } from "@/utils/hooks/useResizeObserver"
import { Search } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "react-i18next";

const Home = () => {
	const [store, setStore] = useAtom(user)
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const { t } = useTranslation();
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
		if (store.user.id != 0) {
			setLoading(true)
			getPosts()
		}
	}, [store])

	useEffect(() => {
		if (headerRef.current) {
			observeHeader(headerRef.current)
		}

		if (postCreationRef.current) {
			observePostCreation(postCreationRef.current)
		}
	}, [observeHeader, observePostCreation])

	const getPosts = () => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
		axios.get(`${BASE_URL}/public/v2/users/${store.user!.id}/posts`, config)
			.then(response => {
				setPosts(response.data)
				setLoading(false)
			})
	}

	const createPost = (values: { title: string, content: string }, form: UseFormReturn<{
		title: string;
		content: string;
	}, any, undefined>) => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
		const body = {
			title: values.title,
			body: values.content
		}
		axios.post(`${BASE_URL}/public/v2/users/${store.user!.id}/posts`, body, config)
			.then(response => {
				form.reset()
				getPosts()
			})
	}

	return (
		<>
			<Header ref={headerRef} username={store.user!.name} />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[300px_1fr]">
					<AccountInfo postsNumber={posts.length}/>
					<div className="grid gap-6">
						<PostCreation ref={postCreationRef} createPost={createPost} />
						<div style={{ overflow: 'auto', height: `calc(100vh - ${headerHeight}px - ${postCreationHeight}px - 104px `, display: 'flex', flexDirection: "column", gap: "1.5rem" }}>
							{loading ? <>
									<Skeleton className="w-full h-[100px] rounded-20" />
									<Skeleton className="w-full h-[100px] rounded-20" />
									<Skeleton className="w-full h-[100px] rounded-20" />
								</> :
								posts && posts.length > 0 ?
									posts.map((post, index) => {
										return <PostCard post={post} key={index} userMail={store.user?.email} username={store.user?.name} />
									}) :
									<div className="flex flex-col items-center mt-10">
										<Search className="h-20 w-20 mb-2"></Search>
										<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t("any_posts")}</h3>
										<p className="text-muted-foreground">{t("any_posts_subtitle")}</p>
									</div>}
						</div>
					</div>

				</div>
			</main>
		</>
	)
}

export default Home