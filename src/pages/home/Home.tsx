import Header from "@/components/header"
import AccountInfo from "./fragments/AccountInfo"
import PostCreation from "./fragments/PostCreation"
import { useQuery } from "@apollo/client"
import { GET_POST_BY_USER } from "@/utils/graphql/query"



const Home = () => {

	return (
		<>
			<Header />
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<AccountInfo/>
          <div className="grid gap-6">
						<PostCreation/>
          </div>
        </div>
      </main>
		</>
	)
}

export default Home