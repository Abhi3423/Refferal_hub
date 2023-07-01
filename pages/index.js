import Image from 'next/image'
import { useEffect } from 'react';
import { Inter } from 'next/font/google'
import Link from 'next/link'
import intercom from './../public/assets/intercom.png'
import buffer from './../public/assets/buffer.png'
import airbnb from './../public/assets/airbnb.png'
import coming_soon from './../public/assets/coming_soon.png'
import online_shopping from './../public/assets/online_shopping.png'
import order_complete from './../public/assets/order_complete.png'
import placeholder from './../public/assets/placeholder.png'
import product_hunt from './../public/assets/product_hunt.png'
import product_shot from './../public/assets/product_shot.png'
import slack from './../public/assets/slack.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (
    <main
      className={`flex min-h-screen flex-col ${inter.className}`}
    >
      <div>

        <header className="nav">
          <div className="container">
            <div className="row items-center mb-lg">
              <div className="column align-left">
                <a href="#" aria-current="page" className="w-inline-block w--current">
                  <div className="logo"><span className="emoji mr-md">🌎</span> Refferals</div>
                </a>
              </div>
              <div className="column align-right">
                <div className="row items-center">
                  <Link href="#" className="u mr-lg">Log in</Link>
                  <Link href="/dashboard" className="button main w-button">Sign in<span
                    data-feather="arrow-right" className="icon mr-md-n ml-md">•</span></Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="section overflow-hidden">
          <div className="container mt-3xl mb-3xl">
            <div className="row">
              <div className="column align-center">
                <h1 className="test-giga text-center">Unlock the power of referrals with Referral Hub.</h1>
                <p className="text-lg text-center max-w-lg">Find the best candidates for your job openings and give referrals in your company with ease. Referral Hub uses AI-generated scores to help you make informed decisions.</p>
                <Link href="/dashboard" className="button xl main mt-lg w-button">Sign up now</Link>
                <div className="text-sm mt-md muted">
                  14 day free trial • No credit card required
                </div>
                <div className="text-sm mt-2xl text-center">
                  Show credibility with social proof. Logos of press coverage or
                  biggest customers
                </div>
                <div className="
                row
                items-center
                mt-lg
                _w-full
                max-w-lg
                wrap
                justify-center
              ">
                  <div className="logo-container">
                    <Image src={intercom} alt="" className="buffer" />
                  </div>
                  <div className="logo-container">
                    <Image src={buffer} alt="" className="buffer" />
                  </div>
                  <div className="logo-container ph">
                    <Image src={product_hunt} alt="" className="product-hunt" />
                  </div>
                  <div className="logo-container">
                    <Image src={slack} alt="" className="slack" />
                  </div>
                  <div className="logo-container">
                    <Image src={airbnb} alt="" className="airbnb" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="circle"></div>
        </div>

        <div className="section">
          <Image src={product_shot} alt="" className="product-shot shadow-lg" />
        </div>

        <div className="section">
          <div className="container mt-2xl mb-2xl">
            <div className="row">
              <div className="column align-center">
                <h2 className="max-w-lg text-center">Unlock the power of referrals for your hiring process.</h2>
                <p className="text-lg text-center max-w-md">
                  Streamline your candidate selection process with Referral Hub. Access a pool of resumes and let AI generate scores to identify the best candidates for your job openings. Choose who to refer and boost your company's hiring success.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container">
            <div className="row items-center v-t">
              <div className="column align-left p-2xl">
                <h6 className="max-w-lg">#1 Feature</h6>
                <h2 className="max-w-lg">Bring your company to life with captivating landing page designs.</h2>
                <p className="text-lg">Make a lasting impression with stunning landing page designs that bring your company to life. Our animations and AI-generated images will captivate your audience and leave a lasting impact. Stand out from the competition and attract top talent with our visually appealing landing pages.</p>
              </div>
              <div className="column align-center p-2xl">
                <Image src={coming_soon} alt="" className="feature-card" />
              </div>
            </div>
            <div className="row reverse items-center v-t">
              <div className="column align-left p-2xl">
                <h6 className="max-w-lg">#2 Feature</h6>
                <h2 className="max-w-lg">Find the perfect candidate effortlessly.</h2>
                <p className="text-lg">Say goodbye to endless searching and screening. With Referral Hub's intuitive UI/UX and stunning glassmorphism effects, finding the ideal candidate for your job opening has never been easier. Say hello to effortless hiring and start building your dream team today.</p>
              </div>
              <div className="column align-center p-2xl">
                <Image src={online_shopping} alt="" className="feature-card" />
              </div>
            </div>
            <div className="row items-center v-t">
              <div className="column align-left p-2xl">
                <h6 className="max-w-lg">#3 Feature</h6>
                <h2 className="max-w-lg">Unlock the power of referrals with ease.</h2>
                <p className="text-lg">Simplify the referral process with Referral Hub's easy-to-use login buttons for referral managers and candidates. Find the best candidates for job openings and streamline the referral process in your company. Unlock the power of referrals and boost your hiring success.</p>
              </div>
              <div className="column align-center p-2xl">
                <Image src={order_complete} alt="" className="feature-card" />
              </div>
            </div>
          </div>
        </div>

        <div className="section main mt-2xl">
          <div className="container mt-2xl mb-2xl">
            <div className="row items-center">
              <div className="column align-center">
                <h1 className="max-w-lg text-giga text-center text-white">Make smarter hiring decisions with Referral Hub.</h1>
                <Link href="/dashboard" className="button xl main white mt-lg w-button">Sign up now</Link>
                <div className="faded text-sm mt-md">
                  14 day free trial • No credit card required
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section pb-2xl-m">
          <div className="container mt-2xl mb-2xl">
            <div className="row v-l">
              <div className="column align-left">
                <div className="emoji lg">🌎</div>
                <a href="#" className="u mt-lg">info@email.com</a>
                <div className="row mt-lg ml-md-n">
                  <a href="#" target="_blank" className="p-md w-inline-block"><Image
                    width={40} height={40} src={placeholder}
                    data-feather="twitter" alt="" className="icon" /></a>
                  <a href="#" target="_blank" className="p-md w-inline-block"><Image
                    width={40} height={40} src={placeholder}
                    data-feather="instagram" alt="" className="icon" /></a>
                  <a href="#" target="_blank" className="p-md w-inline-block"><Image
                    width={40} height={40} src={placeholder}
                    data-feather="linkedin" alt="" className="icon" /></a>
                </div>
              </div>
              <div className="column align-left">
                <h6 className="max-w-lg mb-xl footer-header">Company</h6>
                <div>About</div>
                <div className="mt-md">Customers</div>
                <div className="mt-md">Jobs</div>
                <div className="mt-md">Blog</div>
              </div>
              <div className="column align-left">
                <h6 className="max-w-lg mb-xl footer-header">Contact</h6>
                <div>Support</div>
                <div className="mt-md">Sales</div>
              </div>
              <div className="column align-left">
                <h6 className="max-w-lg mb-xl footer-header">Resources</h6>
                <div>Podcast</div>
                <div className="mt-md">Help Center</div>
              </div>
            </div>
            <div className="border-t mt-xl">
              <div className="row mt-xl v-l">
                <div className="column align-left">
                  <div className="muted text-sm">
                    ©copyright2023
                  </div>
                </div>
                <div className="column align-right">
                  <div className="text-sm muted">Built with ❤️ in Nextv12</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
