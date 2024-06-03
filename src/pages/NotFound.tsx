import background from '../assets/background.jpg'
import notfount from '/404_white_1.svg'

const NotFound = () => {
	return (
		<div className="w-full" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}>
			<div className="flex flex-col gap-3 justify-center items-center py-40" >
				<img src={notfount} style={{height:"400p"}}/>
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">404</h1>
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Page Not Found</h3>
			</div>
			
		</div>
	)
}

export default NotFound