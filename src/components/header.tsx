import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import avatar from '../assets/avatar.png'
import logoDark from '../assets/logo_dark.svg'
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Logo = styled.img`
	cursor: pointer;
`

const Header = () => {
	const navigate = useNavigate()
	return (
		<header className="flex justify-between items-center h-20 sm:p-10 ">
			<Logo src={logoDark} className="h-20" alt="home" onClick={() => navigate("/home")} />
			<div className="flex items-center">
				<div className="text-lg font-semibold sm:pr-4">Hi, Simone</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="overflow-hidden rounded-full h-14 w-14"
						>
							<Avatar className="h-14 w-14">
								<AvatarImage src={avatar} alt="@user" />
								<AvatarFallback>SB</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}

export default Header