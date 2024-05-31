import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Avatar,
	AvatarImage,
} from "@/components/ui/avatar"
import avatar from '../assets/avatar.png'
import logoDark from '../assets/logo_dark.svg'
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React from "react"
import { useAtom } from "jotai"
import storeAtom from '../utils/store/index'

const Logo = styled.img`
	cursor: pointer;
`
type HeaderProps = {
	username: string;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(({username}, ref) => {
	const navigate = useNavigate()
	const [store, setStore] = useAtom(storeAtom)

	const logout = () => {
		navigate("/login")
		setStore({user: {}})
	}

	return (
		<header ref={ref} className="flex justify-between items-center h-20 sm:p-10 ">
			<Logo src={logoDark} className="h-20" alt="home" onClick={() => navigate("/home")} />
			<div className="flex items-center">
				<div className="text-lg font-semibold sm:pr-4">Hi, {username}</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="overflow-hidden rounded-full h-14 w-14"
						>
							<Avatar className="h-14 w-14">
								<AvatarImage src={avatar} alt={`@${username}`} />
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>My Account</DropdownMenuItem>
						<DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
})

export default Header