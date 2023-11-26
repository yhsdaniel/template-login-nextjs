import Image from 'next/image'
import RegisterForm from './registerForm'
import logoRegister from '../../../public/images/logo-register.png'

export default function RegisterPage() {
  return (
    <>
      <div className='mt-8 flex justify-center items-center'>
        <div className='w-1/2 flex justify-end'>
          <div className="flex justify-center items-center flex-col pr-20">
            <Image src={logoRegister} alt=''/>
            <div className='text-xl font-bold text-center mt-8 mb-3 whitespace-nowrap'>Easy buying and selling only on Tokopaedi</div>
            <div className='text-sm text-center whitespace-nowrap'>Join and experience the ease of transactions on Tokopaedi</div>
          </div>
        </div>
        <div className="w-1/2">
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
