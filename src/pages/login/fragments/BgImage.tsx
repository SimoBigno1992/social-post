import loginBG from '../../../assets/login-bg.jpg'
import styled from 'styled-components'

const Image = styled.img`
	height: -webkit-fill-available;
	width: 100%;
	border-radius: 30px 0 0 30px;
`

const BgImage = () => {
	return (
		<Image
			src={loginBG}
			alt="Image"
			className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	)
}

export default BgImage;
