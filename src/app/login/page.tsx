import LoginForm from './loginForm'
import bgLogin from '../../../public/images/bg.jpg'
import Image from 'next/image'

export default function LoginPage() {
    
    return (
        <div className='h-full w-full relative mt-8 flex justify-center items-start'>
            <Image src={bgLogin} alt="" className='absolute w-[816px]' />
            <section className='bg-ct-blue-600 place-items-center flex flex-col z-10 mt-6'>
                <LoginForm />
            </section>
        </div>
    )
}
